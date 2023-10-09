
const TEMPLATE =
`
<div class="row" > 
    <div class="col-12">
        <play-search ref="search" />
    </div>
</div>


<div class="position-absolute top-25 end-0" style="z-index: 65535; " v-if="1===2">    
    <div class="gmg-tag-lg gmg-outline-red" style="cursor: pointer;">
        {{ advance ? '简单' : '进阶' }}
    </div>    
</div>
<!-- districts -->
<div class="row d-flex flex-wrap" v-if="current.meta">

    <div class="col-12" 
         v-if="current.meta.attr && current.meta.attr.districts"
         style="border-bottom: 1px dotted rgb(200,200,200); ">         
        <toggle-list
            _title="地点"
            :_dataset="current.meta.attr.districts"
                                       
            :_toggled="filter.districts"
            v-model:counter="filter.districtsN"   
            
            _field-label="name"
                                                            
            :_limit-weight="0"                
                                                                           
            :_callback="() => filtering(delay)"                
        />
    </div>
    
    <div class="col-12" style="border-bottom: 1px dotted rgb(200,200,200); ">
        <toggle-list
            _title="星星"
            :_dataset="C.ATTRZCODE.star"
                                                        
            :_multiple="false"                                                     
            :_toggled="filter.star"                                    
                            
            _field-label="cn"           
                                          
            
            :_limit-weight="0"                                                                                        
            :_callback="() => filtering(delay)"            
            v-model:value="filter.star.V"                            
        />
    </div>
    
    <div class="col-12" style="border-bottom: 1px dotted rgb(200,200,200); ">
        <toggle-list
            _title="状态"
            :_dataset="C.ATTRZCODE.status"
                                             
            :_toggled="filter.status"            
            v-model:flagger="filter.statusF"
                            
            _field-label="cn"                 
            _field-weight="weight"
                                                                       
            :_callback="() => filtering(delay)"                
        />
    </div>
    
    <div class="col-12" style="border-bottom: 1px dotted rgb(200,200,200); ">
        <toggle-list
            _title="类型"
            :_dataset="C.ATTRZCODE.type"
                                             
            :_toggled="filter.type"            
            v-model:flagger="filter.typeF"
                            
            _field-label="cn"               
            _field-icon="icon"  
            _field-weight="weight"
                                                                        
            :_callback="() => filtering(delay)"                
        />
    </div>    
    
    <div class="col-12" style="border-bottom: 1px dotted rgb(200,200,200); ">
        <toggle-list
            _title="出生"
            :_dataset="C.ATTRZ.body.birth"                                             
            :_toggled="filter.body.birth"                        
            v-model:counter="filter.body.birthN"                                  
            _field-label="cn"                                                       
            :_limit-weight="0"                                                                                               
            :_callback="() => filtering(delay)"                
        />
    </div>
    
    <div class="col-12" v-if="1===2">
        <input class="form-control form-control-sm" type="number">
    </div>
    
    <div class="col-12" style="border-bottom: 1px dotted rgb(200,200,200); ">
        <toggle-list
            _title="胸杯"
            :_dataset="C.ATTRZ.body.chest"                                             
            :_toggled="filter.body.chest"      
            v-model:counter="filter.body.chestN"                                                                                               
            _field-label="cn"                                                       
            :_limit-weight="0"                                                                                                                     
            :_callback="() => filtering(delay)"                
        />
    </div>
    
    <div class="col-12" style="border-bottom: 1px dotted rgb(200,200,200); ">
        <toggle-list
            _title="身高"
            :_dataset="C.ATTRZ.body.height"                                             
            :_toggled="filter.body.height"      
            v-model:counter="filter.body.heightN"                                                                                               
            _field-label="cn"                                                       
            :_limit-weight="0"                                                                                                                     
            :_callback="() => filtering(delay)"                
        />
    </div>
    
    
    
    <div class="col-12" style="border-bottom: 1px dotted rgb(200,200,200); ">
        <toggle-list
            _title="优妹"
            :_dataset="C.ATTRZ.rating"
                                             
            :_toggled="filter.rating"
            :_toggled-filter="({ curr }) => curr ? curr >= 80 : false" 
            :_toggled-assigner="({ curr }) => curr ? Math.max(curr, 80) : 80"                        
                            
            _field-label="cn"                 
            _field-weight="weight"
                                                                        
            :_callback="() => filtering(delay)"                
        />
    </div>
       
    
    <div style="border-bottom: 1px dotted rgb(200,200,200); " 
         class="col-12"
         v-for="(servgrp, servkey) in C.ATTRZ.service">
        <toggle-list               
            :_title="C.ATTRZ.service_cn[servkey]"
            :_style-title-extra=" servkey === 'open' ? '' : 'color: rgb(160,160,160); ' "
                    
            :_dataset="C.ATTRZCODE.service[servkey]"
                                             
            :_toggled="filter.service[servkey]"            
            v-model:flagger="filter.service[servkey + 'F']"
                            
            _field-label="cn"                 
            _field-weight="weight"
                                                                        
            :_callback="() => filtering(delay)"
        />
    </div>
    
    <div class="col-12" style="border-bottom: 1px dotted rgb(200,200,200); ">
        <toggle-list
            _title="身体"
            :_dataset="C.ATTRZCODE.body.cosmetic"
                                             
            :_toggled="filter.body.cosmetic"            
            v-model:flagger="filter.body.cosmeticF"
                            
            _field-label="cn"                 
            _field-weight="weight"
                                                                        
            :_callback="() => filtering(delay)"                
        />
    </div>             
    
    <div class="col-12" style="border-bottom: 1px dotted rgb(200,200,200); ">
        <toggle-list
            _title="特点"
            :_dataset="C.ATTRZCODE.character"
                                             
            :_toggled="filter.character"            
            v-model:flagger="filter.characterF"
                            
            _field-label="cn"                 
            _field-weight="weight"
                                                                        
            :_callback="() => filtering(delay)"                
        />
    </div>
    
       
</div>        
<!-- -->

`


