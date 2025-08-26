"use server";

import { ROUTES } from "@/constants";
import { revalidatePath } from "next/cache";
import z from "zod";
import { prisma } from "@/lib/prisma";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  role: z.enum(["admin", "manager", "member"]),
  avatarUrl: z
    .url()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v)),
});

export async function createUserAction(formData: FormData) {
  const parsed = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    avatarUrl: formData.get("avatarUrl"),
  });
  if (!parsed.success) return;
  await prisma.user.create({ data: parsed.data });
  revalidatePath(ROUTES.DASHBOARD);
}

export async function updateUserAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const updates: {
    name?: string;
    email?: string;
    role?: "admin" | "manager" | "member";
    avatarUrl?: string | null;
  } = {};
  if (formData.get("name")) updates.name = String(formData.get("name"));
  if (formData.get("email")) updates.email = String(formData.get("email"));
  if (formData.get("role")) updates.role = String(formData.get("role")) as any;
  if (formData.get("avatarUrl") !== null) {
    const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();
    updates.avatarUrl = avatarUrl === "" ? null : avatarUrl;
  }
  await prisma.user.update({ where: { id }, data: updates });
  revalidatePath(ROUTES.DASHBOARD);
}

export async function deleteUserAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.user.delete({ where: { id } });
  revalidatePath(ROUTES.DASHBOARD);
}
