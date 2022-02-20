const config = require("./config");

const defaultConst = {
  // Add here defaults
  projectName: "Default",
  urls: {
    protocol: "https://default.io",
  },
  emails: {
    support: "support@default.io",
  },
};

console.log("defaultConst", defaultConst);
console.log("config", config);
console.log("exported", { ...defaultConst, ...config });

module.exports = { ...defaultConst, ...config };
