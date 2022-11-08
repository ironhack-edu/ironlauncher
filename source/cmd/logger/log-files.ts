import { basename } from "path";
import { logger } from "../../lib/logger";

export async function logFiles(fileNames: string[], name: string) {
  logger.emptyLine();
  logger.dimmed({ dimmed: `\nCreating files in`, rest: basename(name) });

  fileNames.forEach((filePath) => {
    const fileName = basename(filePath);
    logger.focus({ focus: "CREATED", rest: `: ${fileName}` });
  });

  logger.emptyLine();
}
