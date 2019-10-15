const {
  override,
  disableEsLint,
  addDecoratorsLegacy,
  fixBabelImports
} = require('customize-cra')

module.exports = override(
  disableEsLint(),
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)
