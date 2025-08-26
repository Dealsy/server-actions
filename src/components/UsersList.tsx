import { prisma } from "@/lib/prisma";
import { EditableUserRow } from "@/components/EditableUserRow";

type UIUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  avatarUrl: string | null;
  createdAt: Date;
};

export default async function UsersList() {
  const users = (await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  })) as UIUser[];

  return (
    <div className="grid gap-2">
      {users.map((u: UIUser) => (
        <EditableUserRow key={u.id} user={u} />
      ))}
    </div>
  );
}
