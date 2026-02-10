import { prisma } from "@/lib/prisma";

/**
 * GET /api/videos/[id]/reactions
 * Get reaction counts for a video
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const videoId = params.id;

  // Check if video exists
  const video = await prisma.video.findUnique({
    where: { id: videoId },
    select: { id: true, deletedAt: true },
  });

  if (!video || video.deletedAt) {
    return Response.json({ error: "Video not found" }, { status: 404 });
  }

  // Get reaction counts grouped by type
  const reactions = await prisma.reaction.groupBy({
    by: ['type'],
    where: { videoId },
    _count: {
      id: true,
    },
  });

  // Transform to a more usable format
  const reactionCounts: Record<string, number> = {};
  reactions.forEach((r) => {
    reactionCounts[r.type] = r._count.id;
  });

  // Ensure all reaction types are present (even if 0)
  const allTypes = ['like', 'love', 'haha', 'wow', 'sad', 'angry', 'fire', 'star'];
  allTypes.forEach((type) => {
    if (!reactionCounts[type]) {
      reactionCounts[type] = 0;
    }
  });

  const total = Object.values(reactionCounts).reduce((sum, count) => sum + count, 0);

  return Response.json({
    reactions: reactionCounts,
    total,
    videoId,
  });
}
