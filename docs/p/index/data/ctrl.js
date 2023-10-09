

const CONFIG_DEF = {
    mode: '',
    autoshow: '',
    github: {
        token: '',
        branch: 'master',
    },
    mirror: {
        endpoint: '',
        path: {
            base: '',
            img: '../img',
            meta: '../meta'
        }
    },
    elastic: {
        endpoint: 'http://127.0.0.1:9200',
        username: '',
        password: '',
    },
    proxy: 'http://127.0.0.1:13006',
    secrets: {
        act: {
            client_id: '',
            client_secret: ''
        },
        dev: {
            client_id: '',
            client_secret: ''
        },
    },
};

const STATE_DEF = {

    config: CONFIG_DEF,

    github: {
        inst: null,
    },

    elastic: {
        inst: null,
    }
};

async function init(opts) {

    const Loader = opts.loader;

    const S = {
        namespaced: true,
    };

    S.state = STATE_DEF;

    const LOADED = {
        github: null,
        elastic: null,
    };

    S.getters = {
        github: (state) => async (gitopts) => {
            if (!LOADED.github) {
                await Loader.fetchWithSuffix('/js/comp/github/github.js', opts.suffix);
                LOADED.github = window['GitHub'];
            }

            const force = gitopts && gitopts.force;
            if (state.github.inst == null || force) {
                state.github.inst = new LOADED.github(gitopts);
            }
            return state.github.inst;
        },
        elastic: (state) => async (esopts) => {

            if (!LOADED.elastic) {
                const MODS = await Loader.imports(opts, {
                    'elastic': '/js/comp/elastic.js'
                });
                LOADED.elastic = MODS.elastic;
            }

            const force = esopts && esopts.force;
            if (state.elastic.inst == null || force) {
                state.elastic.inst = new LOADED.elastic(esopts);
            }
            return state.elastic.inst;
        }
    };

    S.CONFIG_DEF = CONFIG_DEF;

    return S;

}


export default init;