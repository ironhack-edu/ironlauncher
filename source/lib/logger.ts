import { dim, green, bgRed, white } from "kolorist";

type IFocusArg = {
  focus: string;
  rest: string;
};

type IDimArg = {
  dimmed: string;
  rest: string;
};

export interface ILogger {
  emptyLine(): void;
  dimmed(arg: IDimArg): void;
  focus(arg: IFocusArg): void;
  error(str: string): void;
  /**
   *
   * This method exists to "centralize" console log methods
   */
  log(str: string): void;
}

export const logger: ILogger = {
  emptyLine() {
    console.log();
  },
  dimmed({ dimmed, rest }) {
    const greenText = green(`./${rest}`);
    const dimmedText = dim(`\n${dimmed} $${greenText}`);

    console.log(dimmedText);
  },
  focus({ focus, rest }) {
    const focusedText = green(focus);
    console.log(`${focusedText}${rest}`);
  },
  error(str) {
    console.log(`${bgRed(white(" ERROR "))} - ${str}`);
  },
  log(str) {
    console.log(str);
  },
};
