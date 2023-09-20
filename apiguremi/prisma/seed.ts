import { PrismaClient } from "@prisma/client";

import { Usuario } from "./types/usuario";
import { usuarios } from "./seeds/usuario";

const prisma = new PrismaClient();

async function main() {
  await prisma.usuario.createMany({
    data: usuarios as Usuario[],
  });
}

main()
  .then(async (): Promise<void> => {
    await prisma.$disconnect();
  })
  .catch(async (e: Error): Promise<void> => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
