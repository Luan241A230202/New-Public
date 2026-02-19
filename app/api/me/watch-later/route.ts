import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const watchLater = await prisma.watchLater.findMany({
      where: { userId: session.user.id },
      include: {
        video: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            duration: true,
            viewCount: true,
            createdAt: true,
            user: {
              select: {
                username: true,
                displayName: true,
                avatar: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return Response.json({ videos: watchLater.map(w => w.video) });
  } catch (error) {
    console.error("Error fetching watch later:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { videoId } = await req.json();

    const watchLater = await prisma.watchLater.create({
      data: {
        userId: session.user.id,
        videoId
      }
    });

    return Response.json({ success: true, watchLater });
  } catch (error) {
    console.error("Error adding to watch later:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");

    if (!videoId) {
      return Response.json({ error: "Video ID required" }, { status: 400 });
    }

    await prisma.watchLater.deleteMany({
      where: {
        userId: session.user.id,
        videoId
      }
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error removing from watch later:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
