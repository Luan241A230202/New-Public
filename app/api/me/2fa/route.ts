import { NextResponse } from "next/server";

// 2FA feature not yet implemented in database schema
export async function GET(req: Request) {
  return NextResponse.json(
    { error: "2FA feature not yet available" },
    { status: 501 }
  );
}

export async function POST(req: Request) {
  return NextResponse.json(
    { error: "2FA feature not yet available" },
    { status: 501 }
  );
}

export async function DELETE(req: Request) {
  return NextResponse.json(
    { error: "2FA feature not yet available" },
    { status: 501 }
  );
}
