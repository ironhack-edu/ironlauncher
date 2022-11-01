#!/usr/bin/env node
import { createTemplateFolder } from "create-template-folder";
import { ironlauncherConfig } from "./config";
import { makeConfig } from "./config/ironlauncher.config";
import { FolderOps } from "./core/cmd";
import { install } from "./core/install/install";
import { logger } from "./core/logger";
import { helpText } from "./utils/cli";
import { init } from "./utils/init";

async function main() {
  init();
  const config = await makeConfig();

  if (config.config.isDisplayHelp) {
    if (config.config.isDev) {
      return logger.greenAndRest({ inGreen: "HELP", rest: "asked by user" });
    }
    return logger.log(helpText);
  }

  if (config.config.isOutOfSync) {
    logger.error(
      `Packages are out of sync. Please run command again with @latest in front of the package`
    );
  }

  if (config.config.isDev) {
    config.debug();
  }

  const newInDirPath = FolderOps.inDirectory();
  const outDirPath = FolderOps.outDirectory(ironlauncherConfig.name);

  const vars = { name: config.config.name };

  const templatedFiles = await createTemplateFolder(
    {
      inDir: newInDirPath,
      outDir: outDirPath,
      vars,
    },
    {
      dryRun: config.config.isDryRun,
    }
  );
  await install(outDirPath, templatedFiles);
  return;

  // return;
}

main();
