import { existsSync, readdirSync, statSync } from "node:fs";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import readline from "node:readline";
import { paths } from "./paths.mjs";

const clearDirs = [
  paths.appNodeModulesDir,
  paths.packagesNodeModulesDir,
  paths.rootNodeModulesDir,
];

const clearFiles = [
  resolve(paths.appDir, "package-lock.json"),
  resolve(paths.rootDir, "pnpm-lock.yaml"),
];

readdirSync(paths.packagesDir).forEach((path) => {
  if (path === "node_modules") {
    return;
  }
  const fullPath = resolve(paths.packagesDir, path);
  const statInfo = statSync(fullPath);
  if (statInfo.isDirectory()) {
    const node_modules = resolve(fullPath, "node_modules");
    if (existsSync(node_modules)) {
      clearDirs.push(node_modules);
    }
  }
});

console.log("Prepare Clear directories:", clearDirs);
console.log("Prepare Clear files:", clearFiles);

async function doClear() {
  const errorItems: string[] = [];
  const rmDirPromise = clearDirs.map((dir) => {
    console.log(`Deleting directory: ${dir}`);
    return rm(dir, { recursive: true })
      .then(() => {
        console.log(`Deleted directory: ${dir}`);
      })
      .catch((error) => {
        console.error(`Error deleting directory: ${dir}`, error);
        errorItems.push(dir);
      });
  });
  const rmFilePromise = clearFiles.map((file) => {
    console.log(`Deleting file: ${file}`);
    return rm(file, { force: true })
      .then(() => {
        console.log(`Deleted file: ${file}`);
      })
      .catch((error) => {
        console.error(`Error deleting file: ${file}`, error);
        errorItems.push(file);
      });
  });

  await Promise.all([...rmDirPromise, ...rmFilePromise]);
  if (errorItems.length > 0) {
    console.error("Failed to delete:", errorItems);
  } else {
    console.log("Clear completed");
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Do you want to clear the above directories and files? (Y/n): ",
  (answer) => {
    if (answer.trim().toUpperCase() !== "N") {
      doClear();
    } else {
      console.log("Cancel Clear");
    }
    rl.close();
  }
);
