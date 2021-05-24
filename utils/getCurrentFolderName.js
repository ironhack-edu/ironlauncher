const { sep } = require("path");

exports.getCurrentFolderName = () => {
  const [currentFolder] = process.cwd().split(sep).slice(-1);
  return currentFolder;
};
