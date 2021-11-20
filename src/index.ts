#!/usr/bin/env node
import { createTemplateFolder } from "create-template-folder";
import { ironlauncherConfig } from "./config";
import { FolderOps } from "./core/cmd";
import { install } from "./core/install/install";
import { logger } from "./core/logger";
import { helpText } from "./utils/cli";
import { init } from "./utils/init";

async function main() {
  // init()o;

  init();
  if (ironlauncherConfig.displayHelp) {
    if (ironlauncherConfig.devMode) {
      return logger.greenAndRest({ inGreen: "HELP", rest: "asked by user" });
    } else {
      return logger.log(helpText);
    }
  }

  await ironlauncherConfig.init();
  // ironlauncherConfig.debug();
  if (ironlauncherConfig.isOutOfSync) {
    return logger.error(
      `Packages are out of sync. Please run command again with @latest in front of the package`
    ); // TODO: ADD SOME LOGGING MESSAGE HERE
  }

  if (ironlauncherConfig.devMode) {
    ironlauncherConfig.debug();
  }

  const newInDirPath = FolderOps.inDirectory();
  const outDirPath = FolderOps.outDirectory(ironlauncherConfig.name);
  // return;
  const vars = { name: ironlauncherConfig.name };

  const templatedFiles = await createTemplateFolder(
    {
      inDir: newInDirPath,
      outDir: outDirPath,
      vars,
    },
    {
      dryRun: ironlauncherConfig.dryRun,
    }
  );
  await install(outDirPath, templatedFiles);
}

main();
