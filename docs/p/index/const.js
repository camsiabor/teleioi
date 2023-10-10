

const HOST = window.location.host;

let githubName = "gmg991";
let idx = HOST.indexOf('.github.io');
if (idx > 0) {
    githubName = HOST.substring(0, idx);
}
let githubPage = githubName + ".github.io";

async function init() {

    const C = {};

    const SELF = {

        github: {
            name: githubName,
            page: githubPage,
            pageUrl: "https://" + githubPage,
            branch: "main",
            v: "v3",
            repoImg: 'teleioi_limni'
        },

    };

    C.SELF = SELF;

    C.MAGIC = {
        "AREA": "_AREA_",
        "DEFAULT": "_DEFAULT_",
    };
    
    C.CONN = {
        meta: {
            'relative': {
                cn: '默认',
            },
            'github.page': {
                cn: 'io.page'
            },
            'github.api': {
                cn: 'io.api'
            },
            'custom': {
                cn: '自定义'
            }
        },
        img: {
            'relative': {
                cn: '默认',
                prefix: '/img/',
            },
            'github': {
                cn: 'io.page',
                prefix: SELF.github.pageUrl + '/img/',
            },
            'camsiabor': {
                cn: 'camsiabor',
                prefix: 'https://camsiabor.net/img/'
            },
            'custom': {
                cn: '自定义',
                prefix: ''
            }
        }
    };

    C.URLS = {

        pic: {
            logo: '/images/logo/favicon/fire_cute.gif',
            loading: '/images/loading/loading_snake.gif',
        },

        platform: {
            'twi': 'https://twitter.com/',
            'tele': 'https://t.me/s/',
            'tele.ch': 'https://t.me/s/',
        },

        meta: {
            root: SELF.github.pageUrl + '/meta/'
        },

        twitter: {
            root: 'https://www.twitter.com/',
            search: 'https://www.twitter.com/search?src=typed_query&q=',
        },

        github: {

            mime: {
                json: "application/json",
                vjson: `application/vnd.github.${SELF.github.v}+json`,
                raw: `application/vnd.github.${SELF.github.v}.raw`,
                text: `application/vnd.github.${SELF.github.v}.text`,
                html: `application/vnd.github.${SELF.github.v}.html`,
                full: `application/vnd.github.${SELF.github.v}.full`,
                object: `application/vnd.github.${SELF.github.v}.object`,
            },

            img: {
                root: `https://${SELF.github.name}.github.io/img/`,
                blob: `https://github.com/${SELF.github.name}/${SELF.github.repoImg}/blob/${SELF.github.branch}/`,
            },

            oauth: {
                login: "https://github.com/login/oauth/authorize",
                access_token: "https://github.com/login/oauth/access_token",
            },

            api: {
                user: "https://api.github.com/user",
                repos : {
                    tree: `https://api.github.com/repos/${SELF.github.name}/${SELF.github.repoImg}/git/trees/`,
                    contents: (user, repo) => `https://api.github.com/repos/${user}/${repo}/contents/`,
                },
            },

        },

        proxy: {
            herokuapp: "https://cors-anywhere.herokuapp.com/"
        }

    };

    C.LOCATIONS = {

        'CN': {
            'name_cn': '中国',
            'name_en': 'China',
            'level': 1,
            'subs': {
                "GUDO": {
                    'code': 'GUDO',
                    'name_cn': '广东',
                    'name_en': 'GuangDong',
                    'default': 'ZH',
                    'level': 2,
                    'subs': {
                        'GZ': '广州 GZ',
                        'ZH': '珠海 ZH',
                        'SZ': '深圳 SZ',
                        'DG': '东莞 DG',
                        'FS': '佛山 FS',
                        'ZS': '中山 ZS',
                        'JM': '江门 JM',
                    }
                },
                "GUXI": {
                    'code': 'GUXI',
                    'name_cn': '广西',
                    'name_en': 'GuangXi',
                    'default': 'NN',
                    'level': 2,
                    'subs': {
                        'NN': '南宁 NN',
                    }
                },
                "HKMO": {
                    'code': 'HKMO',
                    'name_cn': '港澳',
                    'name_en': 'HongKongMacao',
                    'default': 'MO',
                    'level': 2,
                    'subs': {
                        'MO': '澳门 MO',
                        'HK': '香港 HK',
                    }
                },
                /*
                "HUNA": {
                    'name_cn': '湖南',
                    'name_en': 'HuNan',
                    'subs': {
                        'CS': '长沙 CS',
                        'HH': '怀化 HH',
                        'YY': '岳阳 YY',
                    }
                }
                 */
            }
        },

        'CA': {
            'name_cn': '加拿大',
            'name_en': 'Canada',
            'level': 1,
            'subs': {
                "Canada": {
                    'level': 2,
                    'name_cn': '加拿大',
                    'subs': {
                        'CA': '加拿大 CA'
                    }
                }
            }
        },
    };

    const nations = {};
    for (let k in C.LOCATIONS) {
        nations[k] = C.LOCATIONS[k];
    }

    Object.assign(C.LOCATIONS, {

        id: function (loc, splitter, casing, sub) {
            if (splitter === undefined || splitter === null) {
                splitter = '_';
            }
            let id = loc.nation + splitter + loc.province + splitter + loc.city;
            if (sub) {
                id = id + loc.sub;
            }
            if (casing) {
                if (casing > 0) {
                    id = id.toUpperCase();
                } else {
                    id = id.toLowerCase();
                }
            }
            return id;
        },

        nations: function () {
            return nations;
        },

        get: function (loc) {

            if (!loc) {
                throw new Error('locator null');
            }

            const nation = C.LOCATIONS[loc.nation];
            if (!nation) {
                return null;
            }
            if (!loc.province) {
                return Object.assign({}, nation);
            }
            const province = nation.subs[loc.province];
            if (!province) {
                return null;
            }
            if (!loc.city) {
                return Object.assign({}, province);
            }
            const city = province.subs[loc.city];
            if (!city) {
                return null;
            }
            return Object.assign({}, city);
        },

        parse: function (id, splitter, casing) {
            if (!id) {
                throw new Error('parse missing id');
            }
            if (!splitter) {
                splitter = '_';
            }
            if (casing) {
                if (casing > 0) {
                    id = id.toUpperCase();
                } else {
                    id = id.toLowerCase();
                }
            }
            const es = id.split(splitter);
            const len = es.length;
            switch (len) {
                case 0:
                    return null;
                case 1:
                    return {nation: es[0]};
                case 2:
                    return {nation: es[0], province: es[1]};
                case 3:
                    return {nation: es[0], province: es[1], city: es[2]};
                case 4:
                    return {nation: es[0], province: es[1], city: es[2], sub: es[3]};
            }
            return {nation: es[0], province: es[1], city: es[2], sub: es[3], area: es[4]};
        },

        getProvince(locator) {
           const n = C.LOCATIONS[locator.nation];
           if (!n) {
               return null;
           }
           return n.subs[locator.province];
        },

        getProvinces(locator) {
            const n = C.LOCATIONS[locator.nation];
            if (!n) {
                return null;
            }
            return n.subs;
        },

        getCity(locator) {
            const cs = C.LOCATIONS.getCities(locator);
            if (!cs) {
                return null;
            }
            return cs[locator.city];
        },

        getCities(locator) {
            const ps = C.LOCATIONS.getProvinces(locator);
            if (!ps) {
                return null;
            }
            const p = ps[locator.province];
            if (!p) {
                return null;
            }
            return p.subs;
        },

        path: function (loc, joiner, casing, full) {
            if (!loc) {
                throw new Error('locator null');
            }
            if (!joiner) {
                joiner = '/';
            }
            let ret = '';
            if (loc.nation) {
                ret = loc.nation + joiner;
            }
            if (loc.province) {
                ret += loc.province + joiner;
            }
            if (loc.city) {
                ret += loc.city + joiner;
            }
            if (full && loc.sub) {
                ret += loc.sub + joiner
            }
            if (!casing) {
                return ret;
            }
            if (casing > 0) {
                return ret.toUpperCase();
            } else {
                return ret.toLowerCase();
            }
        },

        ducking: function (loc, obj) {
            if (!loc) {
                throw new Error('ducking locator == null')
            }
            if (!loc.nation) {
                return null;
            }
            const na = obj[loc.nation];
            if (!na || !loc.province) {
                return na;
            }
            const pro = na[loc.province];
            if (!pro || !loc.city) {
                return pro;
            }
            return pro[loc.city];
        },

        equal: function (src, des, full) {
            if (!src) {
                throw new Error('src null');
            }
            if (!des) {
                throw new Error('des null');
            }
            if (src.nation !== des.nation) {
                return false;
            }
            if (src.province !== des.province) {
                return false;
            }
            if (src.city !== des.city) {
                return false;
            }
            if (full) {
                if (src.sub !== des.sub) {
                    return false;
                }
            }
            return true;
        },
    });


    C.ACCOUNTS_DEF = {
        'twi': 'teleioi',
        'tele': 'teleioi',
        'tele.ch': 'teleioi',
        'youtube': 'teleioi',
    };

    C.ACCOUNTS = {
        'DEF': C.ACCOUNTS_DEF,
        'CN': {
            'GUDO': {
                'ZH': {
                },
                'GZ': {
                },
                'SZ': {
                },
                'DEF': {
                }
            }
        }
    };

    Object.assign(C.ACCOUNTS, {
        get(loc, acctype, def) {
            let group = C.LOCATIONS.ducking(loc, C.ACCOUNTS);
            if (!group) {
                if (def) {
                    group = def;
                } else {
                    return null;
                }
            }
            if (!acctype) {
                return group;
            }
            let target = group[acctype];
            if (!target && def) {
                target = def[acctype];
            }
            if (target && typeof target === 'function') {
                target = target(loc, acctype);
            }
            return target || def;
        },
        wrap(id, acctype) {
            const domain = C.URLS.platform[acctype];
            return {
                id,
                name: id,
                url: domain + id,
            };
        },
        getwrap(loc, acctype) {
            const target = C.ACCOUNTS.get(loc, acctype, C.ACCOUNTS.DEF);
            return C.ACCOUNTS.wrap(target, acctype);
        }
    });


    return C;
}


export default init;



