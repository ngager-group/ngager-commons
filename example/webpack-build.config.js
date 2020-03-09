const path = require('path')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const Dir = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
  mode: 'production',
  output: {
    path: Dir.build,
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    libraryTarget: 'umd',
    publicPath: '/ngager-commons/',
  },
  watch: false,
  resolve: {
		alias: {
			// fs: 'pdfkit/js/virtual-fs.js',
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
		},
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // resolve: {
  //   unsafeCache: true,
  //   modules: [
  //     path.join(__dirname, 'node_modules'), // __dirname is reserved name
  //   ],
  // },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin([Dir.build]),
    new HtmlWebpackPlugin({
      template: path.join(Dir.src, 'index.html'),
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
        },
      },
    },
  },
}
