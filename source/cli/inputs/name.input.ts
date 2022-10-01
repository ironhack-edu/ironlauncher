import { Option, Result } from "@swan-io/boxed";
import { readdirSync } from "fs";
import { basename } from "path";
import { DirectoryTakenError } from "../../cmd/inputs/input-errors";
import { type IDirEmpty, makeDirEmptyFunc } from "../../lib/fs/dir-empty";
import {
  type IMakeExistsFolder,
  makeExistsFolder,
} from "../../lib/fs/folder-exists";
import { fromTruthy } from "../../lib/option-wrapper";
import { IIronLauncherInputs } from "../../types/cli-config";

interface IGetNameIsInInputsDeps {
  folderExists?: IMakeExistsFolder;
  dirEmpty?: IDirEmpty;
}

type IGetNameIsInInputs = (
  deps?: IGetNameIsInInputsDeps
) => (inputs?: IIronLauncherInputs) => Option<string>;

export const makeGetNameIsInInputs: IGetNameIsInInputs = (deps = {}) => {
  const { dirEmpty = makeDirEmptyFunc, folderExists = makeExistsFolder } = deps;

  const isEmpty = dirEmpty();

  const isFolderExists = folderExists();

  return (inputs) => {
    return fromTruthy(inputs)
      .flatMap((inputArr) => {
        const firstEl = inputArr[0];

        return firstEl ? Option.Some(firstEl) : Option.None();
      })
      .flatMap((folderName) => {
        if (folderName === ".") {
          return isEmpty(process.cwd()).match({
            Ok(value) {
              return value
                ? Option.Some(basename(process.cwd()))
                : Option.None();
            },
            Error() {
              return Option.None();
            },
          });
        }

        return isFolderExists(folderName)
          .match<Result<string, DirectoryTakenError>>({
            Error() {
              return Result.Ok(folderName);
            },
            Ok(value) {
              if (value) {
                return Result.Error(new DirectoryTakenError(folderName));
              }

              return Result.Ok(folderName);
            },
          })
          .toOption();
      });
  };
};
