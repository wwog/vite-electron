import { app, type BrowserWindow } from "electron";
import { isDev } from "utils";

/**
 * In development mode, loading fails, periodic refresh. In publishing mode, logs are printed
 * @returns
 */
export function addDidFailedLoadHandle(
  bWindow: BrowserWindow,
  pageName: string
) {
  if (bWindow === null) {
    console.warn(
      "handleWindow failed, BasicsWindow.browserWindow is not initialized"
    );
    return;
  }
  let loadFailed = false;

  bWindow.webContents.addListener("did-finish-load", () => {
    if (loadFailed === false) {
      console.info(`Page [${pageName}] loaded successfully.`);
    }
    loadFailed = false;
  });

  bWindow.webContents.addListener(
    "did-fail-load",
    (
      event,
      errorCode,
      errorDescription,
      validatedURL,
      isMainFrame,
      frameProcessId,
      frameRoutingId
    ) => {
      loadFailed = true;
      /**
       * @doc url https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h
       * @returns
       */
      const getErrorCodeType = (errorCode: number) => {
        const code = Math.abs(errorCode);
        if (code >= 0 && code <= 99) {
          return "System related errors" as const;
        }
        if (code >= 100 && code <= 199) {
          return "Connection related errors" as const;
        }
        if (code >= 200 && code <= 299) {
          return "Certificate errors" as const;
        }
        if (code >= 300 && code <= 399) {
          return "HTTP errors" as const;
        }
        if (code >= 400 && code <= 499) {
          return "Cache errors" as const;
        }
        if (code >= 500 && code <= 599) {
          return "Unknown errors" as const;
        }
        if (code >= 600 && code <= 699) {
          return "FTP errors" as const;
        }
        if (code >= 700 && code <= 799) {
          return "Certificate manager errors" as const;
        }
        if (code >= 800 && code <= 899) {
          return "DNS resolver errors" as const;
        }
        return "Unknown errors" as const;
      };
      const loadFailedInfo = {
        page: pageName,
        event,
        errorCode,
        errorType: getErrorCodeType(errorCode),
        errorDescription,
        validatedURL,
        isMainFrame,
        frameProcessId,
        frameRoutingId,
      };

      if (isDev() && !app.isPackaged) {
        console.warn(
          "did-fail-load, in strict dev mode, Auto-refresh until successful"
        );
        setTimeout(() => {
          bWindow?.reload();
        }, 1500);
      } else {
        console.warn("did-fail-load", loadFailedInfo);
      }
    }
  );
}
