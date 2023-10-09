
const init = async function(/* OPTS */) {

    // const Loader = OPTS.loader;

    const Comp = {};

    Comp.name = 'app';

    Comp.components = {
    };

    const { mapState } = window['Vuex'];
    Comp.computed = {
        ...mapState([
            'C', 'UTIL',
            'locator', 'mode', 'ctrl',
            'ctrl', 'filter', 'conn', 'hub', 'ui'
        ]),
    };

    Comp.watch = {

    };

    Comp.methods = {

    };

    let host = window.location.host;
    if (host !== 'szplay.net' && host !== 'gmg991.github.io') {
        host = 'szplay.net';
    }
    const canvasier = (canvas, ctx, img ) => {
        try {
            // console.log("calling canvasier", img.width, img.height);

            const w = img.width;
            const h = img.height;

            ctx.fillStyle = "rgba(252,252,252, 0.75)"; // rgba(255, 255, 255, 0.75)";
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.75)';

            ctx.font = 'bold ' + Math.floor(w / 11) + 'px arial'
            ctx.lineWidth = 2;
            let measure = ctx.measureText(host);
            let wfont = measure.width;
            let hfont =
                measure.actualBoundingBoxAscent +
                measure.actualBoundingBoxDescent;

            let x = (w - wfont) / 2;
            let y = (h + hfont) / 2;


            ctx.fillText(host, x, y);
            ctx.strokeText(host, x, y);

            ctx.font = Math.floor(w / 22) + 'px arial'
            ctx.lineWidth = 1;
            measure = ctx.measureText(host);
            wfont = measure.width;
            hfont =
                measure.actualBoundingBoxAscent +
                measure.actualBoundingBoxDescent;

            const pad = 5;
            const points = [
                pad, pad + hfont,
                w - wfont - pad, pad + hfont,
                pad, h - hfont - pad,
                w - wfont - pad, h - hfont - pad
            ];

            for(let i = 0; i < points.length; i = i + 2) {
                ctx.fillText(host, points[i], points[i + 1]);
                ctx.strokeText(host, points[i], points[i + 1]);
            }

            // console.log("canvasier", 'x', x, 'y', y, 'fontheight', fontheight, 'measure', measure);
        } catch (ex) {
            console.error('canvasier', ex);
        }
    };

    Comp.MACRO = (MACRO) => {
        try {

            const exec = window.localStorage.getItem('MACRO') || '';
            if (1 === 1) {
                return;
            }
            if (exec.indexOf('no-canvasize') >= 0 || window.location.href.indexOf('nocanvas') >= 0) {
                return;
            }
            const lazy = MACRO['img-lazy'];
            lazy.props.canvasize.default = 1;
            lazy.props.canvasier.default = canvasier;
        } catch (ex) {
            console.error('MACRO', ex);
        }
    };

    return Comp;

};

export default init;







