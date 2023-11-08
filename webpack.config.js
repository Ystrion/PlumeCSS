const path = require('path')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = (_, argv) => ({
  mode: 'production',
  entry: './dev/js/main.js',
  output: {
    path: path.resolve(__dirname, 'prod'),
    filename: 'js/main.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(c|s[ac])ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]]
          }
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      files: 'dev/**/*.js'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new StylelintPlugin({
      files: 'dev/**/*.scss'
    })
  ],
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin()
    ]
  },
  devtool: argv.mode === 'production' ? false : 'eval-source-map'
})
