const getName = require("./getName");

/**
 *
 * Parses cli arguments. The major if/else statements are here in case a user passes the string `true`, `false` to the flags (also a possibility). Or adding the name of the project after the flags. By default, `meow` takes that last string and would pass it to the previous flag.
 */
exports.getFlagsNames = (cli) => {
  const { flags } = cli;
  const newFlags = {};
  let { name, issue } = getName(cli);

  for (let key in flags) {
    if (FLAGS.includes(key)) {
      if (typeof flags[key] === "string") {
        if (flags[key] === "true") {
          newFlags[key] = true;
        } else if (flags[key] === "false") {
          newFlags[key] = false;
        } else {
          if (!name) {
            if (!issue) {
              name = flags[key];
            }
          }
          newFlags[key] = true;
        }
      } else {
        newFlags[key] = flags[key];
      }
    }
  }

  return [newFlags, name, issue];
};

const FLAGS = ["json", "auth", "fs", "hooks"];
