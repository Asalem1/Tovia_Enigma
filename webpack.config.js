const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src',
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', 'src']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015']
//       },
//       // { TODO - sass integration
//       //     test: /\.scss$/,
//       //     loaders: ['style', 'css', 'sass']
//       // }
//     ]
  }
}
