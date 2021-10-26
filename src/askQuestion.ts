import prompts from "prompts";
import type { PromptObject } from "prompts";

export async function askQuestion(option: PromptObject) {
  const { type, name, hint, initial, validate, message } = option;
  return prompts({
    type,
    name,
    hint,
    initial,
    validate,
    message,
  });
}
