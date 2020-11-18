const { green: g, dim: d, yellow: y, blue: b } = require("chalk");
const copy = require("copy-template-dir");
const alert = require("cli-alerts");
const { basename } = require("path");
const ora = require("ora");
const execa = require("execa");
const path = require("path");
const fs = require("fs");
const { inDir, getTemplate } = require("./paths");

const spinner = ora({ text: "" });

module.exports = ({ inDirPath, outDirPath, vars }) => {
  const { name: outDir } = vars;
  // return;
  const layoutFile = path.join(getTemplate(), "layout.hbs");

  doThat();

  const pathBase = inDirPath.split("/");
  const isAuth = pathBase[pathBase.length - 1] === "auth";
  const auth = [`connect-mongodb-session`, `express-session`];
  let pkgs = [
    `bcryptjs`,
    `dotenv`,
    `express`,
    `hbs`,
    `mongoose`,
    `morgan`,
    `node-sass-middleware`,
    `serve-favicon`,
    `cookie-parser`,
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
    spinner.start(
      `${y("INSTALLING")} dependencies...\n\n${d(`It make take a moment`)}`
    );
    process.chdir(outDirPath);
    const pathToViews = path.join(process.cwd(), "views", "layout.hbs");
    await fs.copyFile(layoutFile, pathToViews, () => {});
    await execa("npm", [`install`, ...pkgs]);
    await execa("npm", [`install`, `-D`, `nodemon`]);
    spinner.succeed(`${g("FINISHED")} instalation...`);

    alert({
      type: "success",
      name: `ALL DONE`,
      msg: `\n\n${createdFiles.length} files created in ${d(
        `./${outDir}`
      )} directory`,
    });
    return alert({
      type: `info`,
      msg: `Project bootstrapped successfully.\n\nYou can now cd ./${outDir}`,
      name: "DONE",
    });
  });
};
