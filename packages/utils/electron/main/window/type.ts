import type { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

// Managed window instance with methods
export interface ManagedWindow {
  create: () => BrowserWindow;
  show: () => void;
  hide: () => void;
  switchShow: () => void;
  close: () => void;
  // Add more methods as needed
}

// Type definitions for hooks (lifecycle callbacks)
export type BeforeCreate = (config: BrowserWindowConstructorOptions) => void;
export type AfterCreate = (
  browserWindow: Omit<BrowserWindow, "loadURL">
) => void;

// Chainable builder interface
export interface WindowBuilder {
  withOptions: (
    opts: Partial<BrowserWindowConstructorOptions>
  ) => WindowBuilder;
  withBeforeCreate: (hook: BeforeCreate) => WindowBuilder;
  withAfterCreate: (hook: AfterCreate) => WindowBuilder;
  build: () => ManagedWindow;
}

// Core configuration interface for the window
export interface WindowConfig {
  page: string; // e.g., 'home', 'meeting'
  options: BrowserWindowConstructorOptions;
  hooks: {
    beforeCreate: BeforeCreate[];
    afterCreate: AfterCreate[];
  };
}
