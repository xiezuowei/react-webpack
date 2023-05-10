'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    // 入口文件
    entryPath: resolveApp('src/index.tsx'),
    // 打包输出目录
    outputPath: resolveApp('dist'),
    // 业务代码根目录
    rootPath: resolveApp('src'),
    // html模板路径
    templatePath: resolveApp('public/index.html'),
    // node_modules包目录
    nodeModulesPath: resolveApp('node_modules'),
    // 静态资源文件目录
    publicPath: resolveApp('public'),
    // env文件路径
    env: resolveApp('.env')
}