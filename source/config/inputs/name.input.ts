import { Option, Result } from "@swan-io/boxed";
import { NoSuchFolderError } from "../../cmd/inputs/input-errors";
import {
  currentDirEmpty,
  folderExists,
  ICurrentDirEmpty,
  IFolderExists,
  ITargetDirEmpty,
  targetDirEmpty,
} from "../../cmd/inputs/validator";
import { fromTruthy } from "../../lib/option-wrapper";

interface IGetNameIsInInputsDeps {
  isTargetEmpty?: ITargetDirEmpty;
  isFolderExist?: IFolderExists;
  isCwdEmpty?: ICurrentDirEmpty;
}

type IGetNameIsInInputs = (
  deps: IGetNameIsInInputsDeps
) => (inputs?: string[]) => Option<string>;

export const makeGetNameIsInInputs: IGetNameIsInInputs = ({
  isFolderExist = folderExists,
  isTargetEmpty = targetDirEmpty,
  isCwdEmpty = currentDirEmpty,
}) => {
  return ([name] = []) => {
    const isEmpty = isCwdEmpty();

    if (name === "." && isEmpty.isOk() && isEmpty.get()) {
      return Option.Some(name);
    }

    return isFolderExist(name)
      .flatMap((exists) => {
        if (!exists) {
          return Result.Error(new NoSuchFolderError(name));
        }

        return isTargetEmpty(name).flatMap(() => Result.Ok(name));
      })
      .toOption();
  };
};
