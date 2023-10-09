const TEMPLATE =
`
<div>

<bs-offcanvas ref="mform"
              class="offcanvas-end"
              :header="true" :bottom="false"
              style="min-width: 50%; border-left: 1px dotted grey; background: rgba(238,238,238,0.97); "
    >
    <template v-slot:default="oform">
        <ctrl-form ref="form"></ctrl-form>
    </template>            
</bs-offcanvas>

<bs-offcanvas ref="muploader"
              class="offcanvas-bottom"
              :header="false" :bottom="false"
              style="min-height: 80%; border-top: 1px dotted grey; background: rgba(238,238,238,0.97);"
    >
    <template v-slot:default="ouploader">
        <bs-uploader 
            ref="uploader"
            :_uploader="(arg) => hub.go('ctrl.upload', arg) "
            >        
        </bs-uploader>
    </template>            
</bs-offcanvas>

<div class="position-fixed top-0 start-0" style="z-index: 65535; ">
    <div class="btn-group btn-group-sm d-flex flex-wrap" role="group"
         style="background: white; opacity: 0.9; "
        >
        <button type="button" class="btn btn-sm btn-outline-danger"                
                @click="configToggle()">
            <i class="bi bi-gear"></i>
        </button>   
        <button type="button" class="btn btn-sm btn-outline-danger" v-on:click="$refs.muploader.toggle()">
            <i class="bi bi-upload"></i>
        </button>
        
        <bs-dropdown
            :auto-close="true"            
            title-icon="bi-file-ppt"
            title-class="btn-sm btn-outline-danger"            
            :dataset="[                 
                'filter', 
                { 
                    title: 'sort',
                    icon: 'bi-sort-down', 
                    click: () => hub.go('filter.sort'), 
                },
                'page', 
                { 
                    title: 'reload', 
                    icon: 'bi-arrow-clockwise', 
                    click: () => window.location.reload(), 
                },                                 
            ]"
        >            
        </bs-dropdown>
        
        <bs-dropdown
            title-icon="bi-cloud"
            title-class="btn-sm btn-outline-danger"
            :dataset="[
                'stack',
                { 
                    title: 'sync.stack',
                    icon: 'bi-cloud-upload', 
                    style: 'color: red',                    
                    click: () => stackSync(), 
                },               
                'es', 
                { 
                    title: 'sync.es',
                    icon: 'bi-cloud-upload', 
                    style: 'color: black',                    
                    click: () => esSync(), 
                },
                'mirror',
                { 
                    title: 'sync.mirror',
                    icon: 'bi-cloud-upload', 
                    style: 'color: skyblue',                    
                    click: () => mirrorSync(), 
                },
                'link',                 
                { 
                    title: 'sync.link',                     
                    icon: 'bi-cloud-upload',
                    style: 'color: orange',
                    click: () => linkSync(), 
                },
                'meta', 
                { 
                    title: 'virtual',
                    icon: 'bi-file-plus', 
                    click: () => metaVirtual(), 
                },
                { 
                    title: 'append',
                    icon: 'bi-file-plus-fill', 
                    click: () => hub.go('ctrl.meta.append'), 
                },
                { 
                    title: 'sync.meta',
                    icon: 'bi-cloud-upload',
                    style: 'color: orange', 
                    click: () => metaSync(), 
                },                 
            ]"
        >
        </bs-dropdown>
                                                                       
        <button v-if="msg"                
                @click="msg = ''" style="font-size: 0.75em; "
                type="button" class="btn btn-sm btn-outline-danger">
            {{msg}}
        </button>     
    </div>        
</div>

<bs-modal ref="config"
          :saver="configSave" 
          :save-and-close="true">    
    <template v-slot:default="oconfig">
        <ctrl-config></ctrl-config>      
    </template>              
</bs-modal>

</div>
`;


