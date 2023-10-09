
const QLoader = {};

QLoader.debug = false;

QLoader.injectHead = (function (i, n, j, e, c, t, s) {
    t = n.createElement(j);
    s = n.getElementsByTagName(j)[0];
    t.appendChild(n.createTextNode(e.text));
    t.onload = c(e);
    s ? s.parentNode.insertBefore(t, s) : n.head.appendChild(t)
}); // eslint-disable-line

QLoader.c = async function(tag, func, ...args) {
    const start = new Date().getTime();
    let ret = func(...args);
    if (QLoader.isPromise(ret)) {
        ret = await ret;
    }
    const end = new Date().getTime();
    console.log('[' + tag + ']', 'consume', end - start);
    return ret;
};


QLoader.fetch = function (inputs, promise) {
    if (!arguments.length)
        return Promise.reject(new ReferenceError("Failed to execute 'fetchInject': 1 argument required but only 0 present."));
    if (arguments[0] && arguments[0].constructor !== Array)
        return Promise.reject(new TypeError("Failed to execute 'fetchInject': argument 1 must be of type 'Array'."));
    if (arguments[1] && arguments[1].constructor !== Promise)
        return Promise.reject(new TypeError("Failed to execute 'fetchInject': argument 2 must be of type 'Promise'."));

    const resources = [];
    const deferreds = promise ? [].concat(promise) : []
    const thenables = [];

    inputs.forEach(input => deferreds.push(
        window.fetch(input).then(res => {
            return [res.clone().text(), res.blob()]
        }).then(promises => {
            return Promise.all(promises).then(resolved => {
                resources.push({text: resolved[0], blob: resolved[1]})
            })
        })
    ));

    return Promise.all(deferreds).then(() => {
        resources.forEach(resource => {
            thenables.push({
                then: resolve => {
                    resource.blob.type.includes('text/css')
                        ? QLoader.injectHead(window, document, 'style', resource, resolve)
                        : QLoader.injectHead(window, document, 'script', resource, resolve)
                }
            })
        });
        return Promise.all(thenables)
    })
};

QLoader.fetchHtmlAndJS = function(selector, suffix, urls) {
    return QLoader.fetchHtml(selector, suffix).then(function () {
        return QLoader.fetchWithSuffix( urls, suffix);
    });
};

QLoader.addSuffix = function(url, suffix) {
    if (url.indexOf("?") >= 0) {
        return url + "&" + suffix;
    }
    return url + "?" + suffix;
};


QLoader.extension = function (path, seperator) {
    if (!seperator) {
        seperator = ".";
    }
    const index = path.lastIndexOf(seperator);
    if (index < 0) {
        return "";
    }
    return path.substring(index + seperator.length);
};

QLoader.fetchHtml = function(selector, suffix) {

    let doms = document.querySelectorAll(selector);
    if (!doms || !doms.length) {
        return Promise.resolve(false);
    }

    let promises = [];
    for (let i = 0, n = doms.length; i < n; i++) {
        let dom = doms[i];
        let url = dom.getAttribute("include");
        if (!url) {
            continue;
        }
        let dosuffix = dom.className.indexOf("nosuffix") < 0;
        if (dosuffix && suffix) {
            url = QLoader.addSuffix(url, suffix);
        }
        let obj = {
            url : url,
            dom : dom
        };
        promises[i] = window.fetch(url).then(function (resp) {
            return resp.text().then(function (content) {
                this.dom.removeAttribute("include");
                this.dom.setAttribute("included", this.url);
                if (content) {
                    this.dom.innerHTML = content;
                }
            }.bind(this));
        }.bind(obj));
    }
    if (promises.length === 0) {
       return Promise.resolve(false);
    }

    return Promise.all(promises).then(function () {
        // return QLoader.fetch_html_fragment(selector, suffix);
    });

};

/**
 * opts.objs {
 *     url
 *     callback
 * }
 * opts.suffix
 * @param opts
 */
QLoader.fetchAndDo = function(opts) {
    let objs = opts.objs;
    for (let i = 0; i < objs.length; i++) {
        let obj = objs[i];
        if (typeof obj === 'string') {
            objs[i] = { url : obj };
        }
    }
    if (typeof opts.index === 'undefined') {
        opts.index = 0;
    }

    if (opts.index >= opts.objs.length) {
        return true;
    }

    let target = opts.objs[opts.index];
    if (opts.suffix) {
        target.url = QLoader.addSuffix(target.url, opts.suffix);
    }
    return window.fetch(target.url).then(function (resp) {
        if (target.callback) {
            target.callback.call(this, resp);
        }
        opts.index = opts.index + 1;
        return QLoader.fetchAndDo(opts);
    });
};

