#!/usr/bin/env node

const copy = require("copy-template-dir");
const path = require("path");

const vars = { name: `andre` };

const inDir = path.join(__dirname, `templates`);
const outDir = path.join(process.cwd(), "output");

copy(inDir, outDir, vars, (err, createdFiles) => {
  if (err) throw err;
  console.log();
  console.log(`Creating a files in ${vars.name}`);

  createdFiles.forEach((filePath) => {
    const fileName = path.basename(filePath);
    console.log(`Created ${fileName}`);
  });
  console.log();
  console.log("DONE");
  console.log();
});
