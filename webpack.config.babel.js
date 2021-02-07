import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import webpack from 'webpack'

// TODO fix environment checker
const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'

process.env.BABEL_ENV = LAUNCH_COMMAND

const PATHS = {
    app: path.join(__dirname, 'src'),
    // app: '.src/index.js',
    build: path.join(__dirname, 'build'),
    output: path.join(__dirname, '../../../target/classes/static'),
}

const devServer = (
    isProduction
        ? {}
        : {
            clientLogLevel: 'debug',
            port: 9090,
            // contentBase: './src',
            contentBase: PATHS.build,
            hot: true,
            inline: true,
            historyApiFallback: true,
            proxy: {
                '/api': {
                    // target: 'http://localhost:8080',
                    target: 'http://167.99.133.214:8080',
                    secure: false,
                    prependPath: false,
                    //,
                    // changeOrigin: true
                    // pathRewrite: {
                    //     '^/api/login': '/login',
                    //     '^/api/logout' : ''
                    // }
                },
            },
            // publicPath: 'http://localhost:9090/',
        }
)

const devtool = (
    isProduction
        ? 'cheap-module-source-map'
        : 'inline-source-map'
)

const entry = [
    // 'whatwg-fetch',
    PATHS.app,
]

const output = {
    path: PATHS.build,
    // chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    // filename: isProduction ? 'index.[chunkhash].js' : 'index_bundle.js',
    filename: isProduction ? 'index.[chunkhash].js' : '[name].bundle.js',
}

const module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/env', {modules: false}],
                    ['@babel/react'],
                ],
            },
        }, {
            test: /\.(sa|sc|c)ss$/,
            use: [
                !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file-loader',
            options: {
                name: 'images/[name].[ext]',
            },
            exclude: [/src\/favicons/, /src\/fonts/],
        },
        // {
        //   test: /\.(sass|scss|svg|png|jpe?g)$/, // Make sure to allow all necessary file types here
        //   use: MiniCssExtractPlugin.extract({
        //     use: [
        //       {
        //         loader: 'css-loader',
        //         options: {
        //           importLoaders: 1,
        //           minimize: true,
        //           sourceMap: true,
        //         },
        //       },
        //       {
        //         loader: 'postcss-loader',
        //         options: {
        //           sourceMap: true,
        //         },
        //       },
        //       {
        //         loader: 'resolve-url-loader', // resolve-url-loader needs to come *BEFORE* sass-loader
        //         options: {
        //           sourceMap: true,
        //         },
        //       },
        //       {
        //         loader: 'sass-loader',
        //         options: {
        //           sourceMap: true,
        //         },
        //       },
        //     ],
        //   }),
        // },
        {
            test: /\.(ttf|otf|eot|svg|woff|woff2)?$/,
            loader: 'file-loader',
            options: {
                name: 'fonts/[name].[ext]',
            },
            exclude: [/src\/favicons/, /src\/images/],
        },
        {
            test: /\.(svg|ico|xml)$/,
            loader: 'file-loader',
            options: {
                name: 'favicons/[name].[ext]',
            },
            exclude: [/src\/images/, /src\/fonts/],
        },
    ],
}

const copyrightBanner = new webpack.BannerPlugin(
    `Copyright (c) ${(new Date()).getFullYear()} Agency Comp, Inc., All rights reserved`,
)

// defaults the user pool to QA if none is specified
const USER_POOL = JSON.stringify(process.env.npm_config_userPool || 'DEV')

const envConfig = new webpack.DefinePlugin({
                                               USER_POOL,
                                           })

const CleanWebpackPluginConfig = new CleanWebpackPlugin({cleanStaleWebpackAssets: false})

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
                                                          template: PATHS.app + '/index.html',
                                                          filename: 'index.html',
                                                          inject: 'body',
                                                      })

const plugins = [
    copyrightBanner,
    envConfig,
    CleanWebpackPluginConfig,
    HTMLWebpackPluginConfig,
]

// loads environment specific plugins
if (isProduction) {
    // Production env
    const procEnv = {
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
            VERSION: JSON.stringify(require('./package.json').version),
        },
    }
    plugins.push(
        new webpack.DefinePlugin(procEnv),
        new MiniCssExtractPlugin({
                                     filename: 'index.[chunkhash].css',
                                 }),
    )
} else {
    // Dev env
    const procEnv = {
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
            VERSION: JSON.stringify(require('./package.json').version),
        },
    }
    plugins.push(
        new webpack.DefinePlugin(procEnv),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
                                     filename: 'index.css',
                                 }),
    )
}

const resolve = {
    modules: [
        path.resolve('./src'),
        'node_modules',
    ],
}

const webpackConfig = {
    mode: 'development',
    devServer,
    devtool,
    entry,
    output,
    module,
    plugins,
    resolve,
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
}

export default webpackConfig
