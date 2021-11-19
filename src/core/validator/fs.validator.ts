import { existsSync, readdirSync } from "fs";

export class FsValidator {
  static folderExists(value: string) {
    return existsSync(value);
  }

  static dirNotEmpty() {
    return !!readdirSync(process.cwd()).length;
  }
}
