const TEMPLATE =
`
<div class="row g-1 d-flex flex-wrap">
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Mirror.endpoint</span>
            </div>
            <input type="text" class="form-control" v-model="config.mirror.endpoint"
                   placeholder="endpoint">
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="config.mirror.path.base"
                   placeholder="path.base">
            <input type="text" class="form-control" v-model="config.mirror.path.img"
                   placeholder="path.img">
            <input type="text" class="form-control" v-model="config.mirror.path.meta"
                   placeholder="path.meta">
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">ES.endpoint</span>
            </div>
            <input type="text" class="form-control" v-model="config.elastic.endpoint"
                   placeholder="endpoint">
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">ES.index</span>
            </div>
            <input type="text" class="form-control" v-model="config.elastic.index"
                   placeholder="index">
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Elastic.Auth</span>
            </div>
            <input type="text" class="form-control" v-model="config.elastic.username"
                   placeholder="username">
            <input type="text" class="form-control" v-model="config.elastic.password"
                   placeholder="password">
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Mode</span>
            </div>
            <input type="text" class="form-control" v-model="config.mode"
                   placeholder="secret mode">
            <input type="text" class="form-control" v-model="config.autoshow"
                   placeholder="autoshow">                        
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Branch</span>
            </div>
            <input type="text" class="form-control" v-model="config.github.branch"
                   placeholder="branch">                                                
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Token</span>
            </div>
            <input type="text" class="form-control" v-model="config.github.token"
                   placeholder="token">
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Proxy</span>
            </div>
            <input type="text" class="form-control" v-model="config.proxy"
                   placeholder="proxy">
        </div>
    </div>
    <div class="col-12">
        <div class="input-group mb-3">
            <button type="button" class="btn btn-sm btn-outline-secondary"
                @click="window.localStorage.setItem('MACRO', '')">
                canvasize
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary"
                @click="window.localStorage.setItem('MACRO', 'no-canvasize')">
                uncanvasize
            </button>
        </div>
    </div>
</div>            
`;

async function init() {

    // const Loader = opts.loader;

    const Comp = {};
    Comp.name = 'ctrl-conifg';
    Comp.template = TEMPLATE;

    Comp.props = {

    };

    const { mapState } = window['Vuex'];
    Comp.computed = {
        ...mapState([
            'ctrl', 'hub', 'ui',
        ]),
        ...mapState({
            config: function(state) {
                return state.ctrl.config;
            }
        }),
    };

    return Comp;
}

export default init;