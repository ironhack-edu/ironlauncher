import { Option } from "@swan-io/boxed";

export function fromTruthy<T>(val?: T): Option<T> {
  return val ? Option.Some(val) : Option.None();
}
