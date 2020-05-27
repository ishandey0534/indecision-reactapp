const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env==='production';
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });
  return {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname,'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          },{
            test: /\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                  loader: 'css-loader',
                  options: {
                      sourceMap: true
                  }
              },
              {
                  loader: 'sass-loader',
                  options: {
                      sourceMap: true
                  }
              }
          ]
          }
        ]
    },
    devtool: isProduction ? 'source-map':'inline-source-map',
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html",
          favicon: './public/favicon.png'
        }),
        CSSExtract
    ]
};
};