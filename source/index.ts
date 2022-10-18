import { createTemplateFolder } from "create-template-folder";
import { readdirSync } from "fs";
import minimist from "minimist";
import { join } from "path";
import { helpText } from "./cli/flags/helper-text";
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
  const inDir = getInDir(config);
  console.log("inDir:", inDir);

  const outDir = getOutDir(config);

  const templatedFiles = await createTemplateFolder(
    {
      inDir,
      outDir,
      vars: { name: config.name },
    },
    {
      dryRun: config.isDryRun || true,
    }
  );

  console.log("templatedFiles:", templatedFiles);
}

main();
