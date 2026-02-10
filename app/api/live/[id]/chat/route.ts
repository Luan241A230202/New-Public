import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

/**
 * POST /api/live/[id]/chat
 * Send a chat message in a live stream
 * Body: { message: string }
 */
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const message = body?.message as string | undefined;

  if (!message || message.trim().length === 0) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  if (message.length > 500) {
    return Response.json(
      { error: "Message too long (max 500 characters)" },
      { status: 400 }
    );
  }

  const liveStreamId = params.id;

  // Check if live stream exists and is active
  const liveStream = await prisma.liveStream.findUnique({
    where: { id: liveStreamId },
  });

  if (!liveStream) {
    return Response.json({ error: "Live stream not found" }, { status: 404 });
  }

  if (liveStream.status !== "LIVE" || liveStream.endedAt) {
    return Response.json(
      { error: "Live stream is not active" },
      { status: 400 }
    );
  }

  // Create chat message
  const chatMessage = await prisma.liveChatMessage.create({
    data: {
      liveStreamId,
      userId,
      message: message.trim(),
      isSuperChat: false,
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
    chatMessage,
  });
}

/**
 * GET /api/live/[id]/chat
 * Get chat messages for a live stream
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const liveStreamId = params.id;
  const since = searchParams.get("since"); // Timestamp to get messages after
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);

  const where: any = {
    liveStreamId,
    deletedAt: null,
  };

  if (since) {
    where.createdAt = {
      gt: new Date(since),
    };
  }

  const messages = await prisma.liveChatMessage.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  return Response.json({
    messages: messages.reverse(), // Reverse so oldest is first
    total: messages.length,
    liveStreamId,
  });
}
