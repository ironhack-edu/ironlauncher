#!/usr/bin/env node
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
const create_template_folder_1 = require("create-template-folder");
const config_1 = require("./config");
const cmd_1 = require("./core/cmd");
const install_1 = require("./core/install/install");
const logger_1 = require("./core/logger");
const cli_1 = require("./utils/cli");
const init_1 = require("./utils/init");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // init()o;
        (0, init_1.init)();
        if (config_1.ironlauncherConfig.displayHelp) {
            if (config_1.ironlauncherConfig.devMode) {
                return logger_1.logger.greenAndRest({ inGreen: "HELP", rest: "asked by user" });
            }
            else {
                return logger_1.logger.log(cli_1.helpText);
            }
        }
        yield config_1.ironlauncherConfig.init();
        // ironlauncherConfig.debug();
        if (config_1.ironlauncherConfig.isOutOfSync) {
            return logger_1.logger.error(`Packages are out of sync. Please run command again with @latest in front of the package`); // TODO: ADD SOME LOGGING MESSAGE HERE
        }
        if (config_1.ironlauncherConfig.devMode) {
            config_1.ironlauncherConfig.debug();
        }
        const newInDirPath = cmd_1.FolderOps.inDirectory();
        const outDirPath = cmd_1.FolderOps.outDirectory(config_1.ironlauncherConfig.name);
        // return;
        const vars = { name: config_1.ironlauncherConfig.name };
        const templatedFiles = yield (0, create_template_folder_1.createTemplateFolder)({
            inDir: newInDirPath,
            outDir: outDirPath,
            vars,
        }, {
            dryRun: config_1.ironlauncherConfig.dryRun,
        });
        yield (0, install_1.install)(outDirPath, templatedFiles);
    });
}
main();
