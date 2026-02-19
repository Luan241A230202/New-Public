import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { grantXp } from "@/lib/gamification/grantXp";

/**
 * POST /api/videos/[id]/gift
 * Send a virtual gift to video creator
 * Body: { giftId: string, quantity?: number, anonymous?: boolean }
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
  const giftId = body?.giftId as string | undefined;
  const quantity = Math.max(1, body?.quantity || 1);
  const anonymous = Boolean(body?.anonymous);

  if (!giftId) {
    return Response.json({ error: "Gift ID is required" }, { status: 400 });
  }

  const videoId = params.id;

  // Check if video exists
  const video = await prisma.video.findUnique({
    where: { id: videoId },
    include: {
      author: { select: { id: true, name: true } },
    },
  });

  if (!video || video.deletedAt) {
    return Response.json({ error: "Video not found" }, { status: 404 });
  }

  // Can't send gift to your own video
  if (video.authorId === userId) {
    return Response.json(
      { error: "Cannot send gift to your own video" },
      { status: 400 }
    );
  }

  // Get gift catalog (hardcoded for now)
  const giftCatalog: Record<string, { name: string; price: number; icon: string; tier: string }> = {
    rose: { name: "Rose", price: 10, icon: "🌹", tier: "bronze" },
    heart: { name: "Heart", price: 20, icon: "❤️", tier: "silver" },
    trophy: { name: "Trophy", price: 50, icon: "🏆", tier: "gold" },
    crown: { name: "Crown", price: 100, icon: "👑", tier: "platinum" },
    diamond: { name: "Diamond", price: 200, icon: "💎", tier: "diamond" },
    rocket: { name: "Rocket", price: 30, icon: "🚀", tier: "silver" },
    fire: { name: "Fire", price: 40, icon: "🔥", tier: "gold" },
    star: { name: "Star", price: 15, icon: "⭐", tier: "bronze" },
    gift: { name: "Gift Box", price: 25, icon: "🎁", tier: "silver" },
    cake: { name: "Cake", price: 35, icon: "🎂", tier: "gold" },
    balloon: { name: "Balloon", price: 12, icon: "🎈", tier: "bronze" },
    confetti: { name: "Confetti", price: 45, icon: "🎉", tier: "gold" },
  };

  const gift = giftCatalog[giftId];
  if (!gift) {
    return Response.json({ error: "Invalid gift ID" }, { status: 400 });
  }

  const totalCost = gift.price * quantity;

  // Check user has enough stars
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { starBalance: true },
  });

  if (!user || (user.starBalance ?? 0) < totalCost) {
    return Response.json(
      { error: "Insufficient stars balance" },
      { status: 400 }
    );
  }

  // Create transaction
  const result = await prisma.$transaction(async (tx) => {
    // Deduct stars from sender
    await tx.user.update({
      where: { id: userId },
      data: { starBalance: { decrement: totalCost } },
    });

    // Credit stars to video creator (if exists)
    if (video.authorId) {
      await tx.user.update({
        where: { id: video.authorId },
        data: { starBalance: { increment: totalCost } },
      });
    }

    // Create star transaction record (debit from sender)
    const starTx = await tx.starTransaction.create({
      data: {
        userId: userId,
        delta: -totalCost,
        type: "GIFT",
        stars: totalCost,
        videoId: video.id,
        giftId,
        note: JSON.stringify({
          giftName: gift.name,
          quantity,
          anonymous,
          recipientId: video.authorId,
        }),
      },
    });

    return starTx;
  });

  // Grant XP to sender
  if (totalCost >= 20) {
    grantXp({
      userId,
      sourceKey: `GIFT:${result.id}`,
      amount: totalCost,
      badgeKey: "GENEROUS_GIFTER",
      badgeName: "Generous Gifter",
      badgeDescription: "Tặng quà cho creator",
      badgeIcon: "🎁",
      dailyKey: "GIFTS_SENT",
      dailyGoal: 5,
      dailyInc: quantity,
    }).catch(() => {});
  }

  // Grant XP to receiver (if author exists)
  if (video.authorId) {
    grantXp({
      userId: video.authorId,
      sourceKey: `RECEIVED_GIFT:${result.id}`,
      amount: totalCost / 2,
      badgeKey: "POPULAR_CREATOR",
      badgeName: "Popular Creator",
      badgeDescription: "Nhận quà từ fans",
      badgeIcon: "🌟",
      dailyKey: "GIFTS_RECEIVED",
      dailyGoal: 10,
      dailyInc: quantity,
    }).catch(() => {});
  }

  return Response.json({
    success: true,
    transaction: result,
    gift: {
      ...gift,
      quantity,
      totalCost,
    },
    message: `Sent ${quantity}x ${gift.name} to ${video.author.name}`,
  });
}
