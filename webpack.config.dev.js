const path = require('path');
const webpack = require('webpack');
const paths = require('./config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/tools/perf',
    './src/index',
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      favicon: paths.appFavicon,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.MAX_DISTANCE': JSON.stringify(process.env.MAX_DISTANCE),
      'process.env.INCOGNITO_AVATAR_URL': JSON.stringify(process.env.INCOGNITO_AVATAR_URL),
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
      'process.env.AUTH_DOMAIN': JSON.stringify(process.env.AUTH_DOMAIN),
      'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL),
      'process.env.STORAGE_BUCKET': JSON.stringify(process.env.STORAGE_BUCKET),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.css$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'style!css?modules&importLoaders=1!postcss',
    }, {
      test: /\.json$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'json',
    }, {
      test: /\.(jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'file',
      query: {
        name: 'static/media/[name].[hash:8].[ext]',
      },
    }, {
      test: /\.(mp4|webm)(\?.*)?$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'url',
      query: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    }],
  },
  postcss() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ],
      }),
    ];
  },
};
