import { describe, expect, it, vi } from "vitest";
import { makeSpinner } from "./index";

describe.skip("spinner maker", () => {
  it("calls correct methods?", () => {
    const succeed = vi.fn();
    const start = vi.fn();
    const mock = vi.fn().mockImplementation(() => {
      return {
        start,
        succeed,
      };
    });

    const maker = makeSpinner(mock);

    maker.start("start");
    expect(start).toHaveBeenCalledOnce();
    maker.succeed("success");
    expect(succeed).toHaveBeenCalledOnce();
  });
});

const succeed = vi.fn();
const start = vi.fn();

vi.mock("ora", async () => ({
  default: () => ({
    start,
    succeed,
  }),
}));

describe("test?", () => {
  it("works", () => {
    const spinner = makeSpinner();
    spinner.start("start");
    expect(start).toHaveBeenCalledOnce();
    spinner.succeed("success");
    expect(succeed).toHaveBeenCalledOnce();
  });
});
