import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { grantXp } from "@/lib/gamification/grantXp";

/**
 * POST /api/live/[id]/super-chat
 * Send a Super Chat message in a live stream (costs stars)
 * Body: { message: string, stars: number }
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
  const stars = body?.stars as number | undefined;

  if (!message || message.trim().length === 0) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  if (message.length > 200) {
    return Response.json(
      { error: "Super Chat message too long (max 200 characters)" },
      { status: 400 }
    );
  }

  // Super Chat tier thresholds
  const tiers = {
    bronze: 10,
    silver: 50,
    gold: 100,
    platinum: 250,
    diamond: 500,
  };

  if (!stars || stars < tiers.bronze) {
    return Response.json(
      { error: `Minimum stars for Super Chat is ${tiers.bronze}` },
      { status: 400 }
    );
  }

  const liveStreamId = params.id;

  // Check if live stream exists and is active
  const liveStream = await prisma.liveStream.findUnique({
    where: { id: liveStreamId },
    include: {
      user: { select: { id: true, name: true } },
    },
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

  // Can't send Super Chat to your own stream
  if (liveStream.userId === userId) {
    return Response.json(
      { error: "Cannot send Super Chat to your own stream" },
      { status: 400 }
    );
  }

  // Check user has enough stars
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { starsBalance: true },
  });

  if (!user || (user.starsBalance ?? 0) < stars) {
    return Response.json(
      { error: "Insufficient stars balance" },
      { status: 400 }
    );
  }

  // Determine tier
  let tier = "bronze";
  if (stars >= tiers.diamond) tier = "diamond";
  else if (stars >= tiers.platinum) tier = "platinum";
  else if (stars >= tiers.gold) tier = "gold";
  else if (stars >= tiers.silver) tier = "silver";

  // Create transaction
  const result = await prisma.$transaction(async (tx) => {
    // Deduct stars from sender
    await tx.user.update({
      where: { id: userId },
      data: { starsBalance: { decrement: stars } },
    });

    // Credit stars to streamer
    await tx.user.update({
      where: { id: liveStream.userId },
      data: { starsBalance: { increment: stars } },
    });

    // Create star transaction record
    const starTx = await tx.starTransaction.create({
      data: {
        fromUserId: userId,
        toUserId: liveStream.userId,
        amount: stars,
        type: "SUPER_CHAT",
        status: "COMPLETED",
        note: JSON.stringify({
          liveStreamId: liveStream.id,
          message,
          tier,
        }),
      },
    });

    // Create Super Chat message
    const chatMessage = await tx.liveChatMessage.create({
      data: {
        liveStreamId,
        userId,
        message: message.trim(),
        isSuperChat: true,
        superChatStars: stars,
        superChatTier: tier,
        starTxId: starTx.id,
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

    return { starTx, chatMessage };
  });

  // Grant XP to sender
  if (stars >= 50) {
    grantXp({
      userId,
      sourceKey: `SUPER_CHAT:${result.starTx.id}`,
      amount: stars * 2,
      badgeKey: "SUPER_CHATTER",
      badgeName: "Super Chatter",
      badgeDescription: "Gửi Super Chat lần đầu",
      badgeIcon: "💬",
      dailyKey: "SUPER_CHAT",
      dailyGoal: 3,
      dailyInc: 1,
    }).catch(() => {});
  }

  // Grant XP to streamer
  grantXp({
    userId: liveStream.userId,
    sourceKey: `RECEIVED_SUPER_CHAT:${result.starTx.id}`,
    amount: stars,
    badgeKey: "POPULAR_STREAMER",
    badgeName: "Popular Streamer",
    badgeDescription: "Nhận Super Chat lần đầu",
    badgeIcon: "🎬",
    dailyKey: "RECEIVED_SUPER_CHAT",
    dailyGoal: 10,
    dailyInc: 1,
  }).catch(() => {});

  return Response.json({
    success: true,
    chatMessage: result.chatMessage,
    tier,
    message: `Sent ${stars} stars Super Chat to ${liveStream.user.name}`,
  });
}
