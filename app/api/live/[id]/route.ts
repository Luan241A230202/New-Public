import { prisma } from "@/lib/prisma";

/**
 * GET /api/live/[id]
 * Get live stream info
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const liveStreamId = params.id;

  const liveStream = await prisma.liveStream.findUnique({
    where: { id: liveStreamId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          bio: true,
        },
      },
    },
  });

  if (!liveStream) {
    return Response.json({ error: "Live stream not found" }, { status: 404 });
  }

  // Increment viewer count if stream is live
  if (liveStream.status === "LIVE" && !liveStream.endedAt) {
    await prisma.liveStream.update({
      where: { id: liveStreamId },
      data: { viewerCount: { increment: 1 } },
    });
  }

  return Response.json({
    liveStream: {
      ...liveStream,
      viewerCount: liveStream.viewerCount + 1,
    },
  });
}
