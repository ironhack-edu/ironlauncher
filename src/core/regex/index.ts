export class IronRegex {
  private static whiteSpace = /\s+/g;
  static stripWhiteSpaces(str: string) {
    return str.replace(this.whiteSpace, "-");
  }
}
