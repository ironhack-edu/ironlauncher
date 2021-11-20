"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsValidator = void 0;
const fs_1 = require("fs");
class FsValidator {
    static folderExists(value) {
        return (0, fs_1.existsSync)(value);
    }
    static dirNotEmpty() {
        return !!(0, fs_1.readdirSync)(process.cwd()).length;
    }
}
exports.FsValidator = FsValidator;
