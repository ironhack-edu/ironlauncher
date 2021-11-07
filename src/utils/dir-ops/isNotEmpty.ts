import fs from "fs";
const currentDir = process.cwd();

export const isNotEmpty = () => {
  return !!fs.readdirSync(currentDir).length;
};
