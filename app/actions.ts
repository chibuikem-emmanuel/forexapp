// app/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { DepositStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- AUTH ACTIONS ---

export async function registerUserAction(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const telegram = formData.get("telegram") as string;
  const service = formData.get("service") as string;

  if (!fullName || !email || !service) {
    throw new Error("Missing required fields.");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  const userCode = `USR-${Math.floor(1000 + Math.random() * 9000)}`;

  const user = await prisma.user.create({
    data: { userCode, fullName, email, telegram, service },
  });

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("session_user_id", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function loginUserAction(formData: FormData) {
  const email = formData.get("email") as string;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("No account found with that email address.");
  }

  const cookieStore = await cookies();
  cookieStore.set("session_user_id", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function logoutUserAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_user_id");
  redirect("/login");
}

// --- DEPOSIT ACTIONS ---

export async function createDepositAction(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_user_id")?.value;

  if (!userId) {
    throw new Error("Unauthorized. Please log in.");
  }

  const amountUsd = parseFloat(formData.get("amountUsd") as string);
  const coin = formData.get("coin") as string;
  const network = formData.get("network") as string;

  const reference = `DEP-${Math.floor(100000 + Math.random() * 900000)}`;

  await prisma.deposit.create({
    data: { reference, amountUsd, coin, network, userId, status: DepositStatus.PENDING },
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");
  redirect("/dashboard");
}

// --- ADMIN ACTIONS ---

export async function updateDepositStatusAction(depositId: string, status: DepositStatus) {
  await prisma.deposit.update({
    where: { id: depositId },
    data: { status },
  });

  revalidatePath("/admin");
  revalidatePath("/dashboard");
}