import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Schema for booking creation
const bookingSchema = z.object({
  serviceId: z.string(),
  durationId: z.string(),
  startsAt: z.string().transform((val) => new Date(val)),
  userId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = bookingSchema.parse(body)

    // Get the duration to calculate end time
    const duration = await prisma.duration.findUnique({
      where: { id: validatedData.durationId },
    })

    if (!duration) {
      return NextResponse.json({ error: "Invalid duration selected" }, { status: 400 })
    }

    // Calculate end time
    const endsAt = new Date(validatedData.startsAt)
    endsAt.setMinutes(endsAt.getMinutes() + duration.minutes)

    // Check for overlapping bookings
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        OR: [
          {
            startsAt: { lt: endsAt },
            endsAt: { gt: validatedData.startsAt },
          },
        ],
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    })

    if (overlappingBookings.length > 0) {
      return NextResponse.json({ error: "This time slot is already booked" }, { status: 409 })
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        serviceId: validatedData.serviceId,
        durationId: validatedData.durationId,
        startsAt: validatedData.startsAt,
        endsAt,
        userId: validatedData.userId,
        status: "CONFIRMED", // Auto-confirm for now
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid booking data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd get the user ID from the session
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        service: true,
        duration: true,
      },
      orderBy: {
        startsAt: "desc",
      },
    })

    // Transform the data to match the expected format
    const formattedBookings = bookings.map((booking) => ({
      id: booking.id,
      serviceName: booking.service.name,
      durationMinutes: booking.duration.minutes,
      price: booking.duration.priceCents / 100, // Convert cents to dollars
      startsAt: booking.startsAt,
      endsAt: booking.endsAt,
      status: booking.status,
    }))

    return NextResponse.json(formattedBookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
