'use strict';

var minimist = require('minimist');
var theTemplator = require('the-templator');
var meowHelp = require('cli-meow-help');
var boxed = require('@swan-io/boxed');
var groupBy = require('just-group-by');
var child_process = require('child_process');
var unhandled = require('cli-handle-unhandled');
var welcome = require('cli-welcome');
var util = require('util');
var path = require('path');
var prompts = require('prompts');
var fs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var minimist__default = /*#__PURE__*/_interopDefaultLegacy(minimist);
var meowHelp__default = /*#__PURE__*/_interopDefaultLegacy(meowHelp);
var groupBy__default = /*#__PURE__*/_interopDefaultLegacy(groupBy);
var unhandled__default = /*#__PURE__*/_interopDefaultLegacy(unhandled);
var welcome__default = /*#__PURE__*/_interopDefaultLegacy(welcome);
var prompts__default = /*#__PURE__*/_interopDefaultLegacy(prompts);

// source/index.ts

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
var makeCommand = (func = child_process.spawn) => {
  return (command, verbose) => {
    console.log("verbose:", verbose);
    return new Promise((resolve, reject) => {
      const childProcess = func(command, {
        stdio: verbose ? "inherit" : "ignore",
        shell: true
      });
      childProcess.on("close", resolve);
      childProcess.on("error", reject);
    });
  };
};
var runCommand = makeCommand();

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

// source/utils/strip-whitespaces.ts
function stripWhitespaces(string) {
  return string.replaceAll(/\s+/g, "-");
}

// source/utils/bool-helpers.ts
function isBoolean(option) {
  if (typeof option === "string") {
    return option.trim() === "true";
  }
  return option === true;
}
function handleBooleanValues(...options) {
  return options.some((opt) => isBoolean(opt));
}

// source/utils/nodejs-fs-error.ts
var NodeFSError = class extends Error {
  errno;
  code;
  path;
  stack;
  constructor(error) {
    const err = error;
    super(err == null ? void 0 : err.message);
    this.name = "NodeJsFSError";
    this.cause = err == null ? void 0 : err.cause;
    this.errno = err == null ? void 0 : err.errno;
    this.stack = err == null ? void 0 : err.stack;
    this.path = err == null ? void 0 : err.path;
  }
};
var makeMoveToFolder = (func = process.chdir) => {
  return ({ directory, dryRun }) => {
    if (dryRun) {
      return boxed.Result.Ok(void 0);
    }
    return boxed.Result.fromExecution(() => func(directory));
  };
};
var moveToFolder = makeMoveToFolder();

// source/cmd/installer/command-runner.ts
var makeCommandRunner = (opts = {}) => {
  const { moveToOtherFolder = moveToFolder, runCommandFunc = runCommand } = opts;
  return async ({ deps, isDryRun, isPnpm }) => {
    const organizeByPaths = groupBy__default["default"](deps, ({ path }) => path);
    for (const [path, allDeps] of Object.entries(organizeByPaths)) {
      moveToOtherFolder({ directory: path, dryRun: isDryRun });
      const seperateDev = groupBy__default["default"](
        allDeps.map((e) => ({ ...e, dev: e.dev || false })),
        (dep) => dep.dev.toString()
      );
      for (const [devStatus, packages] of Object.entries(seperateDev)) {
        const command = makeCommandBase({ isDryRun, isPnpm }, true).join(" ");
        const dependenciesToInstall = packages.map((e) => e.name).join(" ");
        await runCommandFunc(`${command} ${dependenciesToInstall}`, true);
      }
    }
    return boxed.Result.Ok(void 0);
  };
};
function getPackageManager(value) {
  if (handleBooleanValues(!value.isDryRun, value.isPnpm)) {
    return "pnpm";
  }
  return "npm";
}
function getInstallCommand(packageManager) {
  if (packageManager === "pnpm") {
    return "add";
  }
  return "install";
}
function getDryRunCommand(value) {
  if (value.isDryRun) {
    return "--dry-run";
  }
  return "";
}
function getIsDevCommand(isDev = false) {
  return isDev ? "-D" : "";
}
function makeCommandBase(config, isDev = false) {
  const packageManager = getPackageManager(config);
  const installCommand = getInstallCommand(packageManager);
  const isDevCommand = getIsDevCommand(isDev);
  const dryRunCommand = getDryRunCommand(config);
  return [packageManager, installCommand, isDevCommand, dryRunCommand];
}

