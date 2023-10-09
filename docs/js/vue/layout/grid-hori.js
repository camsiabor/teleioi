
const TEMPLATE =
`
<div>
    <div class="row g-1 d-flex flex-wrap">
        <div :class="layout.col.class"
             v-for="(item,idx) in dataset" >
            <slot 
                :key="item[datakey]"
                :item="item"                                                 
                :index="idx"
                :container="self">                
            </slot>            
        </div>
    </div>
</div>
`;

const init = async function () {

    const Comp = {};
    Comp.name = 'grid-hori';
    Comp.template = TEMPLATE;

    Comp.props = {
        dataset: Array,
        datakey: String,
        min: {
            type: Number,
            default: 100,
        },
        reference: String,
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
            row: {},
            col: {},
            divider: 1,
                window: {
                width: window.innerWidth,
            }
        };

        return d;
    };

    Comp.watch = {
        'min': function(n, o) {
            // console.log('watch', 'min', n, o);
            this.layoutize();
        }
    };

    Comp.methods = {

        layoutize() {

            this.layout.window.width = this.width();

            const el = this.$el;
            const rect = el.getBoundingClientRect();
            const width = rect.width || 1;

            let divider = Math.floor(width / this.min);
            switch (divider) {
                case 0:
                    divider = 1;
                    break;
                case 1: case 2: case 3:
                    break;
                case 4: case 5:
                    divider = 4;
                    break;
                case 6: case 7: case 8: case 9: case 10: case 11:
                    divider = 6;
                    break;
                default:
                    divider = 12;
                    break;
            }

            this.layout.divider = divider;
            this.layout.col.span = 12 / this.layout.divider;
            this.layout.col.class = 'col-' + this.layout.col.span;

            // console.log('layoutize', 'width', width, 'min', this.min, 'divider', divider);
        },

        masonize() {
            this.layoutize();
        },

        masonlay() {
            this.layoutize();
        },

        masonizeAuto() {
            const width = this.width();
            if (this.layout.window.width === width || 0 === width) {
                return;
            }
            this.masonize();
            console.log('masonize', this.layout.window.width);
        },

        width() {
            const ref = this.reference || 'parent';
            if (ref === 'parent') {
                return this.$parent.$el.getBoundingClientRect().width;
            }
            return window.innerWidth;
        }

    };


    Comp.mounted = function () {

        this.observer = new IntersectionObserver( entries => {
            const target = entries[0];
            if (!target.isIntersecting) {
                return;
            }
            this.observer.disconnect();
            this.layoutize();
        });

        this.observer.observe(this.$el);

        // this.layoutize();

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