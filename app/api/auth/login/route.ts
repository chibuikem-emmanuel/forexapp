import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Compare stored password if set
    if (user.password && user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        userCode: user.userCode,
        fullName: user.fullName,
        email: user.email,
        service: user.service,
        balance: user.balance,
      },
    });
  } catch (error: any) {
    console.error('[LOGIN_API_ERROR]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Database connection error during login.',
      },
      { status: 500 }
    );
  }
}