import { PrismaClient } from "../src/generated/prisma/client.js";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

// Necessário para __dirname funcionar em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  // ======= Roads =======
  const filePathRoads = path.join(__dirname, "seed", "roads.json");
  const fileRoadsContent = readFileSync(filePathRoads, "utf-8");
  const roads = JSON.parse(fileRoadsContent);

  console.log("Inserindo roads a partir do JSON...");
  const roadCreated = await prisma.road.createMany({
    data: roads,
    skipDuplicates: true
  });

  console.log("=========== ROADS ============");
  console.log(roadCreated);

  console.log("Seed finalizado!");

  const filePathAddress = path.join(__dirname, "seed", "address.json");
  const fileAddressContent = readFileSync(filePathAddress, "utf-8");
  const address = JSON.parse(fileAddressContent);

  console.log("Inserindo address a partir do JSON...");
  const addressCreated = await prisma.address.createMany({
    data: address,
    skipDuplicates: true
  });

  console.log("=========== ADDRESS ============");
  console.log(addressCreated);

  const filePathuser = path.join(__dirname, "seed", "users.json");
  const fileuserContent = readFileSync(filePathuser, "utf-8");
  const user = JSON.parse(fileuserContent);

  const usersWithHash = await Promise.all(
    user.map(async (u: any) => ({
      ...u,
      password: await bcrypt.hash(u.password, 10)
    }))
  );

  console.log("Inserindo users a partir do JSON...");
  const userCreated = await prisma.users.createMany({
    data: usersWithHash,
    skipDuplicates: true
  });

  console.log("=========== USERS ============");
  console.log(userCreated);

  const filePathrelation = path.join(__dirname, "seed", "relations.json");
  const filerelationContent = readFileSync(filePathrelation, "utf-8");
  const relation = JSON.parse(filerelationContent);

  console.log("Inserindo roads a partir do JSON...");
  const relationCreated = await prisma.relation.createMany({
    data: relation,
    skipDuplicates: true
  });

  console.log("=========== RELATIONS ============");
  console.log(relationCreated);

}

main()
  .catch((err) => {
    console.error("Erro ao rodar seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
