import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  format: z.enum(["CSV", "JSON"]).default("JSON"),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  action: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session)) {
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
    const where: any = {};
    
    if (parsed.data.action) where.action = parsed.data.action;
    if (parsed.data.dateFrom || parsed.data.dateTo) {
      where.createdAt = {};
      if (parsed.data.dateFrom) where.createdAt.gte = new Date(parsed.data.dateFrom);
      if (parsed.data.dateTo) where.createdAt.lte = new Date(parsed.data.dateTo);
    }

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Create export job
    const exportJob = await prisma.exportJob.create({
      data: {
        type: "AUDIT",
        status: "COMPLETED",
        format: parsed.data.format,
        params: parsed.data,
        createdBy: (session.user as any).id,
        completedAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "AUDIT_EXPORT",
        resource: `export:${exportJob.id}`,
        details: { format: parsed.data.format, count: logs.length },
      },
    });

    let data: string;
    let contentType: string;

    if (parsed.data.format === "CSV") {
      // Generate CSV
      const headers = ["ID", "Timestamp", "User", "Action", "Resource", "IP", "UserAgent"];
      const rows = logs.map(log => [
        log.id,
        log.createdAt.toISOString(),
        log.user?.email || log.userId || "N/A",
        log.action,
        log.resource || "N/A",
        log.ipAddress || "N/A",
        log.userAgent || "N/A",
      ]);
      
      data = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
      contentType = "text/csv";
    } else {
      // Generate JSON
      data = JSON.stringify(logs, null, 2);
      contentType = "application/json";
    }

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="audit-logs-${Date.now()}.${parsed.data.format.toLowerCase()}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to export audit logs",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
