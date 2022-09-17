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
