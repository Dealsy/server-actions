export const APP_ROUTES = [
  { href: "/dashboard", label: "Projects Dashboard" },
  { href: "/rhf", label: "RHF signup (RHF + Zod)" },
  { href: "/server-actions-signup", label: "Server Actions signup" },
] as const;

export type AppRoute = (typeof APP_ROUTES)[number];
