const path = require('path');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const CompressionPlugin  = require('compression-webpack-plugin');
const globAll = require('glob-all');
const baseConfig = require('./webpack.config.base.js');
const PATHS = require('./paths');

module.exports = merge(baseConfig, {
    // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
    mode: 'production',
    plugins: [
        // 复制public目录下的静态文件，过滤index.html
        new CopyPlugin({
            patterns: [
                {
                    // 复制public目录下的文件
                    from: PATHS.publicPath,
                    // 复制到dist目录中
                    to: PATHS.outputPath,
                    // 过滤index.html文件
                    filter: (source) => {
                        return !source.includes('index.html')
                    }
                }
            ]
        }),
        // 抽离css的插件
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css' // 抽离css的输出目录和名称
        }),
        // 清理无用的css（无法百分百清理，是否启用根据实际情况）
        new PurgeCSSPlugin({
            // 检测src下所有tsx文件和public/index.html中使用的class、id和标签名称，只打包这些文件中用到的css样式
            paths: globAll.sync([
                `${PATHS.rootPath}/**/*.tsx`,
                PATHS.templatePath
            ]),
            safelist: {
                // 如果使用了ant-design组件库，过滤以ant-开头的类名，哪怕没用到也不删除
                standard: [/&ant-/]
            }
        }),
        // 开启gzip压缩
        new CompressionPlugin({
            test: /.(js|css)$/, // 只生成js和css的gzip压缩
            filename: '[path][base].gz', // 文件命名
            algorithm: 'gzip', // 压缩格式，默认是gzip
            threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
            minRatio: 0.8 // 压缩率，默认值是0.8
        })
    ],
    // 优化配置
    optimization: {
        minimizer: [
            // 压缩css
            new CssMinimizerPlugin(),
            // 压缩js
            new TerserPlugin({
                parallel: true, // 开启多线程压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'] // 删除console.log
                    }
                }
            })
        ],
        // 分割代码
        splitChunks: {
            cacheGroups: {
                // 提取node_modules代码
                vendors: {
                    test: /node_modules/, // 只匹配node_modules里面的模块
                    name: 'vendors', // 提取文件命名为vendors, js后缀和chunkhash会自动添加
                    minChunks: 1, // 只要使用一次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority: 1 // 提取优先级为1
                },
                // 提取页面公共代码
                commons: {
                    name: 'commons', // 提取文件命名为commons
                    minChunks: 2, // 只要使用两次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
                    minSize: 0 // 提取代码体积大于0就提取出来
                }
            }
        }
    }
})