import { Result } from "@swan-io/boxed";
import { accessSync } from "node:fs";
import { join, sep } from "node:path";
import {
  IMakeExistsFolder,
  InvalidFolderPathError,
} from "./folderExists.types";

export const makeExistsFolder: IMakeExistsFolder = (
  existsFunc = accessSync
) => {
  return (folderName) => {
    if (folderName.split(sep).length > 1) {
      return Result.Error(new InvalidFolderPathError());
    }

    return Result.fromExecution<void, InvalidFolderPathError>(() =>
      existsFunc(join(process.cwd(), folderName))
    ).map(() => true);
  };
};
