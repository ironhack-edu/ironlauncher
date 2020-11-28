const path = require("path");

function inDir({ json = false, auth = false, isFullStack }) {
  const folderName = isFullStack ? "fullstack" : json ? "json" : "views";
  const isAuth = auth ? "auth" : "base";
  return path.join(__dirname, "..", "template", folderName, isAuth);
}

function outDir(name) {
  return path.join(process.cwd(), name);
}

const getTemplate = () => path.join(__dirname, "..", `template`);

module.exports = {
  inDir,
  outDir,
  getTemplate,
};
