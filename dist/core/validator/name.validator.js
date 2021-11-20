"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameValidator = void 0;
const regex_1 = require("../regex");
const fs_validator_1 = require("./fs.validator");
class NameValidator {
    static validate(value) {
        if (value === this.currentFolder) {
            if (fs_validator_1.FsValidator.dirNotEmpty()) {
                return this.currentDirNotEmpty;
            }
            return true;
        }
        if (fs_validator_1.FsValidator.folderExists(value)) {
            return this.dirTaken;
        }
        const strippedSpaces = regex_1.IronRegex.stripWhiteSpaces(value);
        if (fs_validator_1.FsValidator.folderExists(strippedSpaces)) {
            return this.dirTaken;
        }
        return !value ? this.addValue : true;
    }
}
exports.NameValidator = NameValidator;
NameValidator.currentFolder = ".";
NameValidator.currentDirNotEmpty = `This directory is not empty, please choose a different name\n`;
NameValidator.dirTaken = `This directory already exists`;
NameValidator.addValue = "Please add a value\n";
