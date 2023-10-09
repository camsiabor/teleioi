
const TEMPLATE =
`
<component 
        ref="grid"
        :is=" ui.layout.compact ? 'grid-masonry' : 'grid-hori' "                
        :min="ui.layout.min"
        datakey="code" 
        :dataset="tree.current.view"         
         >
    <template v-slot:default="o" >
      <tele-card                         
        :node="o.item"   
        :ref="o.item.id || o.item.code"          
        :imgloaded="imgloaded"                                    
        style="margin: 2px; width: 100%; " >            
      </tele-card>
    </template>
</component>
`;



const init = async function (OPTS) {

    const Loader = OPTS.loader;

    const COMPONENTS = await Loader.imports(OPTS, {
        'tele-card': '/p/index/comp/play/card.js',
        'grid-hori': '/js/vue/layout/grid-hori.js',
    });

    const Comp = {};

    Comp.name = 'tele-tree';
    Comp.template = TEMPLATE;
    Comp.components = {
        ...COMPONENTS,
        'grid-masonry': Vue.defineAsyncComponent(() => {
            const params = {};
            Object.assign(params, OPTS);
            params.key = 'grid-masonry';
            return Loader.import('/js/vue/layout/grid-masonry.js', params);
        })
    };

    Comp.data = function () {
        return {
            linked: false,
            cid: this.UTIL.uuid['gen'](),
        };
    };

    const { mapState } = window['Vuex'];
    Comp.computed = {
        ...mapState([
            'C', 'UTIL',
            'tree', 'meta', 'locator', 'filter',
            'conn', 'hub', 'ui',
        ]),
    };

    Comp.watch = {

    };

    Comp.methods = {

        async rebranch({ locator }) {

            locator = Object.assign({}, locator || this.locator);

            const conn = this.conn.meta;
            const store = this['$store'];
            await store.dispatch('tree/branch.jump', locator);

            $progress(75, 'link...');
            if (this.linked) {
                await store.dispatch('tree/branch.attach', { type: 'link', locator });
            } else {
                await this.fetchLink({
                    conn,
                    locator,
                    double: true,
                });
                $progress(85, 'meta...');
            }


            $progress(90, 'meta...');
            await this.fetchMeta({
                conn,
                locator,
                double: true,
                type: 'meta/attr',
            });

            $progress(100, 'filter...');
            UTIL.local.save('locator', locator);

            this.hub.go('filter.go');
        },

        async fetchLink({ conn, locator, double }) {
            try {
                this.ui.loading = true;
                if (!conn) {
                    conn = this.conn.meta;
                }
                const store = this['$store'];
                const resp = await store.dispatch('tree/link.fetch', {
                    conn, locator,
                    cache: true, sha: !double,
                });
                this.ui.loading = false;
                if (double && resp.cache) {
                    this.fetchLink({
                        conn,
                        locator,
                        double: false,
                    }).then((resp2nd) => {
                        if (!resp2nd.matched) {
                            this.hub.go('filter.go', { delay: 500 });
                        }
                    });
                }
                this.linked = true;
                return resp;
            } catch (ex) {
                this.ui.message = '[E0001] 网络连接失败, 离线运行, 清尝试更改连接设置，再重新加载页面';
                console.error("tree/link.fetch", ex);
            }
        },

        async fetchMeta({ conn, locator, type, double }) {
            const store = this['$store'];
            try {
                this.ui.loading = true;
                const resp = await store.dispatch('tree/meta.fetch', {
                    conn, locator, type,
                    cache: double,
                });
                this.ui.loading = false;
                if (double && resp.cache) {
                    this.fetchMeta({
                        conn, type, locator,
                        double: false,
                    }).then((resp2nd) => {
                        if (!resp2nd.matched) {
                            this.hub.go('filter.go', { delay: 500 });
                        }
                    });
                }
                return resp;
            } catch (ex) {
                this.ui.message = '[E0002] 网络连接失败, 离线运行, 清尝试更改连接设置，再重新加载页面';
                console.error("rebranch", ex);
            } finally {
                this.$forceUpdate();
            }
        },

        iterate(callback) {
            callback = callback.bind(this);
            let children = this.tree.current.view;
            for (let i = 0; i < children.length; i++) {
                let item = children[i];
                let include = this.filtering(item);
                callback(item, include);
            }
        },


        imgloaded() {
            const grid = this.$refs.grid;
            if (grid && grid.masonlay) {
                grid.masonlay(125);
            }
        },

        cfg() {
            try {
                this.ui.layout = this.UTIL.local.load('ui.layout', this.ui.layout);
            } catch (ex) {
                console.log('[config] ui.layout', ex);
            }


            this.diswatch = [];
            let dis = this.$watch(
                () => {
                    return { ...this.ui.layout };
                },
                () => {
                    this.UTIL.local.save('ui.layout', this.ui.layout);
                }
            );
            this.diswatch.push(dis);
        }

    };

    Comp.mounted = function () {

        this.cfg();

        this.hub.registers(this.cid, this, {
            'tree.rebranch': (req) => {
                return this.rebranch(req.payload);
            },
            'tree.masonlay': () => {
                const grid = this.$refs.grid;
                if (grid && grid.masonlay) {
                    grid.masonlay();
                }
            },
        });

    };

    Comp.unmount = function() {
        this.hub.unregister(this.cid);
        if (this.diswatch) {
            this.UTIL.func.invoke(this.diswatch);
        }
    };


    return Comp;

}


export default init;