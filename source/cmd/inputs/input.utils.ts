import { Options } from "prompts";

export type Logger = {
  error: ErrorLogger;
};

export type ErrorLogger = (str: string) => void;
export type Exit = (num: 0 | 1) => void;

export type IPromptArgs = {
  logger?: ErrorLogger;
  exitter?: Exit;
};

export function promptOptions(args: IPromptArgs = {}): Options {
  const { exitter = process.exit, logger = console.error } = args;

  return {
    onCancel(data) {
      logger(`You did not set a ${data.name} and canceled the ironlauncher`);

      exitter(1);
    },
  };
}

export const enum Variant {
  NoAuth,
  Auth,
}
