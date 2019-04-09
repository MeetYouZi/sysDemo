const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // baseUrl: "./",
  publicPath: "./",
  productionSourceMap: false,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("stylus", resolve("src/assets/stylus"))
      .set("components", resolve("src/components"))
      .set("common", resolve("src/components/common"));
  }
};
