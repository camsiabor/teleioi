
// noinspection JSDeprecatedSymbols

const U = {
    str: {},
    num: {},
    obj: {},
    map: {},
    css: {},
    file: {},
    flag: {},
    json: {},
    time: {},
    path: {},
    uuid: {},
    func: {},
    local: {},
    axios: {},
    encode: {},
    encrypt: {},
};


/* =========================== str =========================== */

U.str.split = function (str, splitter, trim) {
    if (trim) {
        str = str.trim();
    }
    if (str.indexOf(splitter) < 0) {
        return [str];
    }
    const ret = [];
    const array = str.split(splitter);
    const len = array.length;
    for (let i = 0; i < len; i++) {
        let one = array[i];
        if (trim) {
            one = one.trim();
        }
        if (one) {
            ret.push(one);
        }
    }
    return ret;
};

U.str.concat = function (obj, field, str, splitter) {
    if (!str) {
        throw new Error('str_concat str is null');
    }
    if (typeof splitter === 'undefined') {
        splitter = ',';
    }
    const v = obj[field];
    if (typeof v === 'undefined') {
        obj[field] = str;
        return str;
    }
    if (v.indexOf(str) < 0) {
        obj[field] = v + splitter + str;
    }
    return obj[field];
};


U.str.matches = function(target, keywords) {
    const len = keywords.length;
    for(let i = 0; i < len; i++) {
        const keyword = keywords[i];
        if (target.indexOf(keyword) >= 0) {
            return true;
        }
    }
    return false;
};

U.str.toMap = function (str, splitter) {
    if (!str) {
        return {};
    }
    if (!splitter) {
        throw new Error('str.toMap no splitter is set: ' + str);
    }
    str = str.trim();
    const map = {};
    const array = str.split(splitter);
    const len = array.length;
    for (let i = 0; i < len; i += 1) {
        const one = array[i];
        if (one) {
            map[one] = 1;
        }
    }
    return map;
};

U.str.join2 = function(array, j1, j2, limit) {

    if (!array.length) {
        return '';
    }

    const r = [];

    let ptr = 0;
    const part = [];
    const len = array.length;
    for(let i = 0; i < len; i++) {
        const one = array[i];
        part.push(one);
        ptr = ptr + 1;
        if (ptr === limit) {
            r.push(part.join(j1));
            part.length = 0;
            ptr = 0;
        }
    }
    if (part.length) {
        r.push(part.join(j1));
    }

    return r.join(j2);
};

U.str.clipboard = function(target) {
    let textArea = document.createElement("textarea");
    try {
        if (typeof target === 'object' || Array.isArray(target)) {
            target = JSON.stringify(target);
        }
        textArea.value = target;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        if (!document.execCommand('copy')) {
            console.error('to clipboard failure', target);
        }
    } finally {
        document.body.removeChild(textArea);
    }
};


/* =================================== num =============================== */


U.num.gte0 = function(n) {
    return n !== undefined && n !== null && !isNaN(n) && n >= 0;
};

U.num.assignGT = function (obj, field, num) {
    const v = obj[field];
    if (typeof v === 'undefined') {
        obj[field] = num;
        return true;
    }
    if (num > v) {
        obj[field] = num;
        return true;
    }
    return false;
}

U.num.assignLT = function (obj, field, num) {
    const v = obj[field];
    if (typeof v === 'undefined') {
        obj[field] = num;
        return true;
    }
    if (num < v) {
        obj[field] = num;
        return true;
    }
    return false;
};

U.num.in = function(value, criteria, lowerField, upperField) {
    const lower = criteria[lowerField];
    const upper = criteria[upperField];

    const existLower = U.obj.exist(lower);
    const existUpper = U.obj.exist(upper);

    if (existLower && existUpper) {
        if (value >= lower && value <= upper) {
            return true;
        }
    } else if (existLower) {
        if (value >= lower) {
            return true;
        }
    } else if (existUpper) {
        if (value <= upper) {
            return true;
        }
    }
    return false;
}

