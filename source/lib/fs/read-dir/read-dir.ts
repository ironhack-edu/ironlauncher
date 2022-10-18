import { Result } from "@swan-io/boxed";
import { Dirent, readdirSync } from "node:fs";
import { NodeFSError } from "../../../utils/nodejs-fs-error";

export type IReadDirFunc = (target: string) => string[];

export type IReadDirDeps = {
  readDir?: IReadDirFunc;
};

export type IReadDirResult = (target: string) => Result<string[], NodeFSError>;

type IReadDir = (deps?: IReadDirDeps) => IReadDirResult;

export const makeReadDirFunc: IReadDir = (deps = {}) => {
  return (target) => {
    const { readDir = readdirSync } = deps;

    return Result.fromExecution(() => readDir(target)).mapError(
      (err) => new NodeFSError(err)
    );
  };
};
