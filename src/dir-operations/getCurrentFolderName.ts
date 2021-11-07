import { sep } from "path";

export function getCurrentFolderName() {
  const [currentFolder] = process.cwd().split(sep).slice(-1);

  return currentFolder;
}
