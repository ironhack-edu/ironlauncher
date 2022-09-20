import { Result } from "@swan-io/boxed";
import { lstatSync, Stats } from "node:fs";
import { fromTruthy } from "../../option-wrapper";

type IsDirFunc = (target: string) => Stats;

export type IDirectoryExists = (
  targetDir?: IsDirFunc
) => (
  target: string
) => Result<boolean, NodeJS.ErrnoException | NoTargetProvided>;

class NoTargetProvided extends Error {}

export const makeDirectoryExists: IDirectoryExists =
  (isDirFunc = lstatSync) =>
  (target) => {
    return fromTruthy(target)
      .toResult(new NoTargetProvided())
      .flatMap((target) =>
        Result.fromExecution<Stats, NodeJS.ErrnoException>(() =>
          isDirFunc(target)
        )
      )
      .map((val) => val.isDirectory());
  };
