const meow = require("meow");
const meowHelp = require("cli-meow-help");

const flags = {
  // json: {
  //   type: "boolean",
  //   default: false,
  //   desc: "Creates an opinionated json server setup with express",
  // },

  auth: {
    type: "boolean",
    alias: "a",
    desc: `Adds auth behaviour`,
  },
  // yarn: {
  //   type: "boolean",
  //   desc: "Decide if you want to use yarn or not",
  //   default: false,
  //   alias: "y",
  // },
  help: {
    type: "boolean",
    alias: "h",
    desc: "Another way of asking for the commands of the app",
    default: false,
  },
  fullstack: {
    type: "boolean",
    default: false,
    desc: "Creates an opinioated express and create-react-app setup",
    alias: "f",
  },
  fs: {
    type: "boolean",
    default: false,
    desc: "Shorter version of --fulstack",
  },
};

const commands = {
  "<name>": {
    desc: `The name of the project will be added as the path to mongodb and package.json`,
  },
  "<command>": {
    desc:
      "The commands are chainable. Which means you can ask for json and auth, or fs and auth. See commands below 👇",
  },
  help: {
    desc: "Print help info",
  },
};
const helpText = meowHelp({
  flags,
  commands,
  name: "ironhack or ironamake",
});

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

module.exports = meow(helpText, { options });
