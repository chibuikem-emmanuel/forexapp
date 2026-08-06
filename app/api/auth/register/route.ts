import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const fullName = body.fullName || body.name;
    const service = body.service || "STANDARD";
    const telegram = body.telegram || null;

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Full name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email address already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCode = `LF-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        userCode,
        service,
        telegram,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        userCode: true,
        service: true,
        telegram: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[AUTH_REGISTER_ERROR]:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}