"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Views = void 0;
const config_1 = require("../../../config");
const base_1 = require("../base");
const depedencies_1 = require("../depedencies");
class Views extends base_1.InstallStructure {
    constructor(prefix, config = config_1.ironlauncherConfig) {
        super();
        this.config = config;
        this.mainPackages = [
            {
                isDev: false,
                packages: depedencies_1.VIEWS_EXPRESS_BASE_DEPS,
                scope: "app",
                isAuth: false,
            },
            {
                isDev: false,
                packages: depedencies_1.VIEWS_EXPRESS_AUTH_DEPTS,
                scope: "app",
                isAuth: true,
            },
        ];
        this.devPackages = [
            {
                isDev: true,
                packages: depedencies_1.BASE_EXPRESS_DEV,
                scope: "app",
            },
        ];
        this.packages = this.clearArr([...this.mainPackages, ...this.devPackages], prefix);
    }
}
exports.Views = Views;
