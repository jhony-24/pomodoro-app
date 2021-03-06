const path = require('path');
const { baseColors } = require('@pomodoro/design');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const publicGithubPathProduction = '/pomodoro-app/';

/** @returns {import('webpack').Configuration} */
module.exports = (_args, args) => {
  const isProduction = args.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/[contenthash].js',
      publicPath: isProduction ? publicGithubPathProduction : '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.mp3/i,
          use: 'file-loader',
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 0,
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
      },
      runtimeChunk: 'single',
      minimize: true,
      minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'assets/css/[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        inject: true,
        title: 'Pomodoro app',
      }),
      new WebpackPwaManifest({
        name: 'Pomodoro',
        start_url: '.',
        short_name: 'Pomodoro',
        theme_color: baseColors.primary,
        background_color: '#FFFFFF',
        description:
          'Pomodoro application to define a timer to help you focus on your activities',
        orientation: 'portrait',
        display: 'standalone',
        icons: {
          src: path.resolve('src/assets/logo.png'),
          sizes: [120, 152, 167, 180, 1024],
          type: 'image/png',
          destination: path.join('icons'),
        },
      }),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 2597152,
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      port: 8000,
      compress: true,
    },
  };
};
