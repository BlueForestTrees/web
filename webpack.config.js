var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')
var Visualizer = require('webpack-visualizer-plugin')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
var versions = require('./package.json').dependencies

var NODE_ENV = process.env.NODE_ENV

var conf = {
    mode: NODE_ENV,
    entry: './src/index.js',
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
            {test: /\.css$/, exclude: /node_modules/, use: ["style-loader", "css-loader"]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html', inject: 'body', hash: 'true'}),
        new CopyWebpackPlugin([{from: './src/img', to: 'img'}]),
        new CopyWebpackPlugin([{from: './src/browserconfig.xml', to: '.'}]),
        new LodashModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        // new ExtractTextPlugin("style.css")
    ],
    optimization: {
        splitChunks: {
            // Must be specified for HtmlWebpackPlugin to work correctly.
            // See: https://github.com/jantimon/html-webpack-plugin/issues/882
            chunks: 'all',
        }
    }
}

if (conf.mode === "development") {

    var convert = require('koa-connect')
    var history = require('connect-history-api-fallback')
    var proxy = require('http-proxy-middleware')

    conf.serve = {
        add: function (app, middleware, options) {
            app.use(convert(proxy('/api/message', {target: 'http://localhost:8087'})))
            app.use(convert(proxy('/api/facet', {target: 'http://localhost:8086'})))
            app.use(convert(proxy('/api/user', {target: 'http://localhost:8084'})))
            app.use(convert(proxy('/api/grandeur', {target: 'http://localhost:8083'})))
            app.use(convert(proxy('/api/import', {target: 'http://localhost:8082'})))
            app.use(convert(proxy('/api/categories', {target: 'http://localhost:8081'})))
            app.use(convert(proxy('/api/tree', {target: 'http://localhost:8080'})))
            app.use(convert(history()))
        }
    }
    conf.output = {
        publicPath: "/"
    }

    const htmlWebpackPlugin = conf.plugins[0]
    htmlWebpackPlugin.options.min = ".min"
    htmlWebpackPlugin.options.versionVuetify = versions.vuetify
}

if (conf.mode === "production") {
    conf.output = {
        path: path.resolve(__dirname, 'dist/files/var/www/blueforest.org'),
        publicPath: '/'
    }
    const htmlWebpackPlugin = conf.plugins[0]
    htmlWebpackPlugin.options.min = ".min"
    htmlWebpackPlugin.options.versionVuetify = versions.vuetify

    conf.externals = {
        'vue': 'Vue',
        'vuetify': 'Vuetify'
    }
    htmlWebpackPlugin.options.scriptVue = "<script src='https://unpkg.com/vue@" + versions.vue + "/dist/vue.min.js'></script>"
    htmlWebpackPlugin.options.scriptVuetify = "<script src='https://unpkg.com/vuetify@" + versions.vuetify + "/dist/vuetify.min.js'></script>"

    other()

}

function other() {
    conf.plugins.push(new Visualizer({filename: '../../../../visualizer/statistics.html'}))
    conf.plugins.push(new CopyWebpackPlugin([{from: 'nginx', to: '../../../etc/nginx/blueforest.org/web'}]))
}

module.exports = conf