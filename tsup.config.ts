import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  dts: true,
  entry: ["./source/index.ts"],
  outDir: "build",
  clean: true,
  shims: true,
});
