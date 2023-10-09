const template=
`
<div :id="cid" class="modal"  tabindex="-1">
  <div class="modal-dialog" :class="classx" :style="stylex" >
    <div class="modal-content">
    
      <div class="modal-header"  data-bs-dismiss="modal">
        <slot name="header" :container="self">
            <h5 v-if="title" class="modal-title">{{title}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </slot>
      </div>
      
      <div class="modal-body">
        <slot :container="self"></slot>
      </div>
      
      <div class="modal-footer">
        <slot name="footer" :container="self">
            <button type="button" class="btn btn-sm btn-outline-primary"
                    v-if="saver" :data-bs-dismiss="saveAndClose ? 'modal' : ''" 
                    @click="saver()">
                Save
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger" data-bs-dismiss="modal">
                Close
            </button>
        </slot>        
      </div>      
    </div>
  </div>
</div>
`;


async function init() {

    const Comp = {};

    Comp.name = 'bs-modal';
    Comp.template = template;

    Comp.emits = [
        'update:toggled'
    ];

    Comp.props = {
        uid: String,
        title: String,
        classx: String,
        stylex: String,
        saver: Function,
        saveAndClose: {
            type: Boolean,
            default: true,
        },
        callback: Function | Array,
        toggled: {
            type: Boolean,
            default: false
        },
    };



    Comp.data = function() {
        let cid = this.uid;
        if (!cid) {
            this.cid = 'bs_modal' + this.UTIL.uuid.gen();
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
            this.inst = new bootstrap.Modal(this.$el);
            return this.inst;
        },
    };

    Comp.watch = {
        'toggled' : function(n) {
            if (n) {
                this.show();
            } else {
                this.hide();
            }
        }
    };


    Comp.methods = {

        doback() {
            if (this.callback) {
                UTIL.func.invoke(this.callback, this.toggled);
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
        el.addEventListener('show.bs.modal', () => {
            this.$emit('update:toggled', true);
        });
        el.addEventListener('hide.bs.modal', () => {
            this.$emit('update:toggled', false);
        });

        if (this.toggled) {
            this.show();
        }
    };

    Comp.unmount = function() {

    };


    return Comp;
}


export default init;