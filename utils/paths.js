const path = require("path");

function inDir(auth) {
  if (auth) {
    return path.join(__dirname, "..", `template`, `auth`);
  }
  return path.join(__dirname, "..", `template`, `base`);
}

function outDir(name) {
  return path.join(process.cwd(), name);
}

const getTemplate = () => path.join(__dirname, "..", `template`);

module.exports = {
  inDir,
  outDir,
  getTemplate
};
