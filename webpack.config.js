const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');

const conf = {
    entry: './src/main/index.js',

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader', options: {loaders: {js: 'babel-loader'}}},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, exclude: /node_modules/, loader: 'css-loader'}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: './src/main/index.html', inject: 'body', hash: 'true'}),
        new CopyWebpackPlugin([{from: './src/img', to: 'img'}]),
        new CopyWebpackPlugin([{from: './src/css', to: 'css'}]),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        })
    ],

    serve: {
        add: (app, middleware, options) => {
            app.use(convert(proxy('/api', { target: 'http://localhost:8080' })));
        }
    }
};

module.exports = conf;