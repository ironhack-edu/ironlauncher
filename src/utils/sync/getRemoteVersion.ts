import { promisify } from "util";

import { exec } from "child_process";
import pkg from "../pkg";

export const getRemoteVersion = async () => {
  const execute = promisify(exec);
  try {
    const { stdout } = await execute(`npm view ${pkg.name} version`);

    return stdout.trim();
  } catch (error) {
    throw new Error(`Something went wrong, ${JSON.stringify(error)}`);
  }
};
