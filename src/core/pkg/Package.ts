const pkg = require("../../../package.json");
import { promisify } from "util";
import { exec } from "child_process";

export class Package {
  static getLocalVersion() {
    return pkg.version.trim();
  }

  static get version() {
    return pkg.version.trim();
  }

  static get pkgName() {
    return pkg.name;
  }
  static get description() {
    return pkg.name;
  }

  static get pkg() {
    return pkg;
  }

  static async getRemoteVersion() {
    const execute = promisify(exec);

    try {
      const { stdout } = await execute(this.npmView(pkg.name));

      return stdout.trim();
    } catch (error) {
      throw new Error(`Something went wrong. ${JSON.stringify(error)}`);
    }
  }

  private static npmView(pkg: string) {
    return `npm view ${pkg} version`;
  }

  static async isOutOfSync() {
    return (await this.getRemoteVersion()) !== this.getLocalVersion();
  }
}
