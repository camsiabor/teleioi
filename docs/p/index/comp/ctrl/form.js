

const TEMPLATE =
`
<div v-if="v" :key="v.code">

    <ul class="nav nav-pills" role="tablist" style="margin-bottom: 2px;">
      <li class="nav-item" role="presentation">
        <button
            style="font-size: 0.8em" 
            class="nav-link active" data-bs-toggle="tab" :data-bs-target=" '#' + cid + '_info' " type="button" role="tab">
            {{v.code || '新' }}
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
            style="font-size: 0.8em" 
            class="nav-link" data-bs-toggle="tab" :data-bs-target=" '#' + cid + '_charge' " type="button" role="tab" >
            费
        </button>    
      </li>
      <li class="nav-item" role="presentation">
        <button
            style="font-size: 0.8em" 
            class="nav-link" data-bs-toggle="tab" :data-bs-target=" '#' + cid + '_feed' "  type="button" role="tab" >
            评
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
            style="font-size: 0.8em" 
            class="nav-link" data-bs-toggle="tab" :data-bs-target=" '#' + cid + '_img' "  type="button" role="tab" >
            图
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
            style="font-size: 0.8em" 
            class="nav-link" data-bs-toggle="tab" :data-bs-target=" '#' + cid + '_link' "  type="button" role="tab" >
            连
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
            style="font-size: 0.8em" 
            class="nav-link" data-bs-toggle="tab" :data-bs-target=" '#' + cid + '_secret' "  type="button" role="tab" >
            密
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button             
            class="nav-link" type="button" role="tab" @click="clipboard()"  >
            ©
        </button>
      </li>
    </ul>
    
    <div class="tab-content">
        <div class="tab-pane active" :id="cid + '_info' " role="tabpanel">
            <tab-info v-if="v.attr"></tab-info>
        </div>
        <div class="tab-pane" :id="cid + '_charge' " role="tabpanel">
            <tab-charge v-if="v.attr"></tab-charge>
        </div>
        <div class="tab-pane" :id="cid + '_feed' " role="tabpanel">
            <tab-feed v-if="v.attr"></tab-feed>
        </div>
        <div class="tab-pane h-100" :id="cid + '_img' " role="tabpanel">
            <tab-img ></tab-img>
        </div>
        <div class="tab-pane h-100" :id="cid + '_link' " role="tabpanel">
            <tab-link ></tab-link>
        </div>
        <div class="tab-pane h-100" :id="cid + '_secret' " role="tabpanel">
            <tab-secret ></tab-secret>
        </div>          
    </div>
</div>

`;

