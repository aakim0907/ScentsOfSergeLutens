var path = require('path');
module.exports = {
  context: __dirname,
  entry: './lib/scents.js',
  output: {
    filename: './lib/bundle.js'
  },
  module: {
    loaders: [
      {
        test: [/.jsx?$/, /.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", "*"]
  }
};
