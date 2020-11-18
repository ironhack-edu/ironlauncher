const meow = require("meow");
const meowHelp = require("cli-meow-help");

const flags = {
  // json: {
  //   type: "boolean",
  //   default: false,
  //   default: "j",
  // },
  auth: {
    type: "boolean",
    alias: "a",
    desc: `Adds auth behaviour`,
  },
  name: {
    type: "string",
    alias: "n",
    // default: "",
    desc: "If you wish to be explicitit and define a name",
  },
  help: {
    type: "boolean",
    alias: "h",
    desc: "Another way of asking for the commands of the app",
    default: "boolean",
  },
};

const commands = {
  "<name>": {
    desc: `The name of the project will be added as the path to mongodb and package.json`,
  },
  help: {
    desc: "Print help info",
  },
};
const helpText = meowHelp({
  flags,
  commands,
  name: "Irongenerator",
});

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

module.exports = meow(helpText, { options });
