"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const initialService = searchParams.get("service") || ""
  const initialDuration = searchParams.get("duration") ? Number.parseInt(searchParams.get("duration")!) : 0

  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState(initialService)
  const [selectedDuration, setSelectedDuration] = useState(initialDuration)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  // Move to next step if initial params are set
  if (step === 1 && initialService && initialDuration) {
    setStep(2)
  }

  const handleServiceSelect = (serviceId: string, durationMinutes: number) => {
    setSelectedService(serviceId)
    setSelectedDuration(durationMinutes)
    setStep(2)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setStep(3)
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(4)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleBookNow = async () => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: selectedService,
          date: selectedDate?.toISOString().split('T')[0],
          time: selectedTime,
          duration: selectedDuration,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create booking')
      }

      toast.success('Booking request submitted successfully!')
      // Reset form and go back to step 1
      setStep(1)
      setSelectedService("")
      setSelectedDuration(0)
      setSelectedDate(undefined)
      setSelectedTime("")
      setFormData({ name: "", email: "", phone: "" })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create booking')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-teal-900 mb-8 text-center">
        Book Your Appointment
      </h1>

      {/* Booking Steps */}
      <div className="mb-10">
        <div className="flex justify-between max-w-3xl mx-auto">
          {["Select Service", "Choose Date", "Pick Time", "Confirm"].map((stepName, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step > index + 1
                    ? "bg-teal-600 text-white"
                    : step === index + 1
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > index + 1 ? "✓" : index + 1}
              </div>
              <span className={`text-sm font-cormorant ${step >= index + 1 ? "text-teal-900" : "text-gray-500"}`}>{stepName}</span>
            </div>
          ))}
        </div>
        <div className="relative h-1 max-w-3xl mx-auto mt-4 bg-gray-200">
          <div
            className="absolute h-1 bg-teal-600 transition-all duration-300"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-playfair font-bold text-teal-800 mb-6">Select Your Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  width={500}
                  height={250}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-teal-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 font-cormorant">{service.description}</p>

                  <Tabs defaultValue={service.durations[0].minutes.toString()} className="w-full">
                    <TabsList className="w-full mb-4">
                      {service.durations.map((duration) => (
                        <TabsTrigger key={duration.minutes} value={duration.minutes.toString()} className="flex-1 font-cormorant">
                          {duration.minutes} min
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {service.durations.map((duration) => (
                      <TabsContent key={duration.minutes} value={duration.minutes.toString()}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-teal-600 font-semibold text-xl font-cormorant">${duration.price}</p>
                            <p className="text-sm text-gray-500 font-cormorant">{duration.minutes} minutes</p>
                          </div>
                          <Button
                            className="bg-teal-600 hover:bg-teal-700 font-cormorant"
                            onClick={() => handleServiceSelect(service.id, duration.minutes)}
                          >
                            Select
                          </Button>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Choose Date */}
      {step === 2 && (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-playfair font-bold text-teal-800 mb-6">Select a Date</h2>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <p className="font-medium font-cormorant">Selected Service:</p>
                <p className="text-teal-600 font-cormorant">
                  {services.find((s) => s.id === selectedService)?.name} - {selectedDuration} minutes
                </p>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border mx-auto"
                disabled={(date) => {
                  // Disable past dates and Sundays (closed)
                  return date < new Date() || date.getDay() === 0
                }}
              />
              <div className="mt-4 text-center text-sm text-gray-500 font-cormorant">* We are closed on Sundays</div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)} className="font-cormorant">
                  Back
                </Button>
                <Button
                  className="bg-teal-600 hover:bg-teal-700 font-cormorant"
                  disabled={!selectedDate}
                  onClick={() => selectedDate && setStep(3)}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Pick Time */}
      {step === 3 && (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-playfair font-bold text-teal-800 mb-6">Select a Time</h2>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <p className="font-medium font-cormorant">Selected Service:</p>
                <p className="text-teal-600 font-cormorant">
                  {services.find((s) => s.id === selectedService)?.name} - {selectedDuration} minutes
                </p>
              </div>
              <div className="mb-4">
                <p className="font-medium font-cormorant">Selected Date:</p>
                <p className="text-teal-600 font-cormorant">
                  {selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2 font-cormorant">Available Times:</h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`${selectedTime === time ? "bg-teal-600 hover:bg-teal-700" : ""} font-cormorant`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} className="font-cormorant">
                  Back
                </Button>
                <Button
                  className="bg-teal-600 hover:bg-teal-700 font-cormorant"
                  disabled={!selectedTime}
                  onClick={() => selectedTime && setStep(4)}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-playfair font-bold text-teal-800 mb-6">Confirm Your Booking</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium font-cormorant">Service:</span>
                  <span className="font-cormorant">{services.find((s) => s.id === selectedService)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium font-cormorant">Duration:</span>
                  <span className="font-cormorant">{selectedDuration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium font-cormorant">Date:</span>
                  <span className="font-cormorant">
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium font-cormorant">Time:</span>
                  <span className="font-cormorant">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium font-cormorant">Price:</span>
                  <span className="font-bold text-teal-600 font-cormorant">
                    $
                    {
                      services
                        .find((s) => s.id === selectedService)
                        ?.durations.find((d) => d.minutes === selectedDuration)?.price
                    }
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-sm text-gray-600 font-cormorant">
                  Payment will be collected in person at the time of your appointment. Please arrive 10 minutes before
                  your scheduled time.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)} className="font-cormorant">
                  Back
                </Button>
                <Button 
                  className="bg-teal-600 hover:bg-teal-700 font-cormorant"
                  onClick={handleBookNow}
                  disabled={!formData.name || !formData.email || !formData.phone}
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Sample data (would come from API in real implementation)
const services = [
  {
    id: "swedish",
    name: "Swedish Massage",
    description: "A gentle, relaxing massage that improves circulation and relieves tension.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80",
    durations: [
      { minutes: 30, price: 45 },
      { minutes: 60, price: 75 },
      { minutes: 90, price: 110 },
    ],
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    description: "Targets deeper layers of muscle and connective tissue to release chronic patterns of tension.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80",
    durations: [
      { minutes: 30, price: 55 },
      { minutes: 60, price: 85 },
      { minutes: 90, price: 125 },
    ],
  },
  {
    id: "hot-stone",
    name: "Hot Stone Massage",
    description: "Uses heated stones to relax muscles and improve blood flow for deeper relaxation.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80",
    durations: [
      { minutes: 60, price: 95 },
      { minutes: 90, price: 135 },
    ],
  },
  {
    id: "prenatal",
    name: "Prenatal Massage",
    description: "Specially designed for expectant mothers to relieve pregnancy discomforts.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80",
    durations: [
      { minutes: 60, price: 85 },
      { minutes: 90, price: 125 },
    ],
  },
]

// Sample available times (would come from API based on selected date)
const availableTimes = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
] 