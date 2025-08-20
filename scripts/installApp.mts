import { execSync } from "node:child_process";
import { paths } from "./paths.mjs";

console.log("Installing App dependencies...");

execSync("npm install", { cwd: paths.appDir, stdio: "inherit" });

console.log("App dependencies installed.");
