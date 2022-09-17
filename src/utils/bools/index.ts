function isBoolean(option: string | boolean = false) {
  if (typeof option === "string") {
    return option.trim() === "true";
  }
  return option === true;
}

export function multipleBooleans(...options: Array<string | boolean>) {
  console.log("options:", options);
  return options.some((opt) => isBoolean(opt));
}
