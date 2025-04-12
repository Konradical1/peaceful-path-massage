import { z } from "zod"

// User validation schemas
export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password is too long"),
  name: z.string().optional(),
})

export const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

// Booking validation schemas
export const createBookingSchema = z.object({
  serviceId: z.string().min(1, "Service is required"),
  durationId: z.string().min(1, "Duration is required"),
  startsAt: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  userId: z.string().optional(),
})

export const cancelBookingSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
})

// Blog validation schemas
export const blogQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(6),
})

export const blogSlugSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
})

// Availability validation schema
export const availabilityQuerySchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
})
