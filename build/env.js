'use strict';

const fs = require('fs');
const dotEnv = require('dotenv');
const PATHS = require('./paths');

// 获取.env文件路径
const pathsDotenv = PATHS.env;

// 获取启动服务时通过cross-env设置的环境变量BASE_ENV
const BASE_ENV = process.env.BASE_ENV || 'development';
console.log('BASE_ENV:', BASE_ENV);

// 按优先级由高到低的顺序加载.env文件
// 加载.env.[mode]
dotEnv.config({ path: `${pathsDotenv}.${BASE_ENV}` });
// 加载.env
dotEnv.config({ path: `${pathsDotenv}` });

// 定义规则：REACT_APP_开头的环境变量会被注入前端
// 可以在前端代码中通过process.env.REACT_APP_XXX取到
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
    // 取所有的环境变量，然后过滤出以REACT_APP_开头的环境变量
    // 返回一个环境变量配置对象，提供给webpack InterpolateHtmlPlugin插件
    const raw = Object.keys(process.env)
        .filter((key) => REACT_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            {
                // 再合并一些自定义的前端环境变量
                NODE_ENV: process.env.NODE_ENV || 'development',
                PUBLIC_URL: publicUrl
            }
        );

    // 字符串形式的process.env  提供给webpack DefinePlugin使用
    // 可以将前端代码中的process.env.XXX替换为对应的实际环境变量值
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);
            return env;
        }, {})
    };

    return { raw, stringified };
}

module.exports = getClientEnvironment;
