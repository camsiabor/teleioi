


const TEMPLATE =
    `
<div class="row">
    <div class="col-12">
        <p>{{message}}</p>
    </div>
</div>
<div class="row">
    <div class="col-12">
        <div class="input-group-prepend">
            <button type="button" class="btn btn-sm btn-outline-info" @click="configSave();">
                Config Save
            </button>
            <button type="button" class="btn btn-sm btn-outline-info" @click="config.wechat.api.args = prettize(config.wechat.api.args)">
                Prettize
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" @click="test();">
                Test
            </button>
        </div>
    </div>
</div>

<div class="row d-flex flex-wrap">
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">endpoint</span>
            </div>
            <input type="text" class="form-control" v-model="config.wechat.endpoint"
                   placeholder="endpoint" />
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">api.method</span>
            </div>
            <input type="text" class="form-control" v-model="config.wechat.api.method"
                   placeholder="api.method" />
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <textarea type="text"
                      class="form-control"
                      style="font-size: 0.65em;"
                      rows="12"
                      v-model="config.wechat.api.args"
                      placeholder="api.args" ></textarea>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12">
        <comp-logi :limit="22" ref="logi"></comp-logi>
    </div>
</div>
`;



async function init(OPTS) {

    const Loader = OPTS.loader;
    const UTIL = await Loader.import('/js/util.js', OPTS);
    const Logi = await Loader.import('/js/vue/comp/logi.js', OPTS);


    const Comp = {};
    Comp.name = 'script';
    Comp.template = TEMPLATE;
    Comp.components = {
        'comp-logi': Logi,
    };

    Comp.data = function() {
        return {
            message: '',
            config: {
                locator: '',
                wechat: {
                    endpoint: '',
                    api : {
                        method: 'getIp',
                        args: '[]'
                    }
                }
            }
        }
    };

    Comp.computed = {
        logi() {
            return this.$refs.logi;
        }
    };

    Comp.watch = {
        'config.wechat.api.method': function(n) {
            this.configLoadArgs(n);
        }
    };

    Comp.methods = {
        async request() {
            const cfg = this.config.wechat;
            try {
                const url = cfg.endpoint + '/' + cfg.api.method;
                let args = cfg.api.args.trim();
                UTIL.local.save('api.' + cfg.api.method, args);
                if (args && args.length > 0) {
                    args = JSON.parse(args);
                }
                const resp = await axios({
                    url,
                    data: {
                        args,
                    },
                    method: 'post',
                });
                const data = resp.data.data ? resp.data.data : resp.data;
                this.logi.info('request', data, resp.data);
            } catch (ex) {
                this.logi.error('request', ex);
            }
        },

        configLoadArgs(n) {
            if (!n) {
                return;
            }
            n = n.trim();
            if (!n) {
                return;
            }
            if (n.length <= 3) {
                if (n !== '_') {
                    return;
                }
            }
            let args = UTIL.local.load('api.' + n, '', true);
            if (!args) {
                args = '';
            }
            this.config.wechat.api.args = this.prettize(args);
        },

        prettize(n) {
            try {
                if (n && n.length >= 2) {
                    const json = JSON.parse(n);
                    if (json) {
                        return JSON.stringify(json, 0, 2);
                    }
                }
                return n;
            } catch (ex) {
                return n;
            }
        },


        configSave() {
            UTIL.local.save('config.wechat', this.config);
            this.logi.info('Config', 'Save', this.config);
        },

        configLoad() {
            this.config = UTIL.local.load('config.wechat', this.config);
            this.config.wechat.api.args = JSON.stringify(this.config.wechat.api.args, 0, 2);
            this.configLoadArgs(this.config.wechat.api.method);
            this.logi.info('Config', 'Load', this.config);
        },

        test() {
            this.request();
        },
    };

    Comp.mounted = function() {
        this.configLoad();
    };

    return Comp;
}


export default init;
