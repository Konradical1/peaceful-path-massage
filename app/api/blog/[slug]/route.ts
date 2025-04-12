import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    const blogPost = await prisma.blogPost.findUnique({
      where: {
        slug,
        published: true,
      },
    })

    if (!blogPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({
      slug: blogPost.slug,
      title: blogPost.title,
      content: blogPost.content,
      createdAt: blogPost.createdAt,
    })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}
