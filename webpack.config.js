const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: ['@babel/polyfill', './src/scripts/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      MY_API_KEY: JSON.stringify(process.env.MY_API_KEY),
    }),
  ],
};
