import { app } from "electron/main";
import path from "node:path";
import { isWin } from "../../../universal/sundry";

export function setupCurrentWorkingDirectory() {
  if (isWin() && app.isPackaged) {
    const cwd = process.cwd();
    const execPath = process.execPath;
    const execDir = path.dirname(execPath);
    if (execDir !== cwd) {
      process.chdir(execDir);
    }
  }
}
