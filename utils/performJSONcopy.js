const { green: g, dim: d, yellow: y, blue: b } = require("chalk");
const copy = require("copy-template-dir");
const alert = require("cli-alerts");
const { basename } = require("path");
const ora = require("ora");
const execa = require("execa");
const path = require("path");
const fs = require("fs");
const { inDir, getTemplate } = require("./paths");
const pkg = require("../package.json");
const getPackage = require("get-repo-package-json");
const { jsonSetup } = require("./full/installation");

const spinner = ora({ text: "" });

module.exports = ({ inDirPath, outDirPath, vars, isCurrentFolder = null }) => {
  const { name: outDir } = vars;
  // return;

  const pathBase = inDirPath.split("/");
  // const isJson = pathBase[pathBase.length - 2] === "json";
  const isAuth = pathBase[pathBase.length - 1] === "auth";

  copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
    if (err) throw err;
    console.log();
    console.log(d(`\nCreating files in $${g(`./${outDir}`)}`));

    createdFiles.forEach((filePath) => {
      const fileName = basename(filePath);
      console.log(`${g("CREATED")}: ${fileName}`);
    });
    console.log();
    let isSameVersion = true;
    spinner.start(
      `${y("INSTALLING")} dependencies...\n\n${d(`It might take a moment`)}`
    );
    await jsonSetup({ isAuth, outDirPath });

    spinner.succeed(`${g("FINISHED")} installation...`);

    if (!isCurrentFolder) {
      alert({
        type: "success",
        name: `ALL DONE`,
        msg: `\n\n${createdFiles.length} files created in ${d(
          `./${outDir}`
        )} directory`,
      });
    } else {
      alert({
        type: "success",
        name: `ALL DONE`,
        msg: `\n\n${createdFiles.length} files created in the current directory`,
      });
    }

    if (!isCurrentFolder) {
      return alert({
        type: `info`,
        msg: `Project bootstrapped successfully.\n\nYou can now cd ./${outDir}`,
        name: "DONE",
      });
    }
    return alert({
      type: `info`,
      msg: `Projected bootstrapped successfully. \n\nYou can now open the current directory with your code editor`,
      name: `DONE`,
    });
  });
};
