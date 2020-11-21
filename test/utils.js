/**
 * This includes method returns true or false if a string is included in the stdout
 * @param {string} mainMessage - the stdout
 * @param {string} checker - the string you wish to check
 */
function includes(mainMessage, checker) {
  const regex = new RegExp(checker, "ig");

  return regex.test(mainMessage);
}

exports.includes = includes;
