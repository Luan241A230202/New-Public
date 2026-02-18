import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  backupId: z.string(),
  confirmationToken: z.string().min(10),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
  }

  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload. Requires backupId and confirmationToken" }, { status: 400 });
  }

  try {
    const backup = await prisma.backup.findUnique({
      where: { id: parsed.data.backupId },
    });

    if (!backup) {
      return NextResponse.json({ error: "Backup not found" }, { status: 404 });
    }

    if (backup.status !== "COMPLETED") {
      return NextResponse.json({ error: "Backup not completed" }, { status: 400 });
    }

    // Verify confirmation token (in real implementation, this would be generated and validated)
    // For MVP, we just check if it's long enough
    if (parsed.data.confirmationToken.length < 10) {
      return NextResponse.json({ error: "Invalid confirmation token" }, { status: 400 });
    }

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "BACKUP_RESTORE",
        resource: `backup:${backup.id}`,
        details: { backupId: backup.id, confirmationToken: parsed.data.confirmationToken },
      },
    });

    // In real implementation, this would trigger restore process
    // For MVP, we just return success
    return NextResponse.json({
      success: true,
      data: { backupId: backup.id },
      message: "Restore initiated. This is a placeholder - actual restore not implemented",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to restore backup",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
