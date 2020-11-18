const fs = require("fs");

function byName(name) {
  const currentDir = fs.readdirSync(process.cwd());

  return currentDir.find((e) => e.trim() === name.trim());
}

const isNotEmpty = () => fs.readdirSync(process.cwd()).length;

module.exports = {
  isNotEmpty,
  byName,
};
