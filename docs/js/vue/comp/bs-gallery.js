
// imgbb.com


const LAYOUT_CARD_HORI = 'hori';
const LAYOUT_CARD_SIMPLE = 'simple';
const LAYOUT_CARD_OVERLAY = 'overlay';

const TEMPLATE =
`
<div style="width: 100%; height: 100%">
    <div ref="navcon" v-if="nav"         
        class="position-sticky top-0 start-0 "
        style="font-size: 0.75em; z-index: 10; width: 100%; background: white; opacity: 0.9;">
        <div class="row">
            <div class="col-12">
                <up-nav ref="nav">            
                </up-nav>
            </div>            
        </div>        
    </div>
    <div style="width: 100%; height: 100%; ; overflow: auto; border-radius: 3%;" :style="bodyStyle">        
        <grid-hori 
                ref="grid"                 
                :min="minCardWidth"                
                :dataset="dataset" :datakey="datafield" >
            <template v-slot:default="o" >
                <div class="card" 
                     style="width: 100%; border: 1px dotted rgb(96,96,96); ">
                    <span v-if="closeBtn"
                          @click="remove(o.item)" 
                          class="position-absolute top-0 end-0 gmg-bg-red gmg-btn-x" style="z-index: 1024;">
                          x                                             
                    </span>                                                                                                                                         
                    <component :is="layout" :v="o.item" :o="o" :key="o[datafield]" >
                        <slot :v="o.item" :o="o" layout="layout" :container="self">
                            <img-lazy 
                                class="card-img"
                                style="min-height: 10vh"
                                :style="imgStyle"
                                :prefix="dataprefix" 
                                :datasrc="o.item[datafield]" :alt="o.item.name" />
                        </slot>
                    </component>                                                            
                </div>                        
            </template>
        </grid-hori>        
    </div>
    <div style="min-height: 1vh;">    
    </div>
</div>
`;

const TEMPLATE_NAV =
`
<div class="input-group input-group-sm">
                        
    <button type="button"
            class="btn btn-outline-danger dropdown-toggle dropdown-toggle-split" 
            data-bs-toggle="dropdown" >
        <span class="visually-hidden"></span>
    </button>                    
    <ul class="dropdown-menu">
      <li>
          <a v-for="(lay) in p.layouts"
             href="#"
             class="dropdown-item"
             v-on:click="p.layout = lay"
             v-bind:class="{'active': lay === p.layout }"
          >
              {{ lay }}
          </a>
      </li>
    </ul>
        
    <input type="text" class="form-control" placeholder="prefix" v-model="p.keyword">
    
    <button type="button"
          class="btn btn-sm btn-outline-danger"
          style="font-weight: bold;"
          v-if="p.deleter"
          @click="p.eliminate()"                                    
    >
      删
    </button>    
    <button type="button"
          class="btn btn-sm btn-outline-danger"
          style="font-weight: bold;"
          @click="p.dataset.length = 0"                                    
    >
      清
    </button>            
</div>
`;




const TEMPLATE_CARD_SIMPLE =
`
<slot></slot>
`;


const TEMPLATE_CARD_HORI =
`
<div class="row g-0">                                                                        
    <div class="col-9" >                        
        <div class="row g-0 d-flex flex-wrap">
            <div class="col-12">
                <div class="input-group input-group-sm">                    
                    <input 
                        type="text"              
                        v-model="v[namefield]"               
                        style="font-size: 0.70em;"  
                        class="form-control form-control-sm"
                        >
                </div>
            </div>                                                                                                                
        </div>    
        
    </div>        
    <div class="col-3" >
        <slot></slot>                                                    
    </div>                        
</div>
`;

const TEMPLATE_CARD_OVERLAY =
`
<slot></slot>
<div class="card-img-overlay" 
     style="opacity: 0.75; cursor: pointer" 
     @click="$refs.checkbox.checked = !$refs.checkbox.checked; selected[v[datafield]] = $refs.checkbox.checked; ">
    <div class="row g-1 d-flex flex-wrap">
        <div class="col-12">
            <div class="input-group input-group-sm">
                <div class="input-group-text">
                    <input ref="checkbox" class="form-check-input mt-0" type="checkbox" />
                </div>                
                <input 
                    type="text"              
                    v-model="v[namefield]"                 
                    style="font-size: 0.70em;"
                    class="form-control form-control-sm"
                    >
            </div>   
        </div>            
    </div>         
</div>
`;


