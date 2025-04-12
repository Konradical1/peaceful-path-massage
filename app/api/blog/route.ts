import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const page = Number.parseInt(request.nextUrl.searchParams.get("page") || "1")
    const limit = Number.parseInt(request.nextUrl.searchParams.get("limit") || "6")
    const skip = (page - 1) * limit

    const [blogPosts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where: {
          published: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.blogPost.count({
        where: {
          published: true,
        },
      }),
    ])

    // Transform the data to match the expected format
    const formattedPosts = blogPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.content.substring(0, 150) + "...",
      content: post.content,
      createdAt: post.createdAt,
    }))

    return NextResponse.json({
      posts: formattedPosts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
