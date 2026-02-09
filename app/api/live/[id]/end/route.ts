import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

/**
 * POST /api/live/[id]/end
 * End a live stream
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

  const liveStreamId = params.id;

  const liveStream = await prisma.liveStream.findUnique({
    where: { id: liveStreamId },
  });

  if (!liveStream) {
    return Response.json({ error: "Live stream not found" }, { status: 404 });
  }

  if (liveStream.userId !== userId) {
    return Response.json(
      { error: "You can only end your own live stream" },
      { status: 403 }
    );
  }

  if (liveStream.endedAt) {
    return Response.json(
      { error: "Live stream already ended" },
      { status: 400 }
    );
  }

  // End the live stream
  const updated = await prisma.liveStream.update({
    where: { id: liveStreamId },
    data: {
      status: "ENDED",
      endedAt: new Date(),
    },
  });

  return Response.json({
    success: true,
    liveStream: updated,
    message: "Live stream ended successfully",
  });
}
