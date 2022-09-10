import { Result } from "@swan-io/boxed";
import { existsSync, readdirSync, accessSync } from "fs";

type ExistsSync = (folderName: string) => boolean;

export namespace FsValidator {
  export function folderExists(folderName: string) {
    return existsSync(folderName);
  }

  export function elementExists(
    folderName: string,
    func = accessSync as ExistsSync
  ) {
    return Result.fromExecution(() => func(folderName));
  }

  export function dirNotEmpty() {
    return !!readdirSync(process.cwd()).length;
  }

  export function currentDirNotEmpty() {
    return !!readdirSync(process.cwd()).length;
  }

  export function currentDirectoryNotEmpty() {
    return Result.fromExecution(() => !!readdirSync(process.cwd()).length);
  }

  export function dirEmpty() {
    return !readdirSync(process.cwd()).length;
  }

  export function targetDirNotEmpty(folderName: string) {
    return Result.fromExecution(() => !!readdirSync(folderName).length);
  }

  export function targetDirEmpty(folderName: string) {
    return Result.fromExecution(() => !readdirSync(folderName).length);
  }
}
