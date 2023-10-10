
// imgbb.com

const LAYOUT_CARD_HORI = 'card-hori';
const LAYOUT_CARD_OVERLAY = 'card-overlay';

const TEMPLATE =
`
<div style="width: 100%; height: 100%">
    <div ref="navcon"         
        class="position-sticky top-0 start-0 "
        style="font-size: 0.75em; z-index: 10; width: 100%; background: white; opacity: 0.9;">
        <div class="row">
            <div class="col-12">
                <up-nav ref="nav">            
                </up-nav>
            </div>            
        </div>        
    </div>
    <div style="width: 100%; height: 100%; ; overflow: scroll; border-radius: 3%;" :style="bodyStyle">        
        <grid-hori 
                ref="grid"                 
                :min="minCardWidth"                
                :dataset="dataset" datakey="name" >
            <template v-slot:default="o" >
                <div class="card" 
                     style="width: 100%; border: 1px dotted rgb(96,96,96); ">
                    <span @click="remove(o.item)"
                          class="position-absolute top-0 end-0 tele-bg-red tele-btn-x">
                          x                                             
                    </span>                                                                                                                                         
                    <component :is="layout" :v="o.item" :o="o" />                                                            
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
          class="btn btn-sm btn-outline-danger"
          style="font-weight: bold;"
          @click="p.upload()"
    >
      传 
      <span class="badge rounded-pill bg-danger">{{p.dataset.length}}</span>
    </button>
                            
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
        
    <input type="text" class="form-control" placeholder="prefix" v-model="p.renamePrefix">
    
    <button type="button"
          class="btn btn-sm btn-outline-danger"
          style="font-weight: bold;"
          @click="p.rename()"                                    
    >
      名 
    </button>
    <button type="button"
          class="btn btn-sm btn-outline-danger"
          style="font-weight: bold;"
          @click="p.dataset.length = 0"                                    
    >
      清
    </button>
    <button type="button"
          class="btn btn-sm btn-outline-danger"
          style="font-weight: bold;"
          @click="p.select()"                                    
    >
      选 
    </button>    
</div>
`;



const TEMPLATE_CARD_HORI =
`
<div class="row g-0">                                                                        
    <div class="col-9" >                        
        <div class="row g-0 d-flex flex-wrap">
            <div class="col-12">
                <div class="input-group input-group-sm">
                    <span class="input-group-text bg-light" style="font-size: 0.75em;">
                        名
                    </span>
                    <input 
                        type="text"              
                        v-model="v.name"               
                        style="font-size: 0.75em;"  
                        class="form-control form-control-sm"
                        >
                </div>
            </div>
            <div class="col-12">
                <div class="input-group input-group-sm">
                    <span class="input-group-text bg-light" style="font-size: 0.75em;">
                        类
                    </span>
                    <input 
                        disabled
                        type="text"              
                        v-model="v.type"               
                        style="font-size: 0.75em;"  
                        class="form-control form-control-sm"
                        >
                    <span class="input-group-text bg-light" style="font-size: 0.75em;">
                        KB
                    </span>
                    <input
                        disabled 
                        type="text"              
                        v-model="v.kb"                                       
                        style="font-size: 0.75em;"  
                        class="form-control form-control-sm"
                        >
                </div>
            </div>      
            <div class="col-12">                
                <span style="color: grey; font-size: 0.75em; " :style="{ color: v.error ? 'red' : 'grey' }">
                    {{v.msg}}
                </span>
            </div>                                                                                              
            
        </div>    
        
    </div>        
    <div class="col-3" >
        <img class="card-img" :src="v.dataurl" :alt="v.name" />                                            
    </div>                        
</div>
`;

