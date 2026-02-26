import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // Caminho absoluto do JSON
  // const filePathAddress = path.join(__dirname, "data", "produtos.json");
  // // Lendo e convertendo para array
  // const fileContentAddress = readFileSync(filePathAddress, "utf-8");
  // const address = JSON.parse(fileContentAddress);

  // console.log("Inserindo produtos a partir do JSON...");

  // const address_created = await prisma.Address.createMany({
  //   data: address,
  //   skipDuplicates: true
  // });

  // console.log("Address created:");
  // console.log(address_created);

  const filePathRoads = path.join(__dirname, "roads.json");
  // Lendo e convertendo para array
  const fileContentRoads = readFileSync(filePathRoads, "utf-8");
  const roads = JSON.parse(fileContentRoads);

  const road_created = await prisma.Road.createMany({
    data: roads
  })

  console.log("===========ROADS============");
  console.log(road_created);
  


  console.log("Seed finalizado!");
}

main()
  .catch((err) => {
    console.error("Erro ao rodar seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