U.num.ins = function(value, map, lowerField, upperField) {
    if (!U.obj.exist(value)) {
        return false;
    }
    if (!lowerField) {
        lowerField = 'lower';
    }
    if (!upperField) {
        upperField = 'upper';
    }

    if (Array.isArray(map)) {
        const len = map.length;
        for(let i = 0; i < len; i = i = 1) {
            const criteria = map[i];
            if (U.num.in(value, criteria, lowerField, upperField)) {
                return true;
            }
        }
    } else {
        for(let k in map) {
            const criteria = map[k];
            if (U.num.in(value, criteria, lowerField, upperField)) {
                return true;
            }
        }
    }
    return false;
};

U.num.pad = function(num, len, padder) {
    let r = '' + num;
    const delta = len - r.length;
    if (delta <= 0) {
        return r;
    }
    if (!padder){
        padder = '0';
    }
    for(let i = 1; i <= delta; i++) {
        r = padder + r;
    }
    return r;
};




/* =========================== css =========================== */

U.css.createClass = function (name,rules){
    let style = document.createElement('style');
    style['type'] = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    if(!(style.sheet||{}).insertRule) {
        (style.styleSheet || style.sheet).addRule(name, rules);
    } else {
        style.sheet.insertRule(name + "{" + rules + "}", 0);
    }
};

/* =========================== obj =========================== */

U.obj.exist = function(v) {
    return v !== undefined && v !== null;
};

U.obj.fill = function (def, inst) {
    for (let key in def) {
        if (!key) {
            continue;
        }
        let val = inst[key];
        let val_def = def[key];
        let val_type = typeof val;
        let val_def_type = typeof val_def;
        if (val === undefined || val === null) {
            if (val_type !== val_def_type) {
                if (val_type === 'number' && val_def_type === 'string') {
                    val_def = val + '';
                } else if (val_type === 'string' && val_def_type === 'number') {
                    val = val * 1;
                    if (!isNaN(val)) {
                        val_def = val;
                    }
                }
            }
            inst[key] = val_def;
        } else {
            if (val instanceof Object) {
                U.obj.fill(val_def, val);
            }
        }
    }
    return inst;
};

U.obj.cloneShadow = function (src, des) {
    if (!des) {
        des = {};
    }
    for (let k in src) {
        des[k] = src[k];
    }
    return des;
};

U.obj.tail = function (root, path, seperator) {
    if (!root) {
        throw new Error('obj is null');
    }
    const elements = U.str.split(path, seperator);
    const len = elements.length;
    let target = null;
    let parent = {
        name: '',
        obj: root,
    };
    for (let i = 0; i < len; i++) {
        const element = elements[i];
        const sub = parent.obj[element];
        target = {
            obj: sub,
            name: element,
        };
        if (sub == null || typeof sub === 'undefined') {
            return {parent, target};
        }
        if (i !== len - 1) {
            parent = target;
        }
    }
    return {parent, target,};
};

/* =========================== time =========================== */

U.time.MINUTE = 60 * 1000;
U.time.HOUR = 60 * 60 * 1000;
U.time.DAY = 24 * U.time.HOUR;
U.time.DAY_HALF = 12 * U.time.HOUR;

U.time.datify = function(v, def) {
    if (v === undefined || v == null || isNaN(v) || v === '') {
        return def;
    }
    if (v instanceof Date) {
        return v;
    }
    if (typeof v === 'string') {
        v = v * 1;
        if (isNaN(v)) {
            return def;
        }
    }
    if (typeof v === 'number') {
        return new Date(v);
    }
    throw new Error('invalid type for datify: ' + v);
};

U.time.datifyN = function(v) {
    if (v === undefined || v === null || isNaN(v) || v === '') {
        return new Date();
    }
    return U.time.datify(v);
};

