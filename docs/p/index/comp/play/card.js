


const TEMPLATE =
    `
<div class="card" 
     style="width: 100%; border: 1px dotted rgb(96,96,96); border-bottom: none; min-height: 48px;"      
     v-intersect="{ ctx: node, callback: () => ui.intersected = true }"     
     >
    <div class="row g-0">
        <div style="min-height: 72px; min-width: 72px;" v-if="!ui.intersected"></div>
        <div class="col-6" v-if="ui.intersected">            
            <part-left ref="left"></part-left>        
        </div>        
        <div class="col-6" v-if="ui.intersected">
            <part-right ref="right"></part-right>                                    
        </div>
    </div>                    
</div>
`;

/* ================================== LEFT ================================== */

const TEMPLATE_LEFT =
`
<div class="card-body" style="padding: 3px;">                     
    <div class="row g-0">       
        <div class="col-12">
            <div class="btn-group btn-group-sm flex-wrap" role="group">
                <button type="button" v-if="mode.ctrl"
                        style="font-weight: bold; font-size: 0.8em;"
                        class="btn btn-sm btn-outline-danger"                                                                        
                        @click="form()"                                
                >   
                    *
                </button>                
                <button type="button" v-if="mode.ctrl"
                        style="font-weight: bold; font-size: 0.8em;"
                        class="btn btn-sm btn-outline-danger"                                                
                        @click="clipboard()"                                
                >   
                    ©
                </button>                                
                <button type="button"
                        style="font-weight: bold; font-size: 0.85em;"
                        class="btn btn-sm"
                        :class="carouButtonClass('imgs')"                        
                        @click="carouToggle('imgs')"                                
                >
                    {{ v.code }} 
                </button>
                <button type="button"
                        style="font-weight: bold; font-size: 0.85em;"
                        class="btn btn-sm"
                        :class="carouButtonClass('feed')"                        
                        @click="carouToggle('feed')"
                        v-if="v.link && v.link.feeds && v.link.feeds.length"                                                                    
                >
                    评 
                    <span class="badge rounded-pill bg-danger" style="font-size: 0.7em">
                        {{v.link.feeds.length}}
                    </span>
                </button>
            </div>
        </div>        
    </div>
    <div v-if="$parent.ui.left.info && ma"                    
         :style="{ cursor: mode.ctrl ? 'pointer' : '' }"
         @click="form()"
         >
        <part-left-info></part-left-info>                                                    
    </div>                
</div>
`;

