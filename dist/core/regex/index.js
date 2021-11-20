"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IronRegex = void 0;
class IronRegex {
    static stripWhiteSpaces(str) {
        return str.replace(this.whiteSpace, "-");
    }
}
exports.IronRegex = IronRegex;
IronRegex.whiteSpace = /\s+/g;
