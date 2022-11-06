import minimist from "minimist";
import { the_templator } from "the-templator";
import { helpText } from "./cli/flags/helper-text";
import { makeCommandRunner } from "./cmd/installer/command-runner";
import { makePathsToProjects } from "./cmd/installer/deps/make-deps-structure";
import { logFiles } from "./cmd/logger";
import { getInDir } from "./cmd/paths/in-dir";
import { getOutDir } from "./cmd/paths/out-dir";
import { IronlauncherConfig } from "./config/config";
import { init } from "./utils";

const { _: inputs, "--": __, ...cliFlags } = minimist(process.argv.slice(2));

async function main() {
  init();

  const ironlauncherConfig = new IronlauncherConfig(cliFlags, inputs);

  if (ironlauncherConfig.isHelp) {
    return console.log(helpText);
  }

  const configOpt = await ironlauncherConfig.get();

  if (configOpt.isNone()) {
    return console.log(helpText);
  }

  const config = configOpt.get();
  console.log("config:", config);
  // console.log("config:", config);
  const inDir = getInDir(config);

  const outDir = getOutDir(config);

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

  console.log("installing? ");
  if (config.isDryRun) {
    return;
  }
  await installCommand({
    deps: dependencies,
    isDryRun: config.isDryRun,
    isPnpm: config.isPnpm,
    isSkipInstall: config.isSkipInstall,
  });

  console.log("installed");
}

main();
