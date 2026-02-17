import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

/**
 * POST /api/live/create
 * Create a new live stream
 * Body: { title: string, description?: string, category?: string, thumbnailUrl?: string }
 */
export async function POST(req: Request) {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const title = body?.title as string | undefined;
  const description = body?.description as string | undefined;
  const category = body?.category as string | undefined;
  const thumbnailUrl = body?.thumbnailUrl as string | undefined;

  if (!title || title.trim().length === 0) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  // Check if user already has an active live stream
  const existingLive = await prisma.liveStream.findFirst({
    where: {
      userId,
      endedAt: null,
    },
  });

  if (existingLive) {
    return Response.json(
      { error: "You already have an active live stream" },
      { status: 400 }
    );
  }

  // Create live stream
  const liveStream = await prisma.liveStream.create({
    data: {
      userId,
      title: title.trim(),
      description: description?.trim() || null,
      category: category || null,
      thumbnailUrl: thumbnailUrl || null,
      status: "LIVE",
      viewerCount: 0,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return Response.json({
    success: true,
    liveStream,
    streamKey: `live_${liveStream.id}`, // In production, generate secure stream key
    rtmpUrl: `rtmp://live.yoursite.com/live`, // Replace with actual RTMP server
  });
}
