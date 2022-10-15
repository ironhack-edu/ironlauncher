"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullStack = void 0;
const config_1 = require("../../../config");
const base_1 = require("../base");
const depedencies_1 = require("../depedencies");
class FullStack extends base_1.InstallStructure {
    constructor({ bePrefix, fePrefix }, config = config_1.ironlauncherConfig) {
        super();
        this.config = config;
        this.frontEndPackages = [
            {
                packages: depedencies_1.REACT_MAIN_DEPS,
                isDev: false,
                scope: "frontend",
            },
            {
                packages: depedencies_1.REACT_DEV_DEPS,
                isDev: true,
                scope: "frontend",
            },
        ];
        this.backEndPackages = [
            {
                packages: depedencies_1.JSON_EXPRESS_DEPS,
                isDev: false,
                scope: "backend",
            },
            {
                packages: depedencies_1.EXPRESS_IRONLAUNCHER_JWT_AUTH_DEPS,
                isDev: false,
                scope: "backend",
                isAuth: true,
            },
            {
                packages: depedencies_1.BASE_EXPRESS_DEV,
                isDev: true,
                scope: "backend",
            },
        ];
        const frontend = this.clearArr(this.frontEndPackages, fePrefix);
        const backend = this.clearArr(this.backEndPackages, bePrefix);
        this.packages = [...frontend, ...backend];
    }
}
exports.FullStack = FullStack;
