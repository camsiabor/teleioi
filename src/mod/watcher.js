
const path = require("path");
const { promises: fs } = require("fs");

const { cfg } = require('../global');
const chokidar = require('chokidar');
const log = require('../util/logger');
const compressor = require('../util/compress');

const init = () => {

    if (!cfg.compress.active) {
        return;
    }

    const logger = new log.Logger({ name: '[watcher]' });

    const watcher = chokidar.watch(cfg.compress.src, {
        depth: 0,
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 500,
        }
    });

    const filter = {
        compress : {
            '.png': true,
            '.jpg': true,
            '.jpeg': true,
        },
        reext: {
            '.jfif': '.jpg',
            '.jpeg': '.jpg',
        }
    };

    async function reext(filepath, newext) {
        const dirname = path.dirname(filepath);
        const filename = path.basename(filepath);
        const idot = filename.indexOf('.');
        const newname = filename.substring(0, idot) + newext;
        const newpath = dirname + '/' + newname;
        await fs.rename(filepath, newpath);
        return Promise.resolve(newpath);
    }

    const handler = async (filepath, stat) => {
        if (!stat.isFile()) {
            return;
        }
        logger.log( 'check', filepath);
        const ext = path.extname(filepath);
        const lowerext = ext.toLowerCase();

        const extto = filter.reext[ext];
        if (extto) {
            const newpath = await reext(filepath, extto);
            logger.log( 'rename ext', newpath);
            return;
        }
        if (ext !== lowerext) {
            const newpath = await reext(filepath, lowerext);
            logger.log( 'lower ext', newpath);
            return;
        }
        if (filter.compress[lowerext]) {
            const des = cfg.compress.des;
            const files = await compressor.compress(filepath, des, cfg.compress.quality);
            for(let i = 0; i < files.length; i++) {
                const file = files[i];
                logger.log('compress', file.destinationPath);
            }
        }
    };

    watcher.on('add', handler);
    watcher.on('change', handler);

    logger.log(cfg.compress);
};

module.exports = {
  init
};



