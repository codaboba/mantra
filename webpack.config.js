const path = require('path')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const port = 3000

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    proxy: {
      '^/api/*': {
        target: `http://localhost:${port}/api/`,
        secure: false
      }
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, path.resolve(__dirname, 'quoteTrainer.js')],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
