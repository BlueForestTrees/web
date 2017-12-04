const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/index.js',

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    },

	module: {
		rules: [
			{
				test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', options: { presets: ['es2015'] }
			}
		]
	},

	plugins: [
		//new UglifyJSPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html', inject: 'body', hash: 'true'}),
	],
    devServer: {
        port: 8079,
        host: '0.0.0.0',
        proxy: {
            '/api/*': {target: 'http://localhost:8080'},
            '/adminapi/*': {target: 'http://localhost:8080'}
        }
    }
};
