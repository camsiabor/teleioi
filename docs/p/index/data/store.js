function filter(store, UTIL, ATTRS) {
    store.state.filter = {
        keyword: '',

        body: {
            birth: {},
            birthN: 0,

            height: {},
            heightN: 0,

            weight: {},
            weightN: 0,

            chest: {},
            chestN: 0,

            cosmetic: {},
            cosmeticF: 0,
        },

        districts: {},
        districtsN: 0,

        type: {},
        typeF: 0,

        status: {},
        statusF: 0,

        service: {},

        character: {},
        characterF: 0,

        rating: {},

        star: {
            V: null,
        },

        order: {
            dir: 'desc',
            timeUpdate: true,
        }
    };

    for (let k in ATTRS.ATTRZ.service) {
        store.state.filter.service[k] = {}
        store.state.filter.service[k + 'N'] = 0;
        store.state.filter.service[k + 'F'] = 0;
    }

    // attrs.js set default toggled
    store.state.filter.statusF = UTIL.flag.sum(ATTRS.ATTRZ.status, 'code', 'toggled');

}

async function init(opts) {

    const Loader = opts.loader;

    const { UTIL, VUTIL, C, ATTRS } = await Loader.imported;

    const MODS = await Loader.imports(opts, {
        'store-tree': '/p/index/data/tree.js',
        'store-ctrl': '/p/index/data/ctrl.js',
    });

    const URLPARAMS = new URLSearchParams(window.location.search);

    const store = {
        namespaced: true,
    };

    store.modules = {
        tree: MODS['store-tree'],
        ctrl: MODS['store-ctrl'],
    };

    store.state = { };

    if (!window['mitt']) {
        throw new Error('no mitt');
    }

    const { Hub } = UTIL;
    const { mitt } = window;
    store.state.emitter = mitt();
    store.state.hub = new Hub(mitt(), {});

    store.state.C = {
        URLPARAMS,
        ...ATTRS,
        ...C,
    };

    store.state.ui = {
        logo: '',
        ready: false,
        loading: false,
        message: '',
        style: {
            main: '',
        },
        prefix: {
            img: '/img/',
            meta: '/meta/',
        },
        modal: {
            info: false,
            config: false,
            filter: false,
        },
        layout: {
            min: 300,
            compact: false,
            canvasize: 1,
        },
        progress: {
        },
    };

    store.state.locator = {
        nation : 'CN',
        province : 'GUDO',
        city : 'ZH',
        area: '',
        sub: 'twitter',
    };

    store.state.mode = {
        view: 'twitter',
        ctrl: !!URLPARAMS.get("ctrl"),
    };

    store.state.conn = {
        img: 'relative',
        img_prefx: '/img/',
        img_custom: C.SELF.github.pageUrl + '/img/',

        meta: 'relative',
        meta_prefix: '/meta/',
        meta_custom: C.SELF.github.pageUrl + '/meta/',
    };

    store.state.meta = {
        current: null,
        mapping: {},
    };

    filter(store, UTIL, ATTRS);

    store.state.UTIL = UTIL;
    store.state.VUTIL = VUTIL;

    store.state.ALL = [];

    for(let k in store.state) {
        if (k === 'ALL') {
            continue;
        }
        store.state.ALL.push(k);
    }

    /* =================== mutations ====================== */

    store.mutations = {

    };

    for(let k in store.state) {
        if (k === 'ALL') {
            continue;
        }
        store.mutations[k] = function (key) {
            return function(state, n) {
                state[key] = n;
            }
        }(k);
    }

    const { createStore } = window['Vuex'];
    return createStore(store);
}

export default init;