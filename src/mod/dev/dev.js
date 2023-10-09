



function Dev() {

}

Dev.prototype.init = function() {

};


Dev.attachWeb = function(express, opts, ctx) {
    const logger = ctx.logger.fork('dev.http');
    express.route('/api/dev/eval').all(async (req, res, next) => {

    });
};

module.exports = Dev;