// source/cmd/installer/deps/fs.deps.ts
var REACT_DEPS = [
  {
    name: "react"
  },
  {
    name: "react-dom"
  },
  {
    name: "react-scripts"
  },
  {
    name: "react-router-dom"
  },
  {
    name: "axios"
  },
  {
    name: "@testing-library/jest-dom",
    dev: true
  },
  {
    name: "@testing-library/react",
    dev: true
  },
  {
    name: "@testing-library/user-event",
    dev: true
  }
];

// source/cmd/installer/deps/base-backend.deps.ts
var BASE_BACKEND_DEPS = [
  {
    name: "dotenv"
  },
  {
    name: "express"
  },
  {
    name: "mongoose"
  },
  {
    name: "morgan"
  },
  {
    name: "bcrypt"
  },
  {
    name: "nodemon",
    dev: true
  }
];

// source/cmd/installer/deps/json.deps.ts
var JSON_DEPS = [
  ...BASE_BACKEND_DEPS,
  {
    name: "express-jwt"
  },
  {
    name: "jsonwebtoken"
  }
];

// source/cmd/installer/deps/views.deps.ts
var VIEWS_DEPS = [
  ...BASE_BACKEND_DEPS,
  {
    name: "hbs"
  },
  {
    name: "serve-favicon"
  },
  {
    name: "cookie-parser"
  },
  {
    name: "express-session"
  },
  {
    name: "connect-mongo"
  }
];
function assertCannotReach(x) {
  throw new Error("this should never ever be reached");
}
function makeTemplateArr(template, fn) {
  switch (template) {
    case "fullstack": {
      return fn([REACT_DEPS, JSON_DEPS]);
    }
    case "views": {
      return fn([VIEWS_DEPS]);
    }
    case "json": {
      return fn([JSON_DEPS]);
    }
    default: {
      assertCannotReach();
      return fn([]);
    }
  }
}
function makePathsToProjects(outDir, template) {
  switch (template) {
    case "fullstack": {
      return makeTemplateArr(template, (deps) => {
        const [client, server] = deps;
        const clientPath = path.join(outDir, "client");
        const serverPath = path.join(outDir, "server");
        const clientDeps = client.map((dep) => ({
          ...dep,
          path: clientPath
        }));
        const serverDeps = server.map((dep) => ({ ...dep, path: serverPath }));
        return [...clientDeps, ...serverDeps];
      });
    }
    default: {
      return makeTemplateArr(template, (deps) => {
        const [allDeps] = deps;
        return allDeps.map((dep) => ({ ...dep, path: outDir }));
      });
    }
  }
}
async function logFiles(fileNames, name2) {
  console.log();
  console.log(`ting files in ./$${path.basename(name2)}`);
  fileNames.forEach((filePath) => {
    const fileName = path.basename(filePath);
    console.log(`CREATED: ${fileName}`);
  });
  console.log();
}
function getTemplateDir() {
  return path.join(process.cwd(), "template");
}

// source/cmd/paths/in-dir.ts
function getInDir({ template }) {
  return path.join(getTemplateDir(), template, "authentication");
}
function getOutDir(config) {
  return path.join(process.cwd(), config.name);
}

// source/cmd/inputs/input.utils.ts
function promptOptions(args = {}) {
  const { exitter = process.exit, logger = console.error } = args;
  return {
    onCancel(data) {
      logger(`You did not set a ${data.name} and canceled the ironlauncher`);
      exitter(1);
    }
  };
}

