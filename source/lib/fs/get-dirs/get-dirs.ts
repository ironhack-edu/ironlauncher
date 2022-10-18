import { Result } from "@swan-io/boxed";
import { Dirent, readdirSync } from "fs";
import { join } from "path";
import { NodeFSError } from "../../../utils";

export type IGetAllDirsFunc = (
  target: string,
  arg: { withFileTypes?: boolean }
) => Dirent[];

export type IGetAllDirDeps = {
  readDir?: IGetAllDirsFunc;
};

export type IGetAllDirsResult = (
  target: string
) => Result<Array<{ title: string; value: string }>, NodeFSError>;

// export type IGetAllDirsResult = (
//   target: string
// ) => Result<Dirent[], NodeFSError>;

type IGetAllDir = (deps?: IGetAllDirDeps) => IGetAllDirsResult;
type IGetAllDirPaths = (deps?: IGetAllDirDeps) => IGetAllDirsResult;

export const makeGetAllDirsFunc: IGetAllDir = (deps = {}) => {
  return (target) => {
    const { readDir = readdirSync } = deps;

    return Result.fromExecution(() => readDir(target, { withFileTypes: true }))
      .mapError((err) => new NodeFSError(err))
      .map((dirent) =>
        dirent
          .filter((e) => e.isDirectory())
          .map((folder) => {
            return {
              title: folder.name,
              value: join(target, folder.name),
            };
          })
      );
  };
};

// export const makeGetAllDirsPathsFunc:
