import { app } from "electron";
import { windowBuilder } from "./lib/window";

async function main() {
  await app.whenReady();
  const home = windowBuilder("home").build();
  home.create();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
