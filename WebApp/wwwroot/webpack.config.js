'use strict';

const webpack = require('webpack');
const path = require('path');
//const tsconfig = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//const bundleFolder = "./public/assets";
//const srcFolder = "./src/";

module.exports = function (env, argv) {
    //todo: разобраться с prod и dev!!!
    const isModeDev = argv.mode === "development";
    const isDev = env.development;

    const buildPath = isDev                                                         //сюда кладем бандлы
        ? path.resolve(__dirname, "../Bin/Debug/WebClient/wwwroot/public")
        : path.resolve(__dirname, "../Bin/Debug/WebClient/wwwroot/public");

    const clientAppPath = isDev                                                     //сюда кладем index.html
        ? path.resolve(__dirname, "../Bin/Debug/WebClient/wwwroot")
        : path.resolve(__dirname, "../Bin/Debug/WebClient/wwwroot");

    return {
        mode: isModeDev ? "development" : "production",
        devtool: isModeDev ? "source-map" : "nosources-source-map",

        entry: {
            "main": "./src/index.tsx"
        },
        output: {
            filename: "[name].bundle.js",
            publicPath: 'wwwroot',
            path: buildPath//path.resolve(__dirname, bundleFolder)
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    main_vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'main_vendors',
                        chunks(chunk) {
                            return chunk.name === "main";
                        }
                    },
                    home_vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'home_vendors',
                        chunks(chunk) {
                            return chunk.name === "home";
                        }
                    }
                }
            },
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
            //plugins: [new tsconfig.TsconfigPathsPlugin()]
        },
        devServer: {
            contentBase: ".",
            host: "localhost",
            port: 9553
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "ts-loader"
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.scss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                }

                //{
                //    test: /.(sa|sc|c)ss$/,
                //    use: [{
                //        loader: 'style-loader'
                //    }, {
                //        loader: 'css-loader',
                //        options: {
                //            sourceMap: true,
                //            modules: true,
                //        }
                //    }, {
                //        loader: 'sass-loader', options: {
                //            sourceMap: true
                //        }
                //    }]
                //},
                //{ test: /.(c|sc)ss$/, loader: 'typings-for-css-modules-loader?modules&sass' },
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, "public/index.html"), to: clientAppPath } //скопровать файл в выходную дирректорию
                    //{ from: path.resolve(__dirname, "public/favicon.ico"), to: clientAppPath }
                ],
            })
        ]
    }
}