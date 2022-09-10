import { describe, expect, it, vi, assert } from "vitest";
import * as pkg from "../../package.json";
import {
  getPkgDescription,
  getPkgLocalVersion,
  getPkgName,
  getRemoteVersion,
  isPkgOutOfSync,
  Pkg,
} from "./pkg";

describe("pkg", () => {
  describe("should get necessary properties by default", () => {
    const keys = [
      {
        key: "name",
        value: pkg.name,
        func: getPkgName,
      },
      {
        key: "description",
        value: pkg.description,
        func: getPkgDescription,
      },
      {
        key: "version",
        value: pkg.version,
        func: getPkgLocalVersion,
      },
    ];

    for (const tc of keys) {
      it(`should get correct ${tc.key} from default package.json`, () => {
        expect(tc.func()).toBe(tc.value);
      });
    }
  });

  describe("should get necessary properties if given a mock", () => {
    const keys = [
      {
        key: "name" as const,
        pkg: {
          name: "THIS IS A PROBLEM   ",
          description: "   THIS IS THE DESCRIPTION	",
          version: "		2",
        } as Pkg,
        get value() {
          return this.pkg[this.key].trim();
        },
        func: getPkgName,
      },
      {
        key: "description" as const,
        pkg: {
          name: "THIS IS A PROBLEM   ",
          description: "   THIS IS THE DESCRIPTION	",
          version: "		2",
        } as Pkg,
        get value() {
          return this.pkg[this.key].trim();
        },
        func: getPkgDescription,
      },
      {
        key: "version" as const,
        pkg: {
          name: "THIS IS A PROBLEM   ",
          description: "   THIS IS THE DESCRIPTION	",
          version: "		2",
        } as Pkg,
        get value() {
          return this.pkg[this.key].trim();
        },
        func: getPkgLocalVersion,
      },
    ];

    for (const tc of keys) {
      it(`should get correct ${tc.key} from default package.json`, () => {
        expect(tc.func(tc.pkg[tc.key])).toBe(tc.value);
      });
    }
  });

  describe("remote", () => {
    describe("getLocalRemoteVersion", () => {
      it("deals in case of error", async () => {
        const error = new Error("Package does not exist");
        const mock = vi.fn().mockRejectedValue(error);

        const result = await getRemoteVersion({
          executor: mock,
        });

        assert(result.isError());
        expect(mock).toHaveBeenCalledWith(`npm view ${pkg.name} version`);
        expect(mock).toHaveBeenCalledOnce();
      });

      it("deals in case of success", async () => {
        const success = { stdout: "	value	" };
        const mock = vi.fn().mockResolvedValue(success);

        const result = await getRemoteVersion({
          executor: mock,
        });

        assert(result.isOk());
        expect(mock).toHaveBeenCalledWith(`npm view ${pkg.name} version`);
        expect(mock).toHaveBeenCalledOnce();
        expect(result.get()).toBe(success.stdout.trim());
      });
    });

    describe("isPkgOutOfSync", () => {
      it("deals in case of error", async () => {
        const error = new Error("Package does not exist");
        const mock = vi.fn().mockRejectedValue(error);

        const result = await isPkgOutOfSync({
          executor: mock,
        });

        assert(result.isError());
        expect(mock).toHaveBeenCalledWith(`npm view ${pkg.name} version`);
        expect(mock).toHaveBeenCalledOnce();
      });

      it("deals in case of success", async () => {
        const success = { stdout: `	${pkg.version}	` };
        const mock = vi.fn().mockResolvedValue(success);

        const result = await isPkgOutOfSync({
          executor: mock,
        });

        assert(result.isOk());
        expect(mock).toHaveBeenCalledWith(`npm view ${pkg.name} version`);
        expect(mock).toHaveBeenCalledOnce();
        expect(result.get()).toBe(false);
      });

      it("deals in case of but different versions", async () => {
        const success = { stdout: `	different	` };
        const mock = vi.fn().mockResolvedValue(success);

        const result = await isPkgOutOfSync({
          executor: mock,
        });

        assert(result.isOk());
        expect(mock).toHaveBeenCalledWith(`npm view ${pkg.name} version`);
        expect(mock).toHaveBeenCalledOnce();
        expect(result.get()).toBe(true);
      });
    });
  });
});
