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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeInstall = exports.install = void 0;
const chalk_1 = require("chalk");
const cli_alerts_1 = __importDefault(require("cli-alerts"));
const ora_1 = __importDefault(require("ora"));
const path_1 = require("path");
const config_1 = require("../../config");
const logger_1 = require("../logger");
const version_1 = require("./version");
const spinner = (0, ora_1.default)({ text: "" });
function install(basePath, fileNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name: outDir } = config_1.ironlauncherConfig;
        logger_1.logger.emptyLine();
        logger_1.logger.dimmedWithGreen({ inGreen: outDir, rest: "\nCreating files in" });
        fileNames.forEach((filePath) => {
            const fileName = (0, path_1.basename)(filePath);
            logger_1.logger.greenAndRest({ rest: `: ${fileName}`, inGreen: "CREATED" });
        });
        logger_1.logger.emptyLine();
        spinner.start(`${(0, chalk_1.yellow)("INSTALLING")} dependencies...\n\n${(0, chalk_1.dim)(`It might take a moment`)}`);
        yield MakeInstall.install(basePath);
        spinner.succeed(`${(0, chalk_1.green)("FINISHED")} installation...`);
        const createdMsg = config_1.ironlauncherConfig.isCurrentFolder
            ? `\n\n${fileNames.length} files created in the current directory`
            : `\n\n${fileNames.length} files created in ${(0, chalk_1.dim)(`./${outDir}`)} directory`;
        const bootStrapMsg = config_1.ironlauncherConfig.isCurrentFolder
            ? `Projected bootstrapped successfully. \n\nYou can now open the current directory with your code editor`
            : `Project bootstrapped successfully.\n\nYou can now cd ./${outDir}`;
        const type = "success";
        (0, cli_alerts_1.default)({
            type,
            name: `ALL DONE`,
            msg: createdMsg,
        });
        (0, cli_alerts_1.default)({
            type,
            name: `DONE`,
            msg: bootStrapMsg,
        });
    });
}
exports.install = install;
class MakeInstall {
    static install(basePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let mainClass;
            const { template } = config_1.ironlauncherConfig;
            if (template === "fullstack") {
                const client = (0, path_1.join)(basePath, "client");
                const server = (0, path_1.join)(basePath, "server");
                mainClass = new version_1.FullStack({ bePrefix: server, fePrefix: client });
            }
            else if (template === "json") {
                mainClass = new version_1.JSONInstaller(basePath);
            }
            else if (template === "views") {
                mainClass = new version_1.Views(basePath);
            }
            yield mainClass.install();
        });
    }
}
exports.MakeInstall = MakeInstall;
