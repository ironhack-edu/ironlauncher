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
exports.SharedInstaller = void 0;
const cmd_1 = require("../../cmd");
class SharedInstaller {
    constructor(runner = new cmd_1.Runner()) {
        this.runner = runner;
        this._devCommand = ` -D `;
        this.npmSkipInstall = " --package-lock-only ";
        this.npmDryRun = " --dry-run ";
        this.baseInstallVerb = " install ";
        this.pnpmSkipInstall = " --shrinkwrap-only ";
    }
    execute(arg, config) {
        return __awaiter(this, void 0, void 0, function* () {
            // this.logScope(arg.scope);
            const command = this.npmCommand(arg, config);
            return this.runner.execute(command);
        });
    }
    getPrefix(prefix, config) {
        if (config.dryRun) {
            return "";
        }
        if (config.packageManager === "npm") {
            return ` --prefix ${prefix} `;
        }
        return ` -C ${prefix}`;
    }
    getPackages(packages) {
        return ` ${packages.join(" ")} `;
    }
    dryRun() {
        return this.npmDryRun;
    }
    skipInstall(config) {
        if (config.packageManager === "npm") {
            return this.npmSkipInstall;
        }
        return this.pnpmSkipInstall;
    }
    get devCommand() {
        return this._devCommand;
    }
    logScope(scope = "") {
        if (scope) {
            console.log(`About to start installing ${scope} dependencies`);
        }
    }
    npmCommand(arg, config) {
        const { prefix, packages, isDev } = arg;
        let command = config.packageManager + this.baseInstallVerb;
        if (prefix) {
            command += this.getPrefix(prefix, config);
        }
        if (this.getPackages.length) {
            command += this.getPackages(packages);
        }
        if (isDev) {
            command += this.devCommand;
        }
        if (config.dryRun || config.skipInstall) {
            command += this.dryRunOrSkipIstall(config);
        }
        return command;
    }
    dryRunOrSkipIstall(config) {
        if (config.dryRun) {
            return this.dryRun();
        }
        return this.skipInstall(config);
    }
}
exports.SharedInstaller = SharedInstaller;
