import { app } from "electron";
import { join, resolve } from "node:path";
import { getPort, isDev } from "../../universal";

export function resolvePreloadPath(): string {
  return app.isPackaged
    ? join(__dirname, "../preload/index.js")
    : join(process.cwd(), "../../app/preload/index.js");
}

/**
 * @param filename No suffix
 * @returns url
 */
export function resolveHtmlPath(filename: string) {
  console.log("isDev", isDev(), "process", process.env.NODE_ENV);
  if (isDev() && !app.isPackaged) {
    const port = getPort();
    const url = new URL(`http://localhost:${port}`);
    url.pathname = filename;
    return url.href;
  }
  const _filename = filename.endsWith(".html") ? filename : `${filename}.html`;
  return `file://${resolve(__dirname, "../renderer/", _filename)}`;
}
