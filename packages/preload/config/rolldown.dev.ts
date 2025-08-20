import { defineConfig } from "rolldown";
import { mergeBase } from "./rolldown.base";

export default defineConfig(
  mergeBase({
    define: {
      "process.env.NODE_ENV": JSON.stringify("development"),
    },
  })
);
