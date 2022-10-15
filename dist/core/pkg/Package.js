"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const pkg = require("../../../package.json");
const util_1 = require("util");
const child_process_1 = require("child_process");
class Package {
    static getLocalVersion() {
        return pkg.version.trim();
    }
    static get version() {
        return pkg.version.trim();
    }
    static get pkgName() {
        return pkg.name;
    }
    static get description() {
        return pkg.name;
    }
    static get pkg() {
        return pkg;
    }
    static getRemoteVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const execute = (0, util_1.promisify)(child_process_1.exec);
            try {
                const { stdout } = yield execute(this.npmView(pkg.name));
                return stdout.trim();
            }
            catch (error) {
                throw new Error(`Something went wrong. ${JSON.stringify(error)}`);
            }
        });
    }
    static npmView(pkg) {
        return `npm view ${pkg} version`;
    }
    static isOutOfSync() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getRemoteVersion()) !== this.getLocalVersion();
        });
    }
}
exports.Package = Package;
