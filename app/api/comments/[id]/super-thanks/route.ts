import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { grantXp } from "@/lib/gamification/grantXp";

/**
 * POST /api/comments/[id]/super-thanks
 * Send Super Thanks to a comment (spending stars)
 * Body: { stars: number, anonymous?: boolean }
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
  const stars = body?.stars as number | undefined;
  const anonymous = Boolean(body?.anonymous);

  if (!stars || stars < 1 || stars > 100) {
    return Response.json(
      { error: "Stars must be between 1 and 100" },
      { status: 400 }
    );
  }

  const commentId = params.id;

  // Find the comment
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      video: {
        select: {
          id: true,
          authorId: true,
          deletedAt: true,
        },
      },
    },
  });

  if (!comment || comment.video.deletedAt) {
    return Response.json({ error: "Comment not found" }, { status: 404 });
  }

  // Can't send Super Thanks to your own comment
  if (comment.userId === userId) {
    return Response.json(
      { error: "Cannot send Super Thanks to your own comment" },
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

  // Create transaction and update comment
  const result = await prisma.$transaction(async (tx) => {
    // Deduct stars from sender
    await tx.user.update({
      where: { id: userId },
      data: { starsBalance: { decrement: stars } },
    });

    // Credit stars to comment author (if exists and not anonymous)
    if (comment.userId) {
      await tx.user.update({
        where: { id: comment.userId },
        data: { starsBalance: { increment: stars } },
      });
    }

    // Create star transaction record
    const starTx = await tx.starTransaction.create({
      data: {
        fromUserId: userId,
        toUserId: comment.userId ?? null,
        amount: stars,
        type: "SUPER_THANKS",
        status: "COMPLETED",
        note: JSON.stringify({
          commentId: comment.id,
          videoId: comment.videoId,
          anonymous,
        }),
      },
    });

    // Update comment with Super Thanks info
    const updatedComment = await tx.comment.update({
      where: { id: commentId },
      data: {
        isSuperThanks: true,
        superThanksStars: { increment: stars },
        superThanksQty: { increment: 1 },
        starTxId: starTx.id,
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    // Grant XP to sender for generosity
    if (stars >= 10) {
      grantXp({
        userId,
        sourceKey: `SUPER_THANKS:${starTx.id}`,
        amount: stars * 2, // 2 XP per star
        badgeKey: "GENEROUS_SUPPORTER",
        badgeName: "Generous Supporter",
        badgeDescription: "Tặng Super Thanks lần đầu",
        badgeIcon: "⭐",
        dailyKey: "SUPER_THANKS",
        dailyGoal: 1,
        dailyInc: 1,
      }).catch(() => {});
    }

    // Grant XP to comment author for receiving Super Thanks
    if (comment.userId && stars >= 10) {
      grantXp({
        userId: comment.userId,
        sourceKey: `RECEIVED_SUPER_THANKS:${starTx.id}`,
        amount: stars,
        badgeKey: "SUPER_CREATOR",
        badgeName: "Super Creator",
        badgeDescription: "Nhận Super Thanks lần đầu",
        badgeIcon: "🌟",
        dailyKey: "RECEIVED_SUPER_THANKS",
        dailyGoal: 3,
        dailyInc: 1,
      }).catch(() => {});
    }

    return { updatedComment, starTx };
  });

  return Response.json({
    success: true,
    comment: {
      id: result.updatedComment.id,
      isSuperThanks: result.updatedComment.isSuperThanks,
      superThanksStars: result.updatedComment.superThanksStars,
      superThanksQty: result.updatedComment.superThanksQty,
    },
    transactionId: result.starTx.id,
  });
}