// source/cmd/inputs/input-errors.ts
var NoSuchFolderError = class extends Error {
  constructor(path) {
    super(`There is no such folder -> ${path}`);
    this.name = "NoSuchFolderError";
  }
};
var DirectoryTakenError = class extends Error {
  constructor(path) {
    super(`The directory is already taken -> ${path}`);
    this.name = "DirectoryTakenError";
  }
};
var DirNotEmptyError = class extends Error {
  constructor(path = process.cwd()) {
    if (path === process.cwd()) {
      super(`Please choose a different name. Current directory is not empty
`);
    } else {
      super(
        `Please choose a different name. Target dir not empty -> ${path}
`
      );
    }
    this.name = "DirNotEmptyError";
  }
};
var NoValueError = class extends Error {
  constructor() {
    super("Please add a value\n");
  }
};

// source/cmd/inputs/validator.ts
function folderExists(folderName, func = fs.existsSync) {
  return boxed.Result.fromExecution(() => func(folderName));
}
function currentDirEmpty(func = fs.readdirSync) {
  return targetDirEmpty(process.cwd(), { readDirFunc: func });
}
function targetDirNotEmpty(target, injections = {}) {
  const { existsFunc = fs.existsSync, readDirFunc = fs.readdirSync } = injections;
  const resultOfExists = folderExists(target, existsFunc);
  return resultOfExists.flatMap((value) => {
    if (!value) {
      return boxed.Result.Error(new NoSuchFolderError(target));
    }
    const targetDir = boxed.Result.fromExecution(
      () => readDirFunc(target)
    );
    return targetDir.map((elementsInFolder) => !!elementsInFolder.length);
  }).flatMapError(() => boxed.Result.Error(new NoSuchFolderError(target)));
}
function targetDirEmpty(target, injections = {}) {
  return targetDirNotEmpty(target, injections).map((e) => !e);
}
var CURRENT_FOLDER_PATH = ".";
function validateCurrentFolder() {
  const result = currentDirEmpty().flatMap(
    (value) => value ? boxed.Result.Ok(value) : boxed.Result.Error(new DirNotEmptyError())
  );
  if (result.isError()) {
    return result.value.message;
  }
  return true;
}
function validateName(value) {
  if (value === CURRENT_FOLDER_PATH) {
    return validateCurrentFolder();
  }
  if (!value) {
    return new NoValueError().message;
  }
  const val = stripWhitespaces(value);
  const folderName = value.includes(process.cwd()) ? val : path.join(process.cwd(), val);
  const exists = folderExists(folderName).match({
    Error() {
      return false;
    },
    Ok: (v) => v
  });
  if (exists) {
    return new DirNotEmptyError(val).message;
  }
  return true;
}

// source/cmd/inputs/ask-name.ts
async function askName(args = {}) {
  const { name: name2 } = await prompts__default["default"](
    {
      name: "name",
      type: "text",
      message: "Project name?",
      validate: validateName
    },
    promptOptions(args)
  );
  return name2;
}
function fromTruthy(val) {
  const value = val ?? null;
  return boxed.Option.fromNull(value);
}

// source/utils/validate-keys-in-obj.ts
function validateKeysInObj(obj, arr) {
  const keys = {};
  arr.forEach((opt) => {
    const option = opt;
    keys[option] = obj[option] ?? false;
  });
  return keys;
}

