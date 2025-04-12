import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { headers } from 'next/headers'

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
})

export async function POST(req: Request) {
  try {
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { name, email, phone, service, date, time, duration } = body

    if (!name || !email || !phone || !service || !date || !time || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const booking = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      service,
      date,
      time,
      duration,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    await redis.hset(`booking:${booking.id}`, booking)

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const bookings = await redis.keys('booking:*')
    const bookingData = await Promise.all(
      bookings.map(async (key) => {
        const booking = await redis.hgetall(key)
        return booking
      })
    )

    return NextResponse.json({ bookings: bookingData })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
