import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import webpack from 'webpack'
import Visualizer from 'webpack-visualizer-plugin'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'

const NODE_ENV = process.env.NODE_ENV

const conf = {
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
    ],
}

if (conf.mode === "development") {
    conf.devServer = {
        host: "localhost",
        historyApiFallback: {rewrites: [{from: /.*/, to: '/index.html'}]},
        proxy: {
            "/api": "http://localhost:8080"
        }
    }
    conf.devtool = 'eval-source-map'
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
}

module.exports = conf