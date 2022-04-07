"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpText = exports.FLAGS = void 0;
const cli_meow_help_1 = __importDefault(require("cli-meow-help"));
exports.FLAGS = ["json", "auth", "fs"];
const flags = {
    json: {
        type: "boolean",
        default: false,
        desc: "Creates an opinionated json server setup with express",
    },
    auth: {
        type: "boolean",
        desc: `Adds auth behavior`,
    },
    fs: {
        type: "boolean",
        default: false,
        desc: "Creates an opinionated express and create-react-app setup",
    },
};
const commands = {
    "<name>": {
        desc: `The name of the project will be added as the path to mongodb and package.json`,
    },
    "<command>": {
        desc: "The commands are chainable. Which means you can ask for json and auth, or fs and auth. See commands below 👇",
    },
    help: {
        desc: "Print help info",
    },
};
exports.helpText = (0, cli_meow_help_1.default)({ flags, commands, name: "ironlauncher" });
