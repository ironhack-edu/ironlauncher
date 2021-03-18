import { ask } from "./ask";

interface IQuestion {
  message: string;
  issue?: string;
  hint: string;
  name: string;
}
export function makeQuestion(args: IQuestion) {
  const { issue, hint } = args;

  return ask({
    ...args,
    hint: issue ? `${issue}: ${hint}` : hint,
  });
}
