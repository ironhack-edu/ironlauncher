#!/usr/bin/env node
import { log } from "console";
import { copyTemplate } from "create-template-folder";
import { askQuestion } from "./askQuestion";
import { ironlauncherConfig } from "./config";
import { getCurrentFolderName, inDir, outDirectory } from "./dir-operations";
import GetInputs from "./inputs/GetInputs";
import { fullStackInstall } from "./install/npmInstall";
import { displayHelp, flags, getName, helpText } from "./utils/cli";
import { validateName } from "./utils/validations";

async function main() {
  // init();
  // const isBad = await isOutOfSync();
  // console.log("isBad:", isBad);

  // if (isBad) {
  //   return;
  // }

  if (displayHelp()) {
    if (!ironlauncherConfig.devMode) {
      return log(helpText);
    }
  }

  let { name, issue } = getName();
  if (!name) {
    const newName = await askQuestion({
      message: "Project name?",
      type: "text",
      name: "name",
      hint: "(This will be the name in package.json)",
      validate: validateName,
      issue,
    });
    const newNameOption = newName.name.split(" ").join("_");
    name = newNameOption;
  }

  // return;
  const newInDirPath = inDir(flags);
  const outDirPath = outDirectory(name);

  let isCurrentFolder = false;
  if (name === ".") {
    name = getCurrentFolderName();
    isCurrentFolder = true;
  }

  const vars = { name };
  // await copyTemplate({
  //   inDir: newInDirPath,
  //   outDir: outDirPath,
  //   vars,
  // });

  // await fullStackInstall(outDirPath, );
  // process.exit(0);
}

main();
