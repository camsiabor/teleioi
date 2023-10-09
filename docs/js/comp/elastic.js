

async function init(inject) {


    const Loader = inject.loader;
    const UTIL = await Loader.import('/js/util.js', inject);

    function ES(opts) {
        this.auth = opts.auth;
        this.endpoint = opts.endpoint;
    }

    ES.prototype.request = function(opts) {
        if (!opts.method) {
            return Promise.reject(new Error('no method is set in options'));
        }
        const params = {
            url: opts.url,
            method: opts.method,
        };
        if (this.endpoint) {
            opts.url = UTIL.path.concat(this.endpoint, opts.url);
        }
        if (!opts.auth) {
            opts.auth = this.auth;
        }
        if (opts.data) {
            params.data = opts.data;
        }
        if (opts.headers) {
            params.headers = opts.headers;
        }
        return UTIL.axios.run(opts);
    };

    ES.prototype.index = {};
    ES.prototype.index.create = function(index, schema) {
        return this.request({
            method: 'PUT',
            url: index,
            data: schema,
        });
    };

    ES.prototype.index.remove = function(index) {
        return this.request({
            method: 'DELETE',
            url: index,
        });
    };

    ES.prototype.query = function(index, query, from, size, opts) {
        if (!from) {
            from = 0;
        }
        if (!size) {
            size = 10;
        }
        const data = {
            from, size, query
        };
        if (opts) {
            Object.assign(data, opts);
        }
        return this.request({
            method: 'POST',
            url: index + '/_search',
            data,
        });
    };

    ES.prototype.queryToMap = async function(index, query, from, size, opts) {
        const resp = await this.index.query(index, query, from , size, opts);
        if (!resp) {
            return null;
        }
        return this.result.toMap(resp);
    };

    ES.prototype.queryToArray = async function(index, query, from, size, opts) {
        const resp = await this.index.query(index, query, from, size, opts);
        if (!resp) {
            return null;
        }
        return this.result.toArray(resp);
    };

    ES.prototype.bulk = function(index, map) {
        const bulk = [];
        for(let id in map) {
            const one = map[id];
            const head = JSON.stringify( {
                update: {
                    _id: id,
                    _index: index
                }
            });
            const tail = JSON.stringify({
                doc: one,
                doc_as_upsert: true
            });
            bulk.push(head);
            bulk.push(tail);
        }

        const total = bulk.join('\n') + '\n';
        return this.request({
            method: 'PUT',
            url: '_bulk',
            data: total,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }



    ES.prototype.result = {};

    ES.prototype.result.toMap = function(res) {
        const map = {};
        const hits = res['hits']['hits'];
        for(let i = 0; i < hits.length; i += 1) {
            const hit = hits[i];
            const _id = hit['_id'];
            map[_id] = hit['_source'];
        }
        return map;
    };

    ES.prototype.result.toArray = function(res) {
        const array = [];
        const hits = res['hits']['hits'];
        for(let i = 0; i < hits.length; i += 1) {
            const hit = hits[i];
            array.push(hit['_source']);
        }
        return array;
    };


    return ES;
}








export default init;

