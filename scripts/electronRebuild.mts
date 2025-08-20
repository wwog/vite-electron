import { execSync } from "node:child_process";
import { rebuild } from "@electron/rebuild";
import { paths } from "./paths.mjs";

function getElectronVersion() {
  try {
    //pnpm list electron --depth=0 速度快一点，上面可能是electron二进制文件运行较慢
    const version = execSync("pnpm list electron --depth=0", {
      encoding: "utf8",
    }).trim();
    const match = version.match(/electron\s+(\d+\.\d+\.\d+)/);
    return match ? match[1] : version;
  } catch (_) {
    //using npx electron --version
    console.log(
      "Failed to get Electron version from pnpm list, trying npx electron --version"
    );
  }

  //pnpm electron --version
  try {
    const version = execSync("npx electron --version", { encoding: "utf8" })
      .trim()
      .slice(1);
    return version;
  } catch (error) {
    console.error(
      'Failed to get Electron version from "npx electron --version"'
    );
    console.error(
      "Make sure you have installed Electron and the binary is available."
    );
    console.error(
      'You can install Electron by running "pnpm add electron" or electron postinstall script.'
    );
    throw error;
  }
}

async function main() {
  console.log("Starting Electron rebuild...");
  const electronVersion = getElectronVersion();
  console.log(`Detected Electron version: ${electronVersion}`);
  try {
    await rebuild({
      electronVersion: electronVersion,
      buildPath: paths.appDir,
    });
    console.log("Rebuild completed successfully.");
  } catch (error) {
    console.error("Rebuild failed:", error);
  }
}

main();
