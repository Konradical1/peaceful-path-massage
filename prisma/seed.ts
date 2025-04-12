import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany()
  await prisma.duration.deleteMany()
  await prisma.service.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.user.deleteMany()

  // Create services
  const swedishMassage = await prisma.service.create({
    data: {
      name: "Swedish Massage",
      description: "A gentle, relaxing massage that improves circulation and relieves tension.",
      durations: {
        create: [
          { minutes: 30, priceCents: 4500 },
          { minutes: 60, priceCents: 7500 },
          { minutes: 90, priceCents: 11000 },
        ],
      },
    },
  })

  const deepTissue = await prisma.service.create({
    data: {
      name: "Deep Tissue Massage",
      description: "Targets deeper layers of muscle and connective tissue to release chronic patterns of tension.",
      durations: {
        create: [
          { minutes: 30, priceCents: 5500 },
          { minutes: 60, priceCents: 8500 },
          { minutes: 90, priceCents: 12500 },
        ],
      },
    },
  })

  const hotStone = await prisma.service.create({
    data: {
      name: "Hot Stone Massage",
      description: "Uses heated stones to relax muscles and improve blood flow for deeper relaxation.",
      durations: {
        create: [
          { minutes: 60, priceCents: 9500 },
          { minutes: 90, priceCents: 13500 },
        ],
      },
    },
  })

  const prenatal = await prisma.service.create({
    data: {
      name: "Prenatal Massage",
      description: "Specially designed for expectant mothers to relieve pregnancy discomforts.",
      durations: {
        create: [
          { minutes: 60, priceCents: 8500 },
          { minutes: 90, priceCents: 12500 },
        ],
      },
    },
  })

  // Create blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        slug: "benefits-of-massage-therapy",
        title: "10 Surprising Benefits of Regular Massage Therapy",
        content: `Massage therapy has been practiced for thousands of years across various cultures for good reason. Beyond the immediate relaxation it provides, regular massage therapy offers numerous health benefits that might surprise you.

1. Reduces Stress and Anxiety: One of the most well-known benefits of massage is stress reduction. Massage decreases cortisol levels (the stress hormone) and increases the production of serotonin and dopamine, which help stabilize your mood.

2. Improves Circulation: The pressure created by massage techniques moves blood through congested areas and allows new blood to flow in, improving overall circulation and nutrient delivery to cells.

3. Enhances Immune Function: Regular massage has been shown to naturally increase the body's cytotoxic capacity (activity level of the body's natural "killer cells") and decrease the number of T-cells, which improves the body's immune function.

4. Relieves Pain: Massage therapy can help alleviate pain by reducing inflammation and swelling, relaxing muscles, and releasing endorphins, the body's natural painkillers.

5. Improves Sleep Quality: The relaxation provided by massage therapy can significantly improve sleep quality, particularly for those suffering from insomnia or sleep disturbances.`,
        published: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: "self-care-techniques",
        title: "Simple Self-Care Techniques You Can Practice at Home",
        content: `While professional massage therapy offers numerous benefits, incorporating self-care techniques into your daily routine can help maintain those benefits between sessions. Here are some simple yet effective self-care practices you can do at home.

Self-Massage Techniques:

1. Neck and Shoulder Relief: Using your fingertips, apply gentle pressure in circular motions along the base of your skull and down the sides of your neck. Continue to your shoulders, kneading any tight spots you find.

2. Hand Massage: Massage the palm of one hand with the thumb of the other, making small circular motions. Work your way from the center of your palm outward, then massage each finger from base to tip.

3. Foot Massage: Sit comfortably and rest one foot on the opposite thigh. Use your thumbs to massage the sole of your foot, applying pressure from heel to toe. Pay special attention to the arch of your foot.`,
        published: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: "choosing-massage-type",
        title: "How to Choose the Right Massage Type for Your Needs",
        content: `With numerous massage modalities available, choosing the right one for your specific needs can be overwhelming. This guide will help you understand the different types of massage we offer at Peaceful Path Massage and which might be best suited for your situation.

Swedish Massage:
Best for: First-time massage clients, stress relief, general relaxation

Swedish massage is the foundation of most massage techniques. It involves long, flowing strokes, kneading, and circular movements on the superficial layers of muscles. This gentle approach is perfect for those new to massage or anyone seeking relaxation and stress relief.

Deep Tissue Massage:
Best for: Chronic pain, muscle tension, rehabilitation from injury

Deep tissue massage targets the deeper layers of muscle and connective tissue. Using slower strokes and more direct deep pressure, this technique helps release chronic muscle tension and break up scar tissue. It's particularly effective for chronic aches and pains, such as a stiff neck, low back pain, or sore shoulders.`,
        published: true,
      },
    }),
  ])

  console.log("Seed data created successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
