import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: params.slug },
          { id: params.slug }
        ]
      },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
        createdAt: true,
        _count: {
          select: {
            videos: { where: { status: "PUBLISHED" } },
            subscriptionsIn: true
          }
        }
      }
    });

    if (!user) {
      return Response.json({ error: "Channel not found" }, { status: 404 });
    }

    // Get channel videos
    const videos = await prisma.video.findMany({
      where: {
        authorId: user.id,
        status: "PUBLISHED"
      },
      take: 20,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        thumbKey: true,
        durationSec: true,
        viewCount: true,
        createdAt: true
      }
    });

    return Response.json({
      channel: {
        ...user,
        subscriberCount: user._count.subscriptionsIn,
        videoCount: user._count.videos
      },
      videos
    });
  } catch (error) {
    console.error("Error fetching channel:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
