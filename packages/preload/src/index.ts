import { contextBridge } from "electron";
//preload don't use top-level await

function exposeApi() {
  return {
    test: () => "Hello from the preload script!",
  };
}

declare type PreloadApi = ReturnType<typeof exposeApi>;

declare global {
  interface Window {
    electron: PreloadApi;
  }
}

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld("electron", exposeApi());
  console.log("Preload Type : ContextBridge");
} else {
  window.electron = exposeApi();
  console.log("Preload Type : Compatibility");
}
