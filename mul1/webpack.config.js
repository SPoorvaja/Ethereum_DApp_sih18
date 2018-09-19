const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Webpack =require('webpack');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
  entry: {
      main: './app/javascripts/main.js',
      artisansformEntry: './app/javascripts/artisansform.js',
      agentsformEntry: './app/javascripts/agentsform.js',
      artisansprofileEntry: './app/javascripts/artisansprofile.js', 
      agentsprofileEntry:'./app/javascripts/agentsprofile.js',
      agentsearchEntry: './app/javascripts/agentsearch.js',
      artisansearchEntry: './app/javascripts/artisansearch.js',
      agentfundEntry: './app/javascripts/agentfund.js'
        },
  output: {
    path: path.resolve(__dirname, 'build','target'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    sourceMapFilename: '[file].map'
  },

  plugins: [

    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: "index.html" }
    ]),
    new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'app/index.html',
    chunks: ['main']
     }),
    new HtmlWebpackPlugin({
    filename: 'artisansform.html',
    template: 'app/artisansform.html',
    chunks: ['artisansformEntry']
    }),
    new HtmlWebpackPlugin({
    filename: 'agentsform.html',
    template: 'app/agentsform.html',
    chunks: ['agentsformEntry']
    }),
    new HtmlWebpackPlugin({
    filename: 'artisansprofile.html',
    template: 'app/artisansprofile.html',
    chunks: ['artisansprofileEntry']
    }),
    new HtmlWebpackPlugin({
    filename: 'agentsprofile.html',
    template: 'app/agentsprofile.html',
    chunks: ['agentsprofileEntry']
    }),
    new HtmlWebpackPlugin({
    filename: 'agentsearch.html',
    template: 'app/agentsearch.html',
    chunks: ['agentsearchEntry']
    }),
    new HtmlWebpackPlugin({
    filename: 'artisansearch.html',
    template: 'app/artisansearch.html',
    chunks: ['artisansearchEntry']
    }),
    new HtmlWebpackPlugin({
    filename: 'agentfund.html',
    template: 'app/agentfund.html',
    chunks: ['agentfundEntry']
    
    }),
    new ExtractTextPlugin("app.css"),
    new ExtractTextPlugin({ filename: "[name].css" }),
    new Webpack.ProvidePlugin({
     $: 'jquery',
    jQuery: 'jquery'
      }),
     extractSass
  ],
  module: {

      rules: [
      {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ],
    loaders: [
    {
        loader: "skeleton-loader",
        options: {
          procedure: function (content) {
            return `module.exports = ${content}`
          }
        }
      },
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['skeleton-loader','babel-loader'],
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       },
      {
             test: ['./css/animate.css', './css/style.css'],
             test: /\.css$/,             
             use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),     
             use: ExtractTextPlugin.extract({         
              fallback: "style-loader", 
              use: [ "css-loader" ]
               })
     }

     
    ]
  }
}