U.time.minute = function (delta) {
    let d = new Date();
    let min = d.getMinutes();
    if (delta) {
        const mod = min % delta;
        min = min - mod;
    }
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getHours() + '-' + min;
};

U.time.diff = function (early, late) {
    late = U.time.datifyN(late);
    early = U.time.datify(early);
    return late.getTime() - early.getTime();
};

U.time.diffHour = function(early, late) {
    const diff = U.time.diff(early, late);
    return Math.floor(diff / U.time.HOUR);
};


U.time.diffDay = function(early, late) {
    const diff = U.time.diff(early, late);
    return Math.floor(diff / U.time.DAY);
};

U.time.formatDatetime = function (t) {
    t = U.time.datifyN(t);
    let year = t.getFullYear();
    let month = U.num.pad(t.getMonth() + 1, 2);
    let day = U.num.pad(t.getDate(), 2);

    const head = year + '-' + month + '-' + day;
    const tail = U.time.formatTime(t);
    return head + ' ' + tail;
};


U.time.formatDate = function (t) {
    t = U.time.datifyN(t);
    let year = t.getFullYear();
    let month = U.num.pad(t.getMonth() + 1, 2);
    let day = U.num.pad(t.getDate(), 2);
    return year + '-' + month + '-' + day;
};


U.time.formatTime = function (t) {
    t = U.time.datifyN(t);
    let hour = t.getHours();
    let minute = t.getMinutes();
    let second = t.getSeconds();
    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;
    return hour + ':' + minute + ':' + second;
};


U.time.AGO_ARRAY = null;
U.time.ago = function(t) {
    if (!t) {
        return '';
    }
    if (!U.time.AGO_ARRAY) {
        const map = {
            0: '24小时內',
            1: '昨天',
            2: '前天',
            3: '几天前',
            6: '上周',
            13: '兩周前',
            20: '三周前',
            28: '半月多前',
            50: '月多前',
            75: '兩月多前',
        };
        let curr = '';
        const array = [];
        for(let i = 0; i <= 75; i++) {
            let name = map[i];
            if (name) {
                curr = name;
            } else {
                name = curr;
            }
            array[i] = name;
        }
        U.time.AGO_ARRAY = array;
    }

    const now = new Date().getTime();
    let delta = now - t;
    if (delta < 0) {
        return '';
    }
    if (delta < U.time.DAY_HALF) {
        return '几小时前';
    }
    const D = U.time.DAY;
    delta = Math.floor(delta / D);
    const r = U.time.AGO_ARRAY[delta];
    if (r) {
        return r;
    }
    return '多月前';
};

U.time.ago_precise = function(t) {

    const now = new Date().getTime();
    let delta = now - t;
    if (delta < 0) {
        return '';
    }
    const day = U.time.diffDay(t, now);
    if (day <= 0) {
        return '今天';
    }
    return day + '天前';
};

U.time.LATER_ARRAY = null;
U.time.later = function(t) {
    if (!t) {
        return '';
    }
    if (!U.time.LATER_ARRAY) {
        const map = {
            0: '24小时內',
            1: '明天',
            2: '后天',
            3: '三天后',
            4: '四天后',
            5: '五天后',
            6: '六天后',
            7: '下周',
            13:'兩周后',
            20:'三周后',
            28:'一月后',
            50:'月多后',
            75:'两月多后',
        };
        let curr = '';
        const array = [];
        for(let i = 0; i <= 75; i++) {
            let name = map[i];
            if (name) {
                curr = name;
            } else {
                name = curr;
            }
            array[i] = name;
        }
        U.time.LATER_ARRAY = array;
    }

    const now = new Date().getTime();
    let delta = t - now;
    if (delta < 0) {
        return '';
    }
    if (delta < U.time.DAY_HALF) {
        return '几小时后';
    }
    const D = U.time.DAY;
    delta = Math.floor(delta / D);
    const r = U.time.LATER_ARRAY[delta];
    if (r) {
        return r;
    }
    return '多月后';
};