QLoader.fetchWithSuffix = function (urls, suffix) {

    if (typeof urls === 'string') { urls = [urls]; }
    if (!(urls instanceof Array)) {
       return Promise.resolve(false);
    }

    let url = urls[0];
    let ext = QLoader.extension(url).toLowerCase();
    url = QLoader.addSuffix(url, suffix);
    if (!url) {
        return Promise.resolve(false);
    }

    let promise = new Promise(function (resolve) {

        let dom;
        switch (ext) {
            case 'css':
                dom = document.createElement('link');
                dom.setAttribute('rel', 'stylesheet');
                dom.setAttribute('type', 'text/css');
                dom.setAttribute('href', url);
                document.head.appendChild(dom);
                break;
            default:
                dom = document.createElement('script');
                dom.setAttribute("type", "text/javascript");
                dom.setAttribute("src", url);
                break;
        }

        const callback = function () {
            if (QLoader.debug) {
                console.log("[fetch]", dom);
            }
            resolve(this);
        }.bind(urls.slice(1));
        dom.onload = callback;
        dom.onreadystatechange = callback;
        document.body.appendChild(dom);
    });
    promise.then(function (urls) {
        if (!urls || urls.length === 0) {
            return true;
        }
        return QLoader.fetchWithSuffix(urls);
    });
    return promise;
};

QLoader.fetchIf = function (urls, suffix, opt) {
    opt = opt || {};
    if (opt.url) {
        if (window.location.href.indexOf(opt.url) >= 0) {
            return QLoader.fetchWithSuffix(urls, suffix);
        }
    }
    return Promise.resolve(false);
};

QLoader.getCookieVal = function(cookiename) {
    let cookies = document.cookie.split(";");
    for(let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        let index = c.indexOf(cookiename);
        if (index >= 0) {
            return c.substring(index + cookiename.length + 5);
        }
    }
    return "";
};


QLoader.fetchWithSuffixAxios = function (url, params, script_urls) {
    axios.post(url, params).then(function (resp) {
        let data = resp.data;
        if (data.code) {
            console.error("[loader]", url, params, data);
            return data;
        }
        QLoader.fetchWithSuffix(script_urls, data.data);
        return data;
    }.bind(this)).catch(function (ex) {
        console.error("[loader] fail", url, params, ex);
    }.bind(this));
};

QLoader.isPromise = function(obj) {
    if (obj && obj.then && obj.catch) {
        return typeof obj.then === 'function' && typeof obj.catch === 'function';
    }
    return false;
}

QLoader.imported = { };
QLoader.importmap = { };

QLoader.importsrc = function(src) {
    Object.assign(QLoader.importmap, src);
};

QLoader.import = async function(url, opts) {
    try {
        opts = opts || {};
        const key = opts.key;

        /*
        if (key) {
            const r = QLoader.imported[opts.key];
            if (r) {
                return r;
            }
        }
         */

        opts.loader = opts.loader || QLoader;
        if (opts.suffix) {
            url = QLoader.addSuffix(url, opts.suffix);
        }
        const module = await import(url);
        if (typeof module.default !== 'function') {
            return module.default;
        }
        let ret = module.default(opts);
        if (!ret) {
            if (key) {
                QLoader.imported[key] = ret;
            }
            return ret;
        }
        if (QLoader.isPromise(ret)) {
            ret = await ret;
            if (key) {
                QLoader.imported[key] = ret;
            }
            return ret;
        }
        return ret;
    } catch (ex) {
        if (console && console.log && typeof console.log === 'function') {
            console.error('loader', 'import', url, 'fail', ex.toString(), 'opts', opts);
        }
        throw ex;
    }
};

QLoader.imports = async function(opts, map) {
    const ret = {};
    const imported = QLoader.imported;
    const promises = [];
    const keys = Object.keys(map);
    const klen = keys.length;
    for(let i = 0; i < klen; i++) {
        const key = keys[i];
        let r = imported[key];
        let promise;
        if (r) {
            promise = Promise.resolve(r);
        } else {
            let url = map[key];
            if (!url) {
                url = QLoader.importmap[key];
                if (!url) {
                    throw new Error('url not set and src not found: ' + key);
                }
            }
            promise = QLoader.import(url, opts);
        }
        promises.push(promise);
    }
    const results = await Promise.all(promises);
    for(let i = 0; i < klen; i++) {
        const key = keys[i];
        const r = results[i];
        ret[key] = r
        QLoader.imported[key] = r;
    }
    return ret;
};

export default QLoader;