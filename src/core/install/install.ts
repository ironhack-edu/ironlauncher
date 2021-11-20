import { dim as d, green as g, yellow as y } from "chalk";
import alert, { AlertType } from "cli-alerts";
import ora from "ora";
import { basename, join } from "path";
import { ironlauncherConfig } from "../../config";
import { logger } from "../logger";
import { InstallStructure } from "./base";
import { FullStack, JSONInstaller, Views } from "./version";

const spinner = ora({ text: "" });

export async function install(basePath: string, fileNames: string[]) {
  const { name: outDir } = ironlauncherConfig;

  logger.emptyLine();
  logger.dimmedWithGreen({ inGreen: outDir, rest: "\nCreating files in" });

  fileNames.forEach((filePath) => {
    const fileName = basename(filePath);
    logger.greenAndRest({ rest: `: ${fileName}`, inGreen: "CREATED" });
  });
  logger.emptyLine();

  spinner.start(
    `${y("INSTALLING")} dependencies...\n\n${d(`It might take a moment`)}`
  );

  await MakeInstall.install(basePath);

  spinner.succeed(`${g("FINISHED")} installation...`);

  const createdMsg = ironlauncherConfig.isCurrentFolder
    ? `\n\n${fileNames.length} files created in the current directory`
    : `\n\n${fileNames.length} files created in ${d(`./${outDir}`)} directory`;

  const bootStrapMsg = ironlauncherConfig.isCurrentFolder
    ? `Projected bootstrapped successfully. \n\nYou can now open the current directory with your code editor`
    : `Project bootstrapped successfully.\n\nYou can now cd ./${outDir}`;

  const type: AlertType = "success";

  alert({
    type,
    name: `ALL DONE`,
    msg: createdMsg,
  });
  alert({
    type,
    name: `DONE`,
    msg: bootStrapMsg,
  });
}

export class MakeInstall {
  static async install(basePath: string) {
    let mainClass: InstallStructure;
    const { template } = ironlauncherConfig;

    if (template === "fullstack") {
      const client = join(basePath, "client");
      const server = join(basePath, "server");
      mainClass = new FullStack({ bePrefix: server, fePrefix: client });
    } else if (template === "json") {
      mainClass = new JSONInstaller(basePath);
    } else if (template === "views") {
      mainClass = new Views(basePath);
    }

    await mainClass!.install();
  }
}
