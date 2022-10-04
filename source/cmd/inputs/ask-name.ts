import prompts, { Options } from "prompts";
import { IPromptArgs, promptOptions } from "./input.utils";
import { validateName } from "./validator";

export async function askName(args: IPromptArgs = {}): Promise<string> {
  const { name } = await prompts(
    {
      name: "name",
      type: "text",
      message: "Project name?",
      validate: validateName,
    },
    promptOptions(args)
  );

  return name;
}
