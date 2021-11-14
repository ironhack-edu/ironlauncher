import { flags } from "../utils/cli";

interface ICLIConfig {
  [arg: string]: string | boolean;
}

class CLIConfig {
  #verbose: boolean = false;
  #auth = false;
  #json = false;
  #fs = false;
  #dryRun = false;
  public devMode = process.env.DEV === "true";
  constructor(private flags: ICLIConfig) {
    this.setVerbose(flags);
    this.setFullStack(flags);
    this.setAuth(flags);
    this.setJSON(flags);
    this.setDryRun(flags);
  }

  async init() {}

  private setDryRun(flags: ICLIConfig) {
    const { ["dry-run"]: dryRun } = flags;

    this.#dryRun = !!dryRun;
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

  get dryRun() {
    return this.#dryRun;
  }

  //   TODO: Implement question about which kind of project to build
  get alLFlagData() {
    const { isAuth, isJSON, isFullStack } = this;
    return false;
  }
}

export const prevConfig = new CLIConfig(flags);
