
const SHORTID = require('shortid');
const EXPRESS = require('express');

const { hub } = require('../global');

function Web({ id, cfg }) {
    this.id = id || SHORTID.generate();
    this.cfg = cfg;
}

Web.prototype.attachWeb = function(express) {

    express.get('/api/time', (req, res) => {
        res.send(new Date().getTime());
    });

    express.get('/api/hello', (req, res) => {
        res.send("hello world " + new Date().getTime() );
    });
    const cfg = this.cfg;
    if (!cfg.attach) {
        return;
    }
    for(let path in cfg.attach) {
        const opts = cfg.attach[path];
        if (!opts || opts.active === false || opts.active === 0) {
            continue;
        }
        const mod = require(path);
        if (typeof mod.attachWeb === 'function') {
            mod.attachWeb(express, opts, this);
            this.logger.info(`[web] attach ${path}`);
        }
    }
}

Web.prototype.initExpress = function() {
    function handleErr(err, req, res, next) {
        res.json({
            code: 500,
            error: err.toString(),
        });
        this.logger.error(err);
    }

    const express = EXPRESS();
    this.express = express;
    express.use(EXPRESS.json()) // for parsing application/json
    express.use(EXPRESS.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    express.use(handleErr);

    const cfg = this.cfg;
    if (cfg.static) {
        for(let path in cfg.static) {
            const dir = cfg.static[path];
            if (dir) {
                express.use(path, EXPRESS.static(dir));
            }
        }
    }
    this.attachWeb(express, this.cfg, this);
    return express;
}

Web.prototype.initHub = function() {
    const addr = `g.http.${this.id}`;
    const registers = {

    };
    registers[addr] = () => this;
    hub.registers(this.id, this, registers);
};

Web.prototype.init = function() {
    const cfg = this.cfg;
    this.initHub();
    this.initExpress();
    this.express.listen(cfg.port, () => {
        this.logger.info(`[web] listen ${cfg.port}`);
    });
};

module.exports = Web;