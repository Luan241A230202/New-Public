import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  name: z.string().max(100).optional(),
  // bio: z.string().max(500).optional(),
  image: z.string().url().optional(),
  // banner: z.string().url().optional(),
});

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
        id: true,
        username: true,
        email: true,
        emailVerified: true,
        name: true,
        // bio: true,
        image: true,
        // banner: true,
        role: true,
        starBalance: true,
        createdAt: true,
        _count: {
          select: {
            videos: true,
            likes: true,
            comments: true,
            subscriptionsIn: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Failed to get profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = updateSchema.parse(body);

    // Check if username is already taken
    if (data.username) {
      const existing = await prisma.user.findFirst({
        where: {
          username: data.username,
          id: { not: userId },
        },
      });

      if (existing) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        username: true,
        name: true,
        // bio: true,
        image: true,
        // banner: true,
      },
    });

    return NextResponse.json({ ok: true, user: updatedUser });
  } catch (error: any) {
    console.error("Update profile error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
