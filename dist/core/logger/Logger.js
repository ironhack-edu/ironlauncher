"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const kolorist_1 = require("kolorist");
class Logger {
    emptyLine() {
        console.log();
    }
    dimmedWithGreen({ rest, inGreen }) {
        console.log((0, kolorist_1.dim)(`\n${rest} $${(0, kolorist_1.green)(`./${inGreen}`)}`));
    }
    greenAndRest({ rest, inGreen }) {
        console.log(`${(0, kolorist_1.green)(inGreen)}${rest}`);
    }
    error(str) {
        console.log(`${(0, kolorist_1.bgRed)((0, kolorist_1.white)(" ERROR "))} ${str}`);
    }
    log(str) {
        console.log(str);
    }
}
exports.logger = new Logger();
