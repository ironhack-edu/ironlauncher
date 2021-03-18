import * as path from "path";

interface IInDir {
  json: boolean;
  auth: boolean;
  isFullStack: boolean;
}
export function inDir({
  json = false,
  auth = false,
  isFullStack = false,
}: IInDir) {
  const folderName = isFullStack ? "fullstack" : json ? "json" : "views";

  const isAuth = auth ? "auth" : "base";
  return path.join(__dirname, "..", "..", "template", folderName, isAuth);
}

export function outDir(name: string) {
  return path.join(process.cwd(), name);
}
