import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"
import bcrypt from "bcrypt"

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

// Create a rate limiter that allows 5 requests per 10 minutes
export const loginRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
})

// User authentication functions
export async function createUser(email: string, password: string, name?: string) {
  // Check if user already exists
  const existingUserId = await redis.hget("email_to_id", email.toLowerCase())

  if (existingUserId) {
    throw new Error("User already exists")
  }

  // Generate a unique ID
  const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Store user data
  await redis.hset(`user:${userId}`, {
    email: email.toLowerCase(),
    hashedPassword,
    name: name || "",
    createdAt: new Date().toISOString(),
  })

  // Create email to ID mapping for quick lookups
  await redis.hset("email_to_id", {
    [email.toLowerCase()]: userId,
  })

  return { userId, email }
}

export async function verifyCredentials(email: string, password: string) {
  // Get user ID from email
  const userId = await redis.hget("email_to_id", email.toLowerCase())

  if (!userId) {
    return null
  }

  // Get user data
  const userData = await redis.hgetall(`user:${userId}`)

  if (!userData || !userData.hashedPassword) {
    return null
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, userData.hashedPassword)

  if (!passwordMatch) {
    return null
  }

  return {
    id: userId,
    email: userData.email,
    name: userData.name || null,
  }
}

export async function createSession(userId: string, token: string, ip: string, userAgent: string) {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

  await redis.hset(`session:${token}`, {
    userId,
    ip,
    ua: userAgent,
    createdAt: new Date().toISOString(),
    expiresAt: expiresAt.toISOString(),
  })

  // Set TTL for the session
  await redis.expire(`session:${token}`, 60 * 60 * 24 * 7) // 7 days in seconds

  return { token, expiresAt }
}

export async function getSessionUser(token: string) {
  const session = await redis.hgetall(`session:${token}`)

  if (!session || !session.userId) {
    return null
  }

  // Check if session is expired
  if (new Date(session.expiresAt) < new Date()) {
    await redis.del(`session:${token}`)
    return null
  }

  const userData = await redis.hgetall(`user:${session.userId}`)

  if (!userData) {
    return null
  }

  return {
    id: session.userId,
    email: userData.email,
    name: userData.name || null,
  }
}

export async function revokeSession(token: string) {
  await redis.del(`session:${token}`)
  return true
}
