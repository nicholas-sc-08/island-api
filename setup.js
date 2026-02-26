#!/usr/bin/env node
import { execSync } from "child_process";

function run(cmd) {
  console.log(`\n>>> Executando: ${cmd}`);
  execSync(cmd, { stdio: "inherit", shell: true });
}

run("npm install");
run("npx prisma db push");
run("npx prisma generate");
run("npx prisma db seed")
run("npm run dev");
