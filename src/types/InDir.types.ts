import { FLAGS_OPTS } from "../utils/cli";

type InDirFlags = FLAGS_OPTS | "views";
type InDir = Record<InDirFlags, boolean | undefined>;
export type InDirArgs = {
  [key in keyof InDir]?: boolean;
};