const TEMPLATE_CARD_OVERLAY =
`
<img class="card-img" :src="v.dataurl" :alt="v.name" />
<div class="card-img-overlay" style="opacity: 0.9">
    <div class="row g-1 d-flex flex-wrap">
        <div class="col-12">
            <div class="input-group input-group-sm">
                <span class="input-group-text bg-light" style="font-size: 0.75em;">
                    名
                </span>
                <input 
                    type="text"              
                    v-model="v.name"                 
                    style="font-size: 0.75em;"
                    class="form-control form-control-sm"
                    >
            </div>   
        </div>
        <div class="col-12">
            <div class="input-group input-group-sm">
                <span class="input-group-text bg-light" style="font-size: 0.75em;">
                    类
                </span>
                <input 
                    disabled
                    type="text"              
                    v-model="v.type"               
                    style="font-size: 0.75em;"  
                    class="form-control form-control-sm"
                    >
                <span class="input-group-text bg-light" style="font-size: 0.75em;">
                    KB
                </span>
                <input
                    disabled 
                    type="text"              
                    v-model="v.kb"                                       
                    style="font-size: 0.75em;"  
                    class="form-control form-control-sm"
                    >
            </div>
        </div>
        <div class="col-12">
            <span style="color: grey; font-size: 0.75em; " :style="{ color: v.error ? 'red' : 'grey' }">
                {{v.msg}}
            </span>
        </div>    
    </div>         
</div>
`;


