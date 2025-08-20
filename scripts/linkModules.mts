import fs from "node:fs";
import { paths } from "./paths.mjs";

const { appNodeModulesDir, packagesNodeModulesDir } = paths;

console.log("Linking node_modules from App to Packages", {
  appNodeModulesDir,
  packagesNodeModulesDir,
});
if (
  !fs.existsSync(packagesNodeModulesDir) &&
  fs.existsSync(appNodeModulesDir)
) {
  try {
    fs.symlinkSync(appNodeModulesDir, packagesNodeModulesDir, "junction");
    console.log("Symlink Result: Ok");
  } catch (error) {
    console.error("Symlink Error: ", error);
  }
} else {
  console.log("Symlink already exists, skipping...");
}
