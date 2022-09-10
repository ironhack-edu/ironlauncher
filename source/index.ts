import { Variant } from "./cmd/inputs/input.utils";
import { getPkgDescription, v } from "./utils/pkg";

console.log(v);
console.log(getPkgDescription());

export * from "./cmd/inputs/input.utils";

export const auth = Variant.NoAuth;
export * from "./cmd/inputs/ask-variant";

export async function hello(): Promise<string> {
  if (!Variant.NoAuth) {
    return "";
  }

  return "hello";
}