U.c = async function(tag, func, ...args) {
    const start = new Date().getTime();
    let ret = func(...args);
    if (U.isPromise(ret)) {
        ret = await ret;
    }
    const end = new Date().getTime();
    console.log('[' + tag + ']', 'consume', end - start);
    return ret;
};

/* =========================== path =========================== */

U.path.name = function(path, seperator) {
    if (!seperator) {
        seperator = "/";
    }
    const islash = path.lastIndexOf(seperator);
    if (islash >= 0) {
        path = path.substring(islash + 1);
    }
    const idot = path.lastIndexOf('.');
    if (idot < 0) {
        return path;
    }
    return path.substring(0, idot);
}

U.path.extension = function (path, seperator) {
    if (!seperator) {
        seperator = ".";
    }
    const index = path.lastIndexOf(seperator);
    if (index < 0) {
        return "";
    }
    return path.substring(index + seperator.length);
};

U.path.concat = function(...elements) {
    let ret = [];
    const len = elements.length;
    for(let i = 0 ; i < len; i++) {
        let element = elements[i];
        if (!element) {
            continue;
        }
        if (i !== 0 && element.startsWith('/')) {
            element = element.substring(1);
        }
        if (i !== len - 1 && element.endsWith('/')) {
            element = element.substr(0, element.length - 1);
        }
        ret.push(element);
    }
    return ret.join('/');
};

/* ============================== encode ============================= */

// utf-8 -> base64
U.encode.utoa = function (str) {
    return window.btoa(unescape(encodeURIComponent(str)));
};
// base64 -> utf-8
U.encode.atou = function (str) {
    return decodeURIComponent(escape(window.atob(str)));
};

/* =================================== map =============================== */

U.map.switchKey = function(map, keyNew) {
    const ret = {};
    for(let key in map) {
        const one = map[key];
        if (!one) {
            continue;
        }
        const code = one[keyNew];
        if (code) {
            ret[code] = Object.assign({ keyOld: key }, one);
        }
    }
    return ret;
};

U.map.switchKeyGroup = function (maps, keyNew) {
    const ret = {};
    for(let sub in maps) {
        const map = maps[sub];
        if (!map) {
            continue;
        }
        ret[sub] = U.map.switchKey(map, keyNew);
    }
    return ret;
};

U.map.containsOne = function(large, small) {
    for(let k in small) {
        if (large[k]) {
            return true;
        }
    }
    return false;
};



/* =================================== json =============================== */


U.json.isJSON = function(str) {
    str = str.trim();
    const head = str.charAt(0);
    const tail = str.charAt(str.length - 1);
    return (head === '{' && tail === '}') || (head === '[' && tail === ']');
};

U.json.download = function (obj, filename) {
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    const node = document.createElement('a');
    node.setAttribute("href", data);
    node.setAttribute("download", filename);
    document.body.appendChild(node); // required for firefox
    node.click();
    node.remove();
};

/* =================================== flag =============================== */

U.flag.add = function (obj, field, code) {
    const v = obj[field];
    if (typeof v === 'undefined') {
        obj[field] = code;
    } else {
        obj[field] = v | code;
    }
};

U.flag.sum = function(map, fieldCode, fieldToggled) {
    let r = 0;
    for(let k in map) {
        const one = map[k];
        if (!one[fieldToggled]) {
            continue;
        }
        const code = one[fieldCode];
        if (code) {
            r = r | code;
        }
    }
    return r;
};

U.flag.sumFilter = function(map, fieldCode, filter) {
    let r = 0;
    for(let k in map) {
        const one = map[k];
        if (!filter(one, map)) {
            continue;
        }
        const code = one[fieldCode];
        if (code) {
            r = r & code;
        }
    }
    return r;
};

U.flag.has = function (obj, field, code) {
    const v = obj[field];
    if (typeof v === 'undefined') {
        return false;
    }
    return v & code;
};

