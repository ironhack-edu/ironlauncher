export class NoSuchFolderError extends Error {
  constructor(path: string) {
    super(`There is no such folder -> ${path}`);
    this.name = "NoSuchFolderError";
  }
}

export class DirectoryTakenError extends Error {
  constructor(path: string) {
    super(`The directory is already taken -> ${path}`);
    this.name = "DirectoryTakenError";
  }
}

export class DirNotEmptyError extends Error {
  constructor(path: string = process.cwd()) {
    if (path === process.cwd()) {
      super(`Please choose a different name. Current directory is not empty\n`);
    } else {
      super(
        `Please choose a different name. Target dir not empty -> ${path}\n`
      );
    }
    this.name = "DirNotEmptyError";
  }
}

export class NoValueError extends Error {
  constructor() {
    super("Please add a value\n");
  }
}
