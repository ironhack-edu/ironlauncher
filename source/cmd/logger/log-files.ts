import { basename } from "path";

export async function logFiles(fileNames: string[], name: string) {
  console.log();
  console.log(`ting files in ./$${basename(name)}`);

  fileNames.forEach((filePath) => {
    const fileName = basename(filePath);
    console.log(`CREATED: ${fileName}`);
  });

  console.log();
}
