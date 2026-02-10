import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  token: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = schema.parse(body);

    // Find user with this verification token
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerified: null,
      },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Mark email as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    });

    console.log(`Email verified for user ${user.email}`);

    return NextResponse.json({
      ok: true,
      message: "Email has been verified successfully",
    });
  } catch (error: any) {
    console.error("Verify email error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
}
