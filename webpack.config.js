
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const path = require("path");
module.exports = (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    entry: {
        ui: './src/pluginUI/ui.tsx',
        plugin: './src/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|webp|svg|zip)$/,
                use: 'url-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.jsx', '.js'],
        plugins: [new TsconfigPathsPlugin({})]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            global: {}
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/pluginUI/ui.html',
            filename: 'ui.html',
            chunks: ['ui']
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/])
    ]
});