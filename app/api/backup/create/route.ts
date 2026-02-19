import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { queues } from "@/lib/queues";

const bodySchema = z.object({
  type: z.enum(["FULL", "INCREMENTAL", "MANUAL"]).default("MANUAL"),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session) || !session?.user) {
    return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
  }

  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const backup = await prisma.backup.create({
      data: {
        type: parsed.data.type,
        status: "PENDING",
        createdBy: (session.user as any).id,
      },
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "BACKUP_CREATE",
        resource: `backup:${backup.id}`,
        details: { type: parsed.data.type },
      },
    });

    // Queue backup job (in real implementation, this would trigger actual backup)
    // For MVP, we'll just mark it as completed immediately
    await prisma.backup.update({
      where: { id: backup.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        size: BigInt(0), // Placeholder
        location: `/backups/${backup.id}.tar.gz`,
      },
    });

    return NextResponse.json({
      success: true,
      data: { backupId: backup.id },
      message: "Backup created successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to create backup",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
