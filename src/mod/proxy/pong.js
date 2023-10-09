
const SHORTID = require('shortid');

const HTTP = require('http');
const WEBSOCKET = require('ws');
const EXPRESS = require('express');

const PROTO = require('../../util/protocol');

const { hub } = require('../../global');

/* ======================= Pong ====================== */

function Pong({ id, cfg }) {
    this.id = id || SHORTID.generate();
    this.cfg = cfg;
    this.conns = {};
    this.registry = {};
}

Pong.Conn = function( { ws, req, id, ctx }) {
    this.logger = ctx.logger.fork(ctx.id + '.conn');
    this.id = id;
    this.ws = ws;
    this.req = req;
    this.ctx = ctx;
    this.reqs = {};
    this.pings = {};
    this.ws.on('pong', () => this.onpong() );
    this.ws.on('error', (ex) => this.onerror(ex) );
    this.ws.on('close', () => this.onclose());
    this.ws.on('message', (msg) => this.onmessage(msg));
};



Pong.Conn.prototype.ping = async function(timeout) {
    const sid = SHORTID.generate();
    return new Promise((resolve, reject) => {
        this.pings[sid] = { resolve, reject };

        setTimeout( () => {
            const pack = this.pings[sid];
            if (!pack || pack.done) {
                return;
            }
            pack.done = true;
            delete this.pings[sid];
            this.close();
            reject(new Error('timeout'));
        }, timeout || 5000);

        this.ws.ping();
    });

};

Pong.Conn.prototype.close = function() {
    if (!this.ws) {
        return;
    }
    this.connected = false;
    this.ws.terminate();
};

Pong.Conn.prototype.onpong = function() {
    this.connected = true;
    const sids = Object.keys(this.pings);
    for(let i = 0; i < sids.length; i++) {
        const sid = sids[i];
        const pack = this.pings[sid];
        if (pack && !pack.done) {
            pack.done = true;
            delete this.pings[sid];
            pack.resolve();
        }
    }
};

Pong.Conn.prototype.onerror = function(ex) {
    this.logger.error('ws conn error', this.id, ex);
};

Pong.Conn.prototype.onclose = function() {
    if (this.name) {
        this.ctx.unregister(this.name);
    }
    if (this.id) {
        this.ctx.conns[this.id] = null;
    }
};

Pong.Conn.prototype.onmessage = async function(data) {
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

Pong.Conn.prototype.handle = async function(msg) {

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
    const act = msg.act;
    if (!act) {
        throw new Error("invalid act");
    }
    switch (act) {
        case 'echo':
            return msg;
        case 'time':
            return new Date().getTime();
        case 'hello':
            return 'hello world';
        case 'register':
            this.name = msg.args.name;
            await this.ctx.register(this.name, this);
            return 'ok';
        default:
            throw new Error('not implement ' + act);
    }
};



Pong.Conn.prototype.request = async function(payload, timeout) {
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

Pong.prototype.onerror = function(err, req, res, next) {
    res.json(PROTO.json.error(500, err));
    this.logger.error(ex);
};

Pong.prototype.initExpress = function() {
    this.express = EXPRESS();
    this.express.use(this.onerror);
    this.express.use(EXPRESS.json()) // for parsing application/json
    this.express.use(EXPRESS.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    const cfg = this.cfg;
    if (cfg.static) {
        for(let path in cfg.static) {
            const dir = cfg.static[path];
            if (dir) {
                this.express.use(path, EXPRESS.static(dir));
            }
        }
    }



    this.express.get('/api/pass/:node', (req, res) => {
        let node = req.params.node
        if (node === '_') {
            node = req.query['_'];
        }
        const conn = this.registry[node];
        if (!conn) {
            const ret = PROTO.json.error(404, 'conn not found');
            res.json(ret);
            return;
        }

        const args = {
            method: req.method,
            query: req.query,
        }
        const trans = PROTO.json.reqstr('pass', args);
        conn.ws.send(trans);

        res.json(PROTO.json.datastr('ok'));

    });
};

Pong.prototype.initServer = function() {
    const serverws = new WEBSOCKET.Server({ noServer: true });
    serverws.on('error', (ex) => this.onerror(ex));
    serverws.on('connection', (ws, req) => this.onconnection(ws, req) );
    this.serverws = serverws;

    this.server = HTTP.createServer();
    this.server.on('request', this.express);
    this.server.on('upgrade', function(req, sock, head) {
        serverws.handleUpgrade(req, sock, head, function(ws) {
            serverws.emit('connection', ws, req);
        });
    });
};

Pong.prototype.initHub = function() {
    hub.registers(this.id, this, {
        'g.proxy.pong.pass': async (req) => {
            const node = req.payload.node;
            const conn = this.registry[node];
            if (!conn) {
                throw new Error('conn not found');
            }
            return await conn.request(req.payload, 5000);
        }
    });
};

Pong.prototype.init = function() {
    this.initExpress();
    this.initServer();
    this.initHub();
    this.listen();
};

Pong.prototype.listen = function() {
    this.server.listen(this.cfg.port, () => {
        this.logger.info(`[pong] listen ${this.cfg.port}`)
    });
};

Pong.prototype.onerror = function(ex) {
    this.logger.error('ws server error', ex);
};

Pong.prototype.onconnection = function(ws, req) {
    ws.isAlive = true;
    this.logger.info(`conn ${req.socket.remoteAddress}`);
    const id = SHORTID.generate();
    this.conns[id] = new Pong.Conn({
        ctx: this,
        ws, req, id,
    });

};

Pong.prototype.register = async function(name, conn) {
    if (!name) {
        throw new Error('invalid key');
    }
    const curr = this.registry[name];
    if (curr) {
        try {
            await curr.ping();
            if (curr.connected) {
                setTimeout(() => {
                    conn.close();
                }, 1000);
                throw new Error('existing connection', name);
            }
        } catch (ex) {
            this.logger.info('existing connection broken', name);
        }
    }
    this.registry[name] = conn;
    conn.registered = true;
    conn.logger = this.logger.fork(this.id + '|' + name);
    this.logger.info(`register ${name}`);
};

Pong.prototype.unregister = function(name) {
    const conn = this.registry[name];
    if (!conn) {
        return;
    }
    // curr.close();
    conn.registered = false;
    this.registry[name] = null;
    this.logger.info(`unregister ${name}`);
};

Pong.attachWeb = function(express, cfg, ctx) {
    const logger = ctx.logger.fork('pong.http');

    const BODY_PARSER = require('body-parser');

    // const BODY_PARSER_XML = require('body-parser-xml');
    // BODY_PARSER_XML(BODY_PARSER);

    express.use('/api/pong', BODY_PARSER.text({
        type: ['*/xml', '+xml']
    }));
    express.route('/api/pong/:node/:proto/:addr').all(async (req, res, next) => {
        try {

            logger.debug('income', req.method, req.url, 'body', JSON.stringify(req.body));

            const ret = await hub.wait('g.proxy.pong.pass', {
                ...req.params,
                req: {
                    headers: req.headers,
                    method: req.method,
                    query: req.query,
                    body: req.body,
                },
            }, req.query.timeout || 15000);

            logger.debug('outcome', req.method, req.url, 'ret', ret);
            if (ret === undefined || ret === null) {
                return;
            }
            if (typeof ret === 'object') {
                res.send(JSON.stringify(ret));
            } else {
                res.send(ret + '');
            }
        } catch (ex) {
            res.json(PROTO.json.error(500, ex));
        }
    });
};

module.exports = Pong;







