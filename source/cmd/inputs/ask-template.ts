import prompts from "prompts";

export async function askProjectType() {
  return prompts([
    {
      name: "project",
      type: "select",
      message: "Which kind?",
      initial: 0,
      choices: [
        { title: "views", value: "views" },
        { title: "json", value: "json" },
        { title: "fullstack", value: "fullstack" },
      ],
    },
  ]);
}
