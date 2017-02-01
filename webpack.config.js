const path = require('path')
const webpack = require('webpack')
const stylus = require('stylus')
const stylusLoader = require('stylus-loader')
const stylusMixins = require('stylus-mixins')
const responsiveGrid = require('responsive-grid')

module.exports = {
  devtool: 'source-map',
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/js/index.js'
    ],
    vendor: [ 'react', 'react-dom', 'moment' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./www/js'),
    publicPath: '/js'
  },
  performance: { hints: false },
  plugins: [
    new webpack.DefinePlugin({
      'API_URL': JSON.stringify('http://localhost.clockhosting.com:9834')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [ 'vendor', 'manifest' ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new stylusLoader.OptionsPlugin({
      default: {
        use: [ stylusMixins(), responsiveGrid() ],
        define: {
          'inline-url': stylus.url({ paths: [ path.resolve('./www/') ] })
        }
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src/js')
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'www'),
    inline: true
  }
}
