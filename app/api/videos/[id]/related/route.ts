import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id;
    
    // Get current video to match related videos by tags/category
    const currentVideo = await prisma.video.findUnique({
      where: { id: videoId },
      select: { tags: true, category: true }
    });

    if (!currentVideo) {
      return Response.json({ error: "Video not found" }, { status: 404 });
    }

    // Find related videos
    const relatedVideos = await prisma.video.findMany({
      where: {
        AND: [
          { id: { not: videoId } },
          { status: "PUBLISHED" },
          {
            OR: [
              { category: currentVideo.category },
              { tags: { hasSome: currentVideo.tags } }
            ]
          }
        ]
      },
      take: 12,
      orderBy: { viewCount: "desc" },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        duration: true,
        viewCount: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      }
    });

    return Response.json({ videos: relatedVideos });
  } catch (error) {
    console.error("Error fetching related videos:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
