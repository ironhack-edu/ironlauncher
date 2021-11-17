import fs from "fs";
const currentDir = process.cwd();

export const isNotEmpty = () => {
  console.log(process.cwd());
  return !!fs.readdirSync(currentDir).length;
};
