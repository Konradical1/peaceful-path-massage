import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export type Booking = {
  id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  duration: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
} 