const TEMPLATE_INFO =
`
<div class="row g-1">
    <div class="col-12">                    
        <div class="input-group input-group-sm">
            <span class="input-group-text bg-light">@</span>
            <input type="text" class="form-control form-control-sm" v-model="ma.id" />            
        </div>    
    </div>       
</div>

<div class="row g-1">
    <div class="col-12">
        <div class="input-group input-group-sm">
            <span class="input-group-text bg-light">名</span>
            <input type="text" class="form-control form-control-sm" placeholder="name" v-model="ma.name" >
            <span class="input-group-text bg-light">年</span>                
            <input type="number" class="form-control form-control-sm" placeholder="birth" v-model="ma.body.birth" >
        </div>
    </div>            
</div>

<div class="row g-1" style="margin-bottom: 3px;">
    <div class="col-12">
        <div class="input-group input-group-sm">
            <span class="input-group-text bg-light">高</span>
            <input type="number" class="form-control form-control-sm" placeholder="height" v-model="ma.body.height" >
            <span class="input-group-text bg-light">重</span>
            <input type="number" class="form-control form-control-sm" placeholder="weight" v-model="ma.body.weight" >
            <span class="input-group-text bg-light">杯</span>
            <input type="number" class="form-control form-control-sm" placeholder="chest" v-model="ma.body.chest" >
        </div>            
    </div>                                   
</div>

<div class="row g-1">
    <div class="col-12">
        <bs-date-wrapper 
            label="更"
            v-model:value="ma.t" 
            v-model:chain="maex.ts"
            :change="() => hub.go('filter.sort')"/>
    </div>
</div>

<div class="row g-1">
    <div class="col-12">
        <bs-date-wrapper v-model:value="ma.t_rest" v-model:chain="maex.ts_rest" label="休" />
    </div>
</div>

<div class="row g-1" :style="sep">
    <div class="col-12">
        <toggle-list
            _title="类别"
            :_dataset="C.ATTRZCODE.type"                                                                                                
            _field-label="cn"                 
            _field-weight="weight"
            v-model:flagger="ma.type"            
            :_limit-weight="0"                                                                                                 
        />
    </div>
</div>


<div class="row g-1" >
    <div class="col-6">
        <input type="text" class="form-control" placeholder="district" v-model="ma.location.district" >
    </div>
    <div class="col-6">
        <input type="text" class="form-control" placeholder="street" v-model="ma.location.street" >
    </div>                      
</div>

<div class="row g-1" :style="sep">
    <div class="col-12">        
        <toggle-list
            _title="地点"
            :_dataset="tree.current.meta && tree.current.meta.attr ? tree.current.meta.attr.districts : []"                                                          
            _field-label="name"                                                                                                   
            :_limit-weight="0"
            v-model:concater="ma.location.district"                                                                                                
        />        
    </div>
</div>
   
<div class="row g-1" :style="sep">
    <div class="col-12">
        <toggle-list
            _title="状态"
            :_dataset="C.ATTRZCODE.status"                                                                                                
            _field-label="cn"                 
            _field-weight="weight"
            v-model:flagger="ma.status.flag"            
            :_limit-weight="0"                                                                                                 
        />
    </div>
</div>

<div class="row g-1" :style="sep">
    <div class="col-12">
        <div style="border-bottom: 1px dotted rgb(248,248,248); " 
         v-for="(servgrp, servkey) in C.ATTRZ.service">
            <toggle-list               
                :_title="C.ATTRZ.service_cn[servkey]"
                :_style-title-extra=" servkey === 'open' ? '' : 'color: rgb(200,200,200); ' "                            
                :_dataset="C.ATTRZCODE.service[servkey]"                                                                                            
                v-model:flagger="ma.service[servkey]"                                                
                _field-label="cn"                 
                _field-weight="weight"
                :_limit-weight="0"                                                                                                           
            />
        </div>
    </div>    
</div>

<div class="row g-1" :style="sep">
    <div class="col-12">
        <toggle-list
            _title="身体"
            :_dataset="C.ATTRZCODE.body.cosmetic"                                                                                                
            _field-label="cn"                 
            _field-weight="weight"
            v-model:flagger="ma.body.cosmetic"            
            :_limit-weight="0"                                                                                                 
        />
    </div>
</div>

<div class="row g-1" :style="sep">
    <div class="col-12">
        <toggle-list
            _title="特点"
            :_dataset="C.ATTRZCODE.character"                                                                                                
            _field-label="cn"                 
            _field-weight="weight"
            v-model:flagger="ma.character.flag"            
            :_limit-weight="0"                                                                                                 
        />
    </div>
</div>

<div class="row g-1" style="margin-top: 5px;">
    <div class="col-12">
        <textarea class="form-control" rows="3" v-model="ma.desc" placeholder="其他"></textarea>    
    </div>
</div>


`;

const TEMPLATE_CHARGE=
`

<div class="row g-1" style="margin-bottom: 3px">
    <div class="col-4">
        <div class="input-group input-group-sm">
            <span class="input-group-text bg-light">
                货币
            </span>
            <input 
                type="text"              
                v-model="ma.charge.currency"                 
                class="form-control form-control-sm"
                >
        </div>
    </div>
</div>

<div class="row g-1 d-flex flex-wrap">
    <div class="col-6" v-for="(chitem,chkey,chindex) in C.ATTRZ.charge">                                
        <div class="input-group input-group-sm">
            <span class="input-group-text bg-light">
                {{ chitem.cn }}
            </span>                        
            <input 
                type="number"              
                v-model="ma.charge[chkey]"    
                class="form-control form-control-sm"
                />
        </div>                    
    </div>      
</div>

`;

const TEMPLATE_FEED =
`
<div class="row g-1 d-flex flex-wrap">
    <div class="col-4" v-for="(raitem,rakey) in C.ATTRZ.rating">
        <div class="input-group input-group-sm">
            <span class="input-group-text bg-light">{{raitem.cn}}</span>                        
            <input 
                type="number"              
                v-model="ma.rating[rakey]"
                min="0" max="100"                         
                class="form-control form-control-sm"
                />
        </div>                               
    </div>      
</div>
`;


const TEMPLATE_IMG =
    `
<div v-intersect="{ toggle: intersected }" style="min-height: 1px;">
    <div class="row g-1 d-flex flex-wrap" v-if="v">
        <div class="col-12">            
            <bs-gallery
                ref="gallery"
                :key="v.code"
                
                :nav="true"
                :close-btn="true"
                
                namefield="tail"                               
                datafield="path"  
                :dataset="view"                
                :dataprefix="conn.img_prefix || '/img/' "
                                
                :deleter="(arg) => hub.go('ctrl.delete', arg)"
            />
        </div>
        <div class="col-12">
            <bs-uploader                         
                ref="uploader"     
                :key="v.code"
                :_dataset="v.attrex.imgs"           
                :_uploader="(arg) => hub.go('ctrl.upload', arg)"
                :_rename-prefix="v.code"
                _body-min-height="50vh"
            />                
        </div>
    </div>    
</div>
`;

