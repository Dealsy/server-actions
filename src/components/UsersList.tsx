import { prisma } from "@/lib/prisma";
import { EditableUserRow, UIUser } from "@/components/EditableUserRow";
import { mapUsersToUI } from "@/lib/users";

export default async function UsersList() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  const uiUsers: UIUser[] = mapUsersToUI(users) as UIUser[];

  return (
    <div className="grid gap-2">
      {uiUsers.map((u: UIUser) => (
        <EditableUserRow key={u.id} user={u} />
      ))}
    </div>
  );
}
