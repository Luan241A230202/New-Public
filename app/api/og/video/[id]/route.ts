import { NextResponse } from "next/server";

// OG image generation temporarily disabled - TSX parsing issue
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: "OG image generation temporarily unavailable" },
    { status: 503 }
  );
}
