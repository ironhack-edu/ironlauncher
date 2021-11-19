#!/usr/bin/env node
import { log } from "console";
import { createTemplateFolder } from "create-template-folder";
import { ironlauncherConfig } from "./config";
import { FolderOps } from "./core/cmd";
import { install } from "./install/install";
import { helpText } from "./utils/cli";
import { init } from "./utils/init";

async function main() {
  // init()o;
  console.log(`HERE`);

  await ironlauncherConfig.init();
  // ironlauncherConfig.debug();
  if (ironlauncherConfig.isOutOfSync) {
    return console.log(`HERE`); // TODO: ADD SOME LOGGING MESSAGE HERE
  }

  init();
  if (ironlauncherConfig.displayHelp) {
    if (ironlauncherConfig.devMode) {
      return console.log(`requested help`);
    } else {
      return log(helpText);
    }
  }

  if (ironlauncherConfig.devMode) {
    ironlauncherConfig.debug();
  }

  console.log(`RUNG`);
  const newInDirPath = FolderOps.inDirectory();
  const outDirPath = FolderOps.outDirectory(ironlauncherConfig.name);
  return;
  const vars = { name: ironlauncherConfig.name };

  const templatedFiles = await createTemplateFolder(
    {
      inDir: newInDirPath,
      outDir: outDirPath,
      vars,
    },
    {
      dryRun: ironlauncherConfig.devMode,
    }
  );
  await install(outDirPath, templatedFiles);
}

main();
