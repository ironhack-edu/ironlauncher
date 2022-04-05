import type { MeowHelpFlags, MeowHelpCommands } from "cli-meow-help";
import meowHelp from "cli-meow-help";

export const FLAGS = ["json", "auth", "fs"] as const;
export type FLAGS_OPTS = typeof FLAGS[number];

const flags: MeowHelpFlags<typeof FLAGS> = {
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

const commands: MeowHelpCommands = {
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

export const helpText = meowHelp({ flags, commands, name: "ironlauncher" });
