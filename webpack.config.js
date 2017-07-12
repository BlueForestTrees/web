const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

module.exports = {
    entry: ["./src/index.js"],
    output: {
        path: path.resolve(__dirname, 'target'),
        filename: 'js/stuffParts.[hash].js'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /(node_modules)/, use: [{loader: 'babel-loader'}]},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.png$/, use: ['file-loader']},
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: 'url-loader?limit=10000&mimetype=application/font-woff'}]},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: 'url-loader?limit=10000&mimetype=application/octet-stream'}]},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: 'file-loader'}]},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}]}
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src/js'),
            path.resolve('./node_modules')
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html', inject: 'body', hash: 'true'}),
        new CopyWebpackPlugin([{from: './src/img', to: 'img'}]),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            "Tether": 'tether'
        })
    ],
    devServer: {
        port: 8045,
        host: '0.0.0.0',
        proxy: {
            '/api/*': {target: 'http://api:8080'},
            '/adminapi/*': {target: 'http://api:8080'}
        }
    }
};

if (isProd) {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
