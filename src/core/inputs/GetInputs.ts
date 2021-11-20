import fs from "fs";
import { join } from "path";
import type { PromptObject } from "prompts";
import prompt from "prompts";
import { promisify } from "util";
import { NameValidator } from "../validator";
const readdir = promisify(fs.readdir);

export default class GetInputs {
  static async getName(): Promise<{ name: string }> {
    return prompt(
      {
        name: "name",
        type: "text",
        message: "Project name?",
        validate: NameValidator.validate,
      },
      {
        onCancel: this.onCancel,
      }
    );
  }

  static getVariant(): Promise<{ variant: number }> {
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
      {
        onCancel: this.onCancel,
      }
    );
  }

  static async getProject(): Promise<{
    project: "fullstack" | "json" | "views";
  }> {
    let templates: string = "";
    let starting = join(process.cwd());
    let count = 0;

    while (!templates) {
      const path = join(starting, "template");
      try {
        await readdir(path);
        templates = path;
      } catch (_error) {
        // Runs in case of no template folder present
        starting = join(process.cwd(), "..");
      }
      count++;

      if (count > 3) {
        process.exit(1);
      }
    }

    const projectFolders = await readdir(templates);
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
      {
        onCancel: this.onCancel,
      }
    );
  }

  static onCancel(data: PromptObject) {
    console.log(`You did not set a ${data.name} and canceled the ironlauncher`);

    process.exit(1);
  }
}
