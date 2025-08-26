"use client";

import { startTransition, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupAction } from "@/../actions";

type ActionState = {
  ok: boolean;
  message?: string | null;
  errors?: Partial<
    Record<"username" | "email" | "password" | "confirmPassword", string>
  >;
  user?: { id: string; username: string; email: string } | null;
};

const initialState: ActionState = {
  ok: false,
  message: null,
  errors: {},
  user: null,
};

export default function ServerActionsSignupPage() {
  const [state, formAction] = useActionState(signupAction, initialState);

  return (
    <div className="max-w-md mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Sign up (Server Actions + Zod)</h1>
      <p className="text-sm text-gray-500">
        Same UI as the RHF demo, but using a native form and a server action.
      </p>

      <form action={formAction} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Username
          </label>
          <Input id="username" name="username" placeholder="Username" />
          {state.errors?.username && (
            <p className="mt-1 text-sm text-red-600">{state.errors.username}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <Input id="email" name="email" type="email" placeholder="Email" />
          {state.errors?.email && (
            <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {state.errors?.password && (
            <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />
          {state.errors?.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <SubmitButton />
          <Button
            variant="outline"
            onClick={() => {
              startTransition(() => {
                formAction(new FormData());
              });
            }}
          >
            <p>Reset</p>
          </Button>
        </div>

        {state.message && (
          <div className="rounded border p-3 text-sm mt-2">{state.message}</div>
        )}
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create account"}
    </Button>
  );
}
