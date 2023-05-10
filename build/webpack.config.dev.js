// webpack.config.dev.js

const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseConfig = require('./webpack.config.base.js');
const PATHS = require('./paths');

module.exports = merge(baseConfig, {
    // 开发模式，打包更加快速，省去优化步骤
    mode: 'development',
    // 源码调试模式
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        // 服务端口号
        port: 3000,
        // gzip压缩，开发环境不开启，可提升热更新速度
        compress: false,
        // 开启热更新
        hot: true,
        // 解决history路由404问题
        historyApiFallback: true,
        static: {
            // 托管静态资源public文件夹
            directory: PATHS.publicPath
        }
    },
    plugins: [
        // react热更新插件
        new ReactRefreshWebpackPlugin()
    ]
});