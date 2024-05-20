const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  target: 'web',
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new ESLintPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'src/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /.(sa|sc|c)ss$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',

            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',

            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    host: '127.0.0.1',
    open: true,
    contentBase: path.resolve(__dirname, './src/index.js'),
    watchContentBase: true,
  },
};