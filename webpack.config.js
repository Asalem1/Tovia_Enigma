// const webpack = require('webpack');
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
  }
}

// module.exports = {
//   devtool: 'inline-source-map',
//   entry: './src',
//   output: {
//     path: path.join(__dirname, 'public'),
//     filename: 'bundle.js'
//   },
//   resolve: {
//     modules: ['node_modules', 'src'],
//     extensions: ['.js', '.jsx']
//   },
//   module: {
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
//   },
//   devServer: {
//     historyApiFallback: true
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoEmitOnErrorsPlugin(),
//   ]
// }

// const config = {
//   context: __dirname,
//   entry: ['./src'],
//   devtool: process.env.NODE_ENV === 'development' ? 'cheap-eval-source-map' : false,
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: 'bundle.js',
//     publicPath: '/public/'
//   },
//   devServer: {
//     hot: true,
//     publicPath: '/public/',
//     historyApiFallback: true
//   },
//   resolve: {
//     modules: ['node_modules', 'src'],
//     extensions: ['.js', '.jsx', '.json']
//   },
//   stats: {
//     colors: true,
//     reasons: true,
//     chunks: false
//   },
//   module: {
//     rules: [
//       // {
//       //   enforce: 'pre',
//       //   test: /\.jsx?$/,
//       //   loader: 'eslint-loader',
//       //   exclude: /node_modules/
//       // },
//       {
//         test: /\.jsx?$/,
//         loader: 'babel-loader',
//         include: [path.resolve('js'), path.resolve('node_modules/preact-compat/src')]
//       }
//     ]
//   }
// };

// if (process.env.NODE_ENV === 'development') {
//   config.entry.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
// }

// module.exports = config;
