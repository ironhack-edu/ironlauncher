import * as fs from "fs";
import inquirer from "inquirer";
import handleError from "cli-handle-error";
import { isNotEmpty } from "./checkName";

interface IAsk {
  message: string;
  hint: string;
  name: string;
}

export async function ask({ message, name, hint }: IAsk) {
  try {
    const { name: response } = await inquirer.prompt([
      {
        name,
        message,
        filter(v) {
          return name === "name" ? v.split(" ").join("-") : v;
        },
        suffix: hint ? ` (${hint})` : null,
        validate(val) {
          if (name === "name") {
            if (fs.existsSync(val)) {
              return `Directory already exists.`;
            }
            if (val === "." && isNotEmpty()) {
              return `This directory is not empty, please choose a different name`;
            }
          }
          return !val ? "Please add a value" : true;
        },
      },
    ]);
    return response;
  } catch (error) {
    handleError(`Input`, error, false, true);
  }
}
