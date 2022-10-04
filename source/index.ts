import { Future, Result } from "@swan-io/boxed";
import { Variant } from "./cmd/inputs/input.utils";
import { init } from "./utils";
import { getPkgDescription } from "./utils/pkg";
import meowHelp from "cli-meow-help";
import minimist from "minimist";
import { helpText } from "./cli/flags/helper-text";
import { makeConfig } from "./config/config";
import { askName } from "./cmd/inputs/ask-name";
import { configDefaults } from "vitest/config";

const { _: inputs, "--": __, ...cliFlags } = minimist(process.argv.slice(2));

export * from "./cmd/inputs/input.utils";

export const auth = Variant.NoAuth;

export async function hello(): Promise<string> {
  if (!Variant.NoAuth) {
    return "";
  }

  return "hello";
}

async function main() {
  init();

  const configOpt = await makeConfig(cliFlags, inputs);

  if (configOpt.isNone()) {
    return console.log(helpText);
  }

  const config = configOpt.get();
}

main();

interface User {
  id: string;
  likes: string[];
  age: number;
}

interface Info {
  id: string;
  user: User;
}

function getUser(): Result<User, Error> {
  return Result.Ok({} as User);
}

async function getInfo(user: User): Promise<Result<Info, Error>> {
  return Result.Ok<Info>({ id: "123", user });
}

// console.log("helpText:", helpText);

// console.log(Object.keys(process.env).filter((e) => /ironlauncher/gi.test(e)));
