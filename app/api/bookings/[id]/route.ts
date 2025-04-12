import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookingId = params.id

    // Find the booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    })

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Check if booking is more than 24 hours away
    const now = new Date()
    const bookingTime = new Date(booking.startsAt)
    const hoursDifference = (bookingTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursDifference < 24) {
      return NextResponse.json(
        { error: "Bookings can only be cancelled at least 24 hours in advance" },
        { status: 400 },
      )
    }

    // Update booking status to CANCELLED
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    })

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error("Error cancelling booking:", error)
    return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 })
  }
}
