const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebpack: {
  //   plugins: [
  //     new webpack.DefinePlugin({
  //       'process.env': {
  //         VUE_APP_IP: JSON.stringify(process.env.VUE_APP_IP)
  //       }
  //     })
  //   ]
  // }
});
