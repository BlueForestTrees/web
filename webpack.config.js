const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');

const conf = {
    entry: './src/main/index.js',

    devtool: 'sourcemap',

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
            {test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader', options: { loaders: {js: 'babel-loader'}}},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, exclude: /node_modules/, loader: 'css-loader'}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: './src/main/index.html', inject: 'body', hash: 'true'}),
        new CopyWebpackPlugin([{ from: './src/img', to: 'img'}]),
        new CopyWebpackPlugin([{ from: './src/CSS', to: 'CSS'}]),
        new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}})
    ],

    devServer: {
        port: 8079,
        host: 'localhost',
        proxy: {
            '/api/*': {target: 'http://localhost:8080'},
            '/adminapi/*': {target: 'http://localhost:8080'}
        },
        contentBase: path.resolve(__dirname, 'dist'),
        quiet: true
    },

    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};

conf.plugins.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
        messages: [`Running here: http://${conf.devServer.host}:${conf.devServer.port}`],
    }
}));

module.exports = conf;