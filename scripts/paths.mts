import { resolve } from "node:path";

const dirname = import.meta.dirname;
const rootDir = resolve(dirname, "..");
const appDir = resolve(rootDir, "app");
const packagesDir = resolve(rootDir, "packages");

const packagesNodeModulesDir = resolve(packagesDir, "node_modules");
const appNodeModulesDir = resolve(appDir, "node_modules");
const rootNodeModulesDir = resolve(rootDir, "node_modules");

export const paths = {
  rootDir,
  appDir,
  packagesDir,
  packagesNodeModulesDir,
  appNodeModulesDir,
  rootNodeModulesDir,
};