const init = async function (opts) {


    const Loader = opts.loader;

    const COMPONENTS = await Loader.imports(opts,  {
        'play-search': '/p/index/comp/play/search.js',
        'toggle-list': '/js/vue/comp/toggle-list.js',
    });

    const Comp = {};
    Comp.name = 'play-filter';
    Comp.template = TEMPLATE;

    Comp.components = COMPONENTS;

    Comp.data = function () {
        return {
            delay: 100,
            cid: this.UTIL.uuid['gen'](),
            advance: false,
            timer: {
                filter: null,
                keyword: null,
            },
        }
    };

    const { mapState } = window['Vuex'];

    Comp.computed = {
        ...mapState([
            'C', 'UTIL',
            'locator', 'meta', 'mode', 'filter', 'hub',
        ]),
        ...mapState( {
            current: function(state) {
                return state.tree.current;
            }       
        })
    };

    Comp.watch = {

        'locator.city' : function(){
            this.hub.go('tree.rebranch', {
                force: true,
                locator: this.locator,
            }).then(() => {
                try {
                    const k = this.filter.keyword;
                    if (!k || k.length < 2) {
                        return;
                    }
                    const city = k.substr(0, 2).toLowerCase();
                    if (city !== this.locator.city) {
                        this.filter.keyword = k.substring(2);
                    }
                } finally {
                    this.filtering(this.delay);
                }
            });

        },
        
        'filter.keyword': function (newKeyword, oldKeyword) {
            this['keywording'](newKeyword, oldKeyword);
        },



    };


    Comp.methods = {

        cfg() {
            try {
                this.filter.order = this.UTIL.local.load('filter.order', this.filter.order);
            } catch (ex) {
                console.log('[config] filter.order', ex);
            }

            this.diswatch = [];
            let dis = this.$watch(
                () => {
                    return { ...this.filter.order };
                },
                () => {
                    this.filtering(this.delay, true);
                    this.UTIL.local.save('filter.order', this.filter.order);
                }
            );
            this.diswatch.push(dis);

            // flags
            /*
            const f = this.filter;
            const farray = [
                f.body.birthN,
                f.body.heightN, f.body.weightN, f.body.chestN,
                f.districtsN,
                f.statusF, f.typeF,
                f.characterF,
            ];
            for (let k in this.C.ATTRZ.service) {
                farray.push(f.service[k + 'F']);
            }
            dis = this.$watch(
                farray,
                () => {
                    this.filtering(this.delay);
                }
            );
             */

            // this.diswatch.push(dis);
        },

        async keywording(n) {

            if (this.timer.keyword) {
                clearTimeout(this.timer.keyword);
                this.timer.keyword = setTimeout(this.filtering, this.delay);
                return;
            }

            const len = n.length;

            const phrase = n.toUpperCase();
            if (len === 3) {
                if (phrase === '@@@') {
                    this.mode.ctrl = true;
                    this.filter.keyword = '';
                    return;
                }
                if (phrase === '!!!') {
                    this.mode.ctrl = false;
                    this.filter.keyword = '';
                    return;
                }
            }

            if (len >= 2) {
                const curr = this.locator;
                const next = Object.assign({}, curr);
                const LOCATIONS = this.C.LOCATIONS;
                next.city = phrase.substr(0, 2);
                if (LOCATIONS.get(next) && !LOCATIONS.equal(curr, next, false)) {
                    this.hub.go('tree.rebranch', { locator: next } );
                    return;
                }
            }

            if (phrase !== n) {
                this.filter.keyword = phrase;
                return;
            }

            this.filtering();
        },

        compare(v1, v2) {
            let t1 = 0;
            let t2 = 0;
            let s1 = false;
            let s2 = false;
            const ma1 = v1.attr;
            const ma2 = v2.attr;
            if (ma1) {
                const s = ma1.status.flag;
                if (s && s % 32) {
                    s1 = true;
                }
                t1 = ma1.t;
                if (t1 === undefined || t1 === null) {
                    t1 = 0;
                }
            }
            if (ma2) {
                const s = ma2.status.flag;
                if (s && s % 32) {
                    s2 = true;
                }
                t2 = ma2.t;
                if (t2 === undefined || t2 === null) {
                    t2 = 0;
                }
            }
            if ((s1 && s2) || (!s1 && !s2)) {
                return t2 - t1;
            }
            return s2 ?  1 : -1;
        },

        sort(view) {
            if (!view) {
                view = this.current.view;
            }
            if (!view) {
                return;
            }
            if (this.filter.order.timeUpdate) {
                view.sort(this.compare);
            }
        },

        filtering(delay, force) {

            if (!force && this.timer.filter) {
                clearTimeout(this.timer.filter);
                this.timer.filter = setTimeout(this.filtering, delay || this.delay);
                return;
            }

            if (!this.current.base || !this.current.base.length) {
                return;
            }

            // let start = new Date().getTime();


            const view = [];
            const base = this.current.base.slice();

            let multiple = false;
            let keyword = this.filter.keyword.trim();
            if (keyword && keyword.length > 3) {
                const index = keyword.indexOf(",");
                if (index >= 0) {
                    const array = this.UTIL.str.split(keyword, ",", true);
                    if (array.length > 0) {
                        multiple = true;
                        keyword = array;
                    }
                }
            }

            if (this.filter.order.dir === 'desc') {
                base.reverse();
            }

            const len = base.length;
            for (let i = 0; i < len; i += 1) {
                const item = base[i];
                if (!item) {
                    continue;
                }
                try {
                    if (this.filterone(item, keyword, multiple)) {
                        view.push(item);
                    }
                } catch (ex) {
                    console.error(ex);
                }
            }

            this.sort(view);

            // let end = new Date().getTime();
            // console.log('filter', 'consume', end - start);
            // start = new Date().getTime();

            this.current.view = view;
            this.hub.go('tree.masonlay');
            this.timer.filter = null;

            // end = new Date().getTime();
            // console.log('filter', 'consume 2', end - start);

        },

        filterone(v, keyword, multiple) {

            const link = v.link;
            if (!link) {
                return false;
            }
            
            const f = this.filter;
            const UTIL = this.UTIL;
            const ATTRZ = this.C.ATTRZ;

            const ctrl = this.mode.ctrl;

            // keyword filter
            if (keyword) {
                if (multiple) {
                    let include = false;
                    const len = keyword.length;
                    for(let i = 0; i < len; i++) {
                        const onekey = keyword[i];
                        const keylen = onekey.length;
                        if (keylen <= 2) {
                            continue;
                        }
                        if (v.code.indexOf(onekey) >= 0) {
                            if (onekey.length >= 4) {
                                return true;
                            }
                            include = true;
                            break;
                        }
                    }
                    if (!include) {
                        return false;
                    }
                } else {
                    if (v.code.indexOf(keyword) >= 0) {
                        if (keyword.length >= 4) {
                            return true;
                        }
                    } else {
                        return false;
                    }
                }
            }

            // attr filter
            const ma = v.attr;
            if (!ma) {
                return ctrl;
            }

            const maex = v.attrex;
            if (maex && f.districtsN) {
                if (!maex.location) {
                    return false;
                }
                if (!UTIL.map.containsOne(f.districts, maex.location.districts)) {
                    return false;
                }
            }

            const status = ma.status.flag;
            if (!status && ctrl) {
                return true;
            }

            const and = UTIL.flag.and;
            if (!and(f.statusF, status)) {
                return false;
            }

            if (!and(f.typeF, ma.type)) {
                return false;
            }
            
            if (f.body.birthN) {
                if (!ma.body.birth) {
                    return false;
                }
                if (!UTIL.num.ins(ma.body.birth, f.body.birth, 'lower', 'upper')) {
                    return false;
                }
            }

            if (f.body.chestN) {
                if (!ma.body.chest) {
                    return false;
                }
                if (!UTIL.num.ins(ma.body.chest, f.body.chest, 'lower', 'upper')) {
                    return false;
                }
            }

            if (f.body.heightN) {
                if (!ma.body.height) {
                    return false;
                }
                if (!UTIL.num.ins(ma.body.height, f.body.height, 'lower', 'upper')) {
                    return false;
                }
            }

            if (!and(f.body.cosmeticF, ma.body.cosmetic)) {
                return false;
            }

            if (f.star.V) {
                const value = ma.rating.overall;
                if (!value) {
                    return false;
                }
                const overall = value * 1;
                if (isNaN(overall)){
                    return false;
                }
                if (overall < f.star.V.value) {
                    return false;
                }
            }

            const frating = f.rating;
            if(Object.keys(frating).length) {
                for(let k in frating) {
                    const value = ma.rating[k];
                    if (!value) {
                        return false;
                    }
                    const rating = value * 1;
                    if (isNaN(rating)) {
                        return false;
                    }
                    if (rating < frating[k]) {
                        return false;
                    }
                }
            }

            for(let serv in ATTRZ.service) {
                const flagger = f.service[serv + 'F'];
                if (!and(flagger, ma.service[serv])) {
                    return false;
                }
            }

            if (!and(f.characterF, ma.character.flag)) {
                return false;
            }

            // TODO price ...

            return true;
        },

    };

    Comp.mounted = function() {
        this.cfg();
        this.hub.registers(this.cid, this, {
            'filter.go' : (req) => {
                let delay = this.delay;
                if (req.payload) {
                    delay = req.payload.delay || this.delay;
                }
                this.filtering(delay);
            },
            'filter.sort': () => {
                this.sort(this.current.view);
            }
        });
    };

    Comp.unmounted = function() {
        this.hub.unregister(this.cid);
        if (this.diswatch) {
            this.UTIL.func.invoke(this.diswatch);
        }

    };

    return Comp;

};

export default init;
