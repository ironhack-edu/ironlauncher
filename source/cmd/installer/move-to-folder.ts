import { Result } from "@swan-io/boxed";
import { NodeFSError } from "../../utils";
type ChDir = (directory: string) => void;

type IMakeMoveToFolderArgs = {
  directory: string;
  dryRun?: boolean;
};

export type IMakeMakeMoveToFolderFunc = (
  moveOpts: IMakeMoveToFolderArgs
) => Result<void, NodeFSError>;

export type IMakeMoveToFolder = (func?: ChDir) => IMakeMakeMoveToFolderFunc;

export const makeMoveToFolder: IMakeMoveToFolder = (func = process.chdir) => {
  return ({ directory, dryRun }) => {
    if (dryRun) {
      return Result.Ok(undefined);
    }

    return Result.fromExecution(() => func(directory));
  };
};

export const moveToFolder = makeMoveToFolder();
