import { Option, Result } from "@swan-io/boxed";
import { existsSync } from "node:fs";
import { describe, it, vi } from "vitest";
import { fromTruthy } from "../../lib/option-wrapper";
import { makeGetNameIsInInputs } from "./name.input";

describe("test", () => {
  const d = Option.None<string>();
  it("works", () => {
    const re = makeGetNameIsInInputs({
      isCwdEmpty: vi.fn().mockReturnValue(Result.Ok(true)),
      isFolderExist: vi.fn().mockReturnValue(Result.Ok(true)),
      isTargetEmpty: vi.fn().mockReturnValue(Result.Ok(true)),
    });

    console.log(Option.None().toResult(null));
    console.log(re([""]));
  });
});
