async function init(opts) {

    const { UTIL, C, ATTRS } = opts.loader.imported;
    const { ATTRZ, ATTRZCODE } = ATTRS;

    const S = {
        namespaced: true,
    };

    // initial data
    S.state = {
        loaded: false,
        locator: { },
        branches: { }, // locator id -> container branch
        current: {
            view: [ ],
            mapping: { },
            children: [ ],
            order: { },
        },
        link: {
            stamp: 0,
            root: {},
        },
        meta: {

        }
    };

    const conntype = function(params) {
        const def = 'relative';
        if (!params) {
            return def;
        }
        if (typeof params === 'string') {
            return params;
        }
        let conn = params.conn;
        return conn ? conn : 'relative';
    };

    const ctrled = function(ctx) {
        return ctx.rootState.mode && ctx.rootState.mode.ctrl;
    };

    const stamping = function(ctx) {
        if (ctrled(ctx)) {
            return new Date().getTime() + '';
        }
        return UTIL.time.minute(2);
    };

    const axiosopts = function(ctx, opts) {
        if (!ctrled(ctx)) {
            return opts;
        }
        const ctrl = ctx.rootState.ctrl;
        if (!ctrl) {
            return opts;
        }
        if (!ctrl.config || !ctrl.config.github || !ctrl.config.github.token ) {
            return opts;
        }
        if (!opts.headers) {
            opts.headers = {};
        }
        opts.headers["Authorization"] = "token " + ctrl.config.github.token;
        return opts;
    };


    const leafParse = function(item, prev, tree) {
        const path = item.path;
        let index = path.indexOf('/');
        const group = path.substr(0, index);
        index = path.lastIndexOf('/');
        const tail = path.substr(index + 1);
        item.tail = tail;
        index = tail.lastIndexOf('.');
        if (index > 0) {
            item.name = tail.substr(0, index);
            item.suffix = tail.substr(index + 1);
        } else {
            item.name = tail;
            item.suffix = "";
        }

        item.locator = tree.locator;

        index = item.name.indexOf('_');
        if (index < 0) {
            // root
            item.head = item.name;
            if (item.locator) {
                item.id = item.locator.nation + '_' + item.locator.province + '_' + item.name;
            }
        } else {
            // sub , feed
            item.head = item.name.substr(0, index);
        }

        switch (item.suffix) {
            case "png":
            case "svg":
            case "jpg":
            case "jpeg":
                item.typez = "img";
                break;
            case "":
                item.typez = item.type;
                break;
            default:
                item.typez = item.suffix;
                break;
        }
        item.attrs = {};
        item.areas = {};
        item.areaCount = 0;
        item.group = group;
        item.show = true;
        item.expand = {
            root: false,
            subs: false,
            feeds: false,
        };
        // item.abs = C.URLS.github.img.root + item.path;
        item.abs = '/img/' + item.path;
        if (!prev || item.head !== prev.head) {
            item.root = item;
            item.role = 'root';
            item.subs = [];
            item.feeds = [];

            item.code = -1;
            if (item.name.length > 2) {
                const ch = item.name.charAt(2);
                if (ch >= '0' && ch <= '9') {
                    item.code = item.name.substr(2) * 1;
                }
            }
            return item.name;
        }
        item.root = prev.root || prev;
        item.code = item.root.code;
        if (item.name.indexOf('feed') < 0) {
            item.role = 'leaf|sub';
            item.root.subs.push(item);
        } else {
            item.role = 'leaf|feed';
            item.root.feeds.push(item);
        }
        return item.name;
    };


    const branchTake = function(branch, id) {
        let one = branch.mapping[id];
        if (!one) {
            const code = id.length > 8 ? id.substr(8) : id;
            one = {
                id,
                code,
                link : null,
                attr : null,
                data : null,
            }
            branch.mapping[id] = one;
            branch.base.push(one);
        }
        return one;
    };

    const branchSum = function(branch) {
        const children = branch.children;
        if (!children) {
            return;
        }
        const len = children.length;
        for(let i = 0; i < len; i++) {
            const child = children[i];
            if (child.type === 'tree') {
                branchSum(child);
            }
        }
        if (!branch.isPart) {
            return;
        }
        const parent = branch.parent;
        if (!parent || !parent.small || !parent.large) {
            return;
        }
        parent.small = parent.small.concat(branch.small);
        parent.large = parent.large.concat(branch.large);
        Object.assign(parent.mapping, branch.mapping);
    }

    const linkParse = function (tree) {
        const root = {};
        let prevLeaf = null;
        let prevTree = null;
        const len = tree.length;
        for (let i = 0; i < len; i++) {
            const one = tree[i];
            const {parent, target} = UTIL.obj.tail(root, one.path, '/');
            const branch = parent.obj;

            if (!branch.small) {
                Object.assign(branch, {
                    small: [], large: [],
                    children: [], mapping: {}
                });
            }

            one.parent = branch;
            branch.children.push(one);

            // branch
            if (one.type === 'tree') {
                one.locator = C.LOCATIONS.parse(one.path, '/', +1);
                prevLeaf = null;
                prevTree = null;
                branch[target.name] = one;
                if (target.name.indexOf('part_') === 0) {
                    one.isPart = true;
                }
                continue;
            }

            // leaf
            leafParse(one, prevLeaf, branch);

            if (one.role === 'root') {
                one.visible = true;
                if (one.code >= 0) {
                    if (one.code < 7000) {
                        branch.small.push(one);
                    } else {
                        branch.large.push(one);
                    }
                }
                if (one.id) {
                    branch.mapping[one.id] = one;
                }
                if (one.name) {
                    branch.mapping[one.name] = one;
                }
            }
            prevLeaf = one;
            prevTree = branch;
        }

        branchSum(root);

        return root;
    };


    const attachLink = function( {ctx, data, branch, path } ) {
        const { target } = UTIL.obj.tail(ctx.state.link.root, path + '/twitter', '/');
        if (!target || !target.obj) {
            return;
        }
        data = target.obj;
        const sum = data.large.concat(data.small);
        const len = sum.length;
        for(let i = 0; i < len; i++) {
            const link = sum[i];
            let one = branchTake(branch, link.id);
            one.link = link;
        }
        console.log("[tree] attach.link", len);
        return sum;
    };

    const sourceMeta = function(type) {
        if (type.indexOf('meta/') >= 0) {
            type = type.substr(5);
        }
        switch(type) {
            case 'attr':
                return 'attr.json';
            case 'data':
                return 'data.json';
        }
    }

    const attachMeta = function( { data, branch, type }) {
        if (type.indexOf('meta/') >= 0) {
            type = type.substr(5);
        }
        let sub = branch.meta[type];
        if (!sub) {
            sub = { stamp: 0, };
            branch.meta[type] = sub;
        }
        if (sub.data) {
            const curr = JSON.stringify(data);
            const prev = JSON.stringify(sub.data);
            if (curr.length === prev.length && curr === prev) {
                return { matched: true };
            }
        }
        let adapt;
        if (type.indexOf('attr') >= 0) {
            adapt = attachAttr({ data, branch });
        }
        sub.src = sourceMeta(type);
        sub.data = data;
        sub.adapt = adapt;
        console.log("[tree]", "attach.meta", type);
        return { matched: false };
    };

    const attachAttr = function( { data, branch }) {

        let districts = { };
        for(let id in data) {
            const one = branchTake(branch, id);
            const attr = data[id];
            one.attr = attr;
            one.attrex = {};
            if (!attr.location || !attr.location.district) {
                continue;
            }
            const datadist = UTIL.str.toMap(attr.location.district, ',');
            one.attrex.location = {
                districts: datadist,
            };

            for(let dist in datadist) {
                if (!districts[dist]) {
                    districts[dist] = { name : dist };
                }
            }
        }

        branch.meta.attr.districts = districts;

    };


    /* ===================== actions ========================= */


    S.getters = {

        'leaf.print': () => (payload) => {

            const v = payload.v;
            const ma = v.attr;

            const locator = C.LOCATIONS.parse(ma.locator, '_', 1);

            let r = [];

            r.push(ma.code);
            if (ma.name) {
                r.push(ma.name);
            }

            function stars(value, lower, delta, symbol, remain) {

                value = value * 1;
                lower = lower * 1;
                delta = delta * 1;

                if (isNaN(value) || isNaN(lower) || isNaN(delta)) {
                    return '';
                }
                const count = Math.floor((value - lower) / delta);
                if (count <= 0) {
                    return '';
                }
                let str = '';
                for(let s = 1; s <= count; s++) {
                    str = str + symbol;
                }
                if (remain) {
                    const mod = Math.floor((value - lower) % delta);
                    if (mod) {
                        str = str + remain;
                    }
                }
                return str;
            }


            if (ma.rating.overall) {
                const str = stars(ma.rating.overall, 65, 5, '⭐', '🌕');
                if (str) {
                    r.push(str);
                }
            }

            if (ma.type) {
                const spec = ATTRZ.type.special;
                if (ma.type & spec.code) {
                    r.push( spec.cn + ' ' + spec.icon);
                }
            }

            let loc = [];
            const city = C.LOCATIONS.getCity(locator);
            loc.push(city.substr(0, 2));
            if (ma.location.district) {
                loc.push(...ma.location.district.split(','))
            }
            if (ma.location.street) {
                loc.push(ma.location.street);
            }
            r.push(loc.join(' '));


            const body = ma.body;
            if (body) {
                let b = [ ];
                if (body.birth) b.push(body.birth + 'y');
                if (body.height) b.push(body.height + 'cm');
                if (body.weight) b.push(body.weight + 'kg');
                if (body.chest) {
                    b.push(ATTRZCODE.body.chest[body.chest] + ' cup');
                }
                if (b.length) {
                    r.push(b.join('  '));
                }
                if (body.cosmetic) {
                    const c = UTIL.flag.asArray(body.cosmetic, ATTRZCODE.body.cosmetic, 'cn');
                    b = [ '身体' ];
                    b = b.concat(c);
                    r.push(b.join(' '));
                }
            }

            r.push('');

            if (ma.type) {
                const s = UTIL.flag.asArray(
                    ma.type, ATTRZCODE.type, 'cn', 'short');
                r.push( [ '类型' ].concat(s).join(' '));
            }

            const status = ma.status.flag;
            const status_limit = 0x0001 << 16;
            if (status && status >= status_limit) {
                const s = UTIL.flag.asArray(
                    status, ATTRZCODE.status, 'cn', '',
                    (code) => {
                        return code >= status_limit && code > 1;
                    }
                );
                if (s.length) {
                    r.push( [ '状态 💡' ].concat(s).join(' '));
                }
            }


            const serv = ma.service;
            const servall = [ '服务' ];
            for(let servkey in serv) {
                if (servkey === 'open') {
                    continue;
                }
                const flag = serv[servkey];
                if (!flag) {
                    continue;
                }
                const subs = UTIL.flag.asArray(flag, ATTRZCODE.service[servkey], 'cn');
                if (subs && subs.length) {
                    servall.push(...subs);
                }
            }
            if (servall.length > 1) {
                let str;
                if (servall.length < 9) {
                    str = servall.join(' ');
                } else {
                    str = UTIL.str.join2(servall, ' ', '\n', 6);
                }
                r.push('');
                r.push(str);
                r.push('');
            }

            if (ma.character.flag) {
                const ch = UTIL.flag.asArray(ma.character.flag, ATTRZCODE.character, 'cn');
                if (ch.length) {
                    ch.unshift('特点');
                    r.push(ch.join(' '));
                }
                r.push('');
            }


            if (ma.desc) {
                r.push(ma.desc);
                r.push('');
            }

            for(let chkey in ma.charge) {
                const charge = ATTRZ.charge[chkey];
                if (!charge) {
                    continue;
                }
                const cn = charge.cn;
                const val = ma.charge[chkey];
                if (val) {
                    r.push(cn + ' ' + val);
                }
            }
            r.push('');



            const rakeys = [ 'service', 'attitude', 'slutty', 'massage', 'shape', 'face', 'young' ];
            for(let i = 0; i < rakeys.length; i++) {
                const rakey = rakeys[i];
                if (!ma.rating[rakey]) {
                    continue;
                }
                const rating = ATTRZ.rating[rakey];
                if (!rating) {
                    continue;
                }
                const val = ma.rating[rakey];
                const str = stars(val, 65, 5, '🌞', '✨');
                if (str) {
                    r.push(rating.cn + ' ' + str);
                }
            }

            r.push('');
            r.push('#' + ma.code + ' #' + ma.id);

            r = r.join('\n');
            return r;
        },

        'branch.path' : () => (locator) => {
            return C.LOCATIONS.path(locator, '/', -1, false);
        },

        'attr.path' : () => (locator) => {
            return C.LOCATIONS.path(locator, '/', -1, false);
        },

        'meta.infer.id' : () => (id) => {
            const r = {
                id,
                locator: id.substr(0, 10),
            };
            const location = C.LOCATIONS.parse(id, '_', 1);
            r.code = location.city;
            location.city = location.city.substr(0, 2);
            if (!r.location) {
                r.location = {};
            }
            Object.assign(r.location, location);
            return r;
        },

        'meta.virtual' : () => (id) => {
            let code = '';
            let locator = '';
            let location = {};
            let t = new Date().getTime();
            if (id) {
                if (typeof id === 'object') {
                    location = Object.assign({}, id);
                    id = C.LOCATIONS.id(location, '_', 1);
                    locator = id;
                } else if (typeof id === 'string') {
                    location = C.LOCATIONS.parse(id, '_', 1);
                    locator = C.LOCATIONS.id(location, '_', 1);
                }
                code = location.city || '';
                if (location.city && location.city.length) {
                    location.city = location.city.substr(0, 2);
                }
            }
            location.district = '';
            const attr = {
                id,
                code,
                locator,
                location,
                body: { },
                status: {
                    flag: 0,
                    t
                },
                service: { },
                charge: { },
                character: { },
                rating: { t },
                feed: { t },
                extra: { },
                secret: { },
                t
            };
            return { attr };
        },
    }

    S.actions = {


        'link.sha': async function(ctx, { conn, branch }) {

            conn = conntype(conn);
            const stamp = stamping(ctx);
            const reqopts = { method: 'GET' };

            if (conn === 'relative') {
                reqopts.url = '/meta/tree/tree.json?_=' + stamp;
            }

            if (conn === 'custom') {
                const prefix = ctx.rootState.conn.meta_prefix;
                reqopts.url = UTIL.path.concat(
                    prefix, "/tree/tree.json?_=" + stamp
                );
            }

            if (conn === 'github.api') {
                if (!branch) {
                    branch = C.SELF.github.branch;
                }
                reqopts.url =
                    C.URLS.github.api.repos.tree + branch + '?&_=' + stamp;
                axiosopts(ctx, reqopts);
            }

            if (conn === 'github.page') {
                reqopts.url = UTIL.path.concat(
                    C.URLS.meta.root, "tree/tree.json?_=" + stamp
                );
            }

            const resp = await axios(reqopts);
            return resp.data.sha;
        },

        'link.cache': async function(ctx, { conn, branch, sha }) {
            const shaprev = UTIL.local.load("tree.link.sha");
            if (sha) {
                sha = await ctx.dispatch('link.sha', { conn, branch });
            } else {
                sha = shaprev;
            }
            if (sha !== shaprev) {
                return { sha };
            }
            const tree = UTIL.local.load("tree.link");
            if (!tree) {
                return { sha };
            }
            return { sha, tree, cache: true };
        },

        'link.fetch.data': async function(ctx, { conn, branch, cache, sha }) {

            const start = new Date().getTime();

            try {

                conn = conntype(conn);

                if (!branch) {
                    branch = C.SELF.github.branch;
                }

                let tree = null;
                if (cache) {
                    try {
                        const resp = await ctx.dispatch('link.cache', { conn, branch, sha } );
                        if (resp.tree) {
                            if (sha) {
                                resp.matched = true;
                                return resp;
                            }
                            sha = resp.sha;
                            tree = resp.tree;
                            cache = resp.cache;
                        }
                    } catch (ex) {
                        cache = false;
                        console.error("[tree/root.fetch]", "cache load", ex);
                    }
                }

                if (tree) {
                    return { sha, tree, cache };
                }

                cache = false;

                const stamp = stamping(ctx);
                const reqopts = { method: 'GET' };


                if (conn === 'relative') {
                    reqopts.url = '/meta/tree/tree.json?_=' + stamp;
                }

                if (conn === 'custom') {
                    const prefix = ctx.rootState.conn.meta_prefix;
                    reqopts.url = UTIL.path.concat(
                        prefix, "/tree/tree.json?_=" + stamp
                    );
                }

                if (conn === 'github.page') {
                    reqopts.url = UTIL.path.concat(
                        C.URLS.meta.root, "tree/tree.json?_=" + stamp
                    );
                }

                if (conn === 'github.api') {
                    reqopts.url = C.URLS.github.api.repos.tree +
                        branch + '?recursive=1&_=' + stamp;
                    axiosopts(ctx, reqopts);
                }

                const resp = await axios(reqopts);
                sha = resp.data.sha;
                tree = resp.data.tree;
                try {
                    UTIL.local.save('tree.link', tree);
                    UTIL.local.save('tree.link.sha', sha);
                } catch (ex) {
                    console.error('[tree/link.fetch]', 'cache save', ex);
                }

                return { sha, tree, cache, data: resp.data };
            } finally {
                console.log('[tree/link.fetch.data]', new Date().getTime() - start);
            }

        },

        'link.fetch': async function (ctx, { conn, locator, branch, cache, sha }) {

            const resp = await ctx.dispatch('link.fetch.data', {
                conn, branch, cache, sha
            });
            if (!resp.matched) {
                ctx.state.link.root = linkParse(resp.tree);
            }
            locator = Object.assign(
                {}, locator || ctx.rootState.locator);
            await ctx.dispatch('branch.attach', { type: 'link', locator });
            return resp;
        },

        /* =============== attr ============= */


        'meta.fetch.data': async function
            (ctx, {conn, locator, type, cache, ref }) {

            const start = new Date().getTime();

            let data;
            let src = sourceMeta(type);
            let path = ctx.getters['attr.path'](locator);
            if (cache) {
                try {
                    data = UTIL.local.load('meta/' + path + src);
                } catch (ex) {
                    cache = false;
                    console.error('tree/meta.fetch', 'cache load', src, ex);
                }
            }

            if (!data) {

                cache = false;

                let stamp = stamping(ctx);
                const reqopts = {
                    method: 'GET',
                };

                conn = conntype(conn);

                if (conn === 'relative') {
                    reqopts.url = UTIL.path.concat(
                        '/meta/', path, src + "?_=" + stamp
                    );
                }

                if (conn === 'custom') {
                    const prefix = ctx.rootState.conn.meta_prefix;
                    reqopts.url = UTIL.path.concat(
                        prefix, path, src + "?_=" + stamp
                    );
                }

                if (conn === 'github.page') {
                    reqopts.url = UTIL.path.concat(
                        C.URLS.meta.root, path, src + "?_=" + stamp
                    );
                }

                if (conn === 'github.api') {
                    // https://api.github.com/repos/gmg991/meta/contents/cn/gudo/zh/attr.json?ref=master&_=1622306326098
                    const user = C.SELF.github.name;
                    const repo = 'teleioi_limni';
                    ref = ref || 'main';
                    reqopts.url = UTIL.path.concat(
                        'https://api.github.com/repos',
                        user, repo,
                        '/contents',
                        path,
                        src + '?ref=' + ref + '&_=' + stamp
                    );
                    axiosopts(ctx, reqopts);
                }

                /**
                reqopts.onDownloadProgress = (evt) => {
                    console.log(evt.loaded, evt.total);
                };
                 **/

                const resp = await axios(reqopts);
                data = resp.data;
                if (conn === 'github.api') {
                    const raw = UTIL.encode.atou(data.content);
                    data = JSON.parse(raw);
                }
                try {
                    UTIL.local.save('meta/' + path + src, data);
                } catch (ex) {
                    console.error('tree/attr.fetch', 'cache save', src, ex);
                }
            }


            console.log('[tree/meta.fetch.data]', src, new Date().getTime() - start);

            return { data, cache };
        },

        'meta.fetch':
            async function (ctx, {conn, locator, type, cache }) {
            locator = Object.assign(
                {}, locator || ctx.rootState.locator);
            const respF = await ctx.dispatch('meta.fetch.data', {
                conn, locator, type, cache,
            });
            const respA = await ctx.dispatch('branch.attach', {
                locator,
                data: respF.data,
                type: 'meta/attr',
            });
            respF.matched = respA.matched;
            return respF;
        },

        /* ========================= branch ============================ */

        'branch': async function (ctx, locator) {
            const path = ctx.getters['branch.path'](locator);
            let branch = ctx.state.branches[path];
            if (!branch) {
                branch = {
                    stamp: {
                        link: 0,
                        attr: 0,
                        data: 0,
                    },
                    view: [ ],
                    base: [ ],
                    meta: { },
                    mapping: { },
                };
                ctx.state.branches[path] = branch;
            }
            return branch;
        },

        'branch.attach': async function(ctx,  { locator, branch, path, type, data }) {
            if (!locator) {
                locator = ctx.rootState.locator;
            }
            if (!branch) {
                branch = await ctx.dispatch('branch', locator);
            }
            if (!path) {
                path = ctx.getters['branch.path'](locator);
            }
            if (type === 'link') {
                return attachLink( { ctx, data, branch, locator, path });
            }
            if (type.indexOf('meta') >= 0) {
                return attachMeta( { ctx, data, branch, locator, type });
            }
        },

        'branch.jump': async function (ctx, locator) {
            const branch = await ctx.dispatch('branch', locator);
            if (!branch) {
                throw new Error('rebranch | 404 not found: ' + locator.toString());
            }
            ctx.state.current = branch;
            ctx.state.loaded = true;
            ctx.rootState.locator = locator;
            return branch;
        },

    };

    return S;
}


export default init;
