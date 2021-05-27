#!/usr/bin/env node
const cli = require("./utils/cli");
const performViewsCopy = require("./utils/performViewsCopy");
const performJSONCopy = require("./utils/performJSONcopy");
const getName = require("./utils/getName");
const init = require("./utils/init");
const question = require("./utils/question");
const { inDir, outDir } = require("./utils/paths");
const { inDir: inNew } = require("./utils/new-paths");
const performFSCopy = require("./utils/performFSCopy");
const { getCurrentFolderName } = require("./utils/getCurrentFolderName");
const { getFlagsNames } = require("./utils/getFlagsNames");
const { input, showHelp } = cli;

let [flags, name, issue] = getFlagsNames(cli);
const {
  json = false,
  auth = false,
  fs: isFullStack = false,
  hooks = false,
} = flags;

async function main() {
  init();
  if (input.includes("help")) {
    return showHelp(0);
  }

  if (!name) {
    name = await question({
      message: "Project name?",
      issue,
      name: "name",
      hint: "(This will be the name in package.json)",
    });
  }

  const newInDirPath = inNew({ ...flags, isFullStack });
  const outDirPath = outDir(name);

  let isCurrentFolder;
  if (name === ".") {
    name = getCurrentFolderName();
    isCurrentFolder = true;
  }
  const vars = { name, body: "{{body}}", title: "{{title}}" };
  if (isFullStack) {
    return performFSCopy({
      inDirPath: newInDirPath,
      outDirPath,
      vars,
      isCurrentFolder,
    });
  }
  if (json) {
    return performJSONCopy({
      inDirPath: newInDirPath,
      outDirPath,
      vars,
      isCurrentFolder,
    });
  }
  return performViewsCopy({
    inDirPath: newInDirPath,
    outDirPath,
    vars,
    isCurrentFolder,
  });
}

main();
