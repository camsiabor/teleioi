




async function init() {

    const Comp = {};
    Comp.name = 'bs-rating';
    Comp.emits = [
        'update:value'
    ];
    Comp.props = {

        container: {
            type: String,
            default: 'div'
        },
        containerProps: {
            type: Object,
            default: {},
        },

        title: String,
        titleStyle: {
            type: String,
            default: '',
        },
        titleClass: {
            type: String,
            default: '',
        },

        symbol: String,
        symbolStyle: {
            type: String,
            default: '',
        },
        symbolClass: {
            type: String,
            default: '',
        },

        symbolRemain: String,

        value: Number | String,
        delta: Number | String,
        lower: Number | String,
        upper: Number | String,

    };



    Comp.render = function() {

        const value = this.value * 1;
        if (isNaN(value)) {
            return null;
        }

        const delta = this.delta * 1;
        if (isNaN(delta)) {
            throw new Error('delta is NaN ' + this.delta);
        }


        let lower = this.lower;
        if (lower === undefined || lower === null) {
            lower = 0;
        }
        lower = lower * 1;
        if (isNaN(lower)) {
            lower = 0;
        }
        if (value < lower) {
            return null;
        }

        const upper = this.upper * 1;
        if (!isNaN(upper) && value > upper) {
            return null;
        }

        const count = Math.floor((value - lower) / delta);

        const children = [];
        const container = Vue.h(this.container, this.containerProps, children);

        if (this.$slots.title) {
            const slot = this.$slots.title(this.$props);
            children.push(slot[0]);
        } else {
            if (this.title && this.title.length) {
                const title = Vue.h('span', {
                    style: this.titleStyle,
                    class: this.titleClass,
                }, this.title);
                children.push(title);
            }
        }

        let symbol;
        let stream = [];
        if (this.$slots.default) {
            const slot = this.$slots.default(this.$props);
            symbol = slot[0];
        } else {
            symbol = this.symbol;
        }
        for(let i = 1; i <= count; i++) {
            stream.push(symbol);
        }

        if (this.symbolRemain || this.$slots.remain) {
            const remain = Math.floor((value - lower) % delta);
            if (remain) {
                if (this.$slots.remain) {
                    const slot = this.$slots.remain(this.$props);
                    stream.push(slot[0]);
                } else {
                    stream.push(this.symbolRemain);
                }
            }
        }

        if (typeof symbol === 'string') {
            stream = stream.join('');
        }

        const span = Vue.h('span', {
            style: this.symbolStyle,
            class: this.symbolClass,
        }, stream );

        children.push(span);

        return container;
    };

    return Comp;
}


export default init;