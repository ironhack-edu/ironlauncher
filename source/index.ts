import { Future, Result } from "@swan-io/boxed";
import { Variant } from "./cmd/inputs/input.utils";
import { init } from "./utils";
import { getPkgDescription } from "./utils/pkg";

export * from "./cmd/inputs/input.utils";

export const auth = Variant.NoAuth;
export * from "./cmd/inputs/ask-variant";

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
