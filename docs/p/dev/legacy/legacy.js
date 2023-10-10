const legacy = {

    async formCard() {
        const form = this.form;

        if (!form.comp) {
            form.comp = await Loader.import('/p/index/comp/form-card.js', OPTS);
            form.comp = Vue.defineComponent(form.comp);
        }

        if (!form.vm) {
            form.vm = this.VUTIL.createVM({
                ctx: this,
                comp: BsModal,
                props: {
                    title: this.title,
                },
                uses: [ this.$store ],
                global: this.PROVIDES,
                children: () => {
                    return [
                        Vue.h(form.comp,  {
                            _v: v,
                            ref: 'form',
                        })
                    ];
                },
            });
            form.inst = form.vm.inst.$root.$refs.form;
            form.modal = form.vm.inst.$root.$refs.inst;
        }

        form.inst.v = v;
        form.modal.show();
    },

    async cd(url, path) {
        const resp = await axios.get(url);
        const data = resp.data;
        const children = data.tree;
        if (!path) {
            return children;
        }
        let target = null;
        for (let i = 0; i < children.length; i++) {
            let item = children[i];
            if (path === item.path) {
                target = item;
                break;
            }
        }
        return target;
    },


    async relocation(location, sublocat, force) {
        try {

            if (!force && this.$parent.location === location && this.$parent.sublocat === sublocat) {
                return;
            }

            this.$parent.setLoading(true);

            let locationInfo = await this.cd(URLS.img.tree + SELF.github.branch, location.toLowerCase());
            if (!locationInfo) {
                alert("location not found: " + location); // TODO
                return;
            }

            let sublocatInfo = await this.cd(locationInfo.url, sublocat);
            if (!sublocatInfo) {
                alert("sublocat not found: " + sublocat); // TODO
                return;
            }
            let children = await this.cd(sublocatInfo.url);

            let prev = this.clone(this.current);
            let path = location.toLowerCase() + "/" + sublocat + "/";
            this.set({
                url: locationInfo.url,
                path: path,
                location: location,
                sublocat: sublocat,
                children: children,
            });
            this.reorder('desc');
            this.prev = prev;
            this.$parent.location = location;
            this.$parent.sublocat = sublocat;
            this.message = '';
            this.search.metaFetch().then();
            this.$parent.configSave();
        } catch (ex) {
            const exmsg = ex + "";
            this.message = '网络错误, 请尝试刷新页面，若果没用可以试下用VPN访问 | ' + exmsg;
            console.error("relocation", ex);
        } finally {
            this.$parent.setLoading(false);
        }
    },


    clone(current) {
        return {
            url: current.url,
            path: current.path,
            info: current.info,
            order: current.order,
            view: current.view.slice(),
            children: current.children.slice(),
        };
    },

    set(tree) {

        let children = tree.children;

        tree.order = 'asc';
        tree.mapping = tree.mapping || { };

        let small = [];
        let large = [];
        let prev = null;
        for (let i = 0; i < children.length; ++i) {
            let child = children[i];
            this.inferLeaf(child, prev, tree);
            tree.mapping[child.name] = child;
            if (child.role === 'root') {
                if (child.code < 7000) {
                    small.push(child);
                } else {
                    large.push(child);
                }
            }
            prev = child;
        }
        tree.view = large.concat(small);
        this.current = tree;
    },
}

const twitterMethods = {
    twitterQueryBuild(keyword, locator) {
        let url = URLS.twitter.search;
        let account = this.twitterAccount(locator).name;
        let q = '%22' + keyword + '%22' + '%20' + "(from%3A" + account + ')';
        return url + q;
    },

    twitterJump(item) {
        let keyword = item.name;
        let index = keyword.indexOf('_');
        if (index > 0) {
            keyword = keyword.substr(0, index);
        }
        keyword = '' + keyword;
        let url = this.twitterQueryBuild(keyword, this.locator);
        window.open(url);
    },

    twitterAccount(locator) {
        let city = locator.city.toLowerCase();
        switch (city) {
            case "gz": case "sz":
                break;
            case "zh":
                return {
                    name: "x",
                    url : 'https://twitter.com/',
                };
            default:
                city = "x";
                break;
        }
        return {
            name : 'teleioi' + city,
            url : 'https://twitter.com/teleioi' + city,
        };
    },
};


