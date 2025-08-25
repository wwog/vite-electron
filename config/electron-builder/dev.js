export default {
  productName: "vite-electron",
  appId: "com.example.vite-electron",
  electronDist: "node_modules/electron/dist",
  icon: "assets/icons/256x256.png",
  copyright: "Copyright © 2023 Your Name",
  npmRebuild: false,
  files: ["main", "preload", "renderer", "node_modules"],
  directories: {
    app: "app",
    output: "release",
    buildResources: "assets",
  },
  extraResources: ["./assets/**"],
  asar: false,
  mac: {
    entitlements: "assets/entitlements.plist",
    "entitlements-inherit": "assets/entitlements.plist",
  },
};