async function init(opts) {

    const Loader = opts.loader;

    const COMPONENTS = await Loader.imports(opts, {
        'grid-hori': '/js/vue/layout/grid-hori.js',
    });

    const Comp = {};
    Comp.name = 'bs-uploader';
    Comp.template = TEMPLATE;
    Comp.components = COMPONENTS;

    const LAYOUT_PROPS = {
        v: Object,
        o: Object,
    };

    Comp.components['up-nav'] = {
        name: 'bs-uploader-nav',
        template: TEMPLATE_NAV,
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
        props: LAYOUT_PROPS,
    };

    Comp.components[LAYOUT_CARD_OVERLAY] = {
        name: LAYOUT_CARD_OVERLAY,
        template: TEMPLATE_CARD_OVERLAY,
        props: LAYOUT_PROPS,
    };

    Comp.props = {
        _mime: Array,
        _accept: {
            type: String,
            default: 'image/*',
        },
        _maxsize: Number,
        _dataset: {
            type: Array,
            default: [],
        },

        _renamer: Function | Array,
        _renamePrefix: {
            type: String,
            default: '',
        },

        _uploader: Function,
        _uploadRemoveDelay: {
            type: Number,
            default: 1000,
        },
        _uploadSuccess: Function,
        _uploadFailure: Function,


        _layout: {
            type: String,
            default: LAYOUT_CARD_HORI,
        },
        _layouts: {
            type: Array,
            default: [ LAYOUT_CARD_HORI, LAYOUT_CARD_OVERLAY ],
        },

        _minCardWidth: {
            type: Number,
            default: 300,
        },

        _bodyMinHeight: String,

        _dropout: {
            type: String,
            default: '1px dotted rgb(128,128,128)',
        },
        _dropin: {
            type: String,
            default: '3px solid rgba(255,0,0,0.35)',
        },
    };

    Comp.data = function () {
        const d = {};
        for(let _k in Comp.props) {
            const k = _k.substring(1);
            d[k] = this[_k];
        }
        d.bodyStyle = {
            border: '',
            marginTop: '1vh',
            minHeight: this._bodyMinHeight || '1vh',
        };
        d.dataset = d.dataset || [];
        return d;
    };

    const { mapState } = window['Vuex'];
    Comp.computed = {
        ...mapState([
            'UTIL'
        ])
    };

    Comp.methods = {

        mute(evt) {
            evt.preventDefault();
            evt.stopPropagation();
        },


        dragenter() {
            this.bodyStyle.border = this.dropin;
        },

        dragleave() {
            this.bodyStyle.border = this.dropout;
        },

        drop(evt) {
            this.bodyStyle.border = this.dropout;
            const dt = evt.dataTransfer;
            const dataset = dt.files;
            this.append(dataset);
        },

        append(dataset) {
            for(let i = 0; i < dataset.length; i++) {
                const raw = dataset[i];
                const file = new this.UTIL.File(raw);
                if (!this.validate(file)) {
                    console.error("file", "invalid", file);
                    continue;
                }
                Array.prototype.push.call(this.dataset, file);
                file.read('dataurl').then(() => {
                    this.$refs.grid.$forceUpdate();
                });
            }
            this.$forceUpdate();
        },

        validate(file) {
            if (this.mime && Array.prototype.indexOf.call(this.mime, file.type) < 0) {
                return false;
            }
            if (this.maxsize && file.size > this.maxsize) {
                return false;
            }
            for(let i = 0; i < this.dataset.length; i++) {
                const curr = this.dataset[i];
                if (curr.raw.size === file.raw.size && curr.raw.name === file.raw.name) {
                    return false;
                }
            }
            return true;
        },


        remove(file) {
            const index = Array.prototype.indexOf.call(this.dataset, file);
            if (index === 0) {
                Array.prototype.shift.call(this.dataset);
            } else {
                Array.prototype.splice.call(this.dataset, index, 1);
            }
            this.$refs.grid.$forceUpdate();
        },

        rename() {

            if (this.renamer) {
                this.UTIL.func.invoke(this.renamer, {
                    src: this,
                    dataset: this.dataset,
                });
                return;
            }

            for(let i = 0; i < this.dataset.length; i++) {
                const file = this.dataset[i];
                let name = this.renamePrefix;
                if (i !== 0) {
                    name = name + '_' + this.UTIL.num.pad(i + 1, 2);
                }
                name = name + '.' + file.ext().toLowerCase();
                file.name = name;
            }

        },

        select() {
            try {
                if (!this.pseudo) {
                    const psuedo = document.createElement("input");
                    psuedo.type = "file";
                    psuedo.accept = this.accept;
                    psuedo.multiple = true;
                    psuedo.addEventListener("change", () => {
                        try {
                            this.append(psuedo.files);
                        } catch (ex) {
                            console.error(ex);
                        }
                    });
                    this.pseudo = psuedo;
                }
                this.pseudo.click();
            } catch (ex) {
                console.error(ex);
            }
        },

        upload() {
            if (!this.uploader) {
                return;
            }

            for(let i = 0; i < this.dataset.length; i++) {
                const one = this.dataset[i];
                one.msg = '上传中';
                this.UTIL.func.invokeSafe({
                    func: this.uploader,
                    success: this.onSuccess,
                    failure: this.onFailure,
                }, one);
            }

        },

        onSuccess(resp, one) {
            one.resp = resp;
            one.msg = "成功";
            if (this.uploadRemoveDelay && this.uploadRemoveDelay > 0) {
                setTimeout(() => {
                    this.remove(one);
                }, this.uploadRemoveDelay);
            }
            if (this['uploadSuccess']) {
                this['uploadSuccess'](ex, one);
            }
            this.$forceUpdate();
        },

        onFailure(ex, one) {
            console.error('UPLOAD', one, 'FAILURE', ex);
            one.error = ex;
            one.msg = "失败 " + ex.toString();
            if (this['uploadFailure']) {
                this['uploadFailure'](ex, one);
            }
            this.$forceUpdate();
        }

    };

    Comp.mounted = function() {

        const margin = this.$refs.navcon.getBoundingClientRect().height;
        this.bodyStyle.border = this.dropout;
        this.bodyStyle.marginTop = (margin - 1) + 'px';

        const el = this.$el;

        [ 'dragenter', 'dragleave', 'dragover', 'drop' ].forEach((evt) => {
            el.addEventListener(evt, this.mute, false);
        })

        el.addEventListener('dragenter', this.dragenter, false);
        el.addEventListener('dragleave', this.dragleave, false);
        el.addEventListener('drop', this.drop, false);
    }

    return Comp;
}


export default init;