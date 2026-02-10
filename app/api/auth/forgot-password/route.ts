import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import crypto from "crypto";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = await rateLimit(`forgot-password:${ip}`, 3, 300_000); // 3 requests per 5 minutes
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email } = schema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, username: true },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        ok: true,
        message: "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Save token to database
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: resetToken,
        expiresAt: resetTokenExpiry,
      },
    });

    // TODO: Send email with reset link
    // const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;
    // await sendEmail({
    //   to: user.email,
    //   subject: "Reset your password",
    //   html: `Click here to reset your password: ${resetUrl}`,
    // });

    console.log(`Password reset requested for ${user.email}`);
    console.log(`Reset token: ${resetToken}`);

    return NextResponse.json({
      ok: true,
      message: "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
