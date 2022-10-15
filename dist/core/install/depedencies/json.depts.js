"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPRESS_IRONLAUNCHER_JWT_AUTH_DEPS = exports.EXPRESS_IRONLAUNCHER_AUTH_DEPS = exports.JSON_EXPRESS_DEPS = void 0;
const base_deps_1 = require("./base.deps");
exports.JSON_EXPRESS_DEPS = [...base_deps_1.baseExpress, `cookie-parser`, "cors"];
exports.EXPRESS_IRONLAUNCHER_AUTH_DEPS = [
    ...exports.JSON_EXPRESS_DEPS,
    ...base_deps_1.baseCookieAuth,
];
exports.EXPRESS_IRONLAUNCHER_JWT_AUTH_DEPS = [
    ...exports.JSON_EXPRESS_DEPS,
    ...base_deps_1.baseJWTAuth,
];
