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

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Password is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Verify password if string exists on account
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
    console.error('[LOGIN_ROUTE_ERROR]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Server error while attempting authentication.',
      },
      { status: 500 }
    );
  }
}