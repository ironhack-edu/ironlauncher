import prompts from "prompts";
import { describe, expect, it } from "vitest";
import { askVariant } from "./ask-variant";
import { Variant } from "./input.utils";

describe("ask-variant", () => {
  it("works?", async () => {
    prompts.inject([Variant.Auth]);

    const result = await askVariant();
    expect(result.variant).toBe(Variant.Auth);
  });
});
