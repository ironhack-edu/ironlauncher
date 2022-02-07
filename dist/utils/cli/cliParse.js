"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getName = exports.getProjectName = exports.displayHelp = exports.flags = exports.__ = exports.inputs = void 0;
const minimist_1 = __importDefault(require("minimist"));
const validator_1 = require("../../core/validator");
const helpText_1 = require("./helpText");
const args = (0, minimist_1.default)(process.argv.slice(2), {});
exports.inputs = args._, exports.__ = args["--"], exports.flags = __rest(args, ["_", "--"]);
const displayHelp = () => {
    return exports.inputs.includes("help") || !!args["help"];
};
exports.displayHelp = displayHelp;
const getProjectName = () => {
    const nameValidator = new validator_1.NameValidator();
    let name = exports.inputs[0];
    let warnings = [];
    for (let key in exports.flags) {
        const val = exports.flags[key];
        if (typeof val !== "boolean") {
            warnings.push(val);
        }
    }
    if (warnings.length) {
        return {
            currentName: name,
            warnings,
        };
    }
    return {
        currentName: name,
    };
};
exports.getProjectName = getProjectName;
function getName() {
    let [name = ""] = exports.inputs;
    const newFlags = {};
    const isValid = validator_1.NameValidator.validate(name);
    const isValidName = typeof isValid === "boolean";
    for (const key in exports.flags) {
        const value = exports.flags[key];
        if (helpText_1.FLAGS.includes(key)) {
            if (typeof value === "string") {
                if (value === "true") {
                    newFlags[key] = true;
                }
                else if (value === "false") {
                    newFlags["key"] = false;
                }
                else {
                    if (!name) {
                        if (!isValidName) {
                            name = value;
                        }
                    }
                    newFlags[key] = true;
                }
            }
            else {
                newFlags[key] = value;
            }
        }
    }
    if (isValidName) {
        return { name };
    }
    return {
        name: "",
        issue: isValid,
    };
}
exports.getName = getName;
