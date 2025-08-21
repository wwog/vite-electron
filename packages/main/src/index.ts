import { app } from "electron";
import { homeWindow } from "./windows/home";
import { setupCurrentWorkingDirectory } from "utils/electron_main";

//boot
setupCurrentWorkingDirectory();

async function main() {
  await app.whenReady();
  const home = homeWindow();
  home.create();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
