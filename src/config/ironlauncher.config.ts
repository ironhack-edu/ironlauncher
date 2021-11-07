import { flags } from "../utils/cli";

interface ICLIConfig {
  [arg: string]: string | boolean;
}

class CLIConfig {
  #verbose: boolean = false;
  #auth = false;
  #json = false;
  #fs = false;
  #devMode = process.env.DEV === "true";
  constructor(flags: ICLIConfig) {
    this.setVerbose(flags);
    this.setFullStack(flags);
    this.setAuth(flags);
    this.setJSON(flags);
  }

  get devMode() {
    return this.#devMode;
  }

  private setAuth(flags: ICLIConfig) {
    const { a = false, auth = false } = flags;

    this.#auth = !!a || !!auth;
  }
  private setJSON(flags: ICLIConfig) {
    const { json = false } = flags;

    this.#json = !!json;
  }

  private setFullStack(flags: ICLIConfig) {
    const { fs = false, fullStack = false, hooks = false } = flags;
    this.#json = !!fs || !!fullStack || !!hooks;
  }

  private setVerbose(flags: ICLIConfig) {
    const { v = false, verbose = false } = flags;
    this.#verbose = !!v || !!verbose;
  }

  get verbose() {
    return this.#verbose;
  }

  get isAuth() {
    return this.#auth;
  }

  get isFullStack() {
    return this.#fs;
  }

  get isJSON() {
    return this.#json && !this.#fs;
  }

  //   TODO: Implement question about which kind of project to build
  get alLFlagData() {
    const { isAuth, isJSON, isFullStack } = this;
    return false;
  }
}

export const ironlauncherConfig = new CLIConfig(flags);
