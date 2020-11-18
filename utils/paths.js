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

module.exports = {
  inDir,
  outDir,
};
