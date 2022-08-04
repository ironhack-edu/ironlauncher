import { existsSync, readdirSync } from "fs";

export namespace FsValidator {
  export function folderExists(folderName: string) {
    return existsSync(folderName);
  }

  export function dirNotEmpty() {
    return !!readdirSync(process.cwd()).length;
  }
}
