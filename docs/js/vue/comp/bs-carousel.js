


const TEMPLATE =
`
<div :id="cid"                        
    data-interval="false"
    data-bs-touch="true"
    data-bs-ride="false"
    data-bs-interval="false"
    class="carousel carousel-fade">
    
    <!-- carousel indicators -->
    <div v-if="doIndicators" 
         style="position: absolute; bottom: 1px; z-index: 5; justify-content: center; display: flex; width: 70%; margin-left: 15%; margin-right: 15%;">    
        <input            
            type="range" class="form-range" 
            min="0" :max="size - 1" step="1" v-model="current"
            style="opacity: 0.5; width: 90%; " 
            @change="to(current)"
            />
    </div>
   
    <!-- carousel inner -->                  
    <div class="carousel-inner">                                          
        <div v-for="(src,i) in view" :key="src" 
             class="carousel-item" 
             data-bs-interval="false"
             :class="{ active : i === current}"             
             :style="{ cursor: hasZoom ? 'zoom-in' : '' }"                                                                                    
            >                        
            <slot :src="src" :index="i" :container="self">
                <img-lazy                                                                                                                                                  
                    :datasrc="src"
                    :prefix="prefix" 
                    :transit="transit"
                    :stylex="imgstylex"
                    :classx="imgclassx"
                    :imgloaded="imgloaded"
                    :imgclicked=" [ imgclicked, zooming ] "                    
                    alt=""          
                    class="card-img"
                    style="min-width: 64px; min-height: 64px;"                                              
                    />
            </slot>                                                
        </div>                    
    </div>
    <!-- carousel control -->
    <button v-if="doControl"
            type="button"            
            style=""
            class="carousel-control-prev"
            data-bs-slide="prev"             
            @click="prev()"                      
            >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden"></span>
    </button>
    <button v-if="doControl"
            type="button"            
            class="carousel-control-next"
            data-bs-slide="next" 
            @click="next()"
            >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden"></span>
    </button>
</div>
`;


async function init(opts) {

    const Loader = opts.loader;
    const COMPONENTS = await Loader.imports(opts, {
        'img-lazy': '/js/vue/comp/imglazy.js',
    });

    const Comp = {};
    Comp.name = 'bs-carousel';
    Comp.template = TEMPLATE;

    Comp.components = COMPONENTS;

    Comp.props = {
        uid: String,
        title: String,

        prefix: String,
        first: String,
        dataset: Array,
        transit: String,

        imgclassx: String,
        imgstylex: String,
        imgloaded: Function,
        imgclicked: Function,

        hasZoom : {
            type: Boolean,
            default: true,
        },

        hasControl: {
            type: Boolean,
            default: true,
        },

        hasIndicators: {
            type: Boolean,
            default: true,
        },

    };

    Comp.data = function() {
        let cid = this.uid;
        if (!cid) {
            cid = 'bs_caro_' + this.UTIL.uuid.gen();
        }
        return {
            cid,
            self: this,
            current: 0,
            zoomer: {},
        }
    };

    const { mapState } = window['Vuex'];

    Comp.computed = {

        ...mapState([ 'VUTIL' ]),

        view() {
            let view = [];
            if (this.first) {
                view.push(this.first);
            }
            if (this.dataset) {
                view = view.concat(this.dataset);
            }
            return view;
        },

        size() {
            let total = 0;
            if (this.first) {
                total = 1;
            }
            if (this.dataset) {
                total = total + this.dataset.length;
            }
            return total;
        },

        doControl() {
            if (!this.hasControl) {
                return false;
            }
            return this.size > 1;
        },

        doIndicators() {
            if (!this.hasIndicators) {
                return false;
            }
            return this.size > 1;
        },

        me() {
            if (this.inst) {
                return this.inst;
            }
            this.inst = new bootstrap.Carousel(this.$el, {
                ride: false,
                interval: false,
            });
            return this.inst;
        },
    };

    Comp.methods = {

        to(pos) {
            pos = pos * 1;
            this.me.to(pos);
            if (this.current !== pos) {
                this.current = pos;
            }
        },

        prev() {
            let pos = this.current - 1;
            if (pos < 0) {
                pos = this.size - 1;
            }
            this.to(pos);
        },

        next() {
            let pos = this.current + 1;
            if (pos >= this.size) {
                pos = 0;
            }
            this.to(pos);
        },

        async zooming(img) {
            if (!this.hasZoom) {
                return;
            }

            if (this.zoomer.inst) {
                this.zoomer.app.unmount();
            }

            const MODS = await Loader.imports(opts, {
                'bs-modal': '/js/vue/comp/bs-modal.js',
                'bs-gallery': '/js/vue/comp/bs-gallery.js',
            });

            const curr = img.datasrc;
            const array = [ this.first ]
                            .concat(this.dataset)
                            .filter(path => path !== curr);
            array.unshift(curr);

            const dataset = [];
            for(let i = 0; i < array.length; i++) {
                dataset.push({
                    path: array[i],
                });
            }

            const GALLERY = Vue.defineComponent(MODS['bs-gallery']);

            this.zoomer = this.VUTIL.createVM({
                ctx: this,
                comp: MODS['bs-modal'],
                props: {
                    title: this.title,
                },
                uses: [ this.$store ],
                global : this.PROVIDES,
                provides: this.PROVIDES,
                children: [
                    Vue.h(GALLERY,  {
                        dataset: dataset,
                        datafield: 'path',
                        dataprefix: this.prefix,

                        layout: 'simple',
                        imgStyle: {
                            'min-height': '20vh',
                        },
                        minCardWidth: 300,
                    })
                ]
            });

            this.zoomer.inst.toggle();
        },


    };

    Comp.unmounted = function() {
        if (this.zoomer.app && this.zoomer.app.unmount) {
            this.zoomer.app.unmount();
        }
    }


    return Comp;
}


export default init;