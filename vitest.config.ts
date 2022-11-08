import { defineConfig } from "vitest/config";
import { join } from "node:path";

export default defineConfig({
  test: {
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "template/**",
    ],
    includeSource: ["source/**/*.ts"],
    include: ["./source/**/*.{spec,test}.ts"],
  },
});
