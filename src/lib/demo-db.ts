export type ProjectStatus = "active" | "paused" | "archived";

export type Project = {
  id: string;
  name: string;
  ownerEmail: string;
  budgetUsd: number;
  status: ProjectStatus;
  createdAt: string; // ISO date string
};

type ProjectStore = {
  projects: Project[];
};

declare global {
  // eslint-disable-next-line no-var
  var __demoProjectStore__: ProjectStore | undefined;
}

function getStore(): ProjectStore {
  if (!globalThis.__demoProjectStore__) {
    globalThis.__demoProjectStore__ = {
      projects: [
        {
          id: Math.random().toString(36).slice(2, 10),
          name: "Website Redesign",
          ownerEmail: "alice@example.com",
          budgetUsd: 25000,
          status: "active",
          createdAt: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 10
          ).toISOString(),
        },
        {
          id: Math.random().toString(36).slice(2, 10),
          name: "Mobile App MVP",
          ownerEmail: "bob@example.com",
          budgetUsd: 80000,
          status: "paused",
          createdAt: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 3
          ).toISOString(),
        },
      ],
    };
  }
  return globalThis.__demoProjectStore__;
}

export async function listProjects(): Promise<Project[]> {
  return getStore().projects;
}

export async function createProject(
  project: Omit<Project, "id" | "createdAt">
): Promise<Project> {
  const store = getStore();
  const newProject: Project = {
    id: Math.random().toString(36).slice(2, 10),
    createdAt: new Date().toISOString(),
    ...project,
  };
  store.projects.unshift(newProject);
  return newProject;
}

export async function updateProject(
  id: string,
  updates: Partial<
    Pick<Project, "name" | "ownerEmail" | "budgetUsd" | "status">
  >
): Promise<Project | null> {
  const store = getStore();
  const idx = store.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  store.projects[idx] = { ...store.projects[idx], ...updates };
  return store.projects[idx];
}

export async function deleteProject(id: string): Promise<boolean> {
  const store = getStore();
  const before = store.projects.length;
  store.projects = store.projects.filter((p) => p.id !== id);
  return store.projects.length < before;
}
