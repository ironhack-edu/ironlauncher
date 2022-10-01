import meowHelp, { MeowHelpCommands, type MeowHelpFlags } from "cli-meow-help";
import { IHL_FLAGS } from "../../shared";

const flagKeys = {
  views: IHL_FLAGS.views[0],
  json: IHL_FLAGS.json[0],
  fs: IHL_FLAGS.fs[0],
  help: IHL_FLAGS.help[0],
  pnpm: IHL_FLAGS.pnpm[0],
  skipInstall: IHL_FLAGS.skipInstall[0],
  dryRun: IHL_FLAGS.dryRun[0],
} as const;

const flags = {
  [flagKeys.views]: {
    type: "boolean",
    default: true,
    desc: "Creates an opinionated views server with express and handlebars",
  },
  [flagKeys.json]: {
    type: "boolean",
    default: false,
    desc: "Creates an opinionated json server with express ",
  },
  [flagKeys.fs]: {
    type: "boolean",
    default: false,
    desc: "Creates an opinionated express and create-react-app setup",
  },
  [flagKeys.help]: {
    type: "boolean",
    default: false,
    desc: "Displays help instructions",
  },
  [flagKeys.pnpm]: {
    type: "boolean",
    default: false,
    desc: "Installs dependencies through pnpm, assuming you have it installed",
    alias: "p",
  },
  [flagKeys.skipInstall]: {
    type: "boolean",
    default: false,
    desc: "Decides wether it should skip installation of dependencies or not",
  },
  [flagKeys.dryRun]: {
    type: "boolean",
    default: false,
    desc: "Does a dry run. IE does all necessary validation, however it does not move any file, nor does it install anything",
  },
} as const;

const commands: MeowHelpCommands = {
  "<name>": {
    desc: "The name of the project will be added as the path to mongodb and package.json",
  },
  "<command>": {
    desc: "Some flags are chainable. You can request the project to be installed with pnpm and request a express/views application",
  },
  help: {
    desc: "Prints help info",
  },
};

export const helpText = meowHelp({ flags, commands, name: "ironlauncher" });
