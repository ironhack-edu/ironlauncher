import { Result } from "@swan-io/boxed";
import { lstatSync, Stats } from "node:fs";

type IsDirFunc = (target: string) => Stats;

type ISDirDeps = (
  isDir?: IsDirFunc
) => (target: string) => Result<boolean, unknown>;

const makeIsDirectory: ISDirDeps =
  (isDir = lstatSync) =>
  (target) =>
    Result.fromExecution(() => isDir(target)).map((val) => val.isDirectory());

export function isDirectoy(
  target: string
): Result<boolean, NodeJS.ErrnoException> {
  const lsStatResult = Result.fromExecution<Stats, NodeJS.ErrnoException>(() =>
    lstatSync(target)
  ).map((val) => val.isDirectory());

  return lsStatResult;
}

type IDirectoryExists = (
  targetDir?: IsDirFunc
) => (target: string) => Result<boolean, NodeJS.ErrnoException>;

const makeDirectoryExists: IDirectoryExists =
  (isDirFunc = lstatSync) =>
  (target) => {
    return Result.fromExecution<Stats, NodeJS.ErrnoException>(() =>
      isDirFunc(target)
    ).map((val) => val.isDirectory());
  };
