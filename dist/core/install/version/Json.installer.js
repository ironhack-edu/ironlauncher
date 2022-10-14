"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONInstaller = void 0;
const config_1 = require("../../../config");
const base_1 = require("../base");
const depedencies_1 = require("../depedencies");
class JSONInstaller extends base_1.InstallStructure {
    constructor(prefix, config = config_1.ironlauncherConfig) {
        super();
        this.config = config;
        this.mainPackages = [
            {
                isDev: false,
                packages: depedencies_1.JSON_EXPRESS_DEPS,
                scope: "backend",
            },
            {
                isDev: false,
                packages: depedencies_1.EXPRESS_IRONLAUNCHER_JWT_AUTH_DEPS,
                scope: "backend",
                isAuth: true,
            },
        ];
        this.devPackages = [
            {
                isDev: true,
                packages: depedencies_1.BASE_EXPRESS_DEV,
                scope: "backend",
            },
        ];
        this.packages = this.clearArr([...this.mainPackages, ...this.devPackages], prefix);
    }
}
exports.JSONInstaller = JSONInstaller;
