const base = require("./dev.json");

base.asar = true;

//如果是mac平台
if (process.platform === "darwin") {
  base.npmRebuild = true;
}

module.exports = base;
