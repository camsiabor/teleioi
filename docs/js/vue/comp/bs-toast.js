


const TEMPLATE =
`
<div role="alert"
     class="toast position-fixed bottom-0 end-0" :classex="classex" 
     style="z-index: 65535" :stylex="stylex">    
    <slot name="header">
        <div class="toast-header" v-if="title || subtitle || thumbnail">
            <img v-if="thumbnail" :src="thumbnail" class="rounded me-2" alt="...">
            <strong v-if="title" class="me-auto">{{title}}</strong>
            <small v-if="subtitle">{{subtitle}}</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
    </slot>                    
    <slot>
        <div class="d-flex">
           <div class="toast-body">
                {{body}}
           </div>           
           <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>   
        <div v-if="literal">
            <pre>{{literal}}</pre>
        </div>         
    </slot>
    
</div>
`;

function install(app, pluginOpts) {

    const { UTIL, VUTIL } = app.config.globalProperties;

    app.config.globalProperties.$toast = function(toastOpts) {
        toastOpts = toastOpts || {};
        toastOpts.ctx = this;
        toastOpts.comp = define(UTIL);
        const vm = VUTIL.createVM(toastOpts);
        if (!toastOpts.hide) {
            vm.inst.show();
        }
        if (!toastOpts.keep) {
            const delay = toastOpts && toastOpts.props && toastOpts.props.delay ? toastOpts.props.delay + 3000 : 8000;
            setTimeout(vm.app.unmount, delay);
        }
        return vm;
    };

}

let Comp = null;
function define(UTIL) {
    if (Comp) {
        return Comp;
    }
    Comp = {};
    Comp.template = TEMPLATE;
    Comp.props = {

        title: String,
        subtitle: String,
        thumbnail: String,

        body: String,
        literal: String | Object,

        delay: {
            type: Number,
            default: 5000,
        },
        autohide: {
            type: Boolean,
            default: true,
        },
        animation: {
            type: Boolean,
            default: true,
        },

        stylex: String,
        classex: String,
    };
    Comp.data = function() {
        return {
            inst: null,
        };
    };

    Comp.computed = {
        me: function() {
            if (this.inst) {
                return this.inst;
            }
            this.inst = new bootstrap.Toast(this.$el, {
                delay: this.delay,
                autohide: this.autohide,
                animation: this.animation,
            });
            return this.inst;
        },
    };

    Comp.methods = {
        show() {
            this.me.show();
        },
        hide() {
            this.me.hide();
        }
    }
    return Comp;
}

async function init() {
    return {
        install,
    };
}

export default init;