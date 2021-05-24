const fs = require("fs");

/**
 * Checks if there is any folder in the current folder structure with the name passed to it
 * @param {String} name - A string for the function to look for a folder in the current `cwd` with the same name
 * @returns {(String|null)} - It either finds a folder or not. Either way it returns that value
 */
exports.byName = (name) => {
  const currentDir = fs.readdirSync(process.cwd());

  return currentDir.find((e) => e.trim() === name.trim());
};

/**
 *
 * @return {boolean} - returns wether the current folder is empty or not
 */
exports.isNotEmpty = () => !!fs.readdirSync(process.cwd()).length;
