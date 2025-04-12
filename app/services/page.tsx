import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-teal-900/40 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1542848284-8afa78a08ccb?auto=format&fit=crop&q=80"
          width={1920}
          height={400}
          alt="Massage services"
          className="w-full h-[300px] object-cover"
        />
        <div className="container relative z-20 mx-auto px-4 py-16">
          <h1 className="font-bold text-4xl sm:text-5xl text-white mb-4">Our Services</h1>
          <p className="text-white text-lg max-w-2xl font-light italic font-cormorant">
            Discover our range of therapeutic massage services designed to meet your unique needs. Each session is
            customized to provide the perfect balance of relaxation and healing.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`flex flex-col md:flex-row gap-8 ${
                index !== services.length - 1 ? "mb-16 pb-16 border-b border-gray-200" : ""
              }`}
            >
              <div className="md:w-1/3">
                <Image
                  src={service.image || "/placeholder.svg"}
                  width={500}
                  height={350}
                  alt={service.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="font-bold text-3xl text-teal-900 mb-4">{service.name}</h2>
                <p className="text-gray-600 mb-6 font-light font-cormorant">{service.description}</p>

                <h3 className="font-semibold text-teal-800 mb-3">Duration & Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {service.durations.map((duration) => (
                    <div key={duration.minutes} className="border border-gray-200 rounded-lg p-4">
                      <p className="font-medium text-lg">{duration.minutes} Minutes</p>
                      <p className="text-teal-600 font-semibold text-xl mb-2">${duration.price}</p>
                      <Button asChild className="w-full bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-none py-2 tracking-wide font-cormorant">
                        <Link href={`/booking?service=${service.id}&duration=${duration.minutes}`}>Book Now</Link>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <h3 className="font-bold text-teal-800 mb-2">Benefits</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="font-cormorant">{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-teal-900 mb-6">Ready to Book Your Session?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our skilled therapists are ready to help you relax and rejuvenate.
          </p>
          <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 font-cormorant">
            <Link href="/booking">Book an Appointment</Link>
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
    description:
      "Swedish massage is a gentle, relaxing massage that uses long strokes, kneading, deep circular movements, vibration and tapping. It helps you feel better, improves circulation and relieves muscle tension. It's a classic massage that helps you relax when you're feeling stressed.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80",
    durations: [
      { minutes: 30, price: 45 },
      { minutes: 60, price: 75 },
      { minutes: 90, price: 110 },
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Improves circulation",
      "Relieves muscle tension",
      "Promotes relaxation",
      "Improves sleep quality",
    ],
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    description:
      "Deep tissue massage targets the deeper layers of muscle and connective tissue. The therapist uses slower strokes and more direct deep pressure to release chronic patterns of tension in the body. This technique is particularly effective for chronic aches and pains and contracted areas such as a stiff neck, low back pain, and sore shoulders.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80",
    durations: [
      { minutes: 30, price: 55 },
      { minutes: 60, price: 85 },
      { minutes: 90, price: 125 },
    ],
    benefits: [
      "Alleviates chronic pain",
      "Breaks up scar tissue",
      "Improves posture",
      "Reduces inflammation",
      "Increases range of motion",
    ],
  },
  {
    id: "hot-stone",
    name: "Hot Stone Massage",
    description:
      "Hot stone massage uses heated stones to enhance the massage experience. Smooth, flat, heated stones are placed on specific parts of your body. The heat from the stones helps to relax muscles, allowing the therapist to apply deeper pressure if desired. The warmth of the hot stones improves circulation and calms the nervous system.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80",
    durations: [
      { minutes: 60, price: 95 },
      { minutes: 90, price: 135 },
    ],
    benefits: [
      "Eases muscle stiffness",
      "Increases circulation",
      "Reduces stress and anxiety",
      "Promotes deeper relaxation",
      "Relieves pain",
    ],
  },
  {
    id: "prenatal",
    name: "Prenatal Massage",
    description:
      "Prenatal massage is specifically designed for the needs of pregnant women. It's a gentle and nurturing approach that helps alleviate the discomforts associated with pregnancy such as backaches, stiff neck, leg cramps, headaches, and swelling. Our therapists are specially trained in prenatal techniques to ensure both mother and baby's safety and comfort.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80",
    durations: [
      { minutes: 60, price: 85 },
      { minutes: 90, price: 125 },
    ],
    benefits: [
      "Reduces pregnancy discomfort",
      "Decreases stress and anxiety",
      "Improves sleep",
      "Reduces swelling",
      "Relieves back and joint pain",
    ],
  },
]
