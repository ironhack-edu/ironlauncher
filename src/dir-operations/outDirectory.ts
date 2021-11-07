import { join } from "path";

export function outDirectory(name: string) {
  return join(process.cwd(), name);
}
