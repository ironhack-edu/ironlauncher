import path from "path";
import { InDirArgs } from "../types/InDir.types";

export function inDir(flags: InDirArgs) {
  const { auth = false, json = false, fs = false, views = true } = flags;

  const folderName = fs ? "fullstack_hooks" : json ? "json" : "views";

  const isAuth = auth ? "auth" : "base";

  return path.join(__dirname, "..", "template", folderName, isAuth);
}
