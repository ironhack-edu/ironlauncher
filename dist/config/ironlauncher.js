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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _IronLauncher_instances, _IronLauncher_auth, _IronLauncher_base, _IronLauncher_views, _IronLauncher_json, _IronLauncher_fs, _IronLauncher_dryRun, _IronLauncher_devMode, _IronLauncher_verbose, _IronLauncher_displayHelp, _IronLauncher_name, _IronLauncher_isOutOfSync, _IronLauncher_isCurrentFolder, _IronLauncher_isPnpm, _IronLauncher_skipInstall, _IronLauncher_setDebug, _IronLauncher_setSkipInstall, _IronLauncher_setPackageManagers, _IronLauncher_setName, _IronLauncher_setDisplayHelp, _IronLauncher_setDryRun, _IronLauncher_setBase, _IronLauncher_setViews, _IronLauncher_setFs, _IronLauncher_setJson, _IronLauncher_setVerbose, _IronLauncher_setAuth, _IronLauncher_isBoolean;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const GetInputs_1 = __importDefault(require("../core/inputs/GetInputs"));
const Package_1 = require("../core/pkg/Package");
const validator_1 = require("../core/validator");
const cli_1 = require("../utils/cli");
class IronLauncher {
    // Constructor
    constructor(flags, inputs) {
        this.flags = flags;
        this.inputs = inputs;
        _IronLauncher_instances.add(this);
        // Initial Values
        _IronLauncher_auth.set(this, false);
        _IronLauncher_base.set(this, false);
        _IronLauncher_views.set(this, false);
        _IronLauncher_json.set(this, false);
        _IronLauncher_fs.set(this, false);
        _IronLauncher_dryRun.set(this, false);
        _IronLauncher_devMode.set(this, false);
        _IronLauncher_verbose.set(this, false);
        _IronLauncher_displayHelp.set(this, false);
        _IronLauncher_name.set(this, "");
        _IronLauncher_isOutOfSync.set(this, false);
        _IronLauncher_isCurrentFolder.set(this, false);
        _IronLauncher_isPnpm.set(this, false);
        _IronLauncher_skipInstall.set(this, false);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setAuth).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setBase).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setVerbose).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setJson).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setViews).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setFs).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setDryRun).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setDisplayHelp).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setName).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setPackageManagers).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setSkipInstall).call(this);
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_setDebug).call(this);
    }
    // GETTERS
    get name() {
        return __classPrivateFieldGet(this, _IronLauncher_name, "f");
    }
    get packageManager() {
        if (__classPrivateFieldGet(this, _IronLauncher_isPnpm, "f") && !this.dryRun) {
            return `pnpm`;
        }
        return "npm";
    }
    get variant() {
        if (__classPrivateFieldGet(this, _IronLauncher_auth, "f")) {
            return "authentication";
        }
        return "base";
    }
    get base() {
        return __classPrivateFieldGet(this, _IronLauncher_base, "f");
    }
    get skipInstall() {
        return __classPrivateFieldGet(this, _IronLauncher_skipInstall, "f");
    }
    get template() {
        if (this.fs) {
            return "fullstack";
        }
        if (this.json) {
            return "json";
        }
        return "views";
    }
    get views() {
        return __classPrivateFieldGet(this, _IronLauncher_views, "f");
    }
    get verbose() {
        return __classPrivateFieldGet(this, _IronLauncher_verbose, "f");
    }
    get isPnpm() {
        return __classPrivateFieldGet(this, _IronLauncher_isPnpm, "f");
    }
    get devMode() {
        return __classPrivateFieldGet(this, _IronLauncher_devMode, "f");
    }
    get fs() {
        return __classPrivateFieldGet(this, _IronLauncher_fs, "f");
    }
    get json() {
        return __classPrivateFieldGet(this, _IronLauncher_json, "f");
    }
    get dryRun() {
        return __classPrivateFieldGet(this, _IronLauncher_dryRun, "f");
    }
    get auth() {
        return __classPrivateFieldGet(this, _IronLauncher_auth, "f");
    }
    get displayHelp() {
        return __classPrivateFieldGet(this, _IronLauncher_displayHelp, "f");
    }
    get isOutOfSync() {
        return __classPrivateFieldGet(this, _IronLauncher_isOutOfSync, "f");
    }
    get isCurrentFolder() {
        return __classPrivateFieldGet(this, _IronLauncher_isCurrentFolder, "f");
    }
    // Methods
    debug() {
        console.log(`---- TEMPLATE ----`);
        console.log(`TEMPLATE: - ${this.template}`);
        console.log(`---- VARIANT ----`);
        console.log(`VARIANT: ${__classPrivateFieldGet(this, _IronLauncher_auth, "f") ? "auth" : __classPrivateFieldGet(this, _IronLauncher_base, "f") ? "base" : "not_defined"}`);
        console.log(`NAME: ${this.name}`);
        console.log(`---- DEBUG ----`);
        console.log(`DRYRUN: ${this.dryRun}`);
        console.log(`---- displayHelp ----`);
        console.log(`DISPLAY_HELP: ${this.displayHelp}`);
    }
    get variantDefined() {
        return __classPrivateFieldGet(this, _IronLauncher_base, "f") || __classPrivateFieldGet(this, _IronLauncher_auth, "f");
    }
    get templateDefined() {
        return __classPrivateFieldGet(this, _IronLauncher_json, "f") || __classPrivateFieldGet(this, _IronLauncher_fs, "f") || __classPrivateFieldGet(this, _IronLauncher_views, "f");
    }
    arrangeName() {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = yield GetInputs_1.default.getName();
            __classPrivateFieldSet(this, _IronLauncher_name, name.replace(/\s+/g, "-"), "f");
        });
    }
    arrangeVariant() {
        return __awaiter(this, void 0, void 0, function* () {
            const { variant } = yield GetInputs_1.default.getVariant();
            if (variant) {
                __classPrivateFieldSet(this, _IronLauncher_auth, true, "f");
            }
            else {
                __classPrivateFieldSet(this, _IronLauncher_base, true, "f");
            }
        });
    }
    arrangeTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            const { project } = yield GetInputs_1.default.getProject();
            if (project === "fullstack") {
                __classPrivateFieldSet(this, _IronLauncher_fs, true, "f");
            }
            // @ts-ignore
            if (project === "json") {
                __classPrivateFieldSet(this, _IronLauncher_json, true, "f");
            }
            // @ts-ignore
            if (project === "views") {
                __classPrivateFieldSet(this, _IronLauncher_views, true, "f");
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.devMode) {
                const isBad = yield Package_1.Package.isOutOfSync();
                __classPrivateFieldSet(this, _IronLauncher_isOutOfSync, isBad, "f");
                if (isBad) {
                    return;
                }
            }
            if (!this.name) {
                yield this.arrangeName();
            }
            if (!this.templateDefined) {
                yield this.arrangeTemplate();
            }
            if (!this.variantDefined) {
                yield this.arrangeVariant();
            }
        });
    }
}
_IronLauncher_auth = new WeakMap(), _IronLauncher_base = new WeakMap(), _IronLauncher_views = new WeakMap(), _IronLauncher_json = new WeakMap(), _IronLauncher_fs = new WeakMap(), _IronLauncher_dryRun = new WeakMap(), _IronLauncher_devMode = new WeakMap(), _IronLauncher_verbose = new WeakMap(), _IronLauncher_displayHelp = new WeakMap(), _IronLauncher_name = new WeakMap(), _IronLauncher_isOutOfSync = new WeakMap(), _IronLauncher_isCurrentFolder = new WeakMap(), _IronLauncher_isPnpm = new WeakMap(), _IronLauncher_skipInstall = new WeakMap(), _IronLauncher_instances = new WeakSet(), _IronLauncher_setDebug = function _IronLauncher_setDebug() {
    const { debug = false } = this.flags;
    const isDev = process.env.DEV === "true";
    __classPrivateFieldSet(this, _IronLauncher_devMode, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, isDev) || __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, debug), "f");
}, _IronLauncher_setSkipInstall = function _IronLauncher_setSkipInstall() {
    const { ["skip-install"]: skipInstall } = this.flags;
    __classPrivateFieldSet(this, _IronLauncher_skipInstall, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, skipInstall), "f");
}, _IronLauncher_setPackageManagers = function _IronLauncher_setPackageManagers() {
    const { p = false, pnpm = false } = this.flags;
    __classPrivateFieldSet(this, _IronLauncher_isPnpm, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, p) || __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, pnpm), "f");
}, _IronLauncher_setName = function _IronLauncher_setName() {
    // const {inputs, flags} = this
    let [name = ""] = this.inputs;
    const isEmpty = !validator_1.FsValidator.dirNotEmpty();
    if (name.trim() === "." && !isEmpty) {
        return;
    }
    if (name.trim() === ".") {
        __classPrivateFieldSet(this, _IronLauncher_name, process.cwd().split(path_1.sep).slice(-1)[0], "f");
        __classPrivateFieldSet(this, _IronLauncher_isCurrentFolder, true, "f");
        return;
    }
    const exists = validator_1.FsValidator.folderExists(name);
    if (exists) {
        return;
    }
    __classPrivateFieldSet(this, _IronLauncher_name, name, "f");
}, _IronLauncher_setDisplayHelp = function _IronLauncher_setDisplayHelp(startingValue = false) {
    const { help, h } = this.flags;
    const isHelpInFlags = Object.values(this.flags).includes("help");
    __classPrivateFieldSet(this, _IronLauncher_displayHelp, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, help) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, h) ||
        this.inputs.includes("help") ||
        isHelpInFlags, "f");
}, _IronLauncher_setDryRun = function _IronLauncher_setDryRun(startingValue = false) {
    const { ["dry-run"]: dryRun = false, dryRun: dryRunCommand } = this.flags;
    __classPrivateFieldSet(this, _IronLauncher_dryRun, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, dryRun) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, dryRunCommand), "f");
}, _IronLauncher_setBase = function _IronLauncher_setBase(startingValue = false) {
    const { base, b } = this.flags;
    __classPrivateFieldSet(this, _IronLauncher_base, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, base) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, b), "f");
}, _IronLauncher_setViews = function _IronLauncher_setViews(startingValue = false) {
    const { views } = this.flags;
    __classPrivateFieldSet(this, _IronLauncher_views, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, startingValue) || __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, views), "f");
}, _IronLauncher_setFs = function _IronLauncher_setFs(startingValue = false) {
    const { fs, fullStack, fullstack } = this.flags;
    __classPrivateFieldSet(this, _IronLauncher_fs, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, fs) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, fullStack) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, fullstack), "f");
}, _IronLauncher_setJson = function _IronLauncher_setJson(startingValue = false) {
    const { json } = this.flags;
    __classPrivateFieldSet(this, _IronLauncher_json, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, startingValue) || __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, json), "f");
}, _IronLauncher_setVerbose = function _IronLauncher_setVerbose(startingValue = false) {
    const { v, verbose } = this.flags;
    __classPrivateFieldSet(this, _IronLauncher_verbose, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, v) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, verbose), "f");
}, _IronLauncher_setAuth = function _IronLauncher_setAuth(startingValue = false) {
    const { a = false, auth = false } = this.flags;
    __classPrivateFieldSet(this, _IronLauncher_auth, __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, a) ||
        __classPrivateFieldGet(this, _IronLauncher_instances, "m", _IronLauncher_isBoolean).call(this, auth), "f");
}, _IronLauncher_isBoolean = function _IronLauncher_isBoolean(option = false) {
    return ((typeof option === "boolean" ||
        JSON.parse(JSON.stringify(option)) === "boolean") &&
        option == true);
};
const ironlauncherConfig = new IronLauncher(cli_1.flags, cli_1.inputs);
exports.default = ironlauncherConfig;
