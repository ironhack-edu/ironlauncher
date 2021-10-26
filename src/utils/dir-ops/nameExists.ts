import { existsSync } from "fs";

export function nameExists(value: string) {
  return existsSync(value);
}
