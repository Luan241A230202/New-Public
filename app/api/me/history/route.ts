import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const history = await prisma.videoView.findMany({
      where: { userId: session.user.id },
      include: {
        video: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            duration: true,
            viewCount: true,
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
      orderBy: { viewedAt: "desc" },
      take: 50
    });

    return Response.json({ history });
  } catch (error) {
    console.error("Error fetching history:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.videoView.deleteMany({
      where: { userId: session.user.id }
    });

    return Response.json({ success: true, message: "History cleared" });
  } catch (error) {
    console.error("Error clearing history:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
