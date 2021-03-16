const execa = require("execa");
exports.jsonSetup = async (setupInfo) => {
  const { isAuth = false, outDirPath } = setupInfo;
  const auth = [`connect-mongo`, `express-session`, `bcryptjs`];
  let pkgs = [
    `dotenv`,
    `express`,
    `mongoose`,
    `morgan`,
    `cookie-parser`,
    "cors",
  ];
  if (isAuth) {
    pkgs = [...pkgs, ...auth];
  }

  process.chdir(outDirPath);
  await execa("npm", [`install`, ...pkgs]);
  process.chdir(outDirPath);
  await execa("npm", [`install`, `-D`, `nodemon`]);
};

exports.react = async (outDirPath) => {
  const pkgs = [
    "react",
    "react-dom",
    "react-scripts",
    `react-router-dom`,
    `axios`,
  ];
  //  "web-vitals": "^0.2.4"
  const devPkgs = [
    "@testing-library/jest-dom",
    "@testing-library/react",
    "@testing-library/user-event",
  ];
  process.chdir(outDirPath);
  await execa("npm", [`install`, ...pkgs]);
  process.chdir(outDirPath);
  await execa("npm", ["install", `-D`, ...devPkgs]);
};
