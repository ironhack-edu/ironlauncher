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
const fs_1 = __importDefault(require("fs"));
const prompts_1 = __importDefault(require("prompts"));
const util_1 = require("util");
const cmd_1 = require("../cmd");
const validator_1 = require("../validator");
const readdir = (0, util_1.promisify)(fs_1.default.readdir);
class GetInputs {
    static getName() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, prompts_1.default)({
                name: "name",
                type: "text",
                message: "Project name?",
                validate: validator_1.NameValidator.validate,
            }, {
                onCancel: this.onCancel,
            });
        });
    }
    static getVariant() {
        return (0, prompts_1.default)({
            name: "variant",
            type: "select",
            message: "Do you want to have auth already built?",
            initial: 0,
            choices: [
                {
                    title: "No, thank you 🚀",
                    value: 0,
                },
                { title: "Yes, please 💪", value: 1 },
            ],
        }, {
            onCancel: this.onCancel,
        });
    }
    static getProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectFolders = yield readdir(cmd_1.FolderOps.templatesDir);
            const onlyDirs = [...projectFolders]
                .filter((e) => !/\./.test(e))
                .sort((a, b) => b.localeCompare(a));
            return (0, prompts_1.default)([
                {
                    name: "project",
                    type: "select",
                    message: "Which kind?",
                    initial: 0,
                    choices: onlyDirs.map((e) => {
                        return {
                            title: e,
                            value: e,
                        };
                    }),
                },
            ], {
                onCancel: this.onCancel,
            });
        });
    }
    static onCancel(data) {
        console.log(`You did not set a ${data.name} and canceled the ironlauncher`);
        process.exit(1);
    }
}
exports.default = GetInputs;
