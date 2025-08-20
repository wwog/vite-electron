import { defineConfig } from "rolldown";
import { mergeBase } from "./rolldown.base";

export default defineConfig(
  mergeBase({
    output: {
      minify: true,
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  })
);
