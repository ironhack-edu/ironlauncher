#!/usr/bin/env node
const path = require("path");
const cli = require("./utils/cli");
const ask = require("./utils/ask");
const copy = require("copy-template-dir");
const performViewsCopy = require("./utils/performViewsCopy");
const performJSONCopy = require("./utils/performJSONcopy");
const getName = require("./utils/getName");
const init = require("./utils/init");
const question = require("./utils/question");
const { inDir, outDir } = require("./utils/paths");
const { inDir: inNew } = require("./utils/new-paths");
const performCopy = require("./utils/performCopy");
const alert = require("cli-alerts");
const getPackage = require("get-repo-package-json");
const ora = require("ora");
const execa = require("execa");
const { yellow: y, dim: d } = require("chalk");
const performFSCopy = require("./utils/performFSCopy");
const { input, flags, showHelp } = cli;

const { json = false, auth = false, fs: isFullStack = false } = flags;

async function main() {
  init();
  if (input.includes("help")) {
    return showHelp(0);
  }

  let { name, issue } = getName(cli);

  if (!name) {
    name = await question({
      message: "Project name?",
      issue,
      name: "name",
      hint: "(This will be the name in package.json)",
    });
  }

  // return;
  const newInDirPath = inNew({ ...flags, isFullStack });
  const outDirPath = outDir(name);

  const vars = { name, body: "{{body}}", title: "{{title}}" };
  if (isFullStack) {
    return performFSCopy({ inDirPath: newInDirPath, outDirPath, vars });
  }
  if (json) {
    return performJSONCopy({ inDirPath: newInDirPath, outDirPath, vars });
  }
  return performViewsCopy({ inDirPath: newInDirPath, outDirPath, vars });
}

main();