U.flag.and = function(src, des) {
    if (!src) {
        return 1;
    }
    if (!des) {
        return 0;
    }
    return src & des;
};

U.flag.asArray = function(flags, map, fieldLabel, fieldIcon, filter) {
    const array = [];
    for(let code in map) {
        if ((flags & code) === 0) {
            continue;
        }
        const one = map[code];
        if (!one) {
            continue;
        }
        if (filter && !filter(code, one, fieldLabel, fieldIcon, flags)) {
            continue;
        }
        let express = '';
        if (fieldLabel && one[fieldLabel]) {
            express = express + one[fieldLabel];
        }
        if (fieldIcon && one[fieldIcon]) {
            express = express + one[fieldIcon];
        }
        array.push(express);
    }
    return array;
};



/* =================================== flag =============================== */

const UUID_GEN_LUT = [];
for (let i = 0; i < 256; i++) {
    UUID_GEN_LUT[i] = (i < 16 ? '0' : '') + (i).toString(16);
}
U.uuid.gen = function (splitter) {

    splitter = splitter || '';

    const d0 = Math.random() * 0xffffffff | 0;
    const d1 = Math.random() * 0xffffffff | 0;
    const d2 = Math.random() * 0xffffffff | 0;
    const d3 = Math.random() * 0xffffffff | 0;
    return UUID_GEN_LUT[d0 & 0xff] + UUID_GEN_LUT[d0 >> 8 & 0xff] + UUID_GEN_LUT[d0 >> 16 & 0xff] + UUID_GEN_LUT[d0 >> 24 & 0xff] + splitter +
        UUID_GEN_LUT[d1 & 0xff] + UUID_GEN_LUT[d1 >> 8 & 0xff] + splitter + UUID_GEN_LUT[d1 >> 16 & 0x0f | 0x40] + UUID_GEN_LUT[d1 >> 24 & 0xff] + splitter +
        UUID_GEN_LUT[d2 & 0x3f | 0x80] + UUID_GEN_LUT[d2 >> 8 & 0xff] + splitter + UUID_GEN_LUT[d2 >> 16 & 0xff] + UUID_GEN_LUT[d2 >> 24 & 0xff] +
        UUID_GEN_LUT[d3 & 0xff] + UUID_GEN_LUT[d3 >> 8 & 0xff] + UUID_GEN_LUT[d3 >> 16 & 0xff] + UUID_GEN_LUT[d3 >> 24 & 0xff];
};

/* =================================== export =============================== */

U.func.invoke = function(func, ...args) {

    if (!func) {
        throw new Error('invoke invalid obj: ' + func);
    }
    if (typeof func === 'function') {
        return func(...args);
    }

    if (Array.isArray(func)) {
        const result = [];
        const len = func.length;
        for(let i = 0; i < len; i += 1) {
            const one = func[i];
            if (typeof one === 'function') {
                result[i] = one(...args);
            }
        }
        return result;
    }

    if (typeof func === 'object') {
        const result = {};
        for(let k in func) {
            const one = func[k];
            if (typeof one === 'function') {
                result[k] = one(...args);
            }
        }
        return result;
    }

    console.warn('invoke unhandled', func, ...args);

};

U.func.invokeSafe = function(opts, ...args) {
    try {
        const ret = opts.func(...args);
        if (ret && U.isPromise(ret)) {
            ret.then(resp => {
                opts.success(resp, ...args)
            }).catch(ex => {
                opts.failure(ex, ...args);
            });
        } else {
            opts.success(ret, ...args)
        }
    } catch (ex) {
        opts.failure(ex, ...args);
    }
};

/* =================================== local ================================ */




