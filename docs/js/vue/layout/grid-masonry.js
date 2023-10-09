const template =
`
<div>
    <div v-for="(item, index) in dataset" >
        <div                      
            class="grid-masonry-item"         
            :style="{ width: layout.col.width + 'px' }" >
            <slot 
                :key="item[datakey]"
                :item="item"                                                     
                :index="index"                                                 
                :datakey="datakey"
                :container="self" >                
            </slot>            
        </div>
    </div>
    
</div>
`;


const init = async function () {


    const Comp = {};
    Comp.name = 'grid-masonry';
    Comp.template = template;

    Comp.props = {
        dataset: Array,
        datakey: String,
        gutter: {
            type: Number,
            default: 3,
        },
        delay : {
            type: Object,
            default: {
                relay: 125,
                reload: 600,
            }
        },
        min: {
            type: Number,
            default: 100,
        },
        debug: Boolean,
    };


    Comp.data = function () {
        const d = { self: this };
        /*
        for(let _k in Comp.props) {
            const k = _k.substring(1);
            d[k] = this[_k];
        }
         */
        d.layout= {
            divider: 1,
                col : {
                width: 350,
            },
            timer: {
                relay: null,
                    reload: null,
            },
            window: {
                width: window.innerWidth,
                    height: window.innerHeight,
            },
        };
        return d;
    };

    Comp.watch = {
        'min' : function() {
            this.masonize(this.delay.reload);
        },
        'dataset' : function() {
            this.masonize(this.delay.reload);
        },

    };

    Comp.methods = {
        
        layoutize() {

            const el = this.$el;

            if (!el) {
                return;
            }

            const rect = el.getBoundingClientRect();
            const width = rect.width;

            let divider = Math.floor(width / this.min);

            this.layout.divider = divider;
            this.layout.col.width = Math.floor(width / divider * 0.99 ) - 1;
        },

        masonize(delay) {

            if (delay) {
                if (this.layout.timer.reload) {
                    clearTimeout(this.layout.timer.reload);
                }
                this.layout.timer.reload = setTimeout(this.masonize, delay);
                return;
            }

            if (!this.$el) {
                return;
            }

            this.layout.window.width = window.innerWidth;
            this.layout.window.height = window.innerHeight;

            this.layoutize();

            if (this.layout.inst) {
                this.layout.inst.destroy();
                /*
                this.layout.inst.reloadItems()
                this.layout.inst.layout()
                return;
                 */
            }
            this.layout.inst = new Masonry(this.$el, {
                gutter: this.gutter,
                columnWidth: this.layout.col.width,
                itemSelector: '.grid-masonry-item',
                percentPosition: true,
            });

        },

        masonizeAuto() {
            if (this.layout.window.width === window.innerWidth || 0 === window.innerWidth) {
                return;
            }
            this.masonize(this.delay.reload);
            console.log('masonize', window.innerWidth, window.innerHeight);
        },

        masonlay(delay) {
            if (delay) {
                if (this.layout.timer.relay) {
                    clearTimeout(this.layout.timer.relay);
                }
                this.layout.timer.relay = setTimeout(this.masonlay, delay);
                return;
            }
            if (this.layout.inst) {
                this.layout.inst.layout();
            }
        }
    };

    Comp.mounted = function () {

        this.observer = new IntersectionObserver( entries => {
            const target = entries[0];
            if (!target.isIntersecting) {
                return;
            }
            this.observer.disconnect();
            this.masonize();
        });

        this.observer.observe(this.$el);

        window.addEventListener('resize', this.masonizeAuto);
    };

    Comp.unmounted = function () {
        if (this.observer) {
            this.observer.disconnect();
        }
        window.removeEventListener('resize', this.masonizeAuto);
    };

    return Comp;

}


export default init;