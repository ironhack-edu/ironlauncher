const meow = require("meow");
const meowHelp = require("cli-meow-help");

const flags = {
  json: {
    type: "boolean",
    default: false,
    desc: "Creates an opinionated json server setup with express",
  },
  auth: {
    type: "boolean",
    alias: "a",
    desc: `Adds auth behaviour`,
  },
  fs: {
    type: "boolean",
    default: false,
    desc: "Creates an opinioated express and create-react-app setup",
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
  name: "ironhack or ironmake",
});

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

module.exports = meow(helpText, { options });
