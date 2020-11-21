const test = require("ava");
const execa = require("execa");
const { version } = require("../package.json");
const { includes } = require("./utils");
const path = require("path");

const welcomeMessage = "Ironhack generator for express bootstrapping";

test(`Welcome message and version checks`, async (t) => {
  const { stdout, stderr } = await execa("./index.js");
  console.log("stdout:", stdout);

  t.true(includes(stdout, version));
  t.true(includes(stdout, welcomeMessage));
  t.falsy(stderr, "There are no errors if just sends index");
});

test.skip(`Help message`, async (t) => {
  const { stdout, stderr, exitCode, ...rest } = await execa("./index.js", [
    "help",
  ]);
  const showsErrorMessage = includes(stdout, "usage");
  const showsOptions = includes(stdout, "options");
  const showsAuth = includes(stdout, "-a, --auth");
  //   const sho

  //   console.log("showsErrorMessage:", showsErrorMessage);
  t.is(0, exitCode);
  t.is(true, showsErrorMessage);
  t.is(true, showsOptions);
  t.is(true, showsAuth);
  t.true(true);
});
