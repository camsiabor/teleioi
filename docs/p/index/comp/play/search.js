const TEMPLATE =
    `
   
<div class="row">
    <div class="col-12">
        <div class="input-group input-group-sm mb-3">
            
            <button type="button" 
                  class="btn btn-sm btn-outline-danger"
                  style="font-weight: bold;"
                  @click="ui.modal.info = true"
            >
              ?
            </button>

            <bs-dropdown
                :auto-close="true"
                title-icon="bi-geo"
                title-class="btn-sm btn-danger"
                :title=" (C.LOCATIONS.getProvince(locator) || '省').name_cn"
                :dataset="[
                    () => {
                        const ret = [];
                        const pros = C.LOCATIONS.getProvinces(locator);
                        for(let code in pros) {
                            const pro = pros[code];
                            ret.push({
                                title: pro.name_cn + ' ' + pro.code,
                                active: locator.province === code,
                                click: () => {
                                    locator.province = code;
                                    locator.city = pro.default;
                                }
                            });
                        }
                        return ret;
                    }
                ]"
            >                
            </bs-dropdown>
                                                                                                     
            <bs-dropdown
                :auto-close="true"
                title-icon="bi-geo-alt"
                title-class="btn-sm btn-danger"
                :title=" (C.LOCATIONS.getCity(locator) || '城市').substring(0, 2) "
                :dataset="[
                    () => {
                        const ret = [];
                        const cities = C.LOCATIONS.getCities(locator);
                        for(let code in cities) {
                            const city = cities[code];
                            ret.push({
                                title: city,
                                active: locator.city === code,
                                click: () => {
                                    locator.city = code;
                                }
                            });
                        }
                        return ret;
                    }
                ]"
            >                
            </bs-dropdown>

            <input type="text" class="form-control" placeholder="左边换城, 这输编号" v-model="filter.keyword">
                            
            <bs-dropdown                                        
                :auto-close="true"
                title-icon="bi-gear"                    
                title-class="btn-sm btn-outline-danger"
                :dataset="[                                         
                    { 
                        title: '设置',
                        icon: 'bi-gear', 
                        click: () => ui.modal.config = true, 
                    },
                    '-',
                    '排序', 
                    { 
                        title: '按更新时间', 
                        icon: 'bi-sort-down', 
                        active: filter.order.timeUpdate,
                        click: () => filter.order.timeUpdate = true, 
                    },
                    { 
                        title: '按编号大小', 
                        icon: 'bi-sort-numeric-down-alt',
                        active: !filter.order.timeUpdate, 
                        click: () => filter.order.timeUpdate = false, 
                    },
                    '布局', 
                    { 
                        title: '平铺', 
                        icon: 'bi-kanban', 
                        active: !ui.layout.compact,
                        click: () => ui.layout.compact = false, 
                    },
                    { 
                        title: '紧密', 
                        icon: 'bi-kanban-fill',
                        active: ui.layout.compact, 
                        click: () => ui.layout.compact = true, 
                    },
                    '最小宽度',
                    () => {
                        const ret = [];
                        const array = [ 150, 200, 300, 350, 400, 500 ];
                        for(let i = 0; i < array.length; i++) {
                            const w = array[i];
                            ret.push({                                    
                                title: w,      
                                icon: 'bi-layout-sidebar-inset',                
                                active: ui.layout.min === w,              
                                click: () => ui.layout.min = w,                                                                        
                            });
                        }
                        return ret; 
                    },                         
                    '-',
                    { 
                        title: '说明', 
                        icon: 'bi-info-circle',                             
                        click: () => ui.modal.info = true, 
                    },
                ]"
            >
            </bs-dropdown>                                                                
            
            <button type="button"
                    style="font-weight: bold;"
                    class="btn btn-sm btn-outline-danger"                          
                    @click="ui.modal.filter = !ui.modal.filter">
                    <i class="bi bi-command"></i>
                    {{ ui.modal.filter ? '隐藏' : '过滤' }} 
            </button>
            
        </div>
    </div>
</div>
    
  
`;


const init = async function (opts) {

    const Loader = opts.loader;
    const COMPONENTS = await Loader.imports(opts, {
        'bs-dropdown': '/js/vue/comp/bs-dropdown.js',
    });

    const Comp = {};
    Comp.name = 'play-search';
    Comp.template = TEMPLATE;
    Comp.components = COMPONENTS;

    const {mapState} = window['Vuex'];
    Comp.computed = {
        ...mapState([
            'C', 'locator', 'filter', 'hub', 'ui'
        ]),
    };


    Comp.methods = {

        toggleLocation() {
            this.locatorNext.toggled = !this.locatorNext.toggled;
        },

    };

    return Comp;

};

export default init;
