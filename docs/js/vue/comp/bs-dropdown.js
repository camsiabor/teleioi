


function defineItem() {

    const Item = {};
    Item.name = 'bs-dropdown-item';
    Item.functional = true;
    Item.props = {
        v: Object,
        idx: Number,
    };
    Item.render = function() {

        const v = this.v;

        if (v.visible === false) {
            return null;
        }


        v.style = v.style || '';
        v.class = v.class || '';

        let classex = '';
        if (v.active !== undefined && v.active !== null) {
            if (typeof v.active === 'boolean' && v.active) {
                classex = 'active';
            }
            if (typeof v.active === 'function') {
                const act = v.active(v);
                if (act === true) {
                    classex = 'active';
                }
            }
        }

        const h = Vue.h;
        let item = null;
        const children = [];

        if (v.type === undefined || v.type === null) {
            v.type = 'item';
        }
        switch(v.type) {
            case 'header':
                item = h('h6',
                    {
                        class: 'dropdown-header ' + v.class + ' ' + classex,
                        style: 'font-weight: bold; ' + v.style,
                        onClick: v.click,
                    },
                    [
                        h('i', { class: 'bi ' + v.icon } ),
                        ' ' + (v.title || '')
                    ],
                );
                break;
            case 'divider':
                item = h('hr',
                    {
                        class: 'dropdown-divider ' + v.class + ' ' + classex,
                        style: v.style,
                    },
                );
                break;
            case 'slot':
                item = h('form',
                    {},
                    this.$slots.default()
                );
                break;
            case 'form':
                item = h('form',


                );
                break;
            case 'item':
                item = h('a',
                    {
                        class: 'dropdown-item ' + v.class + ' ' + classex,
                        style: 'cursor: pointer; ' + v.style,
                        onClick: v.click,
                    },
                    [
                        h('i', { class: 'bi ' + v.icon } ),
                        ' ' + (v.title || '')
                    ],
                );
                break;
        }
        children.push(item);
        return h('li', {}, children);
    };

    return Item;
}



async function init() {

    const Comp = {};
    Comp.Item = defineItem();
    Comp.name = 'bs-dropdown';
    Comp.functional = true;

    Comp.props = {

        title: String,
        titleIcon: String,
        titleStyle: String,
        titleClass: {
            type: String,
            default: 'btn-sm btn-outline-secondary'
        },

        autoClose: {
            type: Boolean,
            default: true,
        },

        dataset: Array,

        direction: {
            type: String,
            default: 'down',
        }
    };

    Comp.render = function() {

        const h = Vue.h;

        const button = h('button', {
            type: 'button',
            class: 'btn dropdown-toggle ' + (this.titleClass || ''),
            style: (this.titleStyle || ''),
            'data-bs-toggle' : 'dropdown',
            'data-bs-auto-close' : this.autoClose
        }, [
            h('i', { class: 'bi ' + (this.titleIcon || '') }),
            this.title,
        ]);

        const items = [];
        let frames = [];
        const len = this.dataset.length;
        for(let i = 0; i < len; i++) {
            const data = this.dataset[i];
            const type = typeof data;
            switch (type) {
                case 'string':
                    frames.push(
                        { type: data === '-' ? 'divider' : 'header', title: data }
                    );
                    break;
                case 'function':
                    const ret = data(this, i);
                    if (ret && typeof ret === 'object') {
                        if (Array.isArray(ret)) {
                            frames = frames.concat(ret);
                        } else {
                            frames.push(ret);
                        }
                    }
                    break;
                case 'object':
                    frames.push(data);
                    break;
                default:
                    throw new Error('invalid type for dataset item ' + data + ' index ' + i);
            }
        }

        for(let f = 0; f < frames.length; f++) {
            const frame = frames[f];
            let slots = undefined;
            if (frame.type === 'slot') {
                slots = this.$slots.default();
            }
            const item = h(Comp.Item, {
                v: frame,
                idx: items.length,
            }, slots);
            items.push(item);
        }

        const ul = h('ul', { class: 'dropdown-menu' }, items);

        let dir = '';
        switch (this.direction) {
            case 'up':
                dir = 'dropup';
                break;
            case 'left':
            case 'start':
                dir = 'dropstart';
                break;
            case 'end':
            case 'right':
                dir = 'dropend';
                break;
        }


        return h('div',
            { class: 'btn-group ' + dir },
            [ button, ul,]
        );

    };

    return Comp;
}

export default init;