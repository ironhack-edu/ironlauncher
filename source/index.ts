#!/usr/bin/env node

import alert from "cli-alerts";
import { dim } from "kolorist";
import minimist from "minimist";
import path, { dirname, join } from "path";
import { the_templator } from "the-templator";
import { helpText } from "./cli/flags/helper-text";
import { makeCommandRunner } from "./cmd/installer/command-runner";
import { makePathsToProjects } from "./cmd/installer/deps/make-deps-structure";
import { logFiles } from "./cmd/logger";
import { getInDir } from "./cmd/paths/in-dir";
import { getOutDir } from "./cmd/paths/out-dir";
import { IronlauncherConfig } from "./config/config";
import { logger } from "./lib/logger";
import { init } from "./utils";

const { _: inputs, "--": __, ...cliFlags } = minimist(process.argv.slice(2));

async function main() {
  init();

  const ironlauncherConfig = new IronlauncherConfig(cliFlags, inputs);

  if (ironlauncherConfig.isHelp) {
    return logger.log(helpText);
  }

  const configOpt = await ironlauncherConfig.get();

  if (configOpt.isNone()) {
    return logger.log(helpText);
  }

  const config = configOpt.get();
  const inDir = getInDir(config);

  const outDir = getOutDir(config, ironlauncherConfig.isCurrentFolder());

  const templatedFiles = await the_templator(
    {
      in_dir: inDir,
      out_dir: outDir,
      vars: { name: config.name },
    },
    config.isDryRun
  );

  logFiles(templatedFiles, outDir);

  const dependencies = makePathsToProjects(outDir, config.template);

  const installCommand = makeCommandRunner();

  if (config.isDryRun) {
    logger.focus({ focus: "DRY RUN SUCCESSFULLY EXECUTED", rest: "" });
    return;
  }

  await installCommand({
    deps: dependencies,
    ...config,
  });

  const isCurrentFolder = ironlauncherConfig.isCurrentFolder();
  const createdMsg = isCurrentFolder
    ? `\n\n${templatedFiles.length} files created in the current directory`
    : `\n\n${templatedFiles.length} files created in ${dim(
        `.${outDir}`
      )} directory`;

  const bootStrapMsg = isCurrentFolder
    ? `Projected bootstrapped successfully. \n\nYou can now open the current directory with your code editor`
    : `Project bootstrapped successfully.\n\nYou can now cd into ${dim(
        `.${outDir}`
      )}`;

  alert({
    type: "success",
    name: "ALL DONE",
    msg: createdMsg,
  });

  alert({
    type: "success",
    name: "DONE",
    msg: bootStrapMsg,
  });

  return;
}

main();
