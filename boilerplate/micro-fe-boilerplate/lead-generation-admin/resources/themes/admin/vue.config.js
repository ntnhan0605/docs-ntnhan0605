const path = require('path');

module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, '../../../public/admin'),
  publicPath: process.env.NODE_ENV == 'production' ? '/admin' : '/',
  devServer: {
    host: process.env.VUE_APP_URL || 'localhost',
    port: 8080,
    https: process.env.VUE_APP_HTTPS === 'true',
  },
};
