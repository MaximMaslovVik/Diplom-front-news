<<<<<<< HEAD
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/index.js',
    articles: './src/secondary.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      use: { loader: 'babel-loader' }, // весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/, // исключает папку node_modules
    },
    {
      test: /\.css$/, // применять это правило только к CSS-файлам
      use: [
        isDev ? { loader: 'style-loader' } : { loader: MiniCssExtractPlugin.loader, options: { publicPath: './' } },
        'css-loader',
        'postcss-loader',
      ], // к этим файлам нужно применить пакеты, которые мы уже установили
    },

    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      use: [
        'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true, // webpack@1.x
            disable: true, // webpack@2.x and newer
          },
        },
      ],
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]',
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({

      filename: 'style.[contenthash].css',
    }),
/*
    new MiniCssExtractPlugin({
      filename: 'secondary.[contenthash].css',
    }),


      filename: 'style.[contenthash].css'
    }),
*/
    new HtmlWebpackPlugin({
      // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      hash: true, // для страницы нужно считать хеш
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new HtmlWebpackPlugin({
      // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      hash: true, // для страницы нужно считать хеш
      template: './src/secondary.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'secondary.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: [
          'default',
        ],
      },
      canPrint: true,
    }),
  ],

};


=======
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/index.js',
    articles: './src/secondary.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      use: { loader: 'babel-loader' }, // весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/, // исключает папку node_modules
    },
    {
      test: /\.css$/, // применять это правило только к CSS-файлам
      use: [
        isDev ? { loader: 'style-loader' } : { loader: MiniCssExtractPlugin.loader, options: { publicPath: './' } },
        'css-loader',
        'postcss-loader',
      ], // к этим файлам нужно применить пакеты, которые мы уже установили
    },

    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      use: [
        'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true, // webpack@1.x
            disable: true, // webpack@2.x and newer
          },
        },
      ],
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]',
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({

      filename: 'style.[contenthash].css',
    }),
/*
    new MiniCssExtractPlugin({
      filename: 'secondary.[contenthash].css',
    }),
*/

      filename: 'style.[contenthash].css'
    }),


    new HtmlWebpackPlugin({
      // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      hash: true, // для страницы нужно считать хеш
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new HtmlWebpackPlugin({
      // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      hash: true, // для страницы нужно считать хеш
      template: './src/secondary.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'secondary.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: [
          'default',
        ],
      },
      canPrint: true,
    }),
  ],

};

};

>>>>>>> 5fdf3f9f48979695bf4947c9b706cc6cad16fd35
