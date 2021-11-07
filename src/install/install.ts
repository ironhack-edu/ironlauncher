import type { ICopyDir } from "create-template-folder/dist/types";
import path from "path";

import ora from "ora";

const spinner = ora({ text: "" });

export async function install(args: ICopyDir) {
  const { vars, outDir, inDir } = args;
}
