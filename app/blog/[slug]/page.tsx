import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

// This would be replaced with a database query in a real implementation
const getBlogPost = (slug: string) => {
  return blogPosts.find((post) => post.slug === slug)
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-teal-600 hover:text-teal-700 mb-6 inline-block">
          ← Back to Blog
        </Link>

        <h1 className="font-bold text-3xl sm:text-4xl text-teal-900 mb-4">{post.title}</h1>

        <div className="flex items-center text-sm text-gray-500 mb-6 font-light">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.category}</span>
        </div>

        <Image
          src={post.image || "/placeholder.svg"}
          width={800}
          height={400}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />

        <div className="prose prose-teal max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 font-light">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-xl text-teal-900 mb-4">Ready to experience the benefits?</h3>
          <Button asChild className="bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-none px-8 py-6 text-lg tracking-wide">
            <Link href="/booking">Book a Session</Link>
          </Button>
        </div>
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
      "Discover how regular massage therapy can improve your physical and mental well-being beyond just relaxation.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80",
    date: "April 5, 2025",
    category: "Wellness",
    content: [
      "Massage therapy has been practiced for thousands of years across various cultures for good reason. Beyond the immediate relaxation it provides, regular massage therapy offers numerous health benefits that might surprise you.",
      "1. Reduces Stress and Anxiety: One of the most well-known benefits of massage is stress reduction. Massage decreases cortisol levels (the stress hormone) and increases the production of serotonin and dopamine, which help stabilize your mood.",
      "2. Improves Circulation: The pressure created by massage techniques moves blood through congested areas and allows new blood to flow in, improving overall circulation and nutrient delivery to cells.",
      "3. Enhances Immune Function: Regular massage has been shown to naturally increase the body's cytotoxic capacity (activity level of the body's natural \"killer cells\") and decrease the number of T-cells, which improves the body's immune function.",
      "4. Relieves Pain: Massage therapy can help alleviate pain by reducing inflammation and swelling, relaxing muscles, and releasing endorphins, the body's natural painkillers.",
      "5. Improves Sleep Quality: The relaxation provided by massage therapy can significantly improve sleep quality, particularly for those suffering from insomnia or sleep disturbances.",
      "6. Enhances Mental Alertness: By promoting relaxation and improving circulation, massage therapy can enhance mental alertness and performance.",
      "7. Reduces Headaches: Regular massage can decrease the frequency and intensity of tension headaches and migraines by relaxing trigger points and reducing stress.",
      "8. Improves Posture: Massage can help the body maintain proper alignment and balance, which is essential for good posture.",
      "9. Boosts Energy Levels: By improving circulation and reducing stress, massage therapy can help boost energy levels and combat fatigue.",
      "10. Promotes Overall Well-being: Perhaps the most comprehensive benefit is the sense of well-being that comes from regular massage therapy. The combination of physical relaxation and mental calm creates a holistic sense of health.",
      "At Peaceful Path Massage, we offer a variety of massage techniques tailored to your specific needs. Whether you're seeking relief from chronic pain, stress reduction, or simply a moment of relaxation, our skilled therapists are here to help you experience these benefits firsthand.",
      "Ready to experience these benefits for yourself? Book a session with us today and take the first step toward improved well-being.",
    ],
  },
  {
    slug: "self-care-techniques",
    title: "Simple Self-Care Techniques You Can Practice at Home",
    excerpt: "Learn easy self-massage and stretching techniques that you can incorporate into your daily routine.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80",
    date: "March 22, 2025",
    category: "Self-Care",
    content: [
      "While professional massage therapy offers numerous benefits, incorporating self-care techniques into your daily routine can help maintain those benefits between sessions. Here are some simple yet effective self-care practices you can do at home.",
      "Self-Massage Techniques:",
      "1. Neck and Shoulder Relief: Using your fingertips, apply gentle pressure in circular motions along the base of your skull and down the sides of your neck. Continue to your shoulders, kneading any tight spots you find.",
      "2. Hand Massage: Massage the palm of one hand with the thumb of the other, making small circular motions. Work your way from the center of your palm outward, then massage each finger from base to tip.",
      "3. Foot Massage: Sit comfortably and rest one foot on the opposite thigh. Use your thumbs to massage the sole of your foot, applying pressure from heel to toe. Pay special attention to the arch of your foot.",
      "Stretching Routines:",
      "1. Neck Stretches: Gently tilt your head to one side, bringing your ear toward your shoulder until you feel a stretch. Hold for 15-30 seconds, then repeat on the other side.",
      "2. Shoulder Rolls: Slowly roll your shoulders forward in circular motions, then backward. Repeat 5-10 times in each direction.",
      "3. Cat-Cow Stretch: On your hands and knees, alternate between arching your back (cat) and letting it sag (cow), moving with your breath.",
      "Mindfulness Practices:",
      "1. Deep Breathing: Take slow, deep breaths, filling your lungs completely and exhaling fully. Focus on the sensation of your breath entering and leaving your body.",
      "2. Body Scan: Lie down and mentally scan your body from head to toe, noticing any areas of tension or discomfort. As you identify these areas, consciously relax them.",
      "3. Mindful Walking: Take a short walk, paying attention to the sensation of your feet touching the ground and the rhythm of your breathing.",
      "Hydration and Nutrition:",
      "1. Stay Hydrated: Drink plenty of water throughout the day to help flush toxins from your body and keep your muscles hydrated.",
      "2. Anti-Inflammatory Foods: Incorporate foods with anti-inflammatory properties into your diet, such as fatty fish, berries, leafy greens, and nuts.",
      "Creating a Self-Care Routine:",
      "The key to effective self-care is consistency. Set aside a few minutes each day for these practices, perhaps in the morning to start your day right or in the evening to unwind.",
      "Remember, these self-care techniques complement professional massage therapy but don't replace it. Regular sessions with a skilled massage therapist at Peaceful Path Massage, combined with these at-home practices, will help you maintain optimal physical and mental well-being.",
    ],
  },
  {
    slug: "choosing-massage-type",
    title: "How to Choose the Right Massage Type for Your Needs",
    excerpt: "With so many massage modalities available, it can be confusing to know which one is right for you.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80",
    date: "March 10, 2025",
    category: "Education",
    content: [
      "With numerous massage modalities available, choosing the right one for your specific needs can be overwhelming. This guide will help you understand the different types of massage we offer at Peaceful Path Massage and which might be best suited for your situation.",
      "Swedish Massage:",
      "Best for: First-time massage clients, stress relief, general relaxation",
      "Swedish massage is the foundation of most massage techniques. It involves long, flowing strokes, kneading, and circular movements on the superficial layers of muscles. This gentle approach is perfect for those new to massage or anyone seeking relaxation and stress relief.",
      "Deep Tissue Massage:",
      "Best for: Chronic pain, muscle tension, rehabilitation from injury",
      "Deep tissue massage targets the deeper layers of muscle and connective tissue. Using slower strokes and more direct deep pressure, this technique helps release chronic muscle tension and break up scar tissue. It's particularly effective for chronic aches and pains, such as a stiff neck, low back pain, or sore shoulders.",
      "Hot Stone Massage:",
      "Best for: Muscle relaxation, improved circulation, stress reduction",
      "Hot stone massage uses heated stones placed on specific parts of the body to warm and relax muscles. The therapist may also hold the stones while applying pressure, allowing the heat to penetrate deep into the muscle tissue. This technique is excellent for improving circulation and providing deep relaxation.",
      "Prenatal Massage:",
      "Best for: Pregnancy discomfort, reducing swelling, stress relief during pregnancy",
      "Specially designed for the needs of pregnant women, prenatal massage helps alleviate the discomforts associated with pregnancy such as backaches, stiff neck, leg cramps, headaches, and swelling. Our therapists are specially trained in prenatal techniques to ensure both mother and baby's safety and comfort.",
      "How to Decide:",
      "Consider your primary goal: Are you seeking relaxation, pain relief, or something specific like pregnancy support?",
      "Think about pressure preference: Do you prefer gentle touch or deeper pressure?",
      "Consider any medical conditions: Certain conditions may make some massage types more appropriate than others.",
      "Consult with our therapists: Our skilled professionals can help guide you to the right massage based on your needs and preferences.",
      "Remember that you can always adjust the pressure during your session by communicating with your therapist. At Peaceful Path Massage, we're committed to customizing each session to meet your unique needs and ensure your comfort.",
      "Still unsure which massage type is right for you? Contact us for a consultation, and we'll help you make the best choice for your wellness journey.",
    ],
  },
]
