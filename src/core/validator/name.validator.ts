import { Result } from "@swan-io/boxed";
import { stripWhiteSpaces } from "../regex";
import { FsValidator } from "./fs.validator";

export namespace NameValidator {
  const currentFolderPath = ".";
  const NAME_VALIDATOR_ERRORS = {
    dirNotEmpty: `This directory is not empty, please choose a different name\n`,
    dirTaken: `This directory already exists`,
    noValue: "Please add a value\n",
    unexpectedError: `Something unexpected happened. Please choose a different name\n`,
  } as const;

  export function validateCurrentFolder() {
    const result = FsValidator.currentDirectoryNotEmpty();

    if (result.isError()) {
      return Result.Error(NAME_VALIDATOR_ERRORS.unexpectedError);
    }

    if (!result.get()) {
      return Result.Error(NAME_VALIDATOR_ERRORS.dirNotEmpty);
    }

    return Result.Ok(true);
  }

  export function validate(value: string = currentFolderPath) {
    if (value === currentFolderPath) {
      return currentFolder();
    }

    if (FsValidator.folderExists(value)) {
      return NAME_VALIDATOR_ERRORS.dirTaken;
    }

    const strippedSpaces = stripWhiteSpaces(value);

    if (FsValidator.folderExists(strippedSpaces)) {
      return NAME_VALIDATOR_ERRORS.dirTaken;
    }

    return !value ? NAME_VALIDATOR_ERRORS.noValue : true;
  }

  function currentFolder() {
    if (FsValidator.dirNotEmpty()) {
      return NAME_VALIDATOR_ERRORS.dirNotEmpty;
    }

    return true;
  }
}
