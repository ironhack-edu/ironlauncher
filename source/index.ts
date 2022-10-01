import { Future, Result } from "@swan-io/boxed";
import { Variant } from "./cmd/inputs/input.utils";
import { init } from "./utils";
import { getPkgDescription } from "./utils/pkg";

export * from "./cmd/inputs/input.utils";

export const auth = Variant.NoAuth;
export * from "./config/make-config/name";

export async function hello(): Promise<string> {
  if (!Variant.NoAuth) {
    return "";
  }

  return "hello";
}

async function main() {
  init();
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

import meowHelp from "cli-meow-help";
import minimist from "minimist";
import { helpText } from "./cli/flags/helper-text";

const args = minimist(process.argv.slice(2));
console.log("args:", args);

console.log("helpText:", helpText);

console.log(Object.keys(process.env).filter((e) => /ironlauncher/gi.test(e)));
