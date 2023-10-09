const TEMPLATE =
`
<div class="input-group input-group-sm">
    <span style="cursor: pointer" v-if="label"
          :style="stylex"                               
          class="input-group-text bg-light"          
          @click="$emit('update:value', new Date().getTime())">
        {{label}}
    </span>
    <input 
        type="text"              
        v-model="plain"
        style="font-size: 0.65em; "
        :style="stylex"    
                                     
        class="form-control form-control-sm"
        >
    <span style="cursor: pointer" v-if="showAdd"                    
          class="input-group-text bg-light"
          @click="$emit('update:value', value + 24 * 3600 * 1000)" 
          >
        +
    </span>
    <span style="cursor: pointer" v-if="showAdd"                     
          class="input-group-text bg-light"
          @click="$emit('update:value', value - 24 * 3600 * 1000)"
          >
        -
    </span>
    <button type="button" v-if="showOther" 
            class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" >      
    </button>                   
    <ul class="dropdown-menu" v-if="showOther">
        <li>
            <a class="dropdown-item"  style="font-size: 0.7em;" 
               @click="$emit('update:value', new Date().getTime())">
                now
            </a>            
        </li>
        <li><hr class="dropdown-divider"></li>
        <li v-for="(it) in [ 3, 5, 7, 10, 15, 30 ]">
            <a class="dropdown-item" style="font-size: 0.7em;" 
               @click="$emit('update:value', value - it * 24 * 3600 * 1000)">
                -{{it}}
            </a>            
        </li>
        <li><hr class="dropdown-divider"></li>        
        <li v-for="(it) in [ 3, 5, 7, 10, 15, 30 ]">
            <a class="dropdown-item"  style="font-size: 0.7em;" 
               @click="$emit('update:value', value + it * 24 * 3600 * 1000)">
                +{{it}}
            </a>            
        </li>                       
        <li><hr class="dropdown-divider"></li>
        <li>
            <a class="dropdown-item"  style="font-size: 0.7em;" 
               @click="$emit('update:value', original)">
                reset
            </a>            
        </li>        
    </ul>  
</div>
`;



async function init(opts) {

    const Loader = opts.loader;
    const { UTIL } = await Loader.imports(opts, {
        'UTIL': '/js/util.js',
    });
    const Comp = {};
    Comp.name = 'bs-date-wrapper';
    Comp.template = TEMPLATE;
    Comp.emits = [
        'update:value', 'update:chain'
    ];
    Comp.props = {
        label: String,
        chain: String,
        value: Number | String,
        change: Function,
        showAdd: {
            type: Boolean,
            default: true,
        },
        showOther: {
            type: Boolean,
            default: true,
        }
    };

    Comp.data = function() {
        const v = this.value * 1;
        let infer;
        if (UTIL.num.gte0(v)) {
            infer = {
                date: new Date(v),
                plain: UTIL.time.formatDatetime(v),
            };
        } else {
            infer = {
                date: new Date(0),
                plain: '',
            };
        }
        return  {
            UTIL,
            ...infer,
            stylex: '',
            original: v,
        };
    };
    Comp.watch = {
        'value': function(n, o) {
            if (n === this.original) {
                this.stylex = '';
            } else {
                if (isNaN(n)) {
                    this.stylex = 'color: red';
                } else {
                    this.stylex = n > this.original ? 'color: orange' : 'color: blue';
                }
            }
            if (!UTIL.num.gte0(n)) {
                this.plain = '';
                this.date = new Date(0);
                this.$emit('update:chain', '');
            } else {
                this.date = new Date(n * 1);
                this.plain = UTIL.time.formatDatetime(this.date);
                this.$emit('update:chain', this.plain);
            }
            if (this.change) {
                this.change({
                    n, o,
                    src: this,
                });
            }
        },
        'plain': function(n) {
            if (!n || n.length <= 6) {
                return;
            }
            const time = Date.parse(n);
            if (!isNaN(time)) {
                this.date = new Date(n);
                this.$emit('update:value', time);
                this.$emit('update:chain', n);
            }
        }
    };



    return Comp;
}

export default init;