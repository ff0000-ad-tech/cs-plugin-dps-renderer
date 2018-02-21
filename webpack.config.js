const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')


const PATHS = {
  dist: path.resolve(__dirname, 'dist'),
  source: path.resolve(__dirname, 'source')
}


module.exports = {
  entry: path.resolve(PATHS.source, 'js/main.js'),
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\*.js/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        // include: path.join(__dirname, 'node_modules', '@ff0000-ad-tech'),
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'node_modules/@ff0000-ad-tech')
    ]
  },  
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(PATHS.source, 'index.html'),
        to: PATHS.dist,
        flatten: true
      },
      {
        from: path.resolve(PATHS.source, 'css/*'),
        to: PATHS.dist,
        flatten: true
      }, 
      {
        from: path.resolve(PATHS.source, 'images/*'),
        to: path.resolve(PATHS.dist, 'images'),
        flatten: true
      }
    ])
  ],
  devServer: {
    contentBase: PATHS.dist,
    compress: true,
    inline: false,
    port: 8000
  }
}
