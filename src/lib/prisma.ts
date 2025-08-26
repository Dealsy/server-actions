const prismaClientModule = await import("@prisma/client");
const PrismaClient: any = (prismaClientModule as any).PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined;
}

export const prisma: any = globalThis.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
