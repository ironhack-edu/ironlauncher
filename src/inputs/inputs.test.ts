import { describe, it } from "vitest";
import prompt from "prompts";

describe("prompts", () => {
  //
  it("should just do what we want", async () => {
    prompt.inject([new Error("a tua mae")]);

    const value = await prompt({
      name: "name",
      type: "text",
      message: "Project name?",
    });
  });
});
