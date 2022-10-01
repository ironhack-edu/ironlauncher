import { Result } from "@swan-io/boxed";
import { readdirSync } from "node:fs";
import { NodeFSError } from "../../../utils/nodejs-fs-error";
import { IReadDirFunc, makeReadDirFunc } from "../read-dir/read-dir";

export type IDirEmptyDeps = {
  readDir?: IReadDirFunc;
};

export type EmptyDirFunc = (target: string) => Result<boolean, NodeFSError>;

export type IDirEmpty = (deps?: IDirEmptyDeps) => EmptyDirFunc;

export const makeDirEmptyFunc: IDirEmpty = (deps = {}) => {
  return (target) => {
    const { readDir = readdirSync } = deps;

    const func = makeReadDirFunc({ readDir });

    return func(target).map((val) => !val.length);
  };
};

export type ICurrDirEmpty = (
  deps?: IDirEmptyDeps
) => () => Result<boolean, NodeFSError>;

export const makeCurrDirEmptyFunc: ICurrDirEmpty = (deps) => {
  const isEmptyFunc = makeDirEmptyFunc(deps);
  return () => {
    return isEmptyFunc(process.cwd());
  };
};
