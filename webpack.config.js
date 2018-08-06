var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')
var Visualizer = require('webpack-visualizer-plugin')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
var versions = require('./package.json').dependencies

var NODE_ENV = process.env.NODE_ENV

var conf = {
    mode: NODE_ENV,
    entry: './src/main/index.js',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {test: /\.vue$/, exclude: /node_modules/, use: 'vue-loader'},
            {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader',use: ['css-loader']})}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/main/index.html', inject: 'body', hash: 'true'}),
        new CopyWebpackPlugin([{from: './src/img', to: 'img'}]),
        new CopyWebpackPlugin([{from: './src/browserconfig.xml', to: '.'}]),
        new webpack.DefinePlugin({VERSION: JSON.stringify(require("./package.json").version)}),
        new LodashModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new ExtractTextPlugin("style.css")
    ]
}

if (conf.mode === "development") {

    var convert = require('koa-connect')
    var history = require('connect-history-api-fallback')
    var proxy = require('http-proxy-middleware')

    conf.serve = {
        add: function (app, middleware, options) {
            app.use(convert(proxy('/api', {target: 'http://localhost:8080'})))
            app.use(convert(history()))
        }
    }
    conf.output = {
        publicPath: "/"
    }
}

if (conf.mode === "production") {
    conf.devtool = 'source-map'
    conf.output = {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/blueforest.org/static'),
        publicPath : '/'
    }
    conf.plugins.push(new Visualizer({filename: '../../visualizer/statistics.html'}))
    conf.plugins.push(new CopyWebpackPlugin([{from: 'nginx', to: '../nginx/'}]))

    conf.externals = {
        vue: "vue",
        vuetify: "vuetify"
    }
    const htmlWebpackPlugin = conf.plugins[0]
    htmlWebpackPlugin.options.scriptVue = "<script src='https://unpkg.com/vue@" + versions.vue + "/dist/vue.min.js'></script>"
    htmlWebpackPlugin.options.scriptVuetify = "<script src='https://unpkg.com/vuetify@" + versions.vuetify + "/dist/vuetify.min.js'></script>"
    htmlWebpackPlugin.options.min = ".min"
}

module.exports = conf