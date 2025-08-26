"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type ActionState = {
  ok: boolean;
  message?: string | null;
  errors?: Partial<
    Record<"username" | "email" | "password" | "confirmPassword", string>
  >;
  user?: { id: string; username: string; email: string } | null;
};

const schema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export async function signupAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const values = {
    username: String(formData.get("username") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };

  const result = schema.safeParse(values);

  if (!result.success) {
    const fieldErrors: ActionState["errors"] = {};
    for (const issue of result.error.issues) {
      const path = issue.path[0];
      if (path && typeof path === "string") {
        fieldErrors[path as keyof NonNullable<ActionState["errors"]>] =
          issue.message;
      }
    }
    return {
      ok: false,
      message: "Please fix the errors",
      errors: fieldErrors,
      user: null,
    };
  }

  await new Promise((r) => setTimeout(r, 400));

  const { username, email } = result.data;
  return {
    ok: true,
    message: `Welcome, ${username}!`,
    errors: {},
    user: { id: Math.random().toString(36).slice(2, 10), username, email },
  };
}

// Users CRUD actions
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["admin", "manager", "member"]),
  avatarUrl: z
    .string()
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
  revalidatePath("/dashboard");
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
    const v = String(formData.get("avatarUrl") ?? "").trim();
    updates.avatarUrl = v === "" ? null : v;
  }
  await prisma.user.update({ where: { id }, data: updates });
  revalidatePath("/dashboard");
}

export async function deleteUserAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.user.delete({ where: { id } });
  revalidatePath("/dashboard");
}
