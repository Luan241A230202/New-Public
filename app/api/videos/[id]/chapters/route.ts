import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chapters = await prisma.videoChapter.findMany({
      where: { videoId: params.id },
      orderBy: { timestamp: "asc" }
    });

    return Response.json({ chapters });
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
