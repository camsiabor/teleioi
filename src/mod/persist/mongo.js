

const { MongoClient } = require("mongodb");

function M( { id, cfg }) {
    this.id = id;
    this.cfg = cfg;
}

M.prototype.endpoint = function() {
    const cfg = this.cfg;
    let r = cfg.protocol || 'mongodb://';

    if (cfg.username && cfg.password) {
        r = r + cfg.username + ':' + cfg.password + '@';
    }
    r = r + cfg.host;
    if (cfg.port) {
        r = r + ':' + cfg.port;
    } else {
        r = r + ':27017';
    }

    if (cfg.options) {
        r = r + '/?' + cfg.options;
    }

    return r;
};

M.prototype.init = async function() {
    try {
        const endpoint = this.endpoint();
        this.client = new MongoClient(endpoint, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await this.client.connect();
        this.logger.info('connected ---> ', this.cfg.host, this.cfg.port, this.cfg.username);
    } catch (ex) {
        this.logger.error(ex);
    }
};

module.exports = M;