// source/cli/flags/flags.ts
function flagsData(flags2 = {}) {
  const auth = getFlagsAuth(flags2);
  const template = getFlagsProjectVariant(flags2);
  const isSkipInstall = getFlagsSkipInstall(flags2);
  const isDryRun = getFlagsDryRun(flags2);
  const isPnpm = getFlagsIsPnpm(flags2);
  const isHelp = getFlagsHelp(flags2);
  return {
    auth,
    template,
    isSkipInstall,
    isDryRun,
    isPnpm,
    isHelp
  };
}
var getFlagsProjectVariant = (flags2 = {}) => {
  return fromTruthy(flags2).flatMap((e) => {
    if (getFlagsView(e)) {
      return boxed.Option.Some("views");
    }
    if (getFlagsJson(e)) {
      return boxed.Option.Some("json");
    }
    if (getFlagsFs(e)) {
      return boxed.Option.Some("fullstack");
    }
    return boxed.Option.None();
  });
};
var getFlagsAuth = (flags2) => {
  if (getFlagsAuthSession(flags2)) {
    return "session";
  }
  return "jwt";
};
var getFlagsIsPnpm = (flags2 = {}) => {
  return getInfoFromFlags(flags2, IHL_FLAGS.pnpm);
};
var getFlagsView = (flags2 = {}) => {
  return getInfoFromFlags(flags2, IHL_FLAGS.views);
};
var getFlagsJson = (flags2 = {}) => {
  return getInfoFromFlags(flags2, IHL_FLAGS.json);
};
var getFlagsFs = (flags2 = {}) => {
  return getInfoFromFlags(flags2, IHL_FLAGS.fs);
};
var getFlagsAuthSession = (flags2 = {}) => {
  return flags2.auth === "session";
};
var getFlagsHelp = (flags2 = {}) => {
  return getInfoFromFlags(flags2, IHL_FLAGS.help);
};
function getInfoFromFlags(flags2, arr) {
  return handleBooleanValues(
    ...Object.values(validateKeysInObj(flags2, arr))
  );
}
var getFlagsSkipInstall = (flags2 = {}) => {
  return getInfoFromFlags(flags2, IHL_FLAGS.skipInstall);
};
var getFlagsDryRun = (flags2 = {}) => {
  return getInfoFromFlags(flags2, IHL_FLAGS.dryRun);
};

// source/cli/inputs/help.input.ts
function getIsHelpInInputs(inputs2 = []) {
  return inputs2.includes("help");
}
var makeReadDirFunc = (deps = {}) => {
  return (target) => {
    const { readDir = fs.readdirSync } = deps;
    return boxed.Result.fromExecution(() => readDir(target)).mapError(
      (err) => new NodeFSError(err)
    );
  };
};

// source/lib/fs/dir-empty/dir-empty.ts
var makeDirEmptyFunc = (deps = {}) => {
  return (target) => {
    const { readDir = fs.readdirSync } = deps;
    const func = makeReadDirFunc({ readDir });
    return func(target).map((val) => !val.length);
  };
};

// source/lib/fs/folder-exists/folderExists.types.ts
var InvalidFolderPathError = class extends Error {
  constructor() {
    super("[Ironlauncher ERROR] - name must be single word");
    this.name = "InvalidFolderPathError";
  }
};

// source/lib/fs/folder-exists/folderExists.ts
var makeExistsFolder = (existsFunc = fs.accessSync) => {
  return (folderName) => {
    if (folderName.split(path.sep).length > 1) {
      return boxed.Result.Error(new InvalidFolderPathError());
    }
    return boxed.Result.fromExecution(
      () => existsFunc(path.join(process.cwd(), folderName))
    ).map(() => true);
  };
};

// source/cli/inputs/name.input.ts
var makeGetNameIsInInputs = (deps = {}) => {
  const { dirEmpty = makeDirEmptyFunc, folderExists: folderExists2 = makeExistsFolder } = deps;
  const isEmpty = dirEmpty();
  const isFolderExists = folderExists2();
  return (inputs2) => {
    return fromTruthy(inputs2).flatMap((inputArr) => {
      const firstEl = inputArr[0];
      return firstEl ? boxed.Option.Some(firstEl) : boxed.Option.None();
    }).flatMap((folderName) => {
      if (folderName === ".") {
        return isEmpty(process.cwd()).match({
          Ok(value) {
            return value ? boxed.Option.Some(path.basename(process.cwd())) : boxed.Option.None();
          },
          Error() {
            return boxed.Option.None();
          }
        });
      }
      return isFolderExists(folderName).match({
        Error() {
          return boxed.Result.Ok(folderName);
        },
        Ok(value) {
          if (value) {
            return boxed.Result.Error(new DirectoryTakenError(folderName));
          }
          return boxed.Result.Ok(folderName);
        }
      }).toOption();
    });
  };
};

