import { PrismaClient } from "../lib/prisma-client/client";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@kitesurf.com";
  const adminPassword = "password123!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`L'administrateur avec l'email ${adminEmail} existe déjà.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "System",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Premier compte Administrateur créé avec succès :");
  console.log(`- Email : ${admin.email}`);
  console.log(`- Password par défaut : ${adminPassword}`);
  console.log("- À modifier immédiatement après connexion.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
