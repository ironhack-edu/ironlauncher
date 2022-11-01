import { readdirSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";
const cli_config_file = join(process.cwd(), "source", "types", "template.type.ts");
const only_dirs = readdirSync(join(process.cwd(), "template"), {
    withFileTypes: true,
})
    .filter((e) => e.isDirectory())
    .map((e) => JSON.stringify(e.name));
const dir_types = only_dirs.join(" | ");
const comment_data = `/**
 * ⛔️ ⛔️ ⛔️ ⛔️  DO NOT TOUCH ⛔️ ⛔️ ⛔️ ⛔️ 
 *
 * Ironlauncher Script. Auto Generated! Please Don't Touch. This. Should. Not. Be. Touched. At all! Please, for the love of everything in the world, do not touch this file. 
 * 
 * 🐲🐲🐲🐲🐲🐲🐲🐲🐲 HERE BE DRAGONS 🐲🐲🐲🐲🐲🐲🐲🐲🐲
 */`;
const export_type = `export type IronlauncherTemplate = ${dir_types}`;
const content = `${comment_data}
${export_type.replaceAll("\\", "")}`;
await writeFile(cli_config_file, content, { encoding: "utf-8" });
