const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  watch: true,
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  devtool: 'sourcemap',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
}
