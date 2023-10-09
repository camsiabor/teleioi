

const template =
`
<img :src="current" 
     :style="stylex"
     :classx="classx"      
     @click="clicked"     
     crossorigin="anonymous"
     style="min-width: 16px; min-height: 16px;" />
`;

async function init(opts) {

    const Loader = opts.loader;

    const { UTIL } = await Loader.imports(opts,  {
        'UTIL': '/js/util.js',
    });

    const Comp = {};
    Comp.name = 'imglazy';
    Comp.template = template;

    Comp.props = {
        datasrc: String,
        prefix: String,
        classx: String,
        stylex: String,
        canvasize: {
            type: Number,
            default:  0,
        },
        canvasier: {
            type: Function,
            default: null,
        },
        transit: {
            type: String,
            default: '/images/loading/loading_dotted.gif',
        },
        imgloaded: [ Function, Array ],
        imgclicked: [ Function, Array],
    };

    Comp.data = function() {
        return {
            style: { },
            current: '',
            observer: null,
            onloaded: this.imgloaded,
            onclicked: this.imgclicked,
        };
    };



    Comp.methods = {


        fullpath() {
            if (this.prefix) {
                return UTIL.path.concat(this.prefix, this.datasrc);
            }
            return this.datasrc;
        },

        canvasing() {
            const canvas = document.createElement('canvas');
            const img = new Image();
            img.crossOrigin = "anonymous";


            new window['imagesLoaded'](img, {}, () => {
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height);

                if (this.canvasier) {
                    this.canvasier(canvas, ctx, img, this);
                }

                this.current = canvas.toDataURL();

                try {
                    canvas.remove();
                    img.remove();
                } catch (ex) {
                    console.warn('remove fail');
                }
            });

            /*
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height);

                if (this.canvasier) {
                    this.canvasier(canvas, ctx, img, this);
                }

                this.current = canvas.toDataURL();

                try {
                    canvas.remove();
                    img.remove();
                } catch (ex) {
                    console.warn('remove fail');
                }
            };
             */
            img.src = this.fullpath();
        },


        load() {
            if (this.transit) {

                this.style = {
                    background: 'transparent url(' + this.transit + ') center no-repeat',
                    backgroundSize: 'auto 100%',
                    width: '48px',
                    height: '48px',
                };

            }


            new window['imagesLoaded'](this.$el, {}, () => {
                if (this.onloaded) {
                    UTIL.func.invoke(this.onloaded, this);
                }
                if (this.transit) {
                    this.style = {};
                }
            });

            /*
            this.$el.onload = () => {
                if (this.onloaded) {
                    UTIL.func.invoke(this.onloaded, this);
                }
                if (this.transit) {
                    this.style = {};
                }
            };
             */

            const canvasize = this.canvasize * 1;
            if (!canvasize || isNaN(canvasize)) {
                this.current = this.fullpath();
            } else {
                this.canvasing();
            }
        },

        clicked() {
            if (this.onclicked) {
                UTIL.func.invoke(this.onclicked, this);

            }
        }

    };

    Comp.mounted = function() {
        if (!window['IntersectionObserver']) {
            this.load();
            console.warn('IntersectionObserver not support?', this.current);
            return;
        }
        this.observer = new IntersectionObserver( entries => {
            const target = entries[0];
            if (!target.isIntersecting) {
                return;
            }
            this.load();
            this.observer.disconnect();
        });

        this.observer.observe(this.$el);
    };

    Comp.destroy = function() {
        if (this.observer) {
            this.observer.disconnect();
        }
    };

    return Comp;
}

export default init;