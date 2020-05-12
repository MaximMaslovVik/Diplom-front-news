const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssNano = require('cssnano');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    index: './src/pages/index/index.js',
    saved: './src/pages/saved/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      '@images': path.join(__dirname, './src/images'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'vendor/fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? { loader: 'style-loader' } : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssNano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/index/index.html',
      filename: './index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/saved/index.html',
      filename: './saved/index.html',
    }),
    new WebpackMd5Hash(),
  ],
};
