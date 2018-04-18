import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import Visualizer from 'webpack-visualizer-plugin';

const NODE_ENV = process.env.NODE_ENV;

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
            {test: /\.scss$/, exclude: /node_modules/, use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/main/index.html', inject: 'body', hash: 'true'}),
        new CopyWebpackPlugin([{from: './src/img', to: 'img'}]),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        }),
    ],
};

if (conf.mode === "development") {
    conf.devServer = {
        proxy: {
            "/api": "http://localhost:8080"
        }
    }
}

if (conf.mode === "production") {
    conf.plugins.push(new Visualizer());
}

module.exports = conf;