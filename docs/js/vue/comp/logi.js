


const template =
`
<div>
    <div    v-for="(item,index) in list.slice().reverse()" 
            style="font-size: 0.8em;" 
            :style="{ color: item.color, border: '1px solid ' + item.color, margin: '2px' }">
        
        <span style="margin: 1px;">{{item.type}}  |  {{util.time.formatDatetime(item.time)}}  |  {{item.tag}} | </span>
        <span v-if="item.chunk" @click="toggleChunk(item)" style="font-weight: bold; margin: 2px; cursor: pointer;" :style="{ border: '1px dotted ' + item.color }" > 
            {{ item.chunkExpand ? '-' : '+' }}
        </span>                        
        <pre v-if="item.data" :style="{ color: item.color }">{{item.data}}</pre>        
        <pre v-if="item.chunk && item.chunkExpand" :style="{ color: item.color }">{{item.chunk}}</pre>
    </div>
</div>
`

const colors = {
  INFO: 'grey',
  WARN: 'orange',
  ERRR: 'red',
};

async function init(opts) {

    const Loader = opts.loader;
    const Util = await Loader.import('/js/util.js', opts);

    const Comp = {};
    Comp.template = template;
    Comp.props = {
        list: {
            type: Array,
            default: [],
        },
        limit: {
            type: Number,
            default: 10,
        },
        console: {
            type: Object,
            default: console,
        }
    };

    Comp.data = function() {
        return {
            util: Util,
        };
    };

    Comp.methods = {

        log(type, tag, data, chunk, opts) {
            type = type.toUpperCase();
            const tobe = { type, tag, data, chunk };
            if (opts) {
                Object.assign(tobe, opts);
            }
            this.push(tobe);
            switch (type) {
                case 'WARN':
                    this.console.warn('WARN', tag, data, chunk);
                    break;
                case 'ERRR':
                    this.console.trace('ERRR', tag, data, chunk);
                    break;
                default:
                    this.console.info('INFO', tag, data, chunk);
                    break;
            }
        },

        info(tag, data, chunk, opts) {
            this.log('INFO', tag, data, chunk, opts);
        },

        warn(tag, data, chunk, opts) {
            this.log('WARN', tag, data, chunk, opts);
        },

        error(tag, data, chunk, opts) {
            this.log('ERRR', tag, data, chunk, opts);
        },

        push(one) {
            one.time = one.time || new Date();
            one.type = one.type || 'INFO';
            one.tag = one.tag || '';
            one.color = (one.color || colors[one.type]) || 'grey';
            if (this.list.length >= this.limit) {
                this.list.shift();
            }

            this.list.push(one);
            this.$forceUpdate();
        },
        clear() {
            this.list.length = 0;
            this.$forceUpdate();
        },
        toggleChunk(item) {
            item.chunkExpand = !item.chunkExpand;
            this.$forceUpdate();
        },
    };

    return Comp;


}


export default init;