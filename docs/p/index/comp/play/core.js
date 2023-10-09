

const TEMPLATE =
`
<div :style="ui.style.main" class="container-fluid">
        
    <div style="color: grey; font-weight: bold; font-size: 0.78em;">
        联系☎️ <span style="color: rgb(255,128,0)"> 与你号 szplay.net </span> | 与你下载
        <a href="https://www.yuni.com.cn/"  target="_blank"> www.yuni.com.cn</a> | 
        <a href="https://t.me/s/gmg99991" target="_blank">Telegram: gmg99991</a> |
        📌 有⭐️的妹都是验证过有好评，没有⭐的没有验证或评价不一 📌
    </div>

    <play-search ref="search"></play-search>

    <div v-if="ui.message" >
        <div class="btn-group btn-group-sm" role="group">
            <button type="button"
                    class="btn btn-sm btn-outline-danger"
                    @click="ui.modal.config = true">
                <i class="bi bi-gear"></i> 连接设置
            </button>
            <button type="button"
                    class="btn btn-sm btn-outline-danger"
                    @click="window.location.reload()"
            >
                <i class="bi bi-arrow-clockwise"></i> 重新加载
            </button>
        </div>
        <span style="color: red; font-size: 0.9em;">{{ui.message}}</span>
    </div>

    <component is="ctrl-main" ref="ctrl"
               v-if="mode.ctrl">
    </component>

    <tele-tree ref="tree"></tele-tree>

</div>
<div>
<bs-modal ref="info" title="说明"
              v-model:toggled="ui.modal.info">
        <component v-if="ui.modal.info"
                   :is="ui.modal.info ? 'play-info' : 'div' ">
        </component>
    </bs-modal>

    <bs-modal ref="config" title="设置"
              v-model:toggled="ui.modal.config">
        <component v-if="ui.modal.config"
                   :is="ui.modal.config ? 'play-config' : 'div' ">
        </component>
    </bs-modal>

    <bs-offcanvas :bottom="false"
                  :header="false"
                  v-model:toggled="ui.modal.filter"
                  class="offcanvas-bottom" ref="offcanvasFilter"
                  style="min-height: 40%; border-top: 1vh solid rgba(255,255,255, 0.1); background: rgb(235,235,235); opacity: 0.95;"
    >
        <play-filter ref="filter"></play-filter>
    </bs-offcanvas>


    <div class="position-fixed top-50 end-0" style="z-index: 1000; ">
        <button @click="ui.modal.filter = !ui.modal.filter"
                class="btn btn-outline-danger"
                style="border-radius: 50rem; background-color: white; color: red; opacity: 0; "
                :style="{ opacity : 0.85 }"
                type="button">
            <i class="bi bi-command"></i>
            {{ ui.modal.filter ? '隐' : '滤'}}
        </button>
    </div>
</div>
`;



async function init(OPTS) {


    const Loader = OPTS.loader;
    const COMPONENTS = await Loader.imports(OPTS, {
        'tele-tree': '/p/index/comp/play/tree.js',

        'play-nav' : '/p/index/comp/play/nav.js',
        'play-filter': '/p/index/comp/play/filter.js',
        'play-search' : '/p/index/comp/play/search.js',

        'bs-modal' : '/js/vue/comp/bs-modal.js',
        'bs-offcanvas': '/js/vue/comp/bs-offcanvas.js',
    });

    const COMPONENTS_ASYNC = {
        'play-info' : Vue.defineAsyncComponent(() => {
            const params = {};
            Object.assign(params, OPTS);
            params.key = 'play-info';
            return Loader.import('/p/index/comp/play/info.js', params);
        }),
        'play-config' : Vue.defineAsyncComponent(() => {
            const params = {};
            Object.assign(params, OPTS);
            params.key = 'play-config';
            return Loader.import('/p/index/comp/play/config.js', params);
        }),
        'ctrl-main' : Vue.defineAsyncComponent(() => {
            const params = {};
            Object.assign(params, OPTS);
            params.key = 'ctrl-main';
            return Loader.import('/p/index/comp/ctrl/main.js', params);
        })
    };


    const Comp = {};
    Comp.name = 'play-core';
    Comp.template = TEMPLATE;
    Comp.components = {
        ...COMPONENTS,
        ...COMPONENTS_ASYNC,
    };

    Comp.computed = {
        ...Vuex.mapState([
            'C', 'UTIL',
            'locator', 'mode', 'ctrl',
            'ctrl', 'filter', 'conn', 'hub', 'ui'
        ])
    };

    Comp.watch = {
        '$route.params.locid': function () {
            if (!this.locating()) {
                return;
            }
            this.hub.go('tree.rebranch', {
                locator: this.locator
            });
        }
    };

    Comp.methods = {

        configSave() {
            try {
                console.info("[config] save");
            } catch (ex) {
                console.error("[config] save", ex);
            }
        },

        configLoadConn() {
            try {
                let conn = this.UTIL.local.load("conn", this.conn);
                if (conn) {
                    Object.assign(this.conn, conn);
                }

            } catch (ex) {
                console.error("[config] load", "conn", ex);
            }

            try {
                this.conn.img = this.conn.img || 'relative';
                this.conn.meta = this.conn.meta || 'relative';

                if (this.conn.img === 'custom') {
                    this.ui.prefix.img = this.conn.img_custom;
                } else {
                    const target = this.C.CONN.img[this.conn.img];
                    if (target) {
                        this.conn.img_prefix = target.prefix;
                    }
                    if (!this.conn.img_prefix) {
                        this.conn.img_prefix = '/img/';
                    }
                }

                if (this.conn.meta === 'custom') {
                    this.conn.meta_prefix = this.conn.meta_custom;
                }

            } catch (ex) {
                console.error("[config] load", "conn", "img", ex);
            }
        },

        configLoadLocator() {
            try {
                let loc = this.UTIL.local.load("locator", this.locator);
                if (loc && !this.C.LOCATIONS.get(loc)) {
                    loc = null;
                }
                if (!loc) {
                    loc = this.locator
                }
                Object.assign(this.locator, loc);
            } catch (ex) {
                console.error("[config] load", "locator", ex);
            }
        },

        configLoad() {
            this.configLoadConn();
            this.configLoadLocator();
        },

        locating() {
            const params = this.$route.params;
            if (!params) {
                return;
            }
            const locid = params.locid;
            if (!locid) {
                return;
            }
            const next = this.C.LOCATIONS.parse(locid.toUpperCase(), '_', 1);
            if (!next) {
                return;
            }
            if (this.C.LOCATIONS.get(next)) {
                next.sub = this.locator.sub;
                this.$store.commit('locator', next);
                return next;
            }
        },

        stylize() {
            const navigator = document.getElementById('navigator');
            const rect = navigator.getBoundingClientRect();
            this.ui.style.main = 'margin-top: ' + (rect.height + 2) + 'px; ';
        },

        ctrlize() {
            const autoshow = this.UTIL.local.load('ctrl/autoshow', '').toLowerCase();
            if (autoshow && autoshow !== 'false' && autoshow !== '0') {
                this.mode.ctrl = true;
                const cfg = this.UTIL.local.load('ctrl', this.ctrl.config);
                if (cfg) {
                    this.ctrl.config = cfg;
                }
            }
        },

        async mounting() {
            this.configLoad();
            this.ctrlize();
            this.locating();
            this.stylize();
            this.hub.go('tree.rebranch', {
                locator: this.locator
            });
            this.ui.ready = true;
        }
    };

    Comp.mounted = function() {
        this.mounting();
    };

    return Comp;
}


export default init;
