



const FS = require('fs');
const PATH = require('path');
const WECHAT = require('wechat');
const WECHAT_API = require('wechat-api');



const T = require('./template');
const PROTO = require('../../util/protocol');



const { hub, insts } = require('../../global');

function Core(props) {
    Object.assign(this, props || {});
}


Core.prototype.init = function() {

    this.initServer();
    this.initAPI();

};


Core.prototype.initAPI = function() {
    const cfg = this.cfg;
    const tokenfile = cfg.tokenfile || './data/wechat.token.txt';
    this.api = new WECHAT_API(cfg.appid, cfg.appsecret, async (callback) => {
        // 传入一个获取全局token的方法
        try {
            const txt = await FS.promises.readFile(tokenfile, 'utf8');
            const json = txt ? JSON.parse(txt) : {};
            this.logger.info('token read', json.expireTime);
            callback(null, json);
        } catch (ex) {
            this.logger.error('token read', ex);
            callback(null, { });
        }
    }, async (token, callback) => {
        // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
        // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
        try {
            const dir = PATH.dirname(tokenfile);
            await FS.promises.mkdir(dir, {recursive: true});
            await FS.promises.writeFile(tokenfile, JSON.stringify(token));
            callback();
            this.logger.info('token persist', token.expireTime);
        } catch (ex) {
            this.logger.error('token persist', ex);
        }
    });
}

Core.prototype.initServer = function() {
    const cfg = this.cfg;
    const httpcore = insts[cfg.attach];
    const express = httpcore.express;

    express.route('/api/wechat/:method').all(async (req, res, next) => {
        try {
            let method = req.params.method;
            if (method === '_') {
                method = req.body.method;
            }
            if (!method) {
                res.json(
                    PROTO.json.error(500, 'invalid method')
                );
                return;
            }
            const args = req.body.args || [];
            const data = await this.call(method, ...args);
            res.json(PROTO.json.data(data || ''));
        } catch (ex) {
            res.json(PROTO.json.error(500, ex));
        }

    });

    const handler = WECHAT(cfg, (req, res, next) => {
        this.handle(req.weixin, req, res, next);
    });

    // https://szplay.net/api/pong/dev/http/wechat
    // https://szplay.net/gate/wechat
    // express.use(EXPRESS.query());
    express.use('/gate/wechat', handler);
};


Core.prototype.call = async function( method, ...params ) {
    return new Promise((resolve, reject) => {
        if (!params) {
            params = []
        }
        params.push((err, data, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
        this.api[method](...params);
    });
};


Core.prototype.handle_text = function(msg, req, res, next) {
    const content = msg.Content;
    switch (content) {
        case 'hi':
        case '你好':
            res.reply(T.TEXT.INFO);
            break;
        default:
            res.end('');
            break;
    }
};


Core.prototype.handle_event = function(msg, req, res, next) {
    switch(msg.EventKey) {
        case 'info':
        case 'info_flow':
            res.reply(T.TEXT.INFO);
            break;
    }
};


Core.prototype.handle = function(msg, req, res, next) {
    this.logger.info('middleware', msg);
    const handler = this['handle_' + msg.MsgType];
    if (!handler) {
        res.reply(T.TEXT.INFO);
        return;
    }
    handler(msg, req, res, next);
};


module.exports = Core;