U.local.load = function(key, def, plain) {
    const wholeKey = U.local.path(key);
    const val = window.localStorage.getItem(wholeKey);
    if (!val) {
        return def;
    }
    if (plain) {
        return val;
    }
    if (!U.json.isJSON(val)) {
        return val;
    }
    const ret = JSON.parse(val);
    if (def && typeof def === 'object' && typeof ret === 'object') {
        U.obj.fill(def, ret);
    }
    return ret;
};

U.local.save = function(key, value) {
    if (!value) {
        value = '';
    }
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    const wholeKey = U.local.path(key);
    window.localStorage.setItem(wholeKey, value);
};

U.local.path = function(key) {
    return window.location.pathname + "/" + key;
};

/* =================================== axios ================================ */

U.axios.handleError = function (ex, resolve, reject) {

    if (ex.response) {
        if (ex.response.status === 404) {
            resolve(null);
            return;
        }
        reject(ex.response.data || ex.response);
        return;
    }

    reject(ex);
}

U.axios.run = function(opts) {
    return new Promise((resolve, reject) => {
        axios(opts).then( res => {
            resolve(res.data);
        }).catch( ex => {
            U.axios.handleError(ex, resolve, reject);
        });
    });
};

U.axios.wrap = function(promise) {
    return new Promise((resolve, reject) => {
        promise.then( res => {
            resolve(res.data)
        }).catch( ex => {
            U.axios.handleError(ex, resolve, reject);
        });
    });
};

/* ================================== file =============================== */

U.isPromise = function(obj) {
    if (obj.then && obj.catch) {
        return typeof obj.then === 'function' && typeof obj.catch === 'function';
    }
    return false;
};

/* ================================== file =============================== */



U.File = function(file) {
    if (file) {
        this.wrap(file);
    }
};

U.File.prototype.wrap = function(file) {
    this.raw = file;
    this.name = file.name;
    this.type = file.type;
    this.size = file.size;
    this.kb = Math.floor(file.size / 1024);
    this.lastModified= file.lastModified;
}

U.File.prototype.ext = function() {
    return U.path.extension(this.name) || '';
};

U.File.prototype.pre = function() {
    return U.path.name(this.name) || '';
};

U.File.prototype.read = function(type, encoding) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            const r = evt.target.result;
            this[type] = r;
            resolve(r);
        };
        reader.onerror = (ex) => {
            this[type + '_error'] = ex;
            reject(ex);
        };
        switch (type) {
            case 'dataurl':
                reader.readAsDataURL(this.raw)
                break;
            case 'text':
                reader.readAsText(this.raw, encoding)
                break;
            case 'arraybuffer':
                reader.readAsArrayBuffer(this.raw);
                break;
            case 'binarystring':
            default:
                reader.readAsBinaryString(this.raw);
                break;
        }

    });

};


/* =================================== mitt =============================== */

U.Hub = function(core, cfg) {
    this.wrap(core, cfg);
};

U.Hub.Req = function(hub, addr, payload) {
    this.hub = hub;
    this.addr = addr;
    this.payload = payload;
};

U.Hub.prototype.wrap = function(core, cfg) {
    this.$core = core;
    this.$cfg = cfg;
    this.$services = {};
};

U.Hub.prototype.all = function() {
    return this.$core.all();
}

U.Hub.prototype.emit = function(addr, payload) {
    this.$core.emit(addr, payload);
};

U.Hub.prototype.on = function(addr, handler) {
    this.$core.emit(addr, handler);
};

U.Hub.prototype.off = function(addr, handler) {
    this.$core.off(addr, handler);
};

