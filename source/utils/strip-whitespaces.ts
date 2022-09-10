export function stripWhitespaces(string: string) {
  return string.replaceAll(/\s+/g, "-");
}
