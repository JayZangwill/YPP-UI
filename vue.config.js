const path = require('path')

module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default',
    }
  },

  outputDir: path.resolve(__dirname, `dist`),
  css: { extract: false },
  productionSourceMap: false,
  filenameHashing: false,

  devServer: {
    proxy: {
      '/Addresses': {
        target: 'https://api.tuhu.cn',
        changeOrigin: true
      }
    }
  }
}