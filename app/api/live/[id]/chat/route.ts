import { auth } from "@/lib/auth";

/**
 * POST /api/live/[id]/chat
 * Send a chat message in a live stream
 * Body: { message: string }
 * 
 * NOTE: Live streaming feature is not yet implemented in database schema
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

  // Live streaming feature not yet implemented in database
  return Response.json(
    { error: "Live streaming feature not yet available" },
    { status: 501 } // Not Implemented
  );
}

/**
 * GET /api/live/[id]/chat
 * Get chat messages for a live stream
 * 
 * NOTE: Live streaming feature is not yet implemented in database schema
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Live streaming feature not yet implemented in database
  return Response.json(
    { error: "Live streaming feature not yet available" },
    { status: 501 } // Not Implemented
  );
}
