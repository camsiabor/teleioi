

const SHORTID = require('shortid');


const P = {
    json : {}
};

P.json.req = function(act, args, headers, others) {
    const req = {
        id: SHORTID.generate(),
        type: 'req',
        act,
        args,
        headers,
    };
    if (others && typeof others === 'object') {
        Object.assign(ret, others);
    }
    return req;
};

P.json.reqstr = function(act, args, headers, others, pretty) {
    const req = P.json.req(act, args, headers, others);
    if (pretty) {
        JSON.stringify(req, null, 2);
    }
    return JSON.stringify(req);
}


P.json.data = function(data, id, others) {
    const ret =  {
        id,
        code: 0,
        type: 'resp',
        data,
    };
    if (others && typeof others === 'object') {
        Object.assign(ret, others);
    }
    return ret;
};

P.json.datastr = function(data, id, others, pretty) {
    const ret = P.json.data(data, id, others);
    if (pretty) {
        JSON.stringify(ret, null, 2);
    }
    return JSON.stringify(ret);
};

P.json.error = function(code, err, id, others) {
    const ret = {
        id,
        code,
        type: 'resp',
        data: err.toString(),
        detail: err.stack ? err.stack.toString() : err.toString(),
    };
    if (others && typeof others === 'object') {
        Object.assign(ret, others);
    }
    return ret;
};

P.json.errorstr = function(code, err, id, others, pretty) {
    const ret = P.json.error(code, err, id, others);
    if (pretty) {
        JSON.stringify(ret, null, 2);
    }
    return JSON.stringify(ret);
};

module.exports = P;






