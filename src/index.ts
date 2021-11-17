#!/usr/bin/env node
import { log } from "console";
import { createTemplateFolder } from "create-template-folder";
import { install } from "./install/install";
import { ironlauncherConfig } from "./config";
import { inDir, outDirectory } from "./dir-operations";
import { helpText } from "./utils/cli";
import { init } from "./utils/init";

async function main() {
  // init()o;

  await ironlauncherConfig.init();
  // ironlauncherConfig.debug();
  if (ironlauncherConfig.isOutOfSync) {
    return; // TODO: ADD SOME LOGGING MESSAGE HERE
  }

  init();
  if (ironlauncherConfig.displayHelp) {
    if (ironlauncherConfig.devMode) {
      console.log(`requested help`);
    } else {
      return log(helpText);
    }
  }

  if (ironlauncherConfig.devMode) {
    ironlauncherConfig.debug();
  }

  const vars = { name: ironlauncherConfig.name };

  const newInDirPath = inDir();
  console.log("newInDirPath:", newInDirPath);
  const outDirPath = outDirectory(ironlauncherConfig.name);
  console.log("outDirPath:", outDirPath);

  const templatedFiles = await createTemplateFolder(
    {
      inDir: newInDirPath,
      outDir: outDirPath,
      vars,
    },
    {
      // dryRun: ironlauncherConfig.devMode,
    }
  );
  await install(outDirPath, templatedFiles);
  // if (ironlauncherConfig.dryRun) {
  //   // await runCommand(`trash ${outDirPath}`);
  // }
}

main();
