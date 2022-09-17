import { Option, Result } from "@swan-io/boxed";
import { NoSuchFolderError } from "../../cmd/inputs/input-errors";
import {
  currentDirNotEmpty,
  folderExists,
  ICurrentDirEmpty,
  IFolderExists,
  ITargetDirEmpty,
  targetDirEmpty,
} from "../../cmd/inputs/validator";

export function getIsHelpInInputs(inputs: string[]) {
  return inputs.includes("help");
}

interface IGetNameIsInInputs {
  dirEmpty?: ICurrentDirEmpty;
  getTargetDirEmpty?: ITargetDirEmpty;
  getFolderExists?: IFolderExists;
}

export function getIsNameInInputs(
  inputs: string[],
  {
    dirEmpty = currentDirNotEmpty,
    getFolderExists = folderExists,
    getTargetDirEmpty = targetDirEmpty,
  }: IGetNameIsInInputs = {}
): Option<string> {
  const [name] = inputs;

  if (!name) {
    return Option.None();
  }

  const isEmpty = dirEmpty();

  if (name === "." && isEmpty.isOk()) {
    return Option.Some(name);
  }

  const exists = getFolderExists(name);

  return exists
    .flatMap((exists) => {
      if (exists) {
        return getTargetDirEmpty(name);
      }

      return Result.Error(new NoSuchFolderError(name));
    })
    .flatMap((val) =>
      val ? Result.Ok(name) : Result.Error(new NoSuchFolderError(name))
    )
    .toOption();
}
