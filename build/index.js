import { Option, Result } from '@swan-io/boxed';
import unhandled from 'cli-handle-unhandled';
import welcome from 'cli-welcome';
import { promisify } from 'util';
import { exec } from 'child_process';
import minimist from 'minimist';
import meowHelp from 'cli-meow-help';
import prompts from 'prompts';
import { accessSync, existsSync, readdirSync } from 'fs';
import { basename, sep, join } from 'path';

// source/index.ts

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
var Variant = /* @__PURE__ */ ((Variant2) => {
  Variant2[Variant2["NoAuth"] = 0] = "NoAuth";
  Variant2[Variant2["Auth"] = 1] = "Auth";
  return Variant2;
})(Variant || {});

// package.json
var version = "0.36.0";
var description = "Project Bootstraper for the Ironhack Stack";
promisify(exec);
function getPkgDescription(pkgJson = description) {
  return pkgJson.trim();
}
function getPkgLocalVersion(pkgJson = version) {
  return pkgJson.trim();
}

// source/utils/init.ts
function init() {
  unhandled();
  welcome({
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
var helpText = meowHelp({ flags, commands, name: "ironlauncher" });

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
function folderExists(folderName, func = existsSync) {
  return Result.fromExecution(() => func(folderName));
}
function currentDirEmpty(func = readdirSync) {
  return targetDirEmpty(process.cwd(), { readDirFunc: func });
}
function targetDirNotEmpty(target, injections = {}) {
  const { existsFunc = existsSync, readDirFunc = readdirSync } = injections;
  const resultOfExists = folderExists(target, existsFunc);
  return resultOfExists.flatMap((value) => {
    if (!value) {
      return Result.Error(new NoSuchFolderError(target));
    }
    const targetDir = Result.fromExecution(
      () => readDirFunc(target)
    );
    return targetDir.map((elementsInFolder) => !!elementsInFolder.length);
  }).flatMapError(() => Result.Error(new NoSuchFolderError(target)));
}
function targetDirEmpty(target, injections = {}) {
  return targetDirNotEmpty(target, injections).map((e) => !e);
}
var CURRENT_FOLDER_PATH = ".";
function validateCurrentFolder() {
  const result = currentDirEmpty().flatMap(
    (value) => value ? Result.Ok(value) : Result.Error(new DirNotEmptyError())
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
  const folderName = value.includes(process.cwd()) ? val : join(process.cwd(), val);
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
  const { name: name2 } = await prompts(
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
  return Option.fromNull(value);
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
  const auth2 = getFlagsAuth(flags2);
  const template = getFlagsProjectVariant(flags2);
  const isSkipInstall = getFlagsSkipInstall(flags2);
  const isDryRun = getFlagsDryRun(flags2);
  const isPnpm = getFlagsIsPnpm(flags2);
  const isHelp = getFlagsHelp(flags2);
  return {
    auth: auth2,
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
      return Option.Some("views");
    }
    if (getFlagsJson(e)) {
      return Option.Some("json");
    }
    if (getFlagsFs(e)) {
      return Option.Some("fullstack");
    }
    return Option.None();
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
    const { readDir = readdirSync } = deps;
    return Result.fromExecution(() => readDir(target)).mapError(
      (err) => new NodeFSError(err)
    );
  };
};

// source/lib/fs/dir-empty/dir-empty.ts
var makeDirEmptyFunc = (deps = {}) => {
  return (target) => {
    const { readDir = readdirSync } = deps;
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
var makeExistsFolder = (existsFunc = accessSync) => {
  return (folderName) => {
    if (folderName.split(sep).length > 1) {
      return Result.Error(new InvalidFolderPathError());
    }
    return Result.fromExecution(
      () => existsFunc(join(process.cwd(), folderName))
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
      return firstEl ? Option.Some(firstEl) : Option.None();
    }).flatMap((folderName) => {
      if (folderName === ".") {
        return isEmpty(process.cwd()).match({
          Ok(value) {
            return value ? Option.Some(basename(process.cwd())) : Option.None();
          },
          Error() {
            return Option.None();
          }
        });
      }
      return isFolderExists(folderName).match({
        Error() {
          return Result.Ok(folderName);
        },
        Ok(value) {
          if (value) {
            return Result.Error(new DirectoryTakenError(folderName));
          }
          return Result.Ok(folderName);
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
async function askProjectType() {
  return prompts([
    {
      name: "project",
      type: "select",
      message: "Which kind?",
      initial: 0,
      choices: [
        { title: "views", value: "views" },
        { title: "json", value: "json" },
        { title: "fullstack", value: "fullstack" }
      ]
    }
  ]);
}

// source/config/config.ts
var getNameInInputs = makeGetNameIsInInputs();
async function makeConfig(cliFlags2, cliInputs) {
  const { isHelp, ...flags2 } = flagsData(cliFlags2);
  const helpInInputs = getIsHelpInInputs(cliInputs);
  const userAsksForHelp = handleBooleanValues(helpInInputs, isHelp);
  if (userAsksForHelp) {
    return Option.None();
  }
  const name2 = await makeName(getNameInInputs(cliInputs));
  const template = await makeTemplate(flags2.template);
  const envStatus = getEnvInfo();
  return Option.Some({
    ...flags2,
    name: name2,
    template,
    ...envStatus
  });
}
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
  const { project } = await askProjectType();
  return project;
}

// source/index.ts
var { _: inputs, "--": __, ...cliFlags } = minimist(process.argv.slice(2));
var auth = 0 /* NoAuth */;
async function hello() {
  {
    return "";
  }
}
async function main() {
  init();
  const configOpt = await makeConfig(cliFlags, inputs);
  if (configOpt.isNone()) {
    return console.log(helpText);
  }
  configOpt.get();
}
main();

export { Variant, auth, hello, promptOptions };
