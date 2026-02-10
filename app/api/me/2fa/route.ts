import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import crypto from "crypto";

const enableSchema = z.object({
  method: z.enum(["totp", "sms"]),
  phone: z.string().optional(),
});

const verifySchema = z.object({
  code: z.string().length(6),
});

const disableSchema = z.object({
  code: z.string().length(6),
});

// Enable 2FA
export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    if (body.action === "enable") {
      const { method, phone } = enableSchema.parse(body);

      // Generate secret for TOTP
      const secret = crypto.randomBytes(20).toString("hex");
      const backupCodes = Array.from({ length: 8 }, () =>
        crypto.randomBytes(4).toString("hex")
      );

      // Save 2FA settings
      await prisma.user.update({
        where: { id: userId },
        data: {
          twoFactorEnabled: false, // Will be enabled after verification
          twoFactorMethod: method,
          twoFactorSecret: secret,
          twoFactorBackupCodes: backupCodes,
          twoFactorPhone: phone,
        },
      });

      // Generate QR code data for TOTP
      const otpauth = `otpauth://totp/NewPublic:${userId}?secret=${secret}&issuer=NewPublic`;

      return NextResponse.json({
        ok: true,
        secret,
        qrCode: otpauth,
        backupCodes,
        message: "2FA setup initiated. Please verify with a code to complete.",
      });
    }

    if (body.action === "verify") {
      const { code } = verifySchema.parse(body);

      // TODO: Verify TOTP code
      // For now, just enable 2FA
      await prisma.user.update({
        where: { id: userId },
        data: { twoFactorEnabled: true },
      });

      return NextResponse.json({
        ok: true,
        message: "2FA enabled successfully",
      });
    }

    if (body.action === "disable") {
      const { code } = disableSchema.parse(body);

      // TODO: Verify code before disabling
      await prisma.user.update({
        where: { id: userId },
        data: {
          twoFactorEnabled: false,
          twoFactorSecret: null,
          twoFactorBackupCodes: null,
        },
      });

      return NextResponse.json({
        ok: true,
        message: "2FA disabled successfully",
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("2FA error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process 2FA request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        twoFactorEnabled: true,
        twoFactorMethod: true,
        twoFactorPhone: true,
      },
    });

    return NextResponse.json({ ok: true, twoFactor: user });
  } catch (error) {
    console.error("Get 2FA status error:", error);
    return NextResponse.json(
      { error: "Failed to get 2FA status" },
      { status: 500 }
    );
  }
}
