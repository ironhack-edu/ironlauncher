import { Result } from "@swan-io/boxed";

export type ExistsSync = (folderName: string) => void;

export type IExistsFolder = (
  folderName: string
) => Result<boolean, InvalidFolderPathError>;

export type IMakeExistsFolder = (existsFunc?: ExistsSync) => IExistsFolder;

export class InvalidFolderPathError extends Error {
  constructor() {
    super("[Ironlauncher ERROR] - name must be single word");
    this.name = "InvalidFolderPathError";
  }
}