async function init(opts) {

    const Loader = opts.loader;

    const COMPONENTS = await Loader.imports(opts, {
        'img-lazy': '/js/vue/comp/imglazy.js',
        'grid-hori': '/js/vue/layout/grid-hori.js',
    })

    const Comp = {};
    Comp.name = 'bs-gallery';
    Comp.template = TEMPLATE;
    Comp.components = COMPONENTS;

    Comp.props = {
        mime: Array,
        accept: {
            type: String,
            default: 'image/*',
        },

        nav: {
            type: Boolean,
            default: false,
        },

        closeBtn: {
            type: Boolean,
            default: false,
        },

        dataset: {
            type: Array,
            default: [],
        },

        datafield: {
            type: String,
            default: 'url',
        },

        dataprefix: {
            type: String,
            default: ''
        },

        namefield: {
            type: String,
            default: 'name',
        },



        renamer: Function | Array,
        deleter: Function | Array,

        deleteRemoveDelay: {
            type: Number,
            default: 10,
        },
        deleteSuccess: Function,
        deleteFailure: Function,

        layout: {
            type: String,
            default: LAYOUT_CARD_OVERLAY,
        },
        layouts: {
            type: Array,
            default: [ LAYOUT_CARD_SIMPLE, LAYOUT_CARD_HORI, LAYOUT_CARD_OVERLAY ],
        },

        keyword: {
            type: String,
            default: '',
        },
        bodyMinHeight: String,
        imgStyle: String | Object,
        minCardWidth: {
            type: Number,
            default: 150,
        },

    };

    Comp.data = function () {
        const d = {
            self: this,
        };
        for(let _k in Comp.props) {
            if (_k.charAt(0) === '_') {
                const k = _k.substring(1);
                d[k] = this[_k];
            }
        }
        d.selected = { };
        d.bodyStyle = {
            border: '',
            marginTop: '1vh',
            minHeight: this.bodyMinHeight || '1vh',
        };
        return d;
    };

    Comp.provide = function () {
        return {
            imgStyle: this.imgStyle,
            selected: this.selected,
            namefield: this.namefield,
            datafield: this.datafield,
            dataprefix: this.dataprefix,

        };
    };

    const LAYOUT_PROPS = {
        v: Object,
        o: Object,
    };

    const LAYOUT_INJECT = [
        'imgStyle',
        'selected',
        'namefield',
        'datafield', 'dataprefix',
    ];

    Comp.components['up-nav'] = {
        name: 'bs-gallery-nav',
        template: TEMPLATE_NAV,
        inject: LAYOUT_INJECT,
        computed: {
            p() {
                return this.$parent;
            },
            dataset() {
                return this.$parent.dataset;
            }
        }
    };

    Comp.components[LAYOUT_CARD_HORI] = {
        name: LAYOUT_CARD_HORI,
        template: TEMPLATE_CARD_HORI,
        components: COMPONENTS,
        inject: LAYOUT_INJECT,
        props: LAYOUT_PROPS,
    };

    Comp.components[LAYOUT_CARD_SIMPLE] = {
        name: LAYOUT_CARD_SIMPLE,
        template: TEMPLATE_CARD_SIMPLE,
        components: COMPONENTS,
        inject: LAYOUT_INJECT,
        props: LAYOUT_PROPS,
    };

    Comp.components[LAYOUT_CARD_OVERLAY] = {
        name: LAYOUT_CARD_OVERLAY,
        template: TEMPLATE_CARD_OVERLAY,
        components: COMPONENTS,
        inject: LAYOUT_INJECT,
        props: LAYOUT_PROPS,
    };

    const { mapState } = window['Vuex'];
    Comp.computed = {
        ...mapState([
            'UTIL'
        ])
    };

    Comp.methods = {

        remove(file) {
            const index = Array.prototype.indexOf.call(this.dataset, file);
            if (index === 0) {
                Array.prototype.shift.call(this.dataset);
            } else {
                Array.prototype.splice.call(this.dataset, index, 1);
            }
            this.$refs.grid.$forceUpdate();
        },

        rename(target) {
            if (!this.renamer) {
                return;
            }
            this.UTIL.func.invoke(this.renamer, {
                src: this,
                target: target,
                dataset: this.dataset,
            });
        },

        eliminate() {
            if (!this.deleter) {
                return;
            }
            const msg = '确定删除 ? [' + Object.keys(this.selected).length + ']';
            if (!confirm(msg)) {
                return;
            }

            const dataset = this.dataset;
            const selected = this.selected;
            const datafield = this.datafield;
            for(let i = 0; i < dataset.length; i++) {
                const v = dataset[i];
                const key = v[datafield];
                const one = { v, key };
                if (selected[key]) {
                    this.UTIL.func.invokeSafe({
                        func: this.deleter,
                        success: this.onDeleteSuccess,
                        failure: this.onDeleteFailure,
                    }, one);
                }
            }
        },

        onDeleteSuccess(resp, one) {
            one.resp = resp;
            one.msg = "成功";
            if (this.deleteRemoveDelay && this.deleteRemoveDelay > 0) {
                setTimeout(() => {
                    this.remove(one.v);
                }, this.deleteRemoveDelay);
            } else {
                this.remove(one.v);
            }
            if (this.deleteSuccess) {
                this.deleteSuccess(ex, one);
            }
        },

        onDeleteFailure(ex, one) {
            console.error('DELETE', one, 'FAILURE', ex);
            one.error = ex;
            one.msg = "失败 " + ex.toString();
            if (this.deleteFailure) {
                this.deleteFailure(ex, one);
            }
        }

    };

    Comp.mounted = function() {
        const navcon = this.$refs.navcon;
        if (navcon) {
            const margin = navcon.getBoundingClientRect().height;
            this.bodyStyle.marginTop = (margin - 1) + 'px';
        }
    }

    return Comp;
}


export default init;