const ask = require("./ask");

module.exports = ({ message, issue, hint, name }) => {
  return ask({
    message,
    name,
    hint: issue ? `${issue}: ${hint}` : hint,
  });
};
