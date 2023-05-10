const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
    // 预设执行顺序是从右往左，所以先处理ts，再处理tsx
    presets: [
        [
            '@babel/preset-env',
            {
                // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                // targets: {
                //     chrome: 35,
                //     ie: 9
                // },
                useBuiltIns: 'usage', // 根据配置的浏览器兼容，以及代码中使用到的api进行引入polyfill按需添加
                corejs: 3 // 配置使用core-js最低版本
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    plugins: [
        isDEV && require.resolve('react-refresh/babel'), // 如果是开发模式，就启动react热更新插件
        // 开启装饰器配置
        ['@babel/plugin-proposal-decorators', { 'legacy': true }]
    ].filter(Boolean) // 过滤空值
}