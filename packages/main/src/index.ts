import { app } from "electron";
import { homeWindow } from "./windows/home";
import { setupCurrentWorkingDirectory } from "utils/electron_main";
import { updateWindow } from "./windows/update";

//boot
setupCurrentWorkingDirectory();

async function main() {
  await app.whenReady();
  const home = homeWindow();
  const update = updateWindow();
  home.create();
  update.create({ parent: home.getBrowserWindow() });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
