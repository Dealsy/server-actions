import { createUserAction } from "@/server/dashboard-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export function NewUserDialog() {
  return (
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
        <form action={createUserAction} className="grid gap-4">
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
  );
}
