import { Suspense } from "react";
import { createUserAction } from "@/../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UsersList from "@/components/UsersList";
import { StatusSelectField } from "@/components/StatusSelectField";
import { Label } from "@/components/ui/label";
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
import { UserPlus } from "lucide-react";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";

export default async function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Users Dashboard (Server Actions)
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="size-4" /> Add user
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New user</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new user.
              </DialogDescription>
            </DialogHeader>
            <form action={createUserAction as any} className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="create-name">Full name</Label>
                  <Input
                    id="create-name"
                    name="name"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="create-email">Email</Label>
                  <Input
                    id="create-email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="create-role">Role</Label>
                  <StatusSelectField
                    name="role"
                    defaultValue="member"
                    options={["admin", "manager", "member"]}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="create-avatar">Avatar URL</Label>
                  <Input
                    id="create-avatar"
                    name="avatarUrl"
                    placeholder="Avatar URL (optional)"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Create user</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Users</h2>
        <Suspense fallback={<DashboardSkeleton />}>
          <UsersList />
        </Suspense>
      </section>
    </>
  );
}
