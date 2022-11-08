#!/usr/bin/env node
declare module "cli-handle-unhandled" {
  export default function unhandled(): void;
}

declare module "cli-welcome" {
  interface Welcome {
    title?: string;
    tagLine?: string;
    description?: string;
    version?: string;
    bgColor?: string;
    color?: string;
    bold?: boolean;
    clear?: boolean;
  }
  export default function welcome(options?: Welcome): void;
}

declare module "cli-meow-help" {
  type PossibleArgs = {
    type?: "boolean";
    default?: boolean;
    desc: string;
    alias?: string;
  };
  type MeowHelpCommands = Record<string, { desc: string }>;
  type MeowHelpFlags<T extends string[]> = Record<T[number], PossibleArgs>;
  type MeowHelp = {
    flags: MeowHelpFlags<string[]>;
    commands: MeowHelpCommands;
    name: string;
  };
  export default function meowHelp(options?: MeowHelp);
}

declare module "cli-alerts" {
  export type AlertType = "success" | "warning" | "info" | "error";
  export interface AlertOptions {
    type: AlertType;
    msg: string;
    name: string;
  }

  export default function alert(alertOptions: AlertOptions): void;
}
