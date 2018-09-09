const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }, 
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "BBVABANCOMER_SIMULATOR": JSON.stringify("https://labogirls-bbva-simulator.herokuapp.com"),
      "BBVABANCOMER_USER_ACCOUNT": JSON.stringify("19823343451400"),
    }),
  ],  
};

