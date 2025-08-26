import { Skeleton } from "../ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="grid gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border rounded p-3 grid gap-2">
          <Skeleton className="h-4 w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
