const template=
`
<div 
    :id="cid"
    tabindex="-1"
    class="offcanvas" 
    :class="classx"
    :style="stylex"            
    :data-bs-backdrop="backdrop"
    :data-bs-keyboard="keyboard"
    :data-bs-scroll="scroll"
    >
    <div class="offcanvas-header" v-if="header">
        <slot name="header" :container="self">
            <h5 id="offcanvasTopLabel" v-if="title">{{title}}</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </slot>
    </div>
    <div class="offcanvas-body">
        <slot :container="self"></slot>
    </div>  
    <div class="offcanvas-bottom" v-if="bottom">
        <slot name="bottom" :container="self"></slot>
    </div>  
</div>
`;


async function init() {


    const Comp = {};
    Comp.name = 'bs-offcanvas';
    Comp.template = template;

    Comp.emits = [
        'update:toggled'
    ];

    Comp.props = {
        uid: String,
        title: String,
        classx: String,
        stylex: String,
        toggled: {
            type: Boolean,
            default: false,
        },
        callback: Function | Array,
        header: Boolean,
        bottom: Boolean,
        backdrop: {
            type: Boolean,
            default: false,
        },
        keyboard: {
            type: Boolean,
            default: true,
        },
        scroll: {
            type: Boolean,
            default: true,
        },
    };

    Comp.data = function() {
        let cid = this.uid;
        if (!cid) {
            this.cid = 'bs_offcanvas_' + this.UTIL.uuid.gen();
        }
        return {
            self: this,
            cid,
        }
    };

    Comp.computed = {
        me() {
            if (this.inst) {
                return this.inst;
            }
            this.inst = new bootstrap.Offcanvas(this.$el, {
                backdrop: this.backdrop,
                keyboard: this.keyboard,
                scroll: this.scroll,
            });
            return this.inst;
        },
    };

    Comp.watch = {
        'toggled': function(n) {
            if (n) {
                this.show();
            } else {
                this.hide();
            }
        }
    }


    Comp.methods = {

        doback() {
            if (this.callback) {
                UTIL.func.invoke(this.callback, this.toggled.value);
            }
        },

        show(arg) {
            this.me.show(arg);
            this.doback();
        },

        hide() {
            this.me.hide();
            this.doback();
        },

        toggle() {
            this.me.toggle();
            this.doback();
        }

    };

    Comp.mounted = function() {

        const el = this.$el;
        el.addEventListener('show.bs.offcanvas', () => {
            this.$emit('update:toggled', true);
        });
        el.addEventListener('hide.bs.offcanvas', () => {
            this.$emit('update:toggled', false);
        });

        if (this.toggled.value) {
            this.show();
        }
    };

    return Comp;
}


export default init;