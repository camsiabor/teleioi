
console.log("[working directory]", process.cwd());
console.log("[process arguments]", process.argv);
console.log("[platform info]", process.platform, process.arch);

const SHORTID = require('shortid')

const { cfg, logger, insts, cfgpath } = require('./global');

logger.info('\n\n');
logger.info('| START ===================================== ' + cfgpath);

process.on('uncaughtException', (ex) => {
    logger.error(ex.stack);
});

const instanize = function(path, cfg) {
    if (cfg.active === false || cfg.active === 0) {
        return;
    }
    const mod = require(path);
    if (!mod.logger) {
        mod.logger = logger.fork(path);
    }
    if (typeof mod.init === 'function') {
        logger.info(`[initizing] ${cfg.id} | ${path} | ${JSON.stringify(cfg)}`)
        mod.init(cfg);
        return;
    }
    if (typeof mod === 'function') {
        const id = cfg.id || SHORTID.generate();
        const inst = new mod({
            id, cfg,
        });
        if (!inst.logger) {
            inst.logger = logger.fork(id);
        }
        insts[id] = inst;
        if (typeof inst.init === 'function') {
            logger.info(`init | ${cfg.id} | ${path} | ${JSON.stringify(cfg)}`)
            inst.init();
        }
    }

}

for(let path in cfg.mod) {
    const sub = cfg.mod[path];
    if (typeof sub !== 'object') {
        continue;
    }
    if (Array.isArray(sub)) {
        for(let i = 0; i < sub.length; i++) {
            instanize(path, sub[i]);
        }
    } else {
        instanize(path, sub)
    }
}
