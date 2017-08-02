var webpack = require('webpack');
var path = require('path'); //helps manipulate path names

module.exports = {
  devtool: 'inline-source-map',
  entry: './src',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015']
      },
      // { TODO - sass integration
      //     test: /\.scss$/,
      //     loaders: ['style', 'css', 'sass']
      // }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
}
