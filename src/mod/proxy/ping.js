
const AXIOS = require('axios');
const WEBSOCKET = require('ws');
const SHORTID = require('shortid');
const PROTO = require('../../util/protocol');

function Ping( { id, cfg } ) {
    this.id = id || SHORTID.generate();
    this.cfg = cfg;
}

Ping.Conn = function({ ctx, cfg }) {
    this.reqs = {};
    this.ctx = ctx;
    this.cfg = cfg;
    this.name = cfg.name;
    this.endpoint = cfg.endpoint;
    this.logger = ctx.logger.fork(ctx.id + '|' + cfg.name);
};

Ping.Conn.prototype.connect = function() {
    this.ws = new WEBSOCKET(this.endpoint, this.connOpts || {});
    this.ws.on('open', () => this.onopen());
    this.ws.on('close', () => this.onclose());
    this.ws.on('message', (msg) => this.onmessage(msg));
};

Ping.Conn.prototype.onopen = function() {
    this.connected = true;
    this.connectedTime = new Date().getTime();
    this.logger.info(`connected ${this.name} ----> ${this.endpoint}`)
    // this.ws.send('hello world');

    const req = PROTO.json.reqstr('register', {
        name: this.name,
    });
    this.ws.send(req);
};

Ping.Conn.prototype.onclose = function() {
    this.connected = false;
    this.closedTime = new Date().getTime();
    this.logger.info(`closed ${this.name} --x-> ${this.endpoint}`)
};

Ping.Conn.prototype.onmessage = async function(data) {
    let msg;
    try {
        this.logger.info('recv', data);
        msg = JSON.parse(data);
        const resp = await this.handle(msg);
        if (resp !== undefined && resp !== null) {
            this.ws.send(PROTO.json.datastr(resp, msg.id));
        }
    } catch (ex) {
        if (msg) {
            if (msg.type === 'req') {
                this.ws.send(PROTO.json.errorstr(500, ex, msg.id));
            }
            this.logger.error(`msg`, msg);
        }
        this.logger.error(ex);
    }
};

Ping.Conn.prototype.handle = async function(msg) {

    if (msg.type === 'resp' && msg.id) {
        const pack = this.reqs[msg.id];
        if (!pack || pack.done) {
            return;
        }
        try {
            pack.done = true;
            if (msg.code === 0) {
                pack.resolve(msg.data);
            } else {
                pack.reject(msg.data);
            }
        } finally {
            delete this.reqs[msg.id];
        }
        return;
    }

    if (msg.type !== 'req') {
        return;
    }
    switch(msg.act) {
        case 'pass':
            return await this.pass(msg);
        default:
            throw new Error('not implement ' + msg.act);
    }
    
};


Ping.Conn.prototype.request = async function(payload, timeout) {
    return new Promise((resolve, reject) => {
        const req = PROTO.json.req('pass', payload);
        let pack;
        if (timeout && timeout > 0) {
            pack = {
                stamp: new Date().getTime(),
                resolve,
                reject,
                req,
            };
            this.reqs[req.id] = pack;
        }
        this.ws.send(JSON.stringify(req));
        if (!timeout || timeout <= 0) {
            resolve();
        }
        setTimeout(() => {
            if (!pack.doned) {
                reject(new Error('timeout'));
            }
        }, timeout);
    });
};


Ping.Conn.prototype.pass = async function(msg) {
    const args = msg.args;
    const { proto, addr, req } = args;

    const cfg = this.cfg;

    let url = cfg[proto][addr];
    if (req.query) {
        const arr = [];
        for(let k in req.query) {
            const v = req.query[k];
            arr.push(k + '=' + v);
        }
        if (arr.length) {
            if (url.lastIndexOf('?') > 0) {
                url = url + '&' + arr.join('&');
            } else {
                url = url + '?' + arr.join('&');
            }
        }
    }

    this.logger.debug('pass url', url);
    const resp = await AXIOS({
        url,
        data: req.body,
        method: req.method,
        headers: req.headers,
        transformResponse: (res) => {
            return res;
        },
    });
    this.logger.debug('pass ret', resp.data);
    return resp.data;
}


Ping.Conn.prototype.disconnect = function() {
    if (!this.ws) {
        return;
    }
    this.ws.close();
};

Ping.prototype.loop = function() {
    for(let k in this.all) {
        const ping = this.all[k];
        if (!ping.connected) {
            ping.connect();
        }
    }
};



Ping.prototype.init = function() {
    this.all = {};
    const cfg = this.cfg;
    const endpoints = cfg.endpoints || [];
    for(let i = 0; i < endpoints.length; i++) {
        const props = endpoints[i];
        this.all[i] = new Ping.Conn({
            ctx: this,
            cfg: props,
        });
    }
    this.loop();
    this.timer = setInterval(() => {
        this.loop();
    }, 5000);
};

/* ================== init =================== */




module.exports = Ping;