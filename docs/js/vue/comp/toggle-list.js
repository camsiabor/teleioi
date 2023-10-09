



const TEMPLATE =
`
<div style="display: flex; flex-wrap: wrap; " >
    <slot name="head" :bind="$props" :container="self">
        <span @click="flip()" v-if="title" style="cursor: pointer;">
            <span :class="renderClassTitle()" :style="renderStyleTitle()">
                {{title}}
            </span>
        </span>
    </slot>    
    <span v-for="(item, key) in dataset"    
          @click="onToggle(item, key)">
        <slot :bind="$props"   
              :item="item" :key="key" :container="self">        
            <span v-if="weightEval(item)"
                  :style="renderStyle(item, key)"            
                  :class="renderClass(item, key)" >
                  {{ renderLabel(item, key) }}    
            </span>
        </slot>                    
    </span>
    <span @click="weightFlip()" v-if="limitWeight > 0">
        <slot name="more" :bind="$props" :container="self">
            <span :class="renderClass(Object, '')" 
                  :style="renderStyle(Object, '')" 
                  style="border: 1px dotted rgb(220,220,220) ; ">
                  {{ existWeight ? '...' : '收起' }}
            </span>
        </slot>
    </span>               
</div>
`;



async function init() {
    const Comp = {};
    Comp.name = 'toggle-list';
    Comp.template = TEMPLATE;

    Comp.emits = [
        'update:value',
        'update:counter',
        'update:flagger',
        'update:concater',
    ];

    Comp.props = {

        _title: String,
        _styleTitle: {
            type: String,
            default: '',
        },
        _styleTitleExtra: String,
        _classTitleExtra: String,

        _dataset: Object,

        _fieldIcon: String,
        _fieldLabel: String,
        _fieldActive: String,
        _fieldWeight: String,

        _limitWeight: Number,
        _existWeight: Number,
        _styleGround: {
            type: String,
            default: '',
        },
        _styleActive: {
            type: String,
            default: '',
        },
        _styleCommon: {
            type: String,
            default: '',
        },
        _classTitle: {
            type: String,
            default: 'gmg-toggled-list-title',
        },
        _classGround: {
            type: String,
            default: 'gmg-toggled-list-ground',
        },
        _classActive: {
            type: String,
            default: 'gmg-toggled-list-active',
        },
        _classCommon: {
            type: String,
            default: 'gmg-toggled-list-common',
        },
        _multiple: {
            type: Boolean,
            default: true,
        },

        _toggled: Object,
        _toggledFilter: Function,
        _toggledAssigner: Function,

        value: Object,
        counter: Number,
        flagger: Number,

        concater: String,
        concaterSplitter: {
            type: String,
            default: ',',
        },

        _callback: Function | Array,
    };

    Comp.data = function() {

        const d = {
            self: this,
        };
        for(let _k in Comp.props) {
            if (_k.charAt(0) === '_') {
                const k = _k.substring(1);
                d[k] = this[_k];
            }
        }

        if (!d.toggled) {
            d.toggled = {};
        }
        if (d.limitWeight === undefined || d.limitWeight === null) {
            d.limitWeight = 1;
        }
        if (d.existWeight === undefined || d.existWeight === null) {
            d.existWeight = d.limitWeight;
        }

        return d;
    };

    const { mapState } = window['Vuex'];
    Comp.computed = {
        ...mapState([ 'UTIL' ])
    };

    Comp.watch = {
        'flagger': function() {
            this.flaggerLoad();
        },
        'concater': function() {
            this.concaterLoad();
        }
    };

    Comp.methods = {

        renderLabel(item) {
            let express = '';
            const fieldIcon = this['fieldIcon'];
            const fieldLabel = this['fieldLabel'];
            if (fieldLabel && item[fieldLabel]) {
                express = express + item[fieldLabel];
            }
            if (fieldIcon && item[fieldIcon]) {
                express = express + item[fieldIcon];
            }
            return express;
        },

        renderStyle(item, key) {
            const active = this.isToggled(item, key);
            const ground = this.styleGround || '';
            const curr = (active ? this.styleActive : this.styleCommon) || '';
            return ground + ' ' + curr;
        },
        renderStyleTitle() {
            let style = '';
            if (this.styleTitle) {
                style = this.styleTitle;
            }
            if (this.styleTitleExtra) {
                style = style + ' ' + this.styleTitleExtra;
            }
            return style;
        },
        renderClass(item, key) {
            const active = this.toggled[key];
            const ground = this.classGround || '';
            const curr = (active ? this.classActive : this.classCommon) || '' ;
            return ground + ' ' + curr;
        },

        renderClassTitle() {
            let clazz = '';
            if (this.classTitle) {
                clazz = this.classTitle;
            }
            if (this.classTitleExtra) {
                clazz = clazz + ' ' + this.classTitleExtra;
            }
            return clazz;
        },

        onPositive(item, key) {
            let assign = item;
            if (this.toggledAssigner) {
                const curr = this.toggled[key];
                assign = this.UTIL.func.invoke(this.toggledAssigner, { key, item, curr, positive: true })
            }
            if (!assign) {
                return;
            }
            if (!this.multiple) {
                this.clear();
            }
            this.toggled[key] = assign;
            this.counting(1);
            if (!this.multiple) {
                this.$emit('update:value', item);
            }

        },

        onNegative(item, key) {
            delete this.toggled[key];
            this.counting(-1);
            if (!this.multiple) {
                this.$emit('update:value', null);
            }
        },

        onToggle(item, key) {

            let positive = !this.toggled[key];
            if (positive) {
                this.onPositive(item, key);
            } else {
                this.onNegative(item, key);
            }

            if (this.fieldActive) {
                item[this.fieldActive] = positive;
            }

            this.flaging(key, positive);
            
            this.concating(key, positive);

            if (this.callback) {
                this.UTIL.func.invoke(this.callback, { positive, item, key, src: this } );
            }
        },

        isToggled(item, key) {
            const curr = this.toggled[key];
            if (curr === undefined || curr === null) {
                return false;
            }
            if (this.toggledFilter) {
                if (!UTIL.func.invoke(this.toggledFilter, { item, key, curr, src: this })) {
                    return false;
                }
            }
            return curr;
        },

        weightFlip() {
            if (this.existWeight) {
                this.existWeight = 0;
            } else {
                this.existWeight = this.limitWeight;
            }
        },



        weightEval(item) {
            const fw = this.fieldWeight;
            if (!fw || !item[fw]) {
                return true;
            }
            const v = item[fw];
            return v && v > this.existWeight;
        },

        counting(delta) {
            let c = this.counter * 1;
            if (c === undefined || isNaN(c)) {
                c = 0;
            }
            c = c + delta;
            if (c < 0) {
                c = 0;
            }
            this.$emit('update:counter', c);
        },

        flaging(key, positive) {
            const code = key * 1;
            if (isNaN(code)) {
                return;
            }
            let v = this.flagger;
            if (v === undefined || v === null) {
                v = 0;
            }

            if (positive) {
                if (this.multiple) {
                    v = v | code;
                } else {
                    v = code;
                }
            } else {
                v = v ^ code;
            }
            this.$emit('update:flagger', v);
        },

        concating(key, positive) {
            const splitter = this.concaterSplitter;
            let v = this.concater;
            if (v === undefined || v === null) {
                v = '';
            }
            if (positive) {
                if (!v) {
                    v = '';
                }
                if (v.length === 0 || !this.multiple) {
                    v = key;
                } else if (v.indexOf(key) < 0) {
                    v = v + splitter + key;
                }
            } else {
                const array = v.split(splitter).filter( ele => ele !== key);
                v = array.join(splitter);
            }
            this.$emit('update:concater', v);
        },

        flip() {
            const count = Object.keys(this.toggled).length;
            if (count) {
                this.frame = this.snapshot();
                this.clear();
                if (this.callback) {
                    this.UTIL.func.invoke(this.callback, {
                        src: this,
                        positive: false,
                        frame: this.frame,
                    } );
                }
                return;
            }
            if (this.frame) {
                Object.assign(this.toggled, this.frame.toggled);
                this.$emit('update:value', this.frame.value);
                this.$emit('update:counter', this.frame.counter);
                this.$emit('update:flagger', this.frame.flagger);
                this.$emit('update:concater', this.frame.concater);
                this.frame = null;
                if (this.callback) {
                    this.UTIL.func.invoke(this.callback, {
                        src: this,
                        frame: null,
                        positive: true,
                    } );
                }
            }

        },

        snapshot() {
            return {
                value: this.value,
                toggled: Object.assign({}, this.toggled),
                counter: Object.keys(this.toggled).length,
                flagger: this.flagger,
                concater: this.concater,
            };
        },

        clear() {
            Object.keys(this.toggled).map(k => delete this.toggled[k]);

            this.$emit('update:counter', 0);
            this.$emit('update:flagger', 0);
            this.$emit('update:concater', '');
            if (!this.multiple) {
                this.$emit('update:value', null);
            }
        },

        flaggerLoad() {
            if (this.flagger === undefined || this.flagger === null) {
                return;
            }
            const v = this.flagger * 1;
            if (!v) {
                this.clear();
                return;
            }
            for(let k in this.dataset) {
                const code = k * 1;
                if ((v & code)) {
                    this.toggled[k] = this.dataset[k];
                } else {
                    delete this.toggled[k]
                }
            }
        },
        concaterLoad() {
            if (this.concater === undefined || this.concater === null) {
                return;
            }
            const v = this.concater;
            if (!v) {
                this.clear();
                return;
            }
            for(let k in this.dataset) {
                if (v.indexOf(k) >= 0) {
                    this.toggled[k] = this.dataset[k];
                } else {
                    delete this.toggled[k]
                }
            }
        }
    };

    Comp.mounted = function() {
        this.flaggerLoad();
        this.concaterLoad();
    };



    return Comp;
}

export default init;
