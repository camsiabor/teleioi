

const WINSTON = require('winston');
const WINSTON_ROTATE = require('winston-daily-rotate-file');

function Logger({ id, cfg }) {
    this.id = id;
    this.cfg = cfg;
}

Logger.prototype.init = function() {

    const cfg = this.cfg;

    const logtrans = [
        new WINSTON.transports.Console({ level: cfg.level }),
    ];

    if (cfg.file) {
        for(let level in cfg.file) {
            const filename = cfg.file[level];
            logtrans.push(
                new WINSTON_ROTATE({
                    level, filename,
                    prepend: true,
                    dirname: cfg.dir || './log',
                    datePattern: cfg.datePattern || 'YYYYMMDD[.log]',
                })
            )
        }
    }

    this.core = WINSTON.createLogger({
        level: cfg.level,
        transports: logtrans,
        format: WINSTON.format.combine(
            WINSTON.format.timestamp({
                format: cfg.timestamp || 'YYYY-MM-DD HH:mm:ss'
            }),
            WINSTON.format.printf(
                info => {
                    let ret = `${info.timestamp} ${info.level} `;
                    let tail = '';
                    if (info.message) {
                        const type = typeof info.message;
                        if (type === 'object') {
                            tail = JSON.stringify(info.message, null, 2);
                        } else {
                            tail = '' + info.message;
                        }
                    }
                    return ret + tail;
                }
            )
        ),
    });
    return this;
};

Logger.prototype.sum = function(info) {
    if (!info || !info.length) {
        return '';
    }
    const ret = [ ];
    if (this.prefix) {
        ret.push(this.prefix);
    }
    const len = info.length;
    for(let i = 0; i < len; i++) {
        const one = info[i];
        const type = typeof one;
        switch (type) {
            case 'string':
            case 'number':
                ret.push(one);
                break;
            case 'function':
                ret.push(one.name);
                break;
            case 'object':
                if (one.stack) {
                    ret.push(one.stack.toString());
                } else {
                    const s = JSON.stringify(one, null, 2);
                    ret.push(s);
                }
                break;
            default:
                ret.push(s + '');
                break;
        }
    }
    return ret.join(' ');
}

const levels = [
    'verbose', 'debug',
    'info', 'warn', 'error', 'trace'
];

Logger.prototype.log = function(level, ...info) {
    const s = this.sum(info);
    this.core.log(level, s);
};

for(let i = 0; i < levels.length; i++) {
    const level = levels[i];
    Logger.prototype[level] = function(...info) {
        this.log(level, ...info);
    }
}

Logger.prototype.fork = function(id) {
    const fork = new Logger({
        id,
        cfg: this.cfg,
    });
    fork.core = this.core;
    fork.prefix = '[' + id + ']';
    return fork;
}

module.exports = Logger;