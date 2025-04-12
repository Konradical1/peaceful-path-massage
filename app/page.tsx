import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 bg-teal-900/50 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80"
          width={1920}
          height={600}
          alt="Peaceful massage setting"
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="container relative z-20 mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              Find Your Peace
            </h1>
            <p className="text-white text-lg sm:text-xl mb-8 font-light italic">
              Experience the healing power of touch at Peaceful Path Massage. Our skilled therapists will help you
              relax, rejuvenate, and restore.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-none px-8 py-6 text-lg tracking-wide font-cormorant">
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-none px-8 py-6 text-lg tracking-wide font-cormorant"
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-teal-100">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl sm:text-4xl text-teal-900 text-center mb-12">
            Our Massage Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <Image
                  src={service.image || "/placeholder.svg"}
                  width={400}
                  height={250}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-teal-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4 font-light">{service.description}</p>
                  <p className="text-teal-600 font-medium mb-4">Starting at ${service.startingPrice}</p>
                  <Button asChild variant="outline" className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-none py-2 tracking-wide font-cormorant">
                    <Link href={`/services#${service.id}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-none px-8 py-6 text-lg tracking-wide font-cormorant">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl sm:text-4xl text-teal-900 text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      width={50}
                      height={50}
                      alt={testimonial.name}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-teal-900">{testimonial.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic font-light">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-6">Ready to Experience the Peaceful Path?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book your session today and take the first step toward relaxation and wellness.
          </p>
          <Button asChild size="lg" className="bg-white text-teal-900 hover:bg-gray-100 font-cormorant">
            <Link href="/booking">Book Your Appointment</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

// Sample data (would come from API in real implementation)
const services = [
  {
    id: "swedish",
    name: "Swedish Massage",
    description: "A gentle, relaxing massage that improves circulation and relieves tension.",
    startingPrice: 75,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80",
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    description: "Targets deeper layers of muscle and connective tissue to release chronic patterns of tension.",
    startingPrice: 85,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80",
  },
  {
    id: "hot-stone",
    name: "Hot Stone Massage",
    description: "Uses heated stones to relax muscles and improve blood flow for deeper relaxation.",
    startingPrice: 95,
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80",
  },
]

const testimonials = [
  {
    name: "Sarah J.",
    quote: "The most relaxing massage I've ever had. I left feeling like a new person!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    name: "Michael T.",
    quote: "My chronic back pain has improved significantly since I started regular sessions here.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    name: "Emma R.",
    quote: "The atmosphere is so calming and the therapists are incredibly skilled. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  },
]
