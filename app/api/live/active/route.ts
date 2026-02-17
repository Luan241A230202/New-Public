import { prisma } from "@/lib/prisma";

/**
 * GET /api/live/active
 * Get all currently active live streams
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
  const skip = (page - 1) * limit;

  const where: any = {
    status: "LIVE",
    endedAt: null,
  };

  if (category) {
    where.category = category;
  }

  const [liveStreams, total] = await Promise.all([
    prisma.liveStream.findMany({
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
        viewerCount: "desc",
      },
      skip,
      take: limit,
    }),
    prisma.liveStream.count({ where }),
  ]);

  return Response.json({
    liveStreams,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
