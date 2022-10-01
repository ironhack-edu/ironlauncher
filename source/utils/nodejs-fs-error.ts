export class NodeFSError
  extends Error
  implements NodeJS.ErrnoException, TypeError
{
  errno?: NodeJS.ErrnoException["errno"];
  code?: string | undefined;
  path?: string | undefined;
  stack?: string | undefined;
  constructor(error?: unknown) {
    const err = error as NodeJS.ErrnoException;
    super(err?.message);
    this.name = "NodeJsFSError";
    this.cause = err?.cause;
    this.errno = err?.errno;
    this.stack = err?.stack;
    this.path = err?.path;
  }
}
