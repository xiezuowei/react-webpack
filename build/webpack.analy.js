const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.config.prod');

const speedMeasure = new SpeedMeasurePlugin();

// 使用speedMeasure.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
module.exports = speedMeasure.wrap(merge(prodConfig, {
    plugins: [
        // 配置分析打包结果插件
        new BundleAnalyzerPlugin()
    ]
}));