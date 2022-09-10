import mockFS from "mock-fs";
import { afterEach, describe, expect, it, assert, vi } from "vitest";
import { join } from "node:path";
import { FsValidator } from "./fs.validator";

const cwd = process.cwd();

describe("elementExists", () => {
  afterEach(() => {
    mockFS.restore();
  });

  it("should return true if a specific element already exists with a given name", () => {
    const folderName = join(cwd, "folder");
    mockFS({
      [folderName]: {},
    });

    const folderExistsResult = FsValidator.elementExists(folderName);

    assert(folderExistsResult.isOk());
  });

  it("should return false if a specific element doesn't exists with a given name", () => {
    const folderName = join(cwd, "folder");
    mockFS({});

    const folderExistsResult = FsValidator.elementExists(folderName);
    assert(folderExistsResult.isError());
  });

  it("should deal with error in case exists func throws", () => {
    const err = new Error("Nope");
    const mock = vi.fn().mockImplementationOnce(() => {
      throw err;
    });

    const folderName = join(cwd, "folder");
    mockFS({});

    const folderExistsResult = FsValidator.elementExists(folderName, mock);
    assert(folderExistsResult.isError());

    expect(folderExistsResult.getError()).toEqual(err);
  });

  it("going to test deeply nested to see response", () => {
    const folderName = join(cwd, "folder", "test", "deep", "deep-again");
    mockFS({});

    const folderExistsResult = FsValidator.elementExists(folderName);
    console.log("folderExistsResult:", folderExistsResult);
  });
});

describe("dirNotEmpty", () => {
  afterEach(() => {
    mockFS.restore();
  });

  it("should return true if a specific element already exists with a given name", () => {
    const folderName = join(cwd, "folder");
    mockFS({
      [folderName]: {
        null: {},
      },
    });

    const result = FsValidator.currentDirectoryNotEmpty();

    assert(result.isOk());
    expect(result.get()).toBe(true);
  });

  it("should return false if a specific element doesn't exists with a given name", () => {
    mockFS({});
    const result = FsValidator.currentDirectoryNotEmpty();

    assert(result.isOk());
    expect(result.get()).toBe(false);
  });
});

describe("targetDirNotEmpty", () => {
  afterEach(() => {
    mockFS.restore();
  });

  it("should return true if a specific element already exists with a given name", () => {
    const folderName = join(cwd, "folder");
    mockFS({
      [folderName]: {
        null: {},
      },
    });

    const targetDirResult = FsValidator.targetDirNotEmpty(folderName);

    assert(targetDirResult.isOk());

    expect(targetDirResult.get()).toBe(true);
  });

  it("should return false if a specific element doesn't exists with a given name", () => {
    const folderName = join(cwd, "folder");

    mockFS({});

    const targetDirResult = FsValidator.targetDirNotEmpty(folderName);

    assert(targetDirResult.isError());

    expect(targetDirResult.getError()).toBeInstanceOf(Error);
    const err = targetDirResult.getError();

    assert(isError(err));

    expect(err.code).toBe("ENOENT");
  });
});

describe("targetDirEmpty", () => {
  afterEach(() => {
    mockFS.restore();
  });

  it("should return true if a specific element already exists with a given name", () => {
    const folderName = join(cwd, "folder");
    mockFS({
      [folderName]: {
        null: {},
      },
    });

    const targetDirResult = FsValidator.targetDirEmpty(folderName);

    assert(targetDirResult.isOk());

    expect(targetDirResult.get()).toBe(false);
  });

  it("should return false if a specific element doesn't exists with a given name", () => {
    const folderName = join(cwd, "folder");

    mockFS({});

    const targetDirResult = FsValidator.targetDirEmpty(folderName);

    assert(targetDirResult.isError());

    const err = targetDirResult.getError();

    assert(isError(err));

    expect(targetDirResult.getError()).toBeInstanceOf(Error);

    assert(isError(err));

    expect(err.code).toBe("ENOENT");
  });
});

function isError(err: unknown): err is NodeJS.ErrnoException {
  return err instanceof Error && "code" in err && "syscall" in err;
}
