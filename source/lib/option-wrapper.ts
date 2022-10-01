import { Option } from "@swan-io/boxed";

export function fromTruthy<T>(val?: T): Option<T> {
  const value = val ?? null;
  return Option.fromNull<T>(value);
}

export function fromBool(val: boolean): Option<true> {
  return val ? Option.Some(true) : Option.None();
}
