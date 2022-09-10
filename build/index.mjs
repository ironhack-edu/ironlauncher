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
import { promisify } from "util";
import { exec } from "child_process";
import { Result } from "@swan-io/boxed";
var execute = promisify(exec);
function getPkgDescription(pkgJson = description) {
  return pkgJson.trim();
}
var v = true;

// source/cmd/inputs/ask-variant.ts
import prompts from "prompts";
async function askVariant(args) {
  return prompts(
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
export {
  Variant,
  askVariant,
  auth,
  hello,
  promptOptions
};
