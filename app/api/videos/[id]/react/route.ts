import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

/**
 * POST /api/videos/[id]/react
 * Add or update reaction to a video
 * Body: { type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry' | 'fire' | 'star' }
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
  const type = body?.type as string | undefined;

  const validTypes = ['like', 'love', 'haha', 'wow', 'sad', 'angry', 'fire', 'star'];
  if (!type || !validTypes.includes(type)) {
    return Response.json(
      { error: `Reaction type must be one of: ${validTypes.join(', ')}` },
      { status: 400 }
    );
  }

  const videoId = params.id;

  // Check if video exists
  const video = await prisma.video.findUnique({
    where: { id: videoId },
    select: { id: true, deletedAt: true },
  });

  if (!video || video.deletedAt) {
    return Response.json({ error: "Video not found" }, { status: 404 });
  }

  // Check if user already has a reaction on this video
  const existingReaction = await prisma.reaction.findUnique({
    where: {
      videoId_userId: {
        videoId,
        userId,
      },
    },
  });

  if (existingReaction) {
    // Update existing reaction
    const updated = await prisma.reaction.update({
      where: { id: existingReaction.id },
      data: { type },
    });

    return Response.json({
      success: true,
      reaction: updated,
      message: "Reaction updated",
    });
  } else {
    // Create new reaction
    const created = await prisma.reaction.create({
      data: {
        videoId,
        userId,
        type,
      },
    });

    return Response.json({
      success: true,
      reaction: created,
      message: "Reaction added",
    });
  }
}

/**
 * DELETE /api/videos/[id]/react
 * Remove reaction from a video
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videoId = params.id;

  const reaction = await prisma.reaction.findUnique({
    where: {
      videoId_userId: {
        videoId,
        userId,
      },
    },
  });

  if (!reaction) {
    return Response.json({ error: "Reaction not found" }, { status: 404 });
  }

  await prisma.reaction.delete({
    where: { id: reaction.id },
  });

  return Response.json({
    success: true,
    message: "Reaction removed",
  });
}
