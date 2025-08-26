import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProjectAction, deleteProjectAction } from "@/../actions";
import { StatusSelectField } from "./StatusSelectField";

type UIProject = {
  id: string;
  name: string;
  ownerEmail: string;
  budgetUsd: number;
  status: "active" | "paused" | "archived";
  createdAt: Date;
};

export default async function ProjectsList() {
  const projects = (await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  })) as UIProject[];

  return (
    <div className="grid gap-3">
      {projects.map(
        ({ id, name, ownerEmail, budgetUsd, status, createdAt }) => (
          <div key={id} className="border rounded p-3 grid gap-2">
            <div className="text-sm text-gray-500">
              Created {new Date(createdAt).toLocaleString()}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
              <form action={updateProjectAction} className="contents">
                <input type="hidden" name="id" value={id} />
                <Input name="name" defaultValue={name ?? ""} />
                <Input
                  name="ownerEmail"
                  type="email"
                  defaultValue={ownerEmail ?? ""}
                />
                <Input
                  name="budgetUsd"
                  type="number"
                  inputMode="numeric"
                  defaultValue={budgetUsd}
                />
                <StatusSelectField name="status" defaultValue={status} />
                <div className="flex gap-2">
                  <Button type="submit">Save</Button>
                </div>
              </form>
              <form action={deleteProjectAction} className="flex justify-end">
                <input type="hidden" name="id" value={id} />
                <Button type="submit" variant="outline">
                  Delete
                </Button>
              </form>
            </div>
          </div>
        )
      )}
    </div>
  );
}