const TEMPLATE_LEFT_INFO =
`
<div class="row g-0 d-flex flex-wrap" v-if="ma">
    
    
    <div class="col-12 d-flex flex-wrap" v-if="ma.rating">
        <bs-rating                                     
            :value="ma.rating.overall" :delta="5" :lower="65" >
            <template v-slot:default="o">
                <i class="bi bi-star-fill" style="color: orange; margin-right: 1px;"></i>
            </template>
            <template v-slot:remain="o">
                <i class="bi bi-star-half" style="color: orange"></i>
            </template>                
        </bs-rating>        
    </div>
    
    <!--
    <div class="col-12 d-flex flex-wrap" v-if="ma.rating">                   
        <span v-for="(ra,rakey) in ma.rating">
            <span v-if="ra && rakey !== 't' " 
                  class="tele-tag"
                  :class="classRating(ra)"                  
                   >
                {{ C.ATTRZ.rating[rakey].cn }} {{ra}}
            </span>            
        </span>
    </div>
    -->
    
    <div class="col-12" v-if="isSpecial">
        <span class="tele-tag-head">特殊</span>
        {{ explainSpecial }}           
    </div>
        
    <div class="col-12" v-if="ma.status">
        <span class="tele-tag-head">状态</span>
        <span
            class="tele-tag tele-grey"
            style="font-weight: bold" 
            v-for="(item) in explainStatus">
            {{item}}
        </span>                
    </div>
    
    <div class="col-12" v-if="ma.t_rest && ma.t && new Date().getTime() > ma.t_rest && ma.t_rest > ma.t">
        <span class="tele-tag-head tele-dark">休息</span>
        <span class="tele-tag-head tele-outline-dark">{{UTIL.time.ago_precise(ma.t_rest) }}</span>
        <span class="tele-tag-head tele-dark">{{UTIL.time.formatDate(ma.t_rest)}}</span>
    </div>

    <div class="col-12" v-if="ma.location && ma.location.district" >
        <span class="tele-tag-head">地点</span>        
        <span class="tele-tag tele-dark"
              style="font-weight: bold;" 
              v-for="(item) in ma.location.district.split(',')">
            {{ item }}
        </span>                            
        <span class="tele-tag tele-dark" v-if="ma.location.street">
            {{ ma.location.street }}
        </span>
    </div>                       
    
    <div class="col-12" v-if="ma.body">        
        <span class="tele-tag-head">身体</span>
        <span v-if="ma.body.birth"
              class="tele-tag" 
              :class="{ 'tele-dark': ma.body.birth < 2000, 'tele-outline-dotted-red': ma.body.birth >= 2000 }"
              >
            {{ ma.body.birth + 'y ' }}
        </span>
        <span  v-if="ma.body.height"
              class="tele-tag" 
              :class="{ 'tele-dark': ma.body.height < 165, 'tele-outline-dotted-red': ma.body.height >= 165 }"
              >
            {{ ma.body.height + 'cm ' }}
        </span>
        <span class="tele-tag tele-dark" v-if="ma.body.weight">
            {{ ma.body.weight + 'kg ' }}
        </span>
        <span v-if="ma.body.chest" 
              class="tele-tag" 
              :class="{ 'tele-dark': ma.body.chest < 30, 'tele-outline-dotted-red': ma.body.chest >= 38 }">
            {{ C.ATTRZCODE.body.chest[ma.body.chest] }}
        </span>                                                       
    </div>
    
    <div class="col-12 d-flex flex-wrap" v-if="ma.body && ma.body.cosmetic">
        <span class="tele-tag-head">身体</span>
        <span
            class="tele-tag tele-dark"                     
            v-for="(item) in UTIL.flag.asArray(ma.body.cosmetic, C.ATTRZCODE.body.cosmetic, 'cn')">
            {{item}}
        </span>
    </div>                               
    
    <div class="col-12 d-flex flex-wrap" v-if="ma.service && ma.service.open">
        <span class="tele-tag-head">类型</span>
        <span
            class="tele-tag tele-dark"                     
            v-for="(item) in UTIL.flag.asArray(ma.type, C.ATTRZCODE.type, 'cn', 'short')">
            {{item}}
        </span>
        <span
            class="tele-tag tele-dark"                     
            v-for="(item) in UTIL.flag.asArray(ma.service.open, C.ATTRZCODE.service.open, 'cn')">
            {{item}}
        </span>
    </div>                
    
    <div class="col-12 d-flex flex-wrap" v-if="explainService.length">                
        <span class="tele-tag-head">服务</span>
        <span v-for="(item) in explainService" class="tele-tag" style="color: darkorange">
            {{item}}                    
        </span>            
    </div>
    
    <div class="col-12 d-flex flex-wrap" v-if="1===2">                
        <span class="tele-tag-head">服务</span>
        <span v-for="(servgrp,servkey) in C.ATTRZCODE.service">
            <span
                class="tele-tag tele-darkorange" 
                v-if="servkey !== 'open' && ma.service[servkey]"
                v-for="(item) in UTIL.flag.asArray(ma.service[servkey], servgrp, 'cn')">
                {{item}}
            </span>                    
        </span>            
    </div>
           
    <div class="col-12" v-for="(ch,chkey) in ma.charge"                             >
        <div v-if="ch">
            <span class="tele-tag-head">价位</span>        
            <span class="tele-tag tele-darkorange">{{ C.ATTRZ.charge[chkey].cn }}</span>
            <span class="tele-tag tele-darkorange" style="font-weight: bold;">{{ch}}</span>
        </div>                           
    </div>
    
    <div class="col-12 d-flex flex-wrap" v-if="ma.character && ma.character.flag">                
        <span class="tele-tag-head">特点</span>
        <span
            class="tele-tag tele-grey"                     
            v-for="(item) in UTIL.flag.asArray(ma.character.flag, C.ATTRZCODE.character, 'cn')">
            {{item}}
        </span>            
    </div>
    
    <div class="col-12" v-if="ma.desc">
        <span class="tele-tag-head">其他</span>
        <span class="tele-grey" style="font-size: 0.75em;">{{ma.desc}}</span>
    </div>     
    
    
    <div class="col-12 d-flex flex-wrap" v-if="ma.rating"
        v-for="rakey in [ 'service', 'attitude', 'slutty', 'massage', 'shape', 'face', 'young' ] ">
        <bs-rating
            :value="ma.rating[rakey]" :delta="5" :lower="65"                         
            symbol-style="font-size: 0.8em; "
            :title="C.ATTRZ.rating[rakey].cn" title-class="tele-tag-head">
            <template v-slot:default="o">
                <i class="bi bi-droplet-fill" style="color: rgb(212,212,212); margin-right: 1px;"></i>
            </template>
            <template v-slot:remain="o">
                <i class="bi bi-droplet-half" style="color: rgb(212,212,212); margin-right: 1px;"></i>
            </template>                
        </bs-rating>                
    </div>        
    
                                            
           
    <div class="col-12" v-if="ma.t">
        <span class="tele-tag-head">更新</span>
        <span class="tele-tag-head" :style="styleTime">{{UTIL.time.ago_precise(ma.t) }}</span>
        <span class="tele-tag-head">{{UTIL.time.formatDatetime(ma.t)}}</span>
    </div>
    
    <div class="col-12" v-if="ma.t_rest && ma.t_rest > new Date().getTime()">
        <span class="tele-tag-head">开到</span>        
        <span class="tele-tag-head tele-outline-dark">{{UTIL.time.later(ma.t_rest) }}</span>        
        <span class="tele-tag-head">{{UTIL.time.formatDate(ma.t_rest)}}</span>
    </div>                                       
    
                 
                                                   
</div>
`;

