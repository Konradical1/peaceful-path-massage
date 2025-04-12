import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const dateParam = request.nextUrl.searchParams.get("date")

    if (!dateParam) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
    }

    // Parse the date and set it to midnight
    const date = new Date(dateParam)
    date.setHours(0, 0, 0, 0)

    // Create end of day date
    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)

    // Get all bookings for the specified date
    const bookings = await prisma.booking.findMany({
      where: {
        startsAt: {
          gte: date,
          lte: endDate,
        },
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
    })

    // Business hours: 9:00 AM to 5:00 PM
    const businessStart = 9 // 9:00 AM
    const businessEnd = 17 // 5:00 PM
    const slotDuration = 30 // 30 minutes per slot

    // Generate all possible time slots for the day
    const allSlots = []
    for (let hour = businessStart; hour < businessEnd; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const slotTime = new Date(date)
        slotTime.setHours(hour, minute, 0, 0)

        // Skip if the slot is in the past
        if (slotTime < new Date()) continue

        const slotEndTime = new Date(slotTime)
        slotEndTime.setMinutes(slotEndTime.getMinutes() + slotDuration)

        // Check if the slot overlaps with any booking
        const isAvailable = !bookings.some((booking) => {
          const bookingStart = new Date(booking.startsAt)
          const bookingEnd = new Date(booking.endsAt)

          return (
            (slotTime < bookingEnd && slotEndTime > bookingStart) ||
            (slotEndTime > bookingStart && slotTime < bookingEnd)
          )
        })

        if (isAvailable) {
          allSlots.push({
            time: slotTime.toISOString(),
            formattedTime: slotTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
          })
        }
      }
    }

    return NextResponse.json(allSlots)
  } catch (error) {
    console.error("Error fetching availability:", error)
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 })
  }
}
