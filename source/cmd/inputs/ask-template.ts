import { join } from "path";
import prompts from "prompts";
import { makeGetAllDirsFunc } from "../../lib/fs/get-dirs/get-dirs";
import { IronlauncherTemplate } from "../../types/template.type";

import { IPromptArgs, promptOptions } from "./input.utils";

type IProjectType = { project: IronlauncherTemplate; value: string };

export async function askProjectType(
  choices: Array<{ title: string; value: string }>,
  args: IPromptArgs = {}
): Promise<IronlauncherTemplate> {
  const readDir = makeGetAllDirsFunc();

  const templatesResult = readDir(join(process.cwd(), "template"));

  if (templatesResult.isError()) {
    throw new Error("OOpsie");
  }

  const templatesList = templatesResult.get();
  // console.log("templatesList:", templatesList);

  const { project } = await prompts(
    [
      {
        name: "project",
        type: "select",
        message: "Which kind?",
        initial: 0,
        choices,
      },
    ],
    promptOptions(args)
  );

  return project;
}
