const fs = require("fs");
const { byName, isNotEmpty } = require("./checkName");

module.exports = ({ input, flags }) => {
  if (input.includes(".")) {
    if (isNotEmpty()) {
      return {
        name: "",
        issue: "The current folder is not empty.",
      };
    }
    return {
      name: ".",
      issue: "",
    };
  }
  if (input[0]) {
    const exists = byName(input[0]);
    if (exists) {
      return {
        name: "",
        issue: "That folder already exists.",
      };
    }
    return {
      name: input[0],
      issue: "",
    };
  }
  return {
    name: "",
    issue: "",
  };
};
