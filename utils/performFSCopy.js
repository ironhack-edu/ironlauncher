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
const { react, jsonSetup } = require("./full/instalation");

const spinner = ora({ text: "" });

module.exports = ({ inDirPath, outDirPath, vars }) => {
  console.log("outDirPath:", outDirPath);
  const server = path.join(outDirPath, `server`);
  const { name: outDir } = vars;
  console.log("server:", server);
  // const client = path.join(outDirPath, `client`);
  const client = path.join(outDirPath, `client`);
  console.log("client:", client);

  // return;
  const layoutFile = path.join(getTemplate(), "layout.hbs");

  const pathBase = inDirPath.split("/");
  console.log("pathBase:", pathBase);
  const isJson = pathBase[pathBase.length - 2] === "json";
  const isAuth = pathBase[pathBase.length - 1] === "auth";
  const auth = [`bcryptjs`];
  let pkgs = [
    `dotenv`,
    `express`,
    `mongoose`,
    `morgan`,
    `cookie-parser`,
    "cors",
  ];
  if (isAuth) {
    pkgs = [...pkgs, ...auth];
  }
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
      `${y("INSTALLING")} dependencies...\n\n${d(`It make take a moment`)}`
    );
    // await react(client);
    // await jsonSetup({ isAuth, outDirPath: server });
    await Promise.all([
      react(client),
      jsonSetup({ isAuth, outDirPath: server }),
    ]);
    // process.chdir(outDirPath);
    // await execa("npm", [`install`, ...pkgs]);
    // await execa("npm", [`install`, `-D`, `nodemon`]);
    const onlineVersion = await getPackage("itstheandre/lean-express-gen");
    if (onlineVersion.version !== pkg.version) {
      isSameVersion = false;
    }
    spinner.succeed(`${g("FINISHED")} instalation...`);

    alert({
      type: "success",
      name: `ALL DONE`,
      msg: `\n\n${createdFiles.length} files created in ${d(
        `./${outDir}`
      )} directory`,
    });

    if (!isSameVersion) {
      alert({
        type: "warning",
        msg:
          "There is a new version of ironlauncher online. \n\nPlease update by running `npm i -g ironlauncher` in your terminal",
      });
    }

    return alert({
      type: `info`,
      msg: `JSON Project bootstrapped successfully.\n\nYou can now cd ./${outDir}`,
      name: "DONE",
    });
  });
};
