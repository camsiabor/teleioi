

const cfg = {};

cfg.log = {
    dir: './log',
    level: 'debug',
    file: {
        info: 'info',
        error: 'error',
    }
};

cfg.mod = {};

/*
cfg.mod['./mod/persist/mongo'] = [
    {
        id: 'mongo',
        host: '127.0.0.1',
        port: 27017,
        username: '',
        password: '',
    }
];
 */

cfg.mod['./mod/web'] = [
    {
        id: 'http.core',
        port: 3006,
        static: {
            '/' : './docs',
            '/img' : '../img',
            '/meta' : '../meta',
        },
        attach: {
            './proxy/pong' : {},
            './github/core' : {},
        }
    }
];

cfg.mod['./mod/proxy/pong'] = [
    {
        id: 'proxy.pong',
        port: 3007,
        static: {
            '/': './docs'
        },
    }
];



cfg.mod['./mod/wechat/core'] = [
    {
        id: 'wechat.szplay',
        attach: 'http.core',
        appid: 'wx08b78be5ad623071',
        appsecret: '319f0467d522b60c0b516acf41004da5',
        token: 'szplay',
    }
];



module.exports = cfg;