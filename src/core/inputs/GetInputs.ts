import fs from "fs";
import type { PromptObject, Options } from "prompts";
import prompt from "prompts";
import { promisify } from "util";
import { FolderOps } from "../cmd";
import { NameValidator } from "../validator";
const readdir = promisify(fs.readdir);

export namespace InputsHandler {
  const promptOptions: Options = {
    onCancel(data: PromptObject) {
      console.log(
        `You did not set a ${data.name} and canceled the ironlauncher`
      );

      process.exit(1);
    },
  };
  export async function getName(): Promise<{ name: string }> {
    return prompt(
      {
        name: "name",
        type: "text",
        message: "Project name?",
        validate: NameValidator.validate,
      },
      promptOptions
    );
  }

  export async function getVariant(): Promise<{ variant: number }> {
    return prompt(
      {
        name: "variant",
        type: "select",
        message: "Do you want to have auth already built?",
        initial: 0,
        choices: [
          {
            title: "No, thank you 🚀",
            value: 0,
          },
          { title: "Yes, please 💪", value: 1 },
        ],
      },
      promptOptions
    );
  }

  export async function getProject(): Promise<{
    project: "fullstack" | "json" | "views";
  }> {
    const projectFolders = await readdir(FolderOps.templatesDir);
    const onlyDirs = [...projectFolders]
      .filter((e) => !/\./.test(e))
      .sort((a, b) => b.localeCompare(a));

    return prompt(
      [
        {
          name: "project",
          type: "select",
          message: "Which kind?",
          initial: 0,
          choices: onlyDirs.map((e) => {
            return {
              title: e,
              value: e,
            };
          }),
        },
      ],
      promptOptions
    );
  }
}
