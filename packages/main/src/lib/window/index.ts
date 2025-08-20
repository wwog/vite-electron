import {
  BrowserWindow,
  type BrowserWindowConstructorOptions,
} from "electron/main";
import { resolveHtmlPath, resolvePreloadPath } from "../path";
import { addDidFailedLoadHandle } from "./handle";
import type {
  ManagedWindow,
  WindowBuilder,
  WindowConfig,
  WindowHook,
} from "./type";

// Default base options
const defaultOptions: BrowserWindowConstructorOptions = {
  show: false,
  width: 800,
  height: 625,
  minWidth: 300,
  minHeight: 400,
  autoHideMenuBar: true,
  resizable: true,
  webPreferences: {
    preload: resolvePreloadPath(),
  },
};

// Internal function to create the managed window instance
function createManagedWindow(config: WindowConfig): ManagedWindow {
  let browserWindow: BrowserWindow | null = null;

  // Helper to run hooks
  const runHooks = (hookType: keyof WindowConfig["hooks"]) => {
    for (const hook of config.hooks[hookType]) {
      hook();
    }
  };

  const managed = {
    create() {
      if (browserWindow && !browserWindow.isDestroyed()) {
        browserWindow.show();
        browserWindow.focus();
        return browserWindow;
      }

      runHooks("beforeCreate");
      browserWindow = new BrowserWindow(config.options);
      const url = resolveHtmlPath(config.page);
      console.log(
        `Window [${config.page}] created with senderId: ${browserWindow?.webContents.id}, Url: ${url}`
      );
      console.log(`Config`, config);
      browserWindow.loadURL(url);

      browserWindow.once("ready-to-show", () => {
        browserWindow?.show();
      });

      browserWindow.on("close", (event) => {
        // Platform-specific handling or custom logic can be added via hooks
        if (process.platform === "darwin" && config.page === "home") {
          event.preventDefault();
          browserWindow?.hide();
        } else {
          browserWindow?.removeAllListeners();
          browserWindow = null;
        }
      });

      // Add more registrations as needed, e.g., maximize/unmaximize
      addDidFailedLoadHandle(browserWindow, config.page);
      runHooks("afterCreate");

      return browserWindow!;
    },
    show() {
      browserWindow?.show();
    },
    hide() {
      browserWindow?.hide();
    },
    switchShow() {
      if (browserWindow) {
        browserWindow.isVisible() ? this.hide() : this.show();
      }
    },
    close() {
      browserWindow?.close();
    },
  };

  return managed;
}

export function windowBuilder(page: string): WindowBuilder {
  const config: WindowConfig = {
    page,
    options: { ...defaultOptions },
    hooks: {
      beforeCreate: [],
      afterCreate: [],
    },
  };

  const builder: WindowBuilder = {
    withOptions(opts: Partial<BrowserWindowConstructorOptions>) {
      config.options = {
        ...config.options,
        ...opts,
        webPreferences: {
          ...config.options.webPreferences,
          ...opts.webPreferences,
        },
      };
      return builder;
    },
    withHook(hookType: keyof WindowConfig["hooks"], hook: WindowHook) {
      if (hookType in config.hooks) {
        config.hooks[hookType].push(hook); // Type assertion for simplicity
      }
      return builder;
    },
    build() {
      return createManagedWindow(config);
    },
  };

  return builder;
}
