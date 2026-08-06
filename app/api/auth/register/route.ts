import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password, telegram, service, capitalPlan } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: 'Full name and email are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists.' },
        { status: 400 }
      );
    }

    // Auto-generate unique user code
    const userCode = `FX-${Math.floor(10000 + Math.random() * 90000)}`;

    // Create user in DB
    const user = await prisma.user.create({
      data: {
        userCode,
        fullName,
        email: cleanEmail,
        password: password || '',
        telegram: telegram || null,
        service: service || capitalPlan || 'Standard',
        balance: 0,
      },
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      userCode: user.userCode,
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
    console.error('[REGISTER_API_ERROR]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Database error while registering account.',
      },
      { status: 500 }
    );
  }
}