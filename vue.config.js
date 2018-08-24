const path = require('path')

module.exports = {
  configureWebpack: {
    output: {
      library: 'ypp-ui',
      libraryExport: 'default',
    }
  },

  outputDir: path.resolve(__dirname, `dist`),
  css: { extract: false },
  productionSourceMap: false,
  filenameHashing: false
}