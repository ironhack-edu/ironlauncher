import { sep, join } from "path";
import { ironlauncherConfig } from "../../config";

export class FolderOps {
  static getCurrentFolderName() {
    const [currentFolder] = process.cwd().split(sep).slice(-1);

    return currentFolder;
  }

  static inDirectory() {
    return join(
      process.cwd(),
      "template",
      ironlauncherConfig.template,
      ironlauncherConfig.variant
    );
  }

  static outDirectory(name: string) {
    return join(process.cwd(), name);
  }
}
