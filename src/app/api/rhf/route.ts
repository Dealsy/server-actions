import { NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export async function POST(request: Request) {
  let json: unknown = null;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const result = formSchema.safeParse(json);
  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid input", issues: result.error.issues },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const { username, email } = result.data;

  const user = {
    id: Math.random().toString(36).slice(2, 10),
    username,
    email,
  };

  return NextResponse.json({ ok: true, user });
}
