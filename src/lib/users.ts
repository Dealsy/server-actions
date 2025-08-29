export function mapUsersToUI(users: any[]) {
  return users.map((u: any) => {
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
      createdAt: !isNaN(created.getTime()) ? created : new Date(),
      updatedAt: !isNaN(updated.getTime()) ? updated : new Date(),
    };
  });
}
