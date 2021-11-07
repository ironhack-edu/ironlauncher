import prompts from "prompts";
import type { PromptObject } from "prompts";
import { dim } from "kolorist";

type AskQuestion = { issue?: string } & PromptObject;

export async function askQuestion(option: AskQuestion) {
  const { hint, issue, ...options } = option;

  const newHint = issue
    ? `${issue}: ${hint}`.replace(/\n/, "")
    : (hint as string);
  return prompts({ ...options, hint: newHint,  });
}
