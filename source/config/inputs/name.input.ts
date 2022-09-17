import { Option, Result } from "@swan-io/boxed";
import { basename } from "node:path";
import { DirectoryTakenError } from "../../cmd/inputs/input-errors";
import {
  currentDirEmpty,
  folderExists,
  ICurrentDirEmpty,
  IFolderExists,
} from "../../cmd/inputs/validator";
import { fromTruthy } from "../../lib/option-wrapper";

interface IGetNameIsInInputsDeps {
  isFolderExist?: IFolderExists;
  isCwdEmpty?: ICurrentDirEmpty;
}

type IGetNameIsInInputs = (
  deps?: IGetNameIsInInputsDeps
) => (inputs?: string[]) => Option<string>;

export const makeGetNameIsInInputs: IGetNameIsInInputs = ({
  isFolderExist = folderExists,
  isCwdEmpty = currentDirEmpty,
} = {}) => {
  return (inputs) =>
    fromTruthy(inputs)
      .toResult(null)
      .flatMap((inputArr) => {
        return inputArr[0] ? Result.Ok(inputArr[0]) : Result.Error(null);
      })
      .flatMap((folderName) => {
        if (folderName === ".") {
          return isCwdEmpty().match({
            Ok(value) {
              return value
                ? Result.Ok(basename(process.cwd()))
                : Result.Error(undefined);
            },
            Error() {
              return Result.Error(undefined);
            },
          });
        }

        const isFolderThere = isFolderExist(folderName);

        return isFolderThere.flatMap((exists) => {
          if (exists) {
            return Result.Error(new DirectoryTakenError(folderName));
          }

          return Result.Ok(folderName);
        });
      })
      .toOption();
};
