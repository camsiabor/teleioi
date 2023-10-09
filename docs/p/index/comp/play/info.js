const TEMPLATE =
`
<div>
    hello world
</div>
`;


async function init(opts) {

    const Loader = opts.loader;
    const COMPONENTS = await Loader.imports(opts, {
        'img-lazy': '/js/vue/comp/imglazy.js'
    });

    const Comp = {};
    Comp.name = 'play-info';
    Comp.template = TEMPLATE;
    Comp.components = COMPONENTS;

    Comp.computed = {
        ...Vuex.mapState([
            'C'
        ])
    }

    return Comp;
}


export default init;