import { getName } from "./utils/getName";
import { init } from "./utils/init";
import { cli } from "./utils/meow";
import { inDir, outDir } from "./utils/new-paths";
import { makeQuestion } from "./utils/question";

const { input, flags, showHelp } = cli;

// @ts-ignore
const { json = false, auth = false, fs: isFullStack = false } = flags;

async function main() {
  init();
  if (input.includes("help")) {
    return showHelp(0);
  }

  let { name, issue } = getName(input);

  if (!name) {
    name = await makeQuestion({
      message: "Project name?",
      issue,
      name: "name",
      hint: "This will be the name in package.json",
    });
  }

  const newInDirPath = inDir({ ...(flags as any), isFullStack });
  const outDirPath = outDir(name);

  const vars = { name };
}

main();
// import * as childProcess from "child_process";

// async function main() {
//   await spawn();
// }

// async function spawn() {
//   return new Promise((res, rej) => {
//     const process = childProcess.spawn("yarn", ["add", "-D", "ts-node"], {
//       stdio: "inherit",
//     });
//     process.on("close", (d) => {
//       res(d);
//     });
//     process.on("error", (err) => {
//       rej(err);
//     });
//   });
// }

// main();
