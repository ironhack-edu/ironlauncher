import { Result } from "@swan-io/boxed";
import { basename } from "node:path";
import { assert, describe, expect, it } from "vitest";
import { NoSuchFolderError } from "../../cmd/inputs/input-errors";
import { makeGetNameIsInInputs } from "./name.input";

describe("test", () => {
  describe("no argument passed", () => {
    it("should return none if no argument is passed", () => {
      const getNameInInputs = makeGetNameIsInInputs();

      const result = getNameInInputs();

      assert(result.isNone());
    });
  });

  describe("cwd", () => {
    it("respects in case of current empty dir", () => {
      const getNameInInputs = makeGetNameIsInInputs({
        isCwdEmpty: () => Result.Ok(true),
      });

      const result = getNameInInputs(["."]);

      assert(result.isSome());
      expect(result.get()).toBe(basename(process.cwd()));
    });

    it("returns None is folder is not empty", () => {
      const getNameInInputs = makeGetNameIsInInputs({
        isCwdEmpty: () => Result.Ok(false),
      });

      const result = getNameInInputs(["."]);

      assert(result.isNone());
    });

    it("returns None is for some reason getting cwd empty errors out", () => {
      const getNameInInputs = makeGetNameIsInInputs({
        isCwdEmpty: () => Result.Error(new NoSuchFolderError("whatever")),
      });

      const result = getNameInInputs(["."]);

      assert(result.isNone());
    });
  });

  describe("named project", () => {
    it("should be return None if folder folder already exists", () => {
      const action = makeGetNameIsInInputs({
        isFolderExist: () => Result.Ok(true),
      });

      const result = action(["whatever"]);

      assert(result.isNone());
    });

    it("should return None if folder ", () => {
      const action = makeGetNameIsInInputs({
        isFolderExist: () => Result.Ok(false),
      });

      const result = action(["whatever"]);

      assert(result.isSome());
      expect(result.get()).toBe("whatever");
    });
  });
});
