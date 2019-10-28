const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  rules: [
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader' // translates CSS into CommonJS
        },
        {
          loader: 'less-loader' // compiles Less to CSS
        }
      ]
    }
  ],
  plugins: [
    new MiniCssExtractPlugin({
      ignoreOrder: false
    })
  ]
}
