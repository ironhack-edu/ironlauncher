import minimist from "minimist";
const args = minimist(process.argv.slice(2));

export const { _: inputs, ...flags } = args;

export const displayHelp = () => {
  return args._.includes("help") || !!args["help"];
};

export const getProjectName = () => {
  const { _: inputs, ...flags } = args;

  let name = inputs[0];
  let warnings: string[] = [];

  for (let key in flags) {
    const val = flags[key];

    if (typeof val !== "boolean") {
      warnings.push(val as string);
    }
  }

  if (warnings.length) {
    return {
      currentName: name,
      warnings,
    };
  }
  return {
    currentName: name,
  };
};
