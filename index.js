#!/usr/bin/env node
const path = require("path");
const cli = require("./utils/cli");
const ask = require("./utils/ask");
const copy = require("copy-template-dir");

const getName = require("./utils/getName");
const init = require("./utils/init");
const question = require("./utils/question");
const { inDir, outDir } = require("./utils/paths");
const performCopy = require("./utils/performCopy");
const alert = require("cli-alerts");
const { input, flags, showHelp } = cli;
const getPackage = require("get-repo-package-json");
const ora = require("ora");
const execa = require("execa");
const { yellow: y, dim: d } = require("chalk");

const spinner = ora({ text: "" });

async function testCra() {
  const onlineVersion = await getPackage("itstheandre/lean-express-gen");
  console.log("onlineVersion:", onlineVersion);
  spinner.start(
    `${y("INSTALLING")} dependencies...\n\n${d(`It make take a moment`)}`
  );

  await execa("npx", [`create-react-app`, "test"]);
  spinner.succeed(`${g("FINISHED")} instalation...`);
}
return testCra();

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
  const inDirPath = inDir(flags.auth);
  const outDirPath = outDir(name);

  const vars = { name, body: "{{body}}", title: "{{title}}" };
  performCopy({ inDirPath, outDirPath, vars });
}

main();
