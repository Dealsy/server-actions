import { Suspense } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UsersList from "@/components/UsersList";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";
import { NewUserDialog } from "@/components/NewUserDialog";

export default async function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Users Dashboard (Server Actions)
        </h1>
        <div />
        <NewUserDialog />
      </div>

      <section className="space-y-3">
        <SignedOut>
          <div className="rounded border bg-card p-6 text-sm text-muted-foreground">
            Please sign in to view and manage users.
          </div>
        </SignedOut>
        <SignedIn>
          <h2 className="text-lg font-medium">Users</h2>
          <Suspense fallback={<DashboardSkeleton />}>
            <UsersList />
          </Suspense>
        </SignedIn>
      </section>
    </>
  );
}
