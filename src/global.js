




const MITT = require('mitt');
const LOGGER = require('./util/logger');


const cfgpath = process.argv[2] || './cfg.js';

const U = require('./util/util');
const cfg = require(cfgpath);

const shore = {};
const insts = {};
const hub = new U.Hub(MITT(), {});


if (!cfg.log) {
    cfg.log = {
        dir: './log',
        level: 'info',
        file: {
            info: 'info',
            error: 'error',
        }
    }
}

const logger = new LOGGER({
    id: 'core',
    cfg: cfg.log,
}).init();
logger.prefix = '[main]';

module.exports= {
    cfgpath,
    cfg,
    hub,
    insts,
    shore,
    logger,
};