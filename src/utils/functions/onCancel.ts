import { PromptObject } from "prompts";

export function onCancel(data: PromptObject) {
  console.log(`You did not set a ${data.name} and canceled the ironlauncher`);

  process.exit(1);
}
