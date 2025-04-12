"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/custom-select'
import { toast } from 'sonner'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  duration: z.string().min(1, 'Please select a duration'),
})

type BookingFormData = z.infer<typeof bookingSchema>

const services = [
  { id: 'massage', name: 'Massage Therapy' },
  { id: 'facial', name: 'Facial Treatment' },
  { id: 'bodywork', name: 'Bodywork' },
]

const durations = [
  { id: '30', name: '30 minutes' },
  { id: '60', name: '60 minutes' },
  { id: '90', name: '90 minutes' },
  { id: '120', name: '120 minutes' },
]

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: BookingFormData) => {
    try {
      console.log('Form submitted with data:', data)
      setIsSubmitting(true)
      
      // Format the data before sending
      const formattedData = {
        ...data,
        phone: data.phone.replace(/\D/g, ''), // Remove non-digits from phone
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      })

      console.log('Response status:', response.status)
      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create booking')
      }

      toast.success('Booking request submitted successfully!')
      reset()
    } catch (error) {
      console.error('Submission error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to create booking')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Your Name"
            className={`${errors.name ? 'border-red-500' : ''} w-full`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            {...register('email')}
            type="email"
            placeholder="Email Address"
            className={`${errors.email ? 'border-red-500' : ''} w-full`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <Input
            id="phone"
            {...register('phone')}
            type="tel"
            placeholder="Phone Number"
            className={`${errors.phone ? 'border-red-500' : ''} w-full`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
            Service
          </label>
          <Select
            id="service"
            {...register('service')}
            className={`${errors.service ? 'border-red-500' : ''} w-full`}
          >
            <option value="">Select a Service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </Select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <Input
            id="date"
            {...register('date')}
            type="date"
            className={`${errors.date ? 'border-red-500' : ''} w-full`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <Input
            id="time"
            {...register('time')}
            type="time"
            className={`${errors.time ? 'border-red-500' : ''} w-full`}
          />
          {errors.time && (
            <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <Select
            id="duration"
            {...register('duration')}
            className={`${errors.duration ? 'border-red-500' : ''} w-full`}
          >
            <option value="">Select Duration</option>
            {durations.map((duration) => (
              <option key={duration.id} value={duration.id}>
                {duration.name}
              </option>
            ))}
          </Select>
          {errors.duration && (
            <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !isDirty}
        className={`w-full ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-teal-600 hover:bg-teal-700'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Book Appointment'}
      </Button>
    </form>
  )
} 