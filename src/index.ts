#!/usr/bin/env node
import { log } from "console";
import { askQuestion } from "./askQuestion";
import { displayHelp, getName, getProjectName, helpText } from "./utils/cli";
import { isNotEmpty } from "./utils/dir-ops/isNotEmpty";
import { init } from "./utils/init";
import { isOutOfSync } from "./utils/sync";
import { validateName } from "./utils/validations";
const isDevMode = process.env.DEV === "true";

async function main() {
  // init();
  // const isBad = await isOutOfSync();
  // console.log("isBad:", isBad);

  // if (isBad) {
  //   return;
  // }

  if (displayHelp()) {
    if (!isDevMode) {
      return log(helpText);
    }
  }

  let { name, issue } = getName();
  console.log('issue:', issue)
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
}

main();
