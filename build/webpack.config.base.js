const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getClientEnvironment = require('./env');
const PATHS = require('./paths');

const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式

// css文件匹配
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

/**
 * 处理css的loader配置
 * @param cssLoaderOptions cssLoader的options配置
 * @param preProcessor 需要添加的预处理程序
 * @returns {[(string|*), {loader: string, options: *}, string]}
 */
function getStyleLoaders(cssLoaderOptions, preProcessor) {
    const loaders = [
        isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: cssLoaderOptions
        },
        'postcss-loader'
    ];

    if (preProcessor) {
        loaders.push(preProcessor);
    }

    return loaders;
}

const env = getClientEnvironment();

module.exports = {
    // 入口文件
    entry: PATHS.entryPath,
    // 出口文件
    output: {
        // 每个输出js的名称
        filename: 'static/js/[name].[chunkhash:8].js',
        // 打包结果输出路径
        path: PATHS.outputPath,
        // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        clean: true,
        // 打包后文件的公共前缀路径
        publicPath: '/',
    },
    module: {
        rules: [
            {
                // 如果node_moduels中也有要处理的语法，可以把js|jsx文件配置加上
                test: /.(ts|tsx)$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2
                        }
                    },
                    'babel-loader'
                ],
                include: [PATHS.rootPath]
            },

            // 处理css
            {
                test: cssRegex,
                exclude: cssModuleRegex,
                use: getStyleLoaders({
                    importLoaders: 1
                }),
            },

            // .module.css
            {
                test: cssModuleRegex,
                use: getStyleLoaders({
                    importLoaders: 1,
                    modules: {
                        localIdentName: '[local]---[hash:base64:5]'
                    }
                }),
            },

            // 处理less
            {
                test: lessRegex,
                exclude: lessModuleRegex,
                use: getStyleLoaders({
                    importLoaders: 1
                }, 'less-loader'),
            },

            // 处理.module.less
            {
                test: lessModuleRegex,
                use: getStyleLoaders({
                    importLoaders: 1,
                    modules: {
                        localIdentName: '[local]---[hash:base64:5]'
                    }
                }, 'less-loader'),
            },

            // 处理图片文件
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024, // 小于20kb转base64
                    },
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },

            // 处理字体文件
            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    },
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },

            // 处理媒体文件
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    },
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },

            // 处理excel文件
            {
                test: /.(xlsx|csv|xls)$/, // 匹配excel文件
                type: 'asset', // type选择asset
                generator: {
                    filename: 'static/excel/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },

            // 处理epub文件
            {
                test: /.(epub)$/, // 匹配epub文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    },
                },
                generator: {
                    filename: 'static/book/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 模板取定义root节点的模板
            template: PATHS.templatePath,
            // 自动注入静态资源
            inject: true,
        }),
        new webpack.DefinePlugin(env.stringified),
    ],
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
        alias: {
            '@': PATHS.rootPath
        },
        modules: [
            // 查找第三方模块只在本项目的node_modules中查找
            PATHS.nodeModulesPath
        ]
    },
    // 开启webpack持久化存储缓存
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
};
