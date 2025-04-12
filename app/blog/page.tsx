import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-bold text-3xl sm:text-4xl text-teal-900 mb-4">Wellness Blog</h1>
      <p className="text-gray-600 mb-8 max-w-3xl font-light italic">
        Explore our articles on massage therapy, wellness tips, and self-care practices to enhance your well-being
        journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="overflow-hidden flex flex-col">
            <Image
              src={post.image || "/placeholder.svg"}
              width={500}
              height={300}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6 flex-grow">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </div>
              <h2 className="font-semibold text-xl text-teal-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3 font-light">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <Button asChild variant="outline" className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-none py-2 tracking-wide font-cormorant">
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" className="mr-2 font-cormorant">
          Previous
        </Button>
        <Button variant="outline" className="ml-2 font-cormorant">
          Next
        </Button>
      </div>
    </div>
  )
}

// Sample data (would come from API in real implementation)
const blogPosts = [
  {
    slug: "benefits-of-massage-therapy",
    title: "10 Surprising Benefits of Regular Massage Therapy",
    excerpt:
      "Discover how regular massage therapy can improve your physical and mental well-being beyond just relaxation. From better sleep to improved immune function, the benefits might surprise you.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80",
    date: "April 5, 2025",
    category: "Wellness",
  },
  {
    slug: "self-care-techniques",
    title: "Simple Self-Care Techniques You Can Practice at Home",
    excerpt:
      "Learn easy self-massage and stretching techniques that you can incorporate into your daily routine to maintain the benefits of your professional massage sessions.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80",
    date: "March 22, 2025",
    category: "Self-Care",
  },
  {
    slug: "choosing-massage-type",
    title: "How to Choose the Right Massage Type for Your Needs",
    excerpt:
      "With so many massage modalities available, it can be confusing to know which one is right for you. This guide helps you understand the differences and benefits of each type.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80",
    date: "March 10, 2025",
    category: "Education",
  },
  {
    slug: "massage-for-stress",
    title: "Using Massage Therapy to Combat Chronic Stress",
    excerpt:
      "Chronic stress can have serious health implications. Discover how regular massage therapy can help reduce stress hormones and promote relaxation.",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80",
    date: "February 28, 2025",
    category: "Health",
  },
  {
    slug: "essential-oils-guide",
    title: "Essential Oils Guide: Enhancing Your Massage Experience",
    excerpt:
      "Learn about different essential oils used in massage therapy and how they can enhance the therapeutic benefits of your session.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80",
    date: "February 15, 2025",
    category: "Aromatherapy",
  },
  {
    slug: "massage-for-athletes",
    title: "Massage Therapy for Athletes: Recovery and Performance",
    excerpt:
      "Discover how athletes can benefit from regular massage therapy to improve recovery times, prevent injuries, and enhance overall performance.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80",
    date: "February 3, 2025",
    category: "Sports",
  },
]
