"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
/// <reference path="../types/index.d.ts" />
const cli_handle_unhandled_1 = __importDefault(require("cli-handle-unhandled"));
const cli_welcome_1 = __importDefault(require("cli-welcome"));
const config_1 = require("../config");
const Package_1 = require("../core/pkg/Package");
function init() {
    (0, cli_handle_unhandled_1.default)();
    if (!config_1.ironlauncherConfig.devMode) {
        (0, cli_welcome_1.default)({
            title: "IronGenerator",
            tagLine: "by Ironhack",
            description: Package_1.Package.description,
            bgColor: "#2DC5FA",
            color: "#000000",
            version: Package_1.Package.version,
            clear: true,
            bold: true,
        });
    }
}
exports.init = init;
