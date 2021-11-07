import prompt from "prompts";
import { validateName } from "../utils/validations";

export default class GetInputs {
  static async getName() {
    return prompt({
      name: "name",
      type: "text",
      message: "Project name?",
      validate: validateName,
    });
  }
}
