"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// source/index.ts
var source_exports = {};
__export(source_exports, {
  Variant: () => Variant,
  askVariant: () => askVariant,
  auth: () => auth,
  hello: () => hello,
  promptOptions: () => promptOptions
});
module.exports = __toCommonJS(source_exports);

// source/cmd/inputs/input.utils.ts
function promptOptions(args = {}) {
  const { exitter = process.exit, logger = console.error } = args;
  return {
    onCancel(data) {
      logger(`You did not set a ${data.name} and canceled the ironlauncher`);
      exitter(1);
    }
  };
}
var Variant = /* @__PURE__ */ ((Variant2) => {
  Variant2[Variant2["NoAuth"] = 0] = "NoAuth";
  Variant2[Variant2["Auth"] = 1] = "Auth";
  return Variant2;
})(Variant || {});

// package.json
var description = "Ironhack generator for express bootstrapping";

// source/utils/pkg.ts
var import_util = require("util");
var import_child_process = require("child_process");
var import_boxed = require("@swan-io/boxed");
var execute = (0, import_util.promisify)(import_child_process.exec);
function getPkgDescription(pkgJson = description) {
  return pkgJson.trim();
}
var v = true;

// source/cmd/inputs/ask-variant.ts
var import_prompts = __toESM(require("prompts"));
async function askVariant(args) {
  return (0, import_prompts.default)(
    {
      name: "variant",
      type: "select",
      message: "Do you want to have auth already built-in?",
      initial: 0 /* NoAuth */,
      choices: [
        {
          title: "No, thank you! I got this \u{1F4AA}",
          value: 0 /* NoAuth */
        },
        {
          title: "Yes, please \u{1F64F}",
          value: 1 /* Auth */
        }
      ]
    },
    promptOptions(args)
  );
}

// source/index.ts
console.log(v);
console.log(getPkgDescription());
var auth = 0 /* NoAuth */;
async function hello() {
  if (!0 /* NoAuth */) {
    return "";
  }
  return "hello";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Variant,
  askVariant,
  auth,
  hello,
  promptOptions
});
