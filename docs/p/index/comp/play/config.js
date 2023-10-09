
const TEMPLATE =
`
<div class="row g-1 d-flex flex-wrap">
    <div class="col-12">        
        <toggle-list
            _title="数据连接"
            _field-label="cn"                
            :_dataset="C.CONN.meta"                                                                                                                                                                          
            :_multiple="false"                                                               
            :_limit-weight="0"
            v-model:concater="conn.meta"                                                                                                                                                 
        />        
    </div>
    
    <div class="col-12" v-if="conn.meta === 'custom'">        
        <input type="text" 
               class="form-control form-control-sm" 
               v-model="conn.meta_custom" />
    </div>
    
    <div class="col-12">
        <toggle-list
            _title="图片加载"
            _field-label="cn"                
            :_dataset="C.CONN.img"                                                                                                                                                                          
            :_multiple="false"                                                               
            :_limit-weight="0"
            v-model:concater="conn.img"                                                                                                                                                 
        />
    </div>
    
    <div class="col-12" v-if="conn.img === 'custom'">
        <input type="text" 
               class="form-control form-control-sm" 
               v-model="conn.img_custom" />
    </div>
    
    <div class="col-12">
        <div class="input-group input-group-sm mb-3">
            
            <button type="button"
                    class="btn btn-sm btn-outline-primary"
                    @click="reset()">
                <i class="bi bi-wrench"></i>                
                默认设置        
            </button>
                <button type="button"
                    class="btn btn-sm btn-outline-primary"
                    @click="window.location.reload()">
                <i class="bi bi-arrow-clockwise"></i>                
                重新加载        
            </button>            
        </div>
    </div>
    
    
    
</div>
`;




async function init(opts) {

    const Loader = opts.loader;

    const COMPONENTS = await Loader.imports(opts, {
        'toggle-list': '/js/vue/comp/toggle-list.js',
    });

    const Comp = {

    };

    Comp.name = 'play-config';
    Comp.template = TEMPLATE;
    Comp.components = COMPONENTS;

    const { mapState } = window['Vuex'];
    Comp.computed = {
        ...mapState([
            'C', 'UTIL',
            'ui', 'conn'
        ])
    };

    Comp.watch = {

        'conn': {
            deep: true,
            handler(n) {
                if (!n) {
                    return;
                }
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    console.log("[config] update", "conn", n);
                    this.UTIL.local.save('conn', n);
                }, 200);
            },
        },

        'conn.img' : function(n){

            if (!n) {
                this.ui.img.prefix = '/img/';
                return;
            }
            if (n === 'custom') {
                this.ui.prefix.img = this.conn.img_custom;
                return;
            }
            const target = this.C.CONN.img[n];
            if (target) {
                this.ui.prefix.img = target.prefix;
            }
            if (!this.ui.prefix.img) {
                this.ui.prefix.img = '/img/';
            }


        },

        'conn.meta': function(n) {
            if (!n) {
                return;
            }

            if (n === 'custom') {
                this.ui.prefix.meta = this.conn.meta_custom;
            }

        }
    };

    Comp.methods = {
        reset() {
            Object.assign(this.conn, {
                img: 'relative',
                meta: 'relative',
            });
        }
    }





    return Comp;
}

export default init;