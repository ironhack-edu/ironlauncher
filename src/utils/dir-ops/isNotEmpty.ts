import fs from "fs";
const currentDir = process.cwd();
console.log("currentDir:", currentDir);

export const isNotEmpty = () => {
  return !!fs.readdirSync(currentDir).length;
};
