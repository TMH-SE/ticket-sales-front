const {
  override,
  disableEsLint,
  addDecoratorsLegacy,
  fixBabelImports,
  addWebpackPlugin
} = require('customize-cra')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = override(
  disableEsLint(),
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addWebpackPlugin(
    new MiniCssExtractPlugin({
      ignoreOrder: false
    })
  )

)