// source/env/retrieve-env.ts
function isShowAllFlags(env) {
  return handleBooleanValues(env["IHL_ALL" /* IHL_ALL */]);
}
function isVerboseIHL(env) {
  return handleBooleanValues(env["IHL_VERBOSE" /* IHL_VERBOSE */]);
}
function getEnvInfo(env = process.env) {
  return {
    isShowAll: isShowAllFlags(env),
    isVerbose: isVerboseIHL(env)
  };
}
var makeGetAllDirsFunc = (deps = {}) => {
  return (target) => {
    const { readDir = fs.readdirSync } = deps;
    return boxed.Result.fromExecution(() => readDir(target, { withFileTypes: true })).mapError((err) => new NodeFSError(err)).map(
      (dirent) => dirent.filter((e) => e.isDirectory()).map((folder) => {
        return {
          title: folder.name,
          value: path.join(target, folder.name)
        };
      })
    );
  };
};

// source/cmd/inputs/ask-template.ts
async function askProjectType(choices, args = {}) {
  const readDir = makeGetAllDirsFunc();
  const templatesResult = readDir(path.join(process.cwd(), "template"));
  if (templatesResult.isError()) {
    throw new Error("OOpsie");
  }
  templatesResult.get();
  const { project } = await prompts__default["default"](
    [
      {
        name: "project",
        type: "select",
        message: "Which kind?",
        initial: 0,
        choices
      }
    ],
    promptOptions(args)
  );
  return project;
}

// source/config/config.ts
var getNameInInputs = makeGetNameIsInInputs();
var IronlauncherConfig = class {
  constructor(flags2, cliInputs) {
    this.cliInputs = cliInputs;
    const { isHelp, ...rest } = flagsData(flags2);
    const helpInInputs = getIsHelpInInputs(cliInputs);
    const userAsksForHelp = handleBooleanValues(helpInInputs, isHelp);
    this.isHelp = userAsksForHelp;
    this.flagData = rest;
  }
  isHelp;
  flagData;
  async get() {
    if (this.isHelp) {
      return boxed.Option.None();
    }
    const name2 = await makeName(getNameInInputs(this.cliInputs));
    const template = await makeTemplate(this.flagData.template);
    const envStatus = getEnvInfo();
    return boxed.Option.Some({
      ...this.flagData,
      name: name2,
      template,
      ...envStatus
    });
  }
};
async function makeName(nameOpt) {
  if (nameOpt.isSome()) {
    return nameOpt.get();
  }
  const value = await askName();
  return value;
}
async function makeTemplate(template) {
  if (template.isSome()) {
    return template.get();
  }
  const project = await askProjectType([
    { title: "views", value: "views" },
    { title: "json", value: "json" },
    { title: "fullstack", value: "fullstack" }
  ]);
  return project;
}

// source/index.ts
var { _: inputs, "--": __, ...cliFlags } = minimist__default["default"](process.argv.slice(2));
async function main() {
  init();
  const ironlauncherConfig = new IronlauncherConfig(cliFlags, inputs);
  if (ironlauncherConfig.isHelp) {
    return console.log(helpText);
  }
  const configOpt = await ironlauncherConfig.get();
  if (configOpt.isNone()) {
    return console.log(helpText);
  }
  const config = configOpt.get();
  const inDir = getInDir(config);
  const outDir = getOutDir(config);
  const templatedFiles = await theTemplator.the_templator({
    in_dir: inDir,
    out_dir: outDir,
    vars: { name: config.name }
  });
  logFiles(templatedFiles, outDir);
  const dependencies = makePathsToProjects(outDir, config.template);
  const installCommand = makeCommandRunner();
  console.log("installing? ");
  await installCommand({
    deps: dependencies,
    isDryRun: config.isDryRun,
    isPnpm: config.isPnpm
  });
  console.log("installed");
}
main();
