import { Result } from "@swan-io/boxed";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { stripWhitespaces } from "../../utils/strip-whitespaces";
import {
  DirNotEmptyError,
  NoSuchFolderError,
  NoValueError,
} from "./input-errors";

type ExistsSync = (folderName: string) => boolean;
type ReadDir = (folderName: string) => string[];
type ITargetDirNotEmpty = {
  existsFunc?: ExistsSync;
  readDirFunc?: ReadDir;
};

export function folderExists(
  folderName: string,
  func = existsSync as ExistsSync
) {
  return Result.fromExecution(() => func(folderName));
}

export function currentDirNotEmpty(func = readdirSync as ReadDir) {
  return targetDirNotEmpty(process.cwd(), { readDirFunc: func });
}

function currentDirEmpty(func = readdirSync as ReadDir) {
  return targetDirEmpty(process.cwd(), { readDirFunc: func });
}

export function targetDirNotEmpty(
  target: string,
  injections: ITargetDirNotEmpty = {}
): Result<boolean, NoSuchFolderError> {
  const { existsFunc = existsSync, readDirFunc = readdirSync } = injections;

  const exists = folderExists(target, existsFunc).match({
    Error: () => false,
    Ok: (v) => v,
  });

  if (!exists) {
    return Result.Error(new NoSuchFolderError(target));
  }

  const countResult = Result.fromExecution<string[], NoSuchFolderError>(() =>
    readDirFunc(target)
  );

  return countResult.map((elementsInFolder) => !!elementsInFolder.length);
}

export function targetDirEmpty(
  target: string,
  injections: ITargetDirNotEmpty = {}
) {
  return targetDirNotEmpty(target, injections).map((e) => !e);
}

const CURRENT_FOLDER_PATH = ".";
const NAME_VALIDATOR_ERRORS = {
  dirNotEmpty: `This directory is not empty, please choose a different name\n`,
  dirTaken: `This directory already exists`,
  noValue: "Please add a value\n",
  unexpectedError: `Something unexpected happened. Please choose a different name\n`,
} as const;

export function validateCurrentFolder(): string | true {
  const result = currentDirEmpty().flatMap((value) =>
    value ? Result.Ok(value) : Result.Error(new DirNotEmptyError())
  );

  if (result.isError()) {
    return result.value.message;
  }

  return true;
}

export function validateName(value: string): string | true {
  if (value === CURRENT_FOLDER_PATH) {
    return validateCurrentFolder();
  }

  if (!value) {
    return new NoValueError().message;
  }

  const val = stripWhitespaces(value);

  const folderName = value.includes(process.cwd())
    ? val
    : join(process.cwd(), val);

  const exists = folderExists(folderName).match({
    Error() {
      return false;
    },
    Ok: (v) => v,
  });

  if (exists) {
    return new DirNotEmptyError(val).message;
  }

  return true;
}
