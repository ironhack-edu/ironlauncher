const onlinePackageData = require("get-repo-package-json");

const alert = require("cli-alerts");

exports.isOutOfSync = async () => {
  const onlineVersion = await onlinePackageData("ironhack-edu/ironlauncher");

  const pkg = require("../package.json");

  if (onlineVersion.version !== pkg.version) {
    alert({
      type: "warning",
      msg:
        "There is a new version of IronLauncher online. \n\nPlease update by running `npm i -g ironlauncher` in your terminal before you are able to run ironlauncher again",
    });
    return true;
  }

  return false;
};