U.Hub.prototype.register = function(ctxid, ctx, addr, handler) {

    if (!addr || typeof addr !== 'string') {
        throw new Error('invalid addr ' + addr);
    }
    if (!handler || typeof handler !== 'function') {
        throw new Error('invalid handler ' + handler)
    }
    if (!ctxid || typeof ctxid !== 'string') {
        throw new Error('invalid ctxid ' + ctxid);
    }

    let services = this.$services[ctxid];
    if (!services) {
        services = {};
        this.$services[ctxid] = services;
    }

    let array = services[addr];
    if (!array) {
        array = [];
        services[addr] = array;
    }

    const wrapper = function (req) {
        try {
            let ret = handler(req);
            if (ret === undefined || ret === null) {
                req.reply();
                return;
            }
            if (U.isPromise(ret)) {
                ret.then(res => {
                    req.reply(res)
                }).catch(ex => {
                    console.log('wrapper', 'error', ex, 'req', req);
                    req.error(ex)

                });
            } else {
                req.reply(ret);
            }
        } catch (ex) {
            console.log('wrapper', 'error', ex, 'req', req);
            req.error(ex);
        }
    }
    array.push({
        ctx,
        ctxid,
        handler: wrapper
    });
    this.$core.on(addr, wrapper);
};

U.Hub.prototype.registers = function(ctxid, ctx, map) {
    for(let addr in map) {
        const handler = map[addr];
        this.register(ctxid, ctx, addr, handler);
    }
}

U.Hub.prototype.unregister = function(ctxid, addr) {
    const services = this.$services[ctxid];
    if (!addr) {
        if (!services) {
            return;
        }
        for(let ad in services) {
            this.unregister(ctxid, ad);
        }
        delete this.$services[ctxid];
        return;
    }
    const array = services[addr];
    if (!array) {
        return;
    }
    for(let i = 0; i < array.length; i++) {
        const box = array[i];
        this.$core.off(addr, box.handler);
    }
    services[addr] = null;
};

U.Hub.prototype.request = function(addr, payload) {
    return new U.Hub.Req(this, addr, payload);
};

U.Hub.prototype.send = function(addr, payload) {
    return this.request(addr, payload).send();
};

U.Hub.prototype.go = function(addr, payload) {
    return this.request(addr, payload).go();
};

U.Hub.prototype.wait = function(addr, payload, timeout) {
    return this.request(addr, payload).wait(timeout);
};

U.Hub.Req.prototype.send = function() {
    this.hub.emit(this.addr, this);
    return this;
};

U.Hub.Req.prototype.go = function() {
    this.promise = new Promise((resolve, reject) => {
       this.resolve = resolve;
       this.reject = reject;
    });
    this.hub.emit(this.addr, this);
    return this.promise;
};

U.Hub.Req.prototype.wait = async function(timeout) {
    this.go();
    if (timeout && timeout > 0) {
        setTimeout(() => {
            if (!this.response) {
                this.reject(new Error('timeout'));
            }
        }, timeout)
    }
    return await this.promise;
};

U.Hub.Req.prototype.reply = function(data) {
    this.response = {
        data,
    };
    try {
        if (this.resolve) {
            this.resolve(data);
        }
    } finally {
        this.deferInvoke();
    }
};

U.Hub.Req.prototype.error = function(err) {
    this.response = {
        error: err,
    };
    try {
        if (this.reject) {
            this.reject(err);
        }
    } finally {
        this.deferInvoke();
    }
};

U.Hub.Req.prototype.result = function () {
    const response = this.response;
    if (!response) {
        return null;
    }
    if (response.error) {
        return response.error;
    }
    return response.data;
};


U.Hub.Req.prototype.defer = function(f) {
    if (!this.defers) {
        this.defers = [];
    }
    this.defers.push(f);
};

U.Hub.Req.prototype.deferInvoke = function() {
    if (!this.defers) {
        return;
    }
    const len = this.defers.length;
    for(let i = len - 1; i >= 0; i--) {
        const f = this.defers[i];
        f(this);
    }
};


/* =================================== encrypt =============================== */

// https://voracious.dev/blog/a-practical-guide-to-the-web-cryptography-api
U.encrypt.generateKey = async () => {
    return window.crypto.subtle.generateKey({
        name: 'AES-GCM',
        length: 256,
    }, true, ['encrypt', 'decrypt'])
};





/* =================================== export =============================== */

export default U;