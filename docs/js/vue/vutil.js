











const VUtil = {};

VUtil.createVNode = function (component, { props, children, element, app } = {}) {
    let el = element

    let vNode = Vue.createVNode(component, props, children);
    if (app && app._context) {
        vNode.appContext = app._context
    }

    if (el) {
        Vue.render(vNode, el);
    } else if (typeof document !== 'undefined' ) {
        Vue.render(vNode, el = document.createElement('div'));
    }

    const destroy = () => {
        if (el) {
            Vue.render(null, el)
        }
        el = null
        vNode = null
    }

    return { vNode, destroy, el }
}


VUtil.createVM = function({ comp, props, children, componenets, uses, provides, global, ctx }) {

    const Comp = Vue.defineComponent(comp);

    const div = document.createElement('div');

    if (ctx && ctx.$root.$el && ctx.$root.$el.parentElement) {
        ctx.$root.$el.parentElement.appendChild(div);
    } else {
        document.body.appendChild(div);
    }

    if (!props) {
        props = {};
    }
    if (!props.ref) {
        props.ref = 'inst' ;
    }

    const app = Vue.createApp({
        render() {
            if (children && typeof children === 'function') {
                children = children();
            }
            return Vue.h(Comp, props, children);
        },
    });

    if (global) {
        Object.assign(app.config.globalProperties, global);
        app.config.globalProperties['PROVIDES'] = global;
    }

    if (provides) {
        for(let k in provides) {
            app.provide(k, provides[k]);
        }
        app.provide('PROVIDES', provides);
    }

    if (uses) {
        for(let i = 0; i < uses.length; i += 1) {
            app.use(uses[i]);
        }
    }

    if (componenets) {
        for(let k in componenets) {
            if (componenets[k]) {
                app.component(k, componenets[k]);
            }
        }
    }

    const vm = app.mount(div);

    const inst = vm.$refs[props.ref];

    inst.$creator = ctx;

    return { app, vm, inst };
};


export default VUtil;