export const github = {

    request: async function (opts, mime) {

        try {
            if (!opts.headers) {
                opts.headers = {};
            }
            if (!opts.method) {
                opts.method = "get";
            }

            if (mime) {
                opts.headers["Accept"] = this.C.URLS.github.mime[mime] || mime;
            }
            if (!opts.headers["Accept"]) {
                opts.headers["Accept"] = this.C.URLS.github.mime.vjson;
            }
            if (!opts["noauth"] && !opts.headers["Authorization"]) {
                opts.headers["Authorization"] = "token " + (this.secret.token || this.config.token);
            }
            console.log("request", opts);
            const data = await this.UTIL.axios(opts);
            if (data.error) {
                throw new Error(data.error + " | " + data["error_description"] + " | " + data["error_uri"]);
            }
            return data;
        } catch (ex) {
            this.ctrl.message = ex.toString();
            console.error("request error", ex.message, ex);
            this.$forceUpdate();
            throw ex;
        }
    },


    getUser: async function () {
        const data = await this.request({
            url: this.C.URLS.github.user
        });
        console.log("data", data);
    },

    contentLoad: async function ( { path, ref = 'master', raw = true } ) {

        const git = this.gitter();
        const reps = await git['getContents'](ref, path, raw);

        /*
        const api = this.C.URLS.github.api.repos.contents(user, repo);
        let url = this.UTIL.path.concat(api, path);
        if (branch) {
            url = url + '?ref=' + branch;
        }
        const opts = {
            method: 'GET',
            url: url
        };
        const resp = await this.request(opts, mime);
        if (resp.content && decode) {
            resp.content = this.UTIL.encode.atou(resp.content);
        }
         */
        return resp;
    },

    contentSave: async function( { user, repo, path, content, branch = 'master', mime, encode = true }) {
        let current = null;
        try {
            current = await this.contentLoad({
                user, repo, path,
                mime: "vjson",
                decode: false,
                branch: branch,
            });
        } catch (ex) {
            console.log('create?', ex.toString());
        }
        const api = this.C.URLS.github.api.repos.contents(user, repo);
        const url = this.UTIL.path.concat(api, path);
        if (encode) {
            content = this.UTIL.encode.utoa(content);
        }
        const opts = {
            method: "PUT",
            url: url,
            data : {
                sha: current ? current.sha : null,
                branch,
                content,
                message: "update",
            },
        };
        const resp = await this.request(opts, mime);
        console.log('github', 'contents', 'save', resp);
    },


    authorize: function () {
        const secret = this.secret;
        if (!secret.client_secret) {
            this.message = "secret not set for " + this.mode + " ctrl mode";
            return;
        }

        this.configSave();
        const redirect = window.location.origin + "/?ctrl=1";
        const scope = "repo";
        window.location.href = this.C.URLS.github.oauth.login + "?"
            + "client_id=" + secret.client_id
            + "&redirect_uri=" + redirect
            + "&scope=" + scope
            + "&login=" + this.C.SELF.github.user
            + "&allow_signup=false";
    },

    unauthorize: function () {
        this.secret.token = "";
        this.configSave();
        window.location.href = window.location.origin + "/?ctrl=1";
    },

    code: function () {
        let query = window.location.search;
        let params = new URLSearchParams(query);
        const code = params.get("code");
        this.secret.code = code;
        return code;
    },

    token: async function () {
        const secret = this.secret;
        const code = this.secret.code;
        const url = this.config.proxy + '/' + this.C.URLS.github.oauth.access_token;

        // https://github.com/login/oauth/access_token

        const opts = {
            method: "POST",
            url: url,
            data: {
                client_id: secret.client_id,
                client_secret: secret.client_secret,
                code: code,
            },
            headers: {
                "Accept": 'application/json',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        const response = await axios(opts);
        const data = response.data;
        if (data.error) {
            throw new Error(data.error + " | " + data["error_description"] + " | " + data["error_uri"]);
        }
        const token = data.access_token;
        this.secret.token = token;
        this.config.token = token;
        this.configSave();
    },
};