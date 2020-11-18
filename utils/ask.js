const { Input } = require("enquirer");
const fs = require("fs");
const to = require("await-to-js").default;
const handleError = require("cli-handle-error");
const shouldCancel = require("cli-should-cancel");
const path = require("path");
const { isNotEmpty } = require("./checkName");

module.exports = async ({ message, hint, initial, name }) => {
  const [err, response] = await to(
    new Input({
      message,
      hint,
      initial,
      validate(value) {
        // console.log("state.name:", state.name);
        if (name === "name") {
          if (fs.existsSync(value)) {
            // console.log("fs.existsSync(value):", fs.existsSync(value));
            return `Directory already exists`;
          }
          if (value === "." && isNotEmpty()) {
            return `This directory is not empty, please choose a different name`;
          }
        }
        //  if (state.)
        return !value ? "Please add a value" : true;
      },
    })
      .on("cancel", () => shouldCancel())
      .run()
  );

  handleError(`INPUT`, err);
  return response.split(" ").join("-");
};
