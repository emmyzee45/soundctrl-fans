/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const CracoLessPlugin = require("craco-less");
const million = require("million/compiler");

module.exports = {
  plugins: [
    {
      plugin: { CracoLessPlugin, add: [million.webpack({ auto: true })] },
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  eslint: {
    enable: false,
  },
};
