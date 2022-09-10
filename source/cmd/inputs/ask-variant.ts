import prompts from "prompts";
import { IPromptArgs, promptOptions, Variant } from "./input.utils";

export async function askVariant(
  args?: IPromptArgs
): Promise<{ variant: Variant }> {
  return prompts(
    {
      name: "variant",
      type: "select",
      message: "Do you want to have auth already built-in?",
      initial: Variant.NoAuth,
      choices: [
        {
          title: "No, thank you! I got this 💪",
          value: Variant.NoAuth,
        },
        {
          title: "Yes, please 🙏",
          value: Variant.Auth,
        },
      ],
    },
    promptOptions(args)
  );
}
