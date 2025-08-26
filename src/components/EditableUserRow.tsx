"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Pencil } from "lucide-react";
import { StatusSelectField } from "./StatusSelectField";
import { updateUserAction, deleteUserAction } from "@/../actions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";

export type UIUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  avatarUrl: string | null;
  createdAt: Date;
};

export function EditableUserRow({ user }: { user: UIUser }) {
  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <DialogClose asChild>
        <Button type="submit" className="gap-1" disabled={pending}>
          <Pencil className="size-4" /> {pending ? "Saving..." : "Save changes"}
        </Button>
      </DialogClose>
    );
  }

  function ConfirmDeleteButton() {
    const { pending } = useFormStatus();
    return (
      <DialogClose asChild>
        <Button
          type="submit"
          variant="destructive"
          size="sm"
          disabled={pending}
        >
          {pending ? "Deleting..." : "Delete"}
        </Button>
      </DialogClose>
    );
  }

  return (
    <Dialog>
      <div className="border rounded p-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar>
              {user.avatarUrl ? (
                <AvatarImage alt={user.name} src={user.avatarUrl} />
              ) : (
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="min-w-0">
              <div className="font-medium leading-tight truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-500">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 items-center min-w-0">
            <div className="truncate flex items-center gap-2 text-sm text-gray-600">
              <Mail className="size-4 opacity-60" />
              <span className="truncate">{user.email}</span>
            </div>
            <div>
              {(() => {
                const roleTone: Record<UIUser["role"], string> = {
                  admin: "bg-red-50 text-red-700 border-red-200",
                  manager: "bg-blue-50 text-blue-700 border-blue-200",
                  member: "bg-emerald-50 text-emerald-700 border-emerald-200",
                };
                return (
                  <span
                    className={
                      "inline-flex items-center rounded-md border px-2 py-1 text-xs capitalize " +
                      roleTone[user.role]
                    }
                  >
                    {user.role}
                  </span>
                );
              })()}
            </div>
            <div className="truncate text-sm text-gray-600">
              {user.avatarUrl ? (
                <a
                  className="underline underline-offset-2"
                  href={user.avatarUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Avatar URL
                </a>
              ) : (
                "—"
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="gap-1 bg-yellow-400 hover:bg-yellow-500"
              >
                <Pencil className="size-4" />
              </Button>
            </DialogTrigger>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="gap-1 hover:bg-red-500"
                >
                  <Trash2 className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete user</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete{" "}
                    <span className="font-medium">{user.name}</span> and remove
                    their data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <form
                  action={deleteUserAction}
                  className="flex items-center justify-end gap-2"
                >
                  <input type="hidden" name="id" value={user.id} />
                  <DialogClose asChild>
                    <Button type="button" variant="outline" size="sm">
                      Cancel
                    </Button>
                  </DialogClose>
                  <ConfirmDeleteButton />
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <DialogContent>
        <DialogHeader className="flex gap-4">
          <div className="flex flex-row items-center gap-3">
            <Avatar className="size-12">
              {user.avatarUrl ? (
                <AvatarImage alt={user.name} src={user.avatarUrl} />
              ) : (
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>
            <DialogTitle>Edit user</DialogTitle>
          </div>

          <DialogDescription>Update the user details below.</DialogDescription>
        </DialogHeader>
        <form action={updateUserAction as any} className="grid gap-4">
          <input type="hidden" name="id" value={user.id} />
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`name-${user.id}`}>Full name</Label>
                <Input
                  id={`name-${user.id}`}
                  name="name"
                  defaultValue={user.name}
                  placeholder="Full name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`email-${user.id}`}>Email</Label>
                <div className="relative">
                  <Input
                    id={`email-${user.id}`}
                    name="email"
                    type="email"
                    defaultValue={user.email}
                    placeholder="Email"
                  />
                  <Mail className="size-4 absolute right-2 top-2.5 opacity-50" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`role-${user.id}`}>Role</Label>
                <StatusSelectField
                  name="role"
                  defaultValue={user.role}
                  options={["admin", "manager", "member"]}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`avatar-${user.id}`}>Avatar URL</Label>
                <Input
                  id={`avatar-${user.id}`}
                  name="avatarUrl"
                  defaultValue={user.avatarUrl ?? ""}
                  placeholder="Avatar URL (optional)"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-5">
            <SubmitButton />
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
