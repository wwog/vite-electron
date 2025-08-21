import { windowBuilder } from "utils/electron_main";

export function homeWindow() {
  return windowBuilder("home")
    .withOptions({
      resizable: false,
    })
    .withBeforeCreate((config) => {
      config.webPreferences = {
        ...config.webPreferences,
        additionalArguments: ["SomeValue"],
      };
    })
    .withAfterCreate((browserWindow) => {
      browserWindow.addListener("close", () => {
        console.log(`Window [${browserWindow.webContents.id}] closed`);
      });
    })
    .build();
}
