import { IronRegex } from "../regex";
import { FsValidator } from "./fs.validator";

export class NameValidator {
  private static currentFolder = ".";
  private static currentDirNotEmpty = `This directory is not empty, please choose a different name\n`;
  private static dirTaken = `This directory already exists`;
  private static addValue = "Please add a value\n";

  static validate(value: string) {
    if (value === this.currentFolder) {
      if (FsValidator.dirNotEmpty()) {
        return this.currentDirNotEmpty;
      }

      return true;
    }

    if (FsValidator.folderExists(value)) {
      return this.dirTaken;
    }

    const strippedSpaces = IronRegex.stripWhiteSpaces(value);

    if (FsValidator.folderExists(strippedSpaces)) {
      return this.dirTaken;
    }
    return !value ? this.addValue : true;
  }
}
