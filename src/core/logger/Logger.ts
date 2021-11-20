import { green, dim, bgRed, white } from "kolorist";
interface Green {
  inGreen: string;
  rest: string;
}
class Logger {
  emptyLine() {
    console.log();
  }

  dimmedWithGreen({ rest, inGreen }: Green) {
    console.log(dim(`\n${rest} $${green(`./${inGreen}`)}`));
  }

  greenAndRest({ rest, inGreen }: Green) {
    console.log(`${green(inGreen)}${rest}`);
  }

  error(str: string) {
    console.log(`${bgRed(white(" ERROR "))} ${str}`);
  }

  log(str: string) {
    console.log(str);
  }
}

export const logger = new Logger();