/* ================================== RIGHT ================================== */

const TEMPLATE_RIGHT =
`
<div>    
    <bs-carousel
        v-if="v.link && v.link.path && $parent.ui.right.carou.imgs"                        
        :title="v.code"            
        :first="v.link.path"                              
        :prefix="conn.img_prefix || '/img/' "                   
        :dataset="v.link.subs.map( (s) => s.path ) " >  
         <template v-slot:default="o">
             <img-lazy                                                                                                                              
                :datasrc="o.src"
                :prefix="o.container.prefix"                
                :imgloaded="$parent.imgloaded"
                :imgclicked="o.container.zooming"                                                                                 
                class="card-img"
                style="min-width: 64px; min-height: 64px;"
                transit="/images/loading/loading_dotted.gif"                                                                                                 
                />
         </template>
    </bs-carousel>       
    <bs-carousel
        v-if="v.link && v.link.feeds && v.link.feeds.length && $parent.ui.right.carou.feed"                        
        :title="v.code"            
        :first="v.link.feeds[0].path"
        :prefix="conn.img_prefix || '/img/' "                                                 
        :dataset="v.link.feeds.slice(1).map( s => s.path )" >
         <template v-slot:default="o">
             <img-lazy                                                                                                                              
                :datasrc="o.src"
                :prefix="o.container.prefix"                 
                :imgloaded="$parent.imgloaded"
                :imgclicked="o.container.zooming"                                                
                class="card-img"
                style="min-width: 64px; min-height: 64px;"
                transit="/images/loading/loading_dotted.gif"                                                                                                 
                />
         </template>
    </bs-carousel>    
</div>
`;

