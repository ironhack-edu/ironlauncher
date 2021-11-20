"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const child_process_1 = require("child_process");
const config_1 = require("../../config");
class Runner {
    constructor(config = config_1.ironlauncherConfig) {
        this.config = config;
    }
    get stdio() {
        return this.config.verbose ? "inherit" : "ignore";
    }
    execute(command) {
        return new Promise((res, rej) => {
            const childProcess = (0, child_process_1.spawn)(command, { stdio: this.stdio, shell: true });
            childProcess.on("close", res);
            childProcess.on("error", rej);
        });
    }
}
exports.Runner = Runner;
