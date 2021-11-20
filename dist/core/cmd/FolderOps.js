"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderOps = void 0;
const path_1 = require("path");
const config_1 = require("../../config");
class FolderOps {
    static getCurrentFolderName() {
        const [currentFolder] = process.cwd().split(path_1.sep).slice(-1);
        return currentFolder;
    }
    static get templatesDir() {
        return (0, path_1.join)(__dirname, "..", "..", "..", "template");
    }
    static inDirectory() {
        return (0, path_1.join)(this.templatesDir, config_1.ironlauncherConfig.template, config_1.ironlauncherConfig.variant);
    }
    static outDirectory(name) {
        return (0, path_1.join)(process.cwd(), name);
    }
}
exports.FolderOps = FolderOps;
