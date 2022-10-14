import { Option } from "@swan-io/boxed";

export function fromTruthy<T>(val?: T): Option<T> {
  const value = val ?? null;
  return Option.fromNull<T>(value);
}
