import { prisma } from "@/lib/prisma";
import { EditableUserRow } from "@/components/EditableUserRow";

type UIUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export default async function UsersList() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  const uiUsers: UIUser[] = users.map((u: any) => {
    const created = new Date(u?.createdAt);
    const updatedCandidate = u?.updatedAt ? new Date(u.updatedAt) : null;
    const updated =
      updatedCandidate && !isNaN(updatedCandidate.getTime())
        ? updatedCandidate
        : created;

    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      avatarUrl: u.avatarUrl ?? null,
      createdAt: !isNaN(created.getTime())
        ? created.toISOString()
        : new Date().toISOString(),
      updatedAt: !isNaN(updated.getTime())
        ? updated.toISOString()
        : new Date().toISOString(),
    } as UIUser;
  });

  return (
    <div className="grid gap-2">
      {uiUsers.map((u: UIUser) => (
        <EditableUserRow key={u.id} user={u} />
      ))}
    </div>
  );
}
