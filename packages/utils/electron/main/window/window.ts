import {
  BrowserWindow,
  type BrowserWindowConstructorOptions,
} from "electron/main";
import { resolveHtmlPath, resolvePreloadPath } from "../path";
import { addDidFailedLoadHandle } from "./handle";
import type { ManagedWindow, WindowBuilder, WindowConfig } from "./type";

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

  const runBeforeCreates = () => {
    for (const hook of config.hooks.beforeCreate) {
      hook(config.options);
    }
  };

  const runAfterCreates = () => {
    for (const hook of config.hooks.afterCreate) {
      hook(browserWindow!);
    }
  };

  const managed = {
    create() {
      if (browserWindow && !browserWindow.isDestroyed()) {
        browserWindow.show();
        browserWindow.focus();
        return browserWindow;
      }

      runBeforeCreates();
      browserWindow = new BrowserWindow(config.options);
      runAfterCreates();

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
    withAfterCreate(hook) {
      config.hooks.afterCreate.push(hook);
      return builder;
    },
    withBeforeCreate(hook) {
      config.hooks.beforeCreate.push(hook);
      return builder;
    },
    build() {
      return createManagedWindow(config);
    },
  };

  return builder;
}
