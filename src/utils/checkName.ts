import * as fs from "fs";

export function byName(name: string) {
  const currentDir = fs.readdirSync(process.cwd());

  return currentDir.find((e) => e.trim() === name.trim());
}

export function isNotEmpty() {
  return fs.readdirSync(process.cwd()).length;
}
