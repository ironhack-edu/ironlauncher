'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('@swan-io/boxed');
var unhandled = require('cli-handle-unhandled');
var welcome = require('cli-welcome');
var util = require('util');
var child_process = require('child_process');
var minimist = require('minimist');
var meowHelp = require('cli-meow-help');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var unhandled__default = /*#__PURE__*/_interopDefaultLegacy(unhandled);
var welcome__default = /*#__PURE__*/_interopDefaultLegacy(welcome);
var minimist__default = /*#__PURE__*/_interopDefaultLegacy(minimist);
var meowHelp__default = /*#__PURE__*/_interopDefaultLegacy(meowHelp);

// source/index.ts

// source/cmd/inputs/input.utils.ts
function promptOptions(args2 = {}) {
  const { exitter = process.exit, logger = console.error } = args2;
  return {
    onCancel(data) {
      logger(`You did not set a ${data.name} and canceled the ironlauncher`);
      exitter(1);
    }
  };
}
var Variant = /* @__PURE__ */ ((Variant2) => {
  Variant2[Variant2["NoAuth"] = 0] = "NoAuth";
  Variant2[Variant2["Auth"] = 1] = "Auth";
  return Variant2;
})(Variant || {});

// package.json
var version = "0.36.0";
var description = "Project Bootstraper for the Ironhack Stack";
util.promisify(child_process.exec);
function getPkgDescription(pkgJson = description) {
  return pkgJson.trim();
}
function getPkgLocalVersion(pkgJson = version) {
  return pkgJson.trim();
}

// source/utils/init.ts
function init() {
  unhandled__default["default"]();
  welcome__default["default"]({
    bgColor: "#2dc5fa",
    description: getPkgDescription(),
    color: "#333",
    version: getPkgLocalVersion(),
    clear: true,
    bold: true,
    title: "IronLauncher",
    tagLine: "by Ironhack"
  });
}

// source/config/make-config/name.ts
async function getName() {
}
function add(...args2) {
  return args2.reduce((a, b) => a + b, 0);
}

// source/shared/consts.ts
var IHL_FLAGS = {
  views: ["views"],
  json: ["json", "JSON"],
  fs: ["fs", "fullStack", "fullstack", "full-stack"],
  pnpm: ["pnpm", "p"],
  dryRun: ["dry-run", "dryRun"],
  help: ["help", "h"],
  skipInstall: ["skip-install", "skipInstall"]
};

// source/cli/flags/helper-text.ts
var flagKeys = {
  views: IHL_FLAGS.views[0],
  json: IHL_FLAGS.json[0],
  fs: IHL_FLAGS.fs[0],
  help: IHL_FLAGS.help[0],
  pnpm: IHL_FLAGS.pnpm[0],
  skipInstall: IHL_FLAGS.skipInstall[0],
  dryRun: IHL_FLAGS.dryRun[0]
};
var flags = {
  [flagKeys.views]: {
    type: "boolean",
    default: true,
    desc: "Creates an opinionated views server with express and handlebars"
  },
  [flagKeys.json]: {
    type: "boolean",
    default: false,
    desc: "Creates an opinionated json server with express "
  },
  [flagKeys.fs]: {
    type: "boolean",
    default: false,
    desc: "Creates an opinionated express and create-react-app setup"
  },
  [flagKeys.help]: {
    type: "boolean",
    default: false,
    desc: "Displays help instructions"
  },
  [flagKeys.pnpm]: {
    type: "boolean",
    default: false,
    desc: "Installs dependencies through pnpm, assuming you have it installed",
    alias: "p"
  },
  [flagKeys.skipInstall]: {
    type: "boolean",
    default: false,
    desc: "Decides wether it should skip installation of dependencies or not"
  },
  [flagKeys.dryRun]: {
    type: "boolean",
    default: false,
    desc: "Does a dry run. IE does all necessary validation, however it does not move any file, nor does it install anything"
  }
};
var commands = {
  "<name>": {
    desc: "The name of the project will be added as the path to mongodb and package.json"
  },
  "<command>": {
    desc: "Some flags are chainable. You can request the project to be installed with pnpm and request a express/views application"
  },
  help: {
    desc: "Prints help info"
  }
};
var helpText = meowHelp__default["default"]({ flags, commands, name: "ironlauncher" });

// source/index.ts
var auth = 0 /* NoAuth */;
async function hello() {
  {
    return "";
  }
}
async function main() {
  init();
}
main();
var args = minimist__default["default"](process.argv.slice(2));
console.log("args:", args);
console.log("helpText:", helpText);
console.log(Object.keys(process.env).filter((e) => /ironlauncher/gi.test(e)));

exports.Variant = Variant;
exports.add = add;
exports.auth = auth;
exports.getName = getName;
exports.hello = hello;
exports.promptOptions = promptOptions;
