import { windowBuilder } from "utils/electron_main";

export function updateWindow() {
  return windowBuilder("update")
    .withOptions({
      width: 600,
      height: 400,
      resizable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      modal: true,
    })
    .build();
}
