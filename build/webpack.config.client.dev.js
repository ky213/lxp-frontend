var path = require('path');
var webpack = require('webpack');
const dotenv = require('dotenv');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CircularDependencyPlugin = require('circular-dependency-plugin');
var ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var config = require('../config');

var BASE_PATH = process.env.BASE_PATH || '/';
const fs = require('fs'); // to check if the file exists


module.exports = (env) => {
    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);

    // Create the fallback path (the production .env)
    const basePath = currentPath + '/.env';

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + env.ENVIRONMENT;

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    console.log("Got env file", finalPath)

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({path: finalPath}).parsed;

    // reduce it to a nice object, the same as before (but with the variables from the file)
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    return {
        name: 'client',
        devtool: 'cheap-eval-source-map',
        target: 'web',
        mode: 'development',
        entry: {
            app: [path.join(config.srcDir, 'index.js')],
        },
        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[name].chunk.js',
            path: config.distDir,
            publicPath: BASE_PATH
        },
        resolve: {
            alias: {
                '@': config.srcDir,
                Src: config.srcDir,
                Root: config.rootDir,
                'environment': config.rootDir + '/config.js',
                Components: config.srcDir + '/components',
                Services: config.srcDir + '/services',
                Routes: config.srcDir + '/routes',
                Images: config.srcDir + '/images',
                Layout: config.srcDir + '/layout',
                Helpers: config.srcDir + '/helpers'
            },
            modules: [
                'node_modules',
                config.srcDir
            ]
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            /*
            new CircularDependencyPlugin({
                exclude: /a\.js|node_modules/,
                failOnError: true,
                allowAsyncCycles: false,
                cwd: process.cwd(),
            }),
            */
            new HtmlWebpackPlugin({
                template: config.srcHtmlLayout,
                inject: false,
                chunksSortMode: 'none'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'process.env.BASE_PATH': JSON.stringify(BASE_PATH),
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new ExtractCssChunks(),
            new BundleAnalyzerPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                // Modular Styles
                {
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                            }
                        },
                        {loader: 'postcss-loader'}
                    ],
                    exclude: [path.resolve(config.srcDir, 'styles')],
                    include: [config.srcDir]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                            }
                        },
                        {loader: 'postcss-loader'},
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: config.scssIncludes
                            }
                        }
                    ],
                    exclude: [path.resolve(config.srcDir, 'styles')],
                    include: [config.srcDir]
                },
                // Global Styles
                {
                    test: /\.css$/,
                    use: [
                        ExtractCssChunks.loader,
                        'css-loader',
                        'postcss-loader'
                    ],
                    include: [path.resolve(config.srcDir, 'styles')]
                },
                {
                    test: /\.scss$/,
                    use: [
                        ExtractCssChunks.loader,
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: config.scssIncludes
                            }
                        }
                    ],
                    include: [path.resolve(config.srcDir, 'styles')]
                },
                // Fonts
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    }
                },
                // Files
                {
                    test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
                    loader: "file-loader",
                    options: {
                        name: "static/[name].[ext]",
                    }
                }
            ]
        },
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 300,
        },
        devServer: {
            hot: true,
            contentBase: config.serveDir,
            compress: true,
            historyApiFallback: {
                index: BASE_PATH
            },
            host: '0.0.0.0',
            port: 4101
        }
    }
}
