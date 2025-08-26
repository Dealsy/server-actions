"use server";

import { z } from "zod";

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