const init = async function (opts) {

    const Loader = opts.loader;

    const COMPONENTS = await Loader.imports(opts, {
        'ctrl-form': '/p/index/comp/ctrl/form.js',
        'ctrl-config': '/p/index/comp/ctrl/config.js',
        'bs-modal': '/js/vue/comp/bs-modal.js',
        'bs-dropdown': '/js/vue/comp/bs-dropdown.js',
        'bs-uploader': '/js/vue/comp/bs-uploader.js',
        'bs-offcanvas': '/js/vue/comp/bs-offcanvas.js',
    });

    const MODS = await Loader.imports(opts, {
        'store-ctrl': '/p/index/store/ctrl.js',
    });

    const Comp = {};
    Comp.name = 'ctrl-main';
    Comp.template = TEMPLATE;

    Comp.components = COMPONENTS;

    Comp.props = {
        store: Object,
    };

    Comp.data = function () {
        return {
            msg: '',
            virtual: {
                node: null
            },
            cid: this.UTIL.uuid['gen'](),
        };
    };

    const {mapState, mapGetters} = window['Vuex'];
    Comp.computed = {
        ...mapState([
            'C', 'UTIL',
            'ctrl', 'tree', 'locator', 'hub'
        ]),
        ...mapState({
            config: function (state) {
                if (state.ctrl) {
                    return state.ctrl.config;
                }
                return null;
            },
        }),
        ...mapGetters('ctrl', [
            'github', 'elastic'
        ]),

        secret() {
            return this.config.secrets[this.config.mode];
        },
    };


    /* ========================= methods ====================== */


    Comp.methods = {

        info(msg, data) {
            const time = this.UTIL.time.formatTime(new Date());
            this.msg = time + ' | ' + msg;
            this['$toast']({props: {body: time + ' | ' + msg}});
            console.log('[ctrl.main]', msg, data || '');
        },

        error(msg, ex) {
            const time = this.UTIL.time.formatTime(new Date());
            this.msg = time + ' | ' + msg;
            this['$toast']({props: {body: time + ' | ' + msg, literal: ex}});
            console.error('[ctrl.main]', msg, ex);
        },

        git(force) {
            return this.github({
                force,
                token: this.config.github.token,
            });
        },

        async gitrepo(repo, force) {
            const git = await this.git(force)
            return git['getRepo'](this.C.SELF.github.name, repo);
        },

        es(force) {
            return this.elastic({
                force,
                endpoint: this.config.elastic.endpoint,
                auth: {
                    username: this.config.elastic.username,
                    password: this.config.elastic.password,
                }
            });
        },

        configLoad: function () {
            const def = MODS['store-ctrl'].CONFIG_DEF;
            const config = this.UTIL.local.load('ctrl', def);
            if (config) {
                this.ctrl.config = config;
            }
        },

        configSave: async function () {
            this.UTIL.local.save('ctrl', this.config);
            this.UTIL.local.save('ctrl/autoshow', this.config.autoshow);
            await this.es(true);
            await this.git(true);
            this.info('Config Save');
        },


        contentLoad: async function ({repo, path, ref = 'master', raw = true, decode = true}) {
            const R = await this.gitrepo(repo);
            const promise = R['getContents'](ref, path, raw);
            const resp = await this.UTIL.axios.wrap(promise);
            if (!resp) {
                return null;
            }
            if (resp.content && decode) {
                resp.content = this.UTIL.encode.atou(resp.content);
            }
            return resp;
        },

        contentSave: async function ({repo, path, content, branch = 'master', message = 'update', encode = true}) {
            const R = await this.gitrepo(repo);
            const promise = R['writeFile'](branch, path, content, message, {encode});
            const resp = await this.UTIL.axios.wrap(promise);
            console.log('github', 'contents', 'save', resp);
            return resp;
        },

        esSync: async function (params) {
            try {
                this.info('ES sync start');
                const es = await this.es();
                const meta = this.tree.current.meta.data;
                let index = params ? params.index : '';
                if (!index) {
                    index = this.C.LOCATIONS.id(this.locator, '_', -1);
                }
                const resp = await es.bulk(index, meta);
                this.info('ES sync success')
                return resp;
            } catch (ex) {
                this.error('ES sync failure', ex);
            }
        },


        mirrorRequest: async function(reqopts, stderr) {
            let resp = await axios(reqopts);
            console.info('[mirror]', resp);
            if (resp.code) {
                throw new Error(resp.error);
            }
            if (stderr && resp.data && resp.data.data && resp.data.data.stderr) {
                throw new Error(resp.data.stderr);
            }
            return resp.data.data;
        },

        mirrorSync: async function() {
            let data;
            const mirror = this.config.mirror;
            const host = mirror.endpoint || 'https://szplay.net';
            try {
                this.info('Mirror sync img');
                data = await this.mirrorRequest({
                    method: 'GET',
                    url: host + '/api/git/sync?dir=' + mirror.path.img
                });
                console.log(data.stdout, data.stderr);
                this.info('Mirror sync meta');
                data = await this.mirrorRequest({
                    method: 'GET',
                    url: host + '/api/git/sync?dir=' + mirror.path.meta,
                });
                console.log(data.stdout, data.stderr);
                this.info('Mirror sync main');
                data = await this.mirrorRequest({
                    method: 'GET',
                    url: host + '/api/git/sync?dir=' + mirror.path.base,
                });
                console.log(data.stdout, data.stderr);
                this.info('Mirror sync success');
            } catch (ex) {
                this.error('Mirror sync failure', ex);
            }
        },

        metaVirtual: function () {
            this.virtual.node = {
                link: {
                    name: '',
                    abs: '',
                    subs: [],
                    feeds: [],
                },
            };
            this.hub.go('ctrl.form', this.virtual.node);
        },

        metaAppend: function (req) {

            let v = req.payload;
            if (!v) {
                v = this.virtual.node;
            }
            const id = v.id;

            req.defer(() => {
                const tag = req.response.error ? 'Failure' : 'Success';
                const msg = 'Append ' + id + ' ' + tag;
                this.info(msg);
            });
            const attrs = this.tree.current.meta.attr.data;
            if (attrs[id]) {
                throw new Error("EXIST ALREADY " + id);
            }
            const infer = this.$store.getters['tree/meta.infer.id'](id);
            Object.assign(v, infer);
            attrs[id] = v;
        },

        linkSync: async function () {

            const mode = this.config.mode || '';

            if (mode.indexOf('fast') < 0) {
                if (!confirm('Link Sync?')) {
                    return;
                }
            }

            try {
                this.info('Link sync start');
                const store = this['$store'];
                const tree = await store.dispatch('tree/link.fetch.data', {
                    cache: false,
                    conn: 'github.api',
                });

                tree.data.stamp = new Date().getTime() + '';

                const array = tree.data.tree;
                for(let i = 0; i < array.length; i++) {
                    const one = array[i];
                    delete one.sha;
                    delete one.url;
                    delete one.size;
                }

                const json = JSON.stringify(tree.data);
                const resp = await this.contentSave( {
                    repo: 'meta',
                    path: 'tree/tree.json',
                    branch: 'master',
                    content: json,
                });
                this.info('Link sync success', resp);
            } catch (ex) {
                this.error('Link sync failure', ex);
            }

        },

        metaSync: async function () {

            const mode = this.config.mode || '';

            if (mode.indexOf('fast') < 0) {
                if (!confirm('Sync Meta?')) {
                    return;
                }
            }

            if (mode.indexOf('noes') < 0) {
                const id = this.C.LOCATIONS.id(this.locator, '_', -1);
                const esresp = await this.esSync(id);
                if (!esresp) {
                    return;
                }
            }

            const meta = this.tree.current.meta;
            for(let type in meta) {
                const one = meta[type];
                if (!one || !one.data) {
                    continue;
                }
                const data = one.data;
                const json = JSON.stringify(data);
                const loca = this.C.LOCATIONS.path(this.locator, '/', -1);
                const path = this.UTIL.path.concat(loca, one.src);
                try {
                    this.info('META ' + type + ' sync start');
                    const resp = await this.contentSave({
                        path,
                        repo: 'meta',
                        encode: true,
                        content: json,
                        branch: this.config.github.branch,
                    });
                    this.info('META sync ' + type + ' success', resp);
                } catch (ex) {
                    this.error('META sync ' + type + ' failure', ex);
                    break;
                }
            }



        },

        stackSync: async function() {
            await this.linkSync();
            await this.metaSync();
            await this.mirrorSync();
        },

        configToggle() {
            this.$refs.config.toggle();
        },


        async form(req) {
            const v = req.payload;
            const offcanvas = this.$refs.mform;
            const curr = this.$refs.form.v;
            if (curr && v.code === curr.code) {
                offcanvas.toggle();
                return;
            }

            if (!v.attr) {
                const meta = this.$store['getters']['tree/meta.virtual'](this.locator);
                const attr = meta.attr;
                if (v.code) {
                    attr.id = attr.locator + v.code.substring(2);
                    attr.code = v.code;
                    // await this.hub.wait('ctrl.meta.append', attr);
                }
                v.attrex = {};
                Object.assign(v, meta);
                const attrs = this.tree.current.meta.attr.data;
                if (!attrs[v.id]) {
                    attrs[v.id] = attr;
                }
            }
            this.$refs.form.v = v;
            offcanvas.show();
        },

        upload(req) {

            req.defer(() => {
                const tag = req.response.error ? 'Failure' : 'Success';
                const msg = '上传 ' + req.payload.name + ' ' + tag;
                this.info(msg);
            });

            const file = req.payload;
            const ext = file.ext().toLowerCase();
            const name = file.pre().toUpperCase().replaceAll('FEED', 'feed');
            const code = name.substring(2);
            const part = 'part_g_' + code.substring(0, 2) + '00';
            const base = this.C.LOCATIONS.path(this.locator, '/', -1, true);
            const path = this.UTIL.path.concat(base, part, name + '.' + ext);

            let data = file.dataurl;
            const icomma = data.indexOf(',');
            if (icomma >= 0) {
                data = data.substr(icomma + 1);
            }

            // data = Base64.atob(data);
            return this.contentSave({
                user: this.C.SELF.github.name,
                repo: 'img',
                path: path,
                branch: 'master',
                content: data,
                encode: false,
            });
        },

        async eliminate(req) {
            req.defer(() => {
                const {v} = req.payload;
                const tag = req.response.error ? 'Failure' : 'Success';
                const msg = 'Delete ' + v.name + ' ' + tag;
                this.info(msg);
            });
            const {v} = req.payload;
            const R = await this.gitrepo('img');
            const promise = R['deleteFile']('master', v.path);
            return this.UTIL.axios.wrap(promise);
        },

    };

    Comp.mounted = function () {

        console.log('[CTRL] activated', this.config);

        this.configLoad();
        this.es(true);
        this.git(true);

        this.hub.registers(this.cid, this, {
            'ctrl.form': this.form,
            'ctrl.config': this.configToggle,
            'ctrl.config.save': this.configSave,
            'ctrl.upload': this.upload,
            'ctrl.delete': this.eliminate,
            'ctrl.meta.append': this.metaAppend,

        });

    };

    Comp.unmounted = function () {
        this.hub.unregister(this.cid);
    };

    return Comp;

};

export default init;

