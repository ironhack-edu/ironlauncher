import ora from "ora";

export interface Spinner {
  start(str: string): void;
  succeed(str: string): void;
}

export type IMakeSpinner = (
  spinnerMaker?: (options?: string | ora.Options | undefined) => ora.Ora
) => Spinner;

export const makeSpinner: IMakeSpinner = (
  spinnerMaker: (options?: string | ora.Options | undefined) => ora.Ora = ora
) => {
  const spinner = spinnerMaker({ text: "" });

  return {
    start(str: string) {
      spinner.start(str);
    },
    succeed(str: string) {
      spinner.succeed(str);
    },
  };
};
