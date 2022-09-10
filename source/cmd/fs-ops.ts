import { basename, join } from "node:path";

export function getCurrentFolder() {
  return basename(process.cwd());
}

export function getTemplatesDir() {
  return join(process.cwd(), "template");
}
