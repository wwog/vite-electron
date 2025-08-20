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

// Chainable builder interface
export interface WindowBuilder {
  withOptions: (
    opts: Partial<BrowserWindowConstructorOptions>
  ) => WindowBuilder;
  withHook: (
    hookType: keyof WindowConfig["hooks"],
    hook: WindowHook
  ) => WindowBuilder;
  build: () => ManagedWindow;
}

// Type definitions for hooks (lifecycle callbacks)
export type WindowHook = () => void;

// Core configuration interface for the window
export interface WindowConfig {
  page: string; // e.g., 'home', 'meeting'
  options: BrowserWindowConstructorOptions;
  hooks: {
    beforeCreate: WindowHook[];
    afterCreate: WindowHook[];
    // Add more lifecycle hooks as needed, e.g., onClose, onShow
  };
}