const init = async function(OPTS) {

    const Loader = OPTS.loader;

    const COMPONENTS = await Loader.imports(OPTS,  {
        'img-lazy': '/js/vue/comp/imglazy.js',
        'bs-modal': '/js/vue/comp/bs-modal.js',
        'bs-rating': '/js/vue/comp/bs-rating.js',
        'bs-carousel': '/js/vue/comp/bs-carousel.js',
    });

    const Comp = {};
    Comp.name = 'tele-card';
    Comp.template = TEMPLATE;
    Comp.components = COMPONENTS;

    Comp.props = {
        node: Object,
        index: Number,
        imgloaded: Function,
    };

    Comp.data = function () {
        return {
            ui: {
                intersected: false,
                left: {
                    info: true,
                },
                right: {
                    carou: {
                        imgs: true,
                        feed: false,
                    }
                }
            },
        };
    };

    const { mapState } = window['Vuex'];
    Comp.computed = {
        ...mapState([ 'C', 'UTIL', 'mode', 'hub' ]),
    };

    Comp.provide = function() {
        return {
            v: this.node,
        }
    };
    const SUB_INJECT = [ 'v' ];
    const SUB_COMPUTED = {
        ...Comp.computed,
        ma() {
            const v = this.v;
            return v ? v.attr : null;
        },
        maex() {
            const v = this.v;
            return v ? v.attrex : null;
        }
    };

    const LeftInfo = {
        name: 'tele-card-left-info',
        template: TEMPLATE_LEFT_INFO,
        components: COMPONENTS,
        inject: SUB_INJECT,
        props: Comp.props,
        computed: {
            ...SUB_COMPUTED,
            styleTime() {
                const t = this.ma.t;
                const h = this.UTIL.time.diffHour(t, new Date());
                if (h <= 24) {
                    return 'color: red; border: 1px solid red; font-weight: bold;'
                }
                if (h <= 96) {
                    return 'color: rgb(255,128,0); border: 1px solid rgb(255,128,0); font-weight: bold;';
                }
                if (h <= 168) {
                    return 'border: 1px solid grey; font-weight: bold;'
                }
                return '';
            },

            isSpecial() {
                return this.ma.type &&
                    (this.ma.type & this.C.ATTRZ.type.special.code);
            },

            explainSpecial() {
                const special = this.C.ATTRZ.type.special;
                const cosplay = this.C.ATTRZ.type.cosplay;
                const sm = this.C.ATTRZ.type.sm;
                const student = this.C.ATTRZ.type.student;
                let express = special.icon;
                if (this.ma.type & cosplay.code) {
                    express = express + cosplay.icon;
                }
                if (this.ma.type & sm.code) {
                    express = express + sm.icon;
                }
                if (this.ma.type && student.code) {
                    express = express + student.icon;
                }
                return express;
            },

            explainStatus() {
                // (item) in
                const flag = this.ma.status.flag;
                const flag_work = this.C.ATTRZ.status.work.code;
                const flag_work_always = this.C.ATTRZ.status.work_always.code;
                if ((flag & flag_work) > 0 && (flag & flag_work_always) === 0) {
                    const t = this.ma.t || 0;
                    const days = this.UTIL.time.diffDay(t, new Date());
                    if (days > 28) {
                        this.ma.status.flag =
                            (this.ma.status.flag ^ flag_work)
                            | this.C.ATTRZ.status.unknown.code;
                    }
                }
                return this.UTIL.flag.asArray(this.ma.status.flag, this.C.ATTRZCODE.status, 'cn', 'icon');
            },


            explainService() {
                let ret = [];
                const service = this.ma.service;
                const { asArray } = this.UTIL.flag;

                for(let k in service) {
                    if (k === 'open') {
                        continue;
                    }
                    const flag = service[k];
                    if (!flag) {
                        continue;
                    }
                    const array = asArray(flag, this.C.ATTRZCODE.service[k], 'cn');
                    if (array.length) {
                        ret = ret.concat(array);
                    }
                }
                return ret;
            }
        },
        methods: {
            classRating(ra) {
                if (ra < 50) {
                    return 'tele-outline-dark';
                }
                if (ra < 70) {
                    return 'tele-outline-dotted-grey';
                }
                if (ra <= 84) {
                    return 'tele-outline-dotted-orangered'
                }
                return 'tele-outline-red tele-bold';
            }
        }
    };

    Comp.components['part-left'] = {
        name: 'tele-card-left',
        template: TEMPLATE_LEFT,
        components: {
            ...COMPONENTS,
            'part-left-info' : LeftInfo,
            'bs-date-wrapper': Vue.defineAsyncComponent(() => {
                const params = {};
                Object.assign(params, OPTS);
                params.key = 'bs-date-wrapper';
                return Loader.import('/js/vue/comp/bs-date-wrapper.js', params);
            })
        },
        inject: SUB_INJECT,
        props: Comp.props,
        computed: {
            ...SUB_COMPUTED,
        },
        methods: {
            carouToggle(type) {
                const right = this.$parent.ui.right;
                for(let k in right.carou) {
                    right.carou[k] = k === type;
                }
            },
            carouButtonClass(type) {
                const right = this.$parent.ui.right;
                if (right.carou[type]) {
                    return { 'btn-danger': true };
                } else {
                    return { 'btn-outline-danger': true };
                }
            },
            explain(flag, map) {
                if (!flag) {lll
                    return '';
                }
                const array = this.UTIL.flag.asArray(flag, map, 'cn');
                return array.join(' . ');
            },
            form() {
                if (!this.mode.ctrl) {
                    return;
                }
                // this.maex.form = new Date().getTime();
                this.hub.send('ctrl.form', this.v);
            },
            clipboard() {
                const r = this.$store.getters['tree/leaf.print']({
                    v: this.v,
                });
                this.UTIL.str.clipboard(r);
            },

        }
    };


    Comp.components['part-right'] = {
        name: 'tele-card-right',
        template: TEMPLATE_RIGHT,
        components: COMPONENTS,
        inject: SUB_INJECT,
        props: Comp.props,
        computed: {
            ...SUB_COMPUTED,
            ...mapState([
                'conn', 'ui'
            ]),
        }
    };


    Comp.methods = {

        classHead() {
            const v = this.v;
            if (v.attrs.here) {
                if (v.attrs.recommend) {
                    return { 'btn-danger' : true };
                } else {
                    return { 'btn-info' : true };
                }
            }
            return { 'btn-info' : true };
        },


        jump(item) {
            const locator = this.locator;
            const account = this.C.ACCOUNTS.getwrap(locator, 'tele.ch');
            const url = account.url + '?q=' + item.name;
            window.open(url);
        },

    };

    Comp.mounted = function() { };



    return Comp;
};

export default init;