const TEMPLATE_LINK =
    `
<div v-intersect="{ toggle: intersected }" style="min-height: 1px;">
    <div class="row g-1 d-flex flex-wrap" v-if="v">
        <div class="col-12">            
            
        </div>
        <div class="col-12">
                          
        </div>
    </div>    
</div>
`;


const TEMPLATE_SECRET =
`
<div v-intersect="{ toggle: intersected }" style="min-height: 1px;">
    <div class="row g-1 d-flex flex-wrap" v-if="v">
        <div class="col-12">            
            
        </div>
        <div class="col-12">
                          
        </div>
    </div>    
</div>
`;



async function init(opts) {

    const Loader = opts.loader;

    const COMPONENTS = await Loader.imports(opts, {

        'toggle-list': '/js/vue/comp/toggle-list.js',

        'bs-gallery': '/js/vue/comp/bs-gallery.js',
        'bs-uploader': '/js/vue/comp/bs-uploader.js',
        'bs-date-wrapper': '/js/vue/comp/bs-date-wrapper.js',

    });


    const Comp = {};
    Comp.name = 'ctrl-form';
    Comp.template = TEMPLATE;
    Comp.components = COMPONENTS;

    Comp.props = {
        uid: String,
        node: Object,
    };

    Comp.data = function() {
        let cid = this.uid;
        if (!cid) {
            cid = 'ctrl_form_' + UTIL.uuid.gen();
        }
        return {
            cid,
            v: this.node,
        };
    };

    Comp.provide = function() {
        return {
            V: () => this.v,
        };
    };

    const { mapState } = window['Vuex'];
    Comp.computed = {
        ...mapState([
            'C', 'UTIL',
            'tree', 'hub', 'conn'
        ]),

    };

    const SUB_INJECT = [ 'V' ];
    const SUB_COMPUTED = {
        ...Comp.computed,
        v() {
            return this.V();
        },
        ma() {
            const v = this.V();
            return v ? v.attr : null;
        },
        maex() {
            const v = this.V();
            return v ? v.attrex : null;
        },
    }

    Comp.watch = {
        'v': function() {
            if (!this.v) {
                return;
            }
            const v = this.v;
            if (!v.attrex) {
                v.attrex = {};
            }
            if (!v.attrex.imgs) {
                v.attrex.imgs = [];
            }
        },
    };


    Comp.methods = {
        clipboard() {
            const r = this.$store.getters['tree/leaf.print']({
                v: this.v,
            });
            this.UTIL.str.clipboard(r);
        },
    };

    Comp.components = {};

    Comp.components['tab-info'] = {
        name: 'tab-info',
        template: TEMPLATE_INFO,
        components: COMPONENTS,
        inject: SUB_INJECT,
        props: {
            sep: {
                type: String,
                default: 'border-bottom: 1px dotted rgb(128,128,128); margin-bottom: 3px; padding-bottom: 1px;'
            },
        },
        computed: SUB_COMPUTED,
    };

    Comp.components['tab-charge'] = {
        name: 'tab-charge',
        template: TEMPLATE_CHARGE,
        inject: SUB_INJECT,
        computed: SUB_COMPUTED,
    };

    Comp.components['tab-feed'] = {
        name: 'tab-feed',
        template: TEMPLATE_FEED,
        inject: SUB_INJECT,
        computed: SUB_COMPUTED,
    };

    Comp.components['tab-img'] = {
        name: 'tab-img',
        template: TEMPLATE_IMG,
        components: COMPONENTS,
        inject: SUB_INJECT,
        computed: {
            ...SUB_COMPUTED,
            view() {
                let r = [];
                const v = this.v;
                const link = v.link;
                if (link.abs) {
                    r.push(link);
                }
                if (link.subs && link.subs.length) {
                    r = r.concat(link.subs);
                }
                if (link.feeds && link.feeds.length) {
                    r = r.concat(link.feeds);
                }
                return r;
            }
        },
        data() {
            return {
                intersected: { value: false },
            }
        },
    };

    Comp.components['tab-link'] = {
        name: 'tab-link',
        template: TEMPLATE_LINK,
        inject: SUB_INJECT,
        computed: SUB_COMPUTED,
    };

    Comp.components['tab-secret'] = {
        name: 'tab-secret',
        template: TEMPLATE_SECRET,
        inject: SUB_INJECT,
        computed: SUB_COMPUTED,
    };

    return Comp;

}


export default init;
