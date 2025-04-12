import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        durations: true,
      },
    })

    // Transform the data to match the expected format
    const formattedServices = services.map((service) => ({
      id: service.id,
      name: service.name,
      description: service.description,
      durations: service.durations.map((duration) => ({
        id: duration.id,
        minutes: duration.minutes,
        price: duration.priceCents / 100, // Convert cents to dollars
      })),
    }))

    return NextResponse.json(formattedServices)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
