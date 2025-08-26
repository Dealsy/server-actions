export const ROUTES = {
  DASHBOARD: "/dashboard",
  RHF: "/rhf",
  SERVER_ACTIONS_SIGNUP: "/server-actions-signup",
} as const;

export const APP_ROUTES = [
  { href: ROUTES.DASHBOARD, label: "Projects Dashboard" },
  { href: ROUTES.RHF, label: "RHF signup (RHF + Zod)" },
  { href: ROUTES.SERVER_ACTIONS_SIGNUP, label: "Server Actions signup" },
] as const;

export type AppRoute = (typeof APP_ROUTES)[number];
