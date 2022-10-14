import { ChildProcess, spawn } from "child_process";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { mockDeep } from "vitest-mock-extended";
import { makeCommand } from "./run-command";

const makeCloseFunc = (element: ChildProcess): Promise<boolean> =>
  new Promise((resolve) => {
    setTimeout(() => {
      element.emit("close", () => {});

      resolve(true);
    }, 10);
  });

const mocki = mockDeep<ChildProcess>();

vi.mock("child_process", async () => ({
  ...((await vi.importActual(
    "child_process"
  )) as typeof import("child_process")),
  spawn: vi.fn(),
}));

describe("test", () => {
  beforeEach(() => {
    (mocki as unknown as Mock).mockReset();
  });

  describe("mocked child_process", () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

    it("ignore stdio", async () => {
      vi.mocked(spawn).mockReturnValue(mocki);

      const func = makeCommand();
      await Promise.race([makeCloseFunc(mocki), func("hello")]);
      expect(vi.mocked(spawn)).toHaveBeenCalledWith("hello", {
        stdio: "ignore",
        shell: true,
      });
    });

    it("ignore stdio", async () => {
      vi.mocked(spawn).mockReturnValue(mocki);

      const func = makeCommand();
      await Promise.race([makeCloseFunc(mocki), func("hello", true)]);
      expect(vi.mocked(spawn)).toHaveBeenCalledWith("hello", {
        stdio: "inherit",
        shell: true,
      });
    });
  });

  describe("makeChildProcess", () => {
    it("ignore stdio", async () => {
      const mockedSpawn = vi.fn().mockReturnValue(mocki);
      const func = makeCommand(mockedSpawn);

      await Promise.race([makeCloseFunc(mocki), func("hello")]);

      expect(mockedSpawn).toHaveBeenCalledWith("hello", {
        stdio: "ignore",
        shell: true,
      });
    });

    it("inherit stdio", async () => {
      const m = vi.fn().mockReturnValue(mocki);
      const func = makeCommand(m);

      await Promise.race([makeCloseFunc(mocki), func("hello", true)]);

      expect(m).toHaveBeenCalledWith("hello", {
        stdio: "inherit",
        shell: true,
      });
    });
  });
});
