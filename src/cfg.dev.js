

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


/*
cfg.mod['./mod/persist/mongo'] = [
    {
        id: 'mongo',
        host: 'teleioi.net',
        port: 27017,
        username: '',
        password: '',
    }
];

cfg.mod['./mod/proxy/pong'] = [
    {
        id: 'proxy.pong',
        port: 3008,
        static: {
            '/': './docs'
        },
    }
];

cfg.mod['./mod/proxy/ping'] = [
    {
        id: 'proxy.ping',
        endpoints: [
            {
                'name': 'local',
                'endpoint': 'ws://127.0.0.1:3008/upgrade',
                'http': {
                    'wechat': 'http://127.0.0.1:3006/gate/wechat'
                }
            },
            {
                'name': 'dev',
                'endpoint': 'wss://szplay.net:3008',
                'http': {
                    'wechat': 'http://127.0.0.1:3006/gate/wechat'
                }
            },
        ]
    }
];

cfg.mod['./mod/wechat/core'] = [
    {
        id: 'wechat.szplay',
        attach: 'http.core',

        token: 'szplay',
        appid: 'wx08b78be5ad623071',
        appsecret: '319f0467d522b60c0b516acf41004da5',
        checkSignature: false,

    }
];


cfg.compress = {
    src: 'D:/snapshot/',
    des: 'D:/snapshot/acompress/',
    quality: 0.66,
};


*/


module.exports = cfg;