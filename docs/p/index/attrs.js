// https://emojixd.com/

async function init(opts) {

    const Loader = opts.loader;
    const UTIL = await Loader.import('/js/util.js', opts);

    const M = {};

    M.ATTRZ = {}; // define
    M.ATTRZCODE = {}; // code


    /* ============================ body =========================== */

    M.ATTRZ.body = {};
    M.ATTRZCODE.body = {};

    M.ATTRZ.body.birth = {}
    for(let i = 2005; i >= 1980; i = i - 5) {
        M.ATTRZ.body.birth[i] = {
            cn: (i + '').substring(2) + '后',
            code: i,
            lower: i,
            upper: i + 4,
        };
    }

    const heights = {};
    M.ATTRZ.body.height = heights;
    for(let i = 150; i <= 180; i = i + 5) {
        heights[i] = {
            cn: i ,
            code: i,
            lower: i,
            upper: i + 4,
        }
    }

    const weights = {};
    M.ATTRZ.body.weight = weights;
    for(let i = 40; i <= 60; i = i + 5) {
        weights[i] = {
            cn: i,
            code: i,
            lower: i,
            upper: i + 4,
        }
    }
    
    
    
    const chests = {};
    const chestsCode = {};
    M.ATTRZ.body.chest = chests;
    M.ATTRZCODE.body.chest = chestsCode;
    const chestArray = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ];
    for(let i = 0, cup = 10; i < chestArray.length; i += 1, cup += 10) {
        const ch = chestArray[i];
        chestsCode[cup] = ch;
        chestsCode[cup - 2] = ch + '-';
        chestsCode[cup + 5] = ch + '+';
        chests[ch] = {
            cn: ch + '+',
            code: cup,
            lower: cup - 2,
            upper: cup + 5,
        };
    }


    M.ATTRZ.body.cosmetic = {

        augment: {
            cn: '隆胸',
            code: 0x0001,
            weight: 1,
        },
        face: {
            cn: '整容',
            code: 0x0002,
            weight: 1,
        },
        face_little: {
            cn: '微整容',
            code: 0x0004,
            weight: 1,
        },
        slim: {
            cn: '苗条',
            code: 0x0010,
            weight: 1,
        },
        slim_s: {
            cn: 'S形',
            code: 0x0020,
            weight: 1,
        },
        slim_nice: {
            cn: '美形',
            code: 0x0040,
            weight: 1,
        },
        slim_perfect: {
            cn: '完美',
            code: 0x0080,
            weight: 1,
        },
        flabby: {
            cn: '赘肉',
            code: 0x0100,
            weight: 1,
        },
        fat: {
            cn: '小胖',
            code: 0x0200,
            weight: 1,
        },
        fat_very: {
            cn: '肥胖',
            code: 0x0400,
            weight: 1,
        },
        tattoo_hand: {
            cn: '手纹',
            code: 0x0001 << 16,
            weight: 1,
        },
        tattoo_foot: {
            cn: '腿纹',
            code: 0x0002 << 16,
            weight: 1,
        },
        tattoo_back: {
            cn: '背纹',
            code: 0x0004 << 16,
            weight: 1,
        },
        tattoo_belly: {
            cn: '肚纹',
            code: 0x0008 << 16,
            weight: 1,
        },
        scar: {
            cn: '疤痕',
            code: 0x0010 << 16,
            weight: 1,
        },
        scar_belly: {
            cn: '肚疤痕',
            code: 0x0020 << 16,
            weight: 1,
        },
        pussy_white: {
            cn: '白虎',
            code: 0x0100 << 16,
        },
        pussy_white_hand: {
            cn: '人工白虎',
            code: 0x0200 << 16,
        },
        pussy_little: {
            cn: '少毛',
            code: 0x0400 << 16,
        },
        gym: {
            cn: '健身',
            code: 0x1000 << 16,
        },
        soft: {
            cn: '体柔',
            code: 0x2000 << 16,
        }
    };

    M.ATTRZCODE.body.cosmetic = UTIL.map.switchKey(M.ATTRZ.body.cosmetic, 'code');


    /* ============================ type =========================== */


    M.ATTRZ.type = {


        house : {
            cn: '楼凤',
            code: 0x0001,
            weight: 1,
        },
        street : {
            cn: '站街',
            code: 0x0002,
            weight: 1,
        },

        part_time: {
            cn: '兼职',
            code: 0x0004,
            icon: '👒',
            short: '👒',
            special: true,
        },

        agent : {
            cn: '中介',
            code: 0x0010,
            weight: 1,
        },
        pimp : {
            cn: '鸡头',
            code: 0x0020,
            weight: 1,
        },
        club_hand : {
            cn: '手工会所',
            code: 0x0100,
            weight: 1,
        },
        club_mouth : {
            cn: '口爆会所',
            code: 0x0200,
            weight: 1,
        },
        club_all : {
            cn: '全套会所',
            code: 0x0400,
            weight: 1,
        },
        club_ktv : {
            cn: 'KTV',
            code: 0x0800,
            weight: 1,
        },


        student: {
            cn: '学生',
            code: 0x1000,
            icon: '👩🏻‍🎓',
            short: '👩🏻‍🎓',
            special: true,
        },

        ol: {
            cn: 'OL',
            code: 0x2000,
            weight: 1,
        },

        amateur: {
            cn: '良家',
            code: 0x4000,
            weight: 1,
        },

        out : {
            cn: '外围',
            code: 0x8000,
            icon: '👗',
            short: '👗',
            special: true,
        },

        cosplay: {
            cn: '二次元',
            code: 0x1_0000,
            icon: '💮',
            short: '💮',
            special: true,
        },

        sm: {
            cn: 'SM字母圈',
            code: 0x2_0000,
            icon: '㊙️',
            short: '㊙️',
            special: true,
        },

        special: {
            cn: '特殊资源',
            code: 0x8_0000,
            icon: '👑👑👑',
            short: '👑',
            special: true,
        },
    };

    M.ATTRZCODE.type = UTIL.map.switchKey(M.ATTRZ.type, 'code');

    /* ============================ status =========================== */

    M.ATTRZ.status = {

        work: {
            cn: '近期更新',
            code: 0x0001,
            color: 'rgb(0,160,160)',
            toggled: true,
        },

        work_always: {
            cn: '持续开工',
            code: 0x0002,
            color: 'rgb(0,180,180)',
            toggled: true,
        },

        work_buddha: {
            cn: '佛系开工',
            code: 0x0004,
            color: 'rgb(0,200,200)',
            weight: 1,
        },

        work_part_time: {
            cn: '间中兼职',
            code: 0x0008,
            color: 'rgb(0,220,220)',
        },

        rest_one: {
            cn: '休息一天',
            code: 0x0010,
            toggled: false,
            weight: 1,
        },

        rest_days: {
            cn: '休息几天',
            code: 0x0020,
            toggled: false,
            weight: 1,
        },

        rest_week: {
            cn: '休息十天',
            code: 0x0040,
            weight: 1,
        },

        rest_month: {
            cn: '月休',
            code: 0x0080,
            weight: 1,
        },

        menses: {
            cn: '大姨妈',
            code: 0x0100,
            weight: 1,
        },
        rest: {
            cn: '短期',
            code: 0x0200,
            weight: 1,
        },

        unknown: {
            cn: '?未知',
            code: 0x0400,
            color: 'grey',
            toggled: true,
        },

        cloud: {
            cn: '待更新',
            code: 0x0800,
            weight: 1,
        },

        wechat_limit : {
            cn: '微信限制',
            code: 0x0001 << 16,
            weight: 1,
        },
        wechat_ban : {
            cn: '微信封号',
            code: 0x0002 << 16,
            weight: 1,
        },
        qq : {
            cn: 'QQ联系',
            code: 0x0004 << 16,
            weight: 1,
        },
        phone : {
            cn: '电话联系',
            code: 0x0008 << 16,
            weight: 1,
        },
        alipay: {
            cn: '支付宝联系',
            code: 0x0010 << 16,
            weight: 1,
        },
        patato: {
            cn: '土豆联系',
            code: 0x0020 << 16,
            weight: 1,
        },
        bat: {
            cn: '蝙蝠联系',
            code: 0x0040 << 16,
            weight: 1,
        },
        other: {
            cn: '其他APP联系',
            code: 0x0080 << 16,
            weight: 1,
        }
    };

    M.ATTRZCODE.status = UTIL.map.switchKey(M.ATTRZ.status, 'code');

    /* ============================ service =========================== */

    M.ATTRZ.service = {};

    M.ATTRZ.service.open = {

        handjob: {
            cn: '半手',
            code: 0x0001,
        },
        footjob: {
            cn: '半足',
            code: 0x0002,
            weight: 1,
        },
        chestjob: {
            cn: '半乳',
            code: 0x0004,
            weight: 1,
        },
        bj: {
            cn: '半口',
            code: 0x0010,
        },
        bj_cum: {
            cn: '半口爆',
            code: 0x0020,
        },
        insert: {
            cn: '全',
            code: 0x0100,
            weight: 1,
        },
        soap: {
            cn: '莞',
            code: 0x0200,
        }
    };


    M.ATTRZ.service.mouth = {
        // mouth
        kiss: {
            cn: '轻吻',
            code: 0x0001,
        },
        kiss_french: {
            cn: '舌吻',
            code: 0x0002,
        },
        bj: {
            cn: '吹箫',
            code: 0x0010,
        },
        bj_wash: {
            cn: '水中箫',
            code: 0x0020,
            weight: 1,
        },
        bj_deep: {
            cn: '深喉',
            code: 0x0040,
            weight: 1,
        },
        bj_69: {
            cn: '69',
            code: 0x0080,
        },
        bj_cum: {
            cn: '口爆',
            code: 0x0100,
        },
        bj_after: {
            cn: '事后箫',
            code: 0x0200,
            weight: 1,
        },
        bj_ice_fire: {
            cn: '冰火',
            code: 0x0400,
            weight: 1,
        },
        bj_tree: {
            cn: '高山流水',
            code: 0x0800,
            weight: 1,
        },
        lick_body: {
            cn: '舌尖漫游',
            code: 0x1000,
            weight: 1,
        },
        lick_scraping: {
            cn: '口刮沙',
            code: 0x2000,
            weight: 1,
        },
        lick_finger: {
            cn: '舔手',
            code: 0x4000,
            weight: 1,
        },
        rimjob: {
            cn: '毒龙',
            code: 0x8000,
        },
        bj_swallow: {
            cn: '吞精',
            code: 0x0001 << 16,
            weight: 1,
        },
        lick_foot: {
            cn: '舔脚',
            code: 0x0020 << 16,
            weight: 1,
        },
        piss_drink: {
            cn: '飲尿',
            code: 0x0100 << 16,
            weight: 1,
        },
        shit_eat: {
            cn: '吃糞',
            code: 0x0200 << 16,
            weight: -1,
        },
    };

    M.ATTRZ.service.hand = {
        massage: {
            cn: '按摩',
            code: 0x0001,
        },
        massage_oil: {
            cn: '推油',
            code: 0x0002,
        },
        massage_dragon: {
            cn: '抓龙筋',
            code: 0x0004
        },
        massage_simple: {
            cn: '简单按摩',
            code: 0x0008,
            weight: 1,
        },
        handjob: {
            cn: '手打',
            code: 0x0010
        },
        finger: {
            cn: '指惑',
            code: 0x0020,
            weight: 1,
        },
        flirt: {
            cn: '调情',
            code: 0x0040,
            weight: 1,
        }
    };


    M.ATTRZ.service.body = {
        nake_half: {
            cn: '半裸',
            code: 0x0001,
            weight: 1,
        },
        nake_full: {
            cn: '全裸',
            code: 0x0002,
            weight: 1,
        },
        bath: {
            cn: '侍浴',
            code: 0x0004,
            weight: 1,
        },
        chestpush: {
            cn: '波推',
            code: 0x0010,
            weight: 1,
        },
        chestjob: {
            cn: '乳交',
            code: 0x0020,
        },
        wander: {
            cn: '漫游',
            code: 0x0040,
            weight: 1,
        },
        soap: {
            cn: '水床',
            code: 0x0080,
            weight: 1,
        },
        footjob: {
            cn: '足交',
            code: 0x0100
        },
        foot_love: {
            cn: '恋足',
            code: 0x0200
        },
        facial: {
            cn: '颜射',
            code: 0x0001 << 16,
        },
        whip: {
            cn: '鞭打',
            code: 0x0010 << 16,
            weight: 1,
        },
        candle: {
            cn: '滴蜡',
            code: 0x0020 << 16,
            weight: 1,
        },
        penetrate: {
            cn: '穿刺',
            code: 0x0040 << 16,
            weight: 1,
        },
        exposure: {
            cn: '露出',
            code: 0x0080 << 16,
            weight: 1,
        },
        piss: {
            cn: '尿浴',
            code: 0x1000 << 16,
            weight: 1,
        }
    };


    M.ATTRZ.service.pubis = {
        insert: {
            cn: '做',
            code: 0x0001,
            weight: 1,
        },
        pussy_rub: {
            cn: '磨棒',
            code: 0x0002,
            weight: 1
        },
        pussy_finger: {
            cn: '扣逼',
            code: 0x0004,
            weight: 1,
        },
        pussy_lick: {
            cn: '舔鲍',
            code: 0x0008,
            weight: 1,
        },
        anal: {
            cn: '菊花',
            code: 0x0001 << 16,
        },
        enema : {
            cn: '灌肠',
            code: 0x0002 << 16,
        },
        cumshot: {
            cn: '无套',
            code: 0x0010 << 16,
        },
        ejaculation: {
            cn: '潮喷',
            code: 0x0020 << 16,
        },
        masturbate: {
            cn: '自慰',
            code: 0x0040 << 16,
        }

    };


    M.ATTRZ.service.tool = {
        heel: {
            cn: '高跟',
            code: 0x0001,
        },
        suit: {
            cn: '制服',
            code: 0x0002,
        },
        pantyhose: {
            cn: '丝袜',
            code: 0x0004,
        },
        cosplay: {
            cn: 'COSPLAY',
            code: 0x0008,
        },
        toy: {
            cn: '道具',
            code: 0x0010,
        },
        roleplay: {
            cn: '角色扮演',
            code: 0x0020,
        },
        bondage: {
            cn: '捆绑',
            code: 0x0001 << 16,
        },
    };


    M.ATTRZ.service.form = {
        once: {
            cn: '一次',
            code: 0x0001,
            weight: -1,
        },
        twice: {
            cn: '两次',
            code: 0x0002,
            weight: -1,
        },
        hour: {
            cn: '包时',
            code: 0x0004
        },
        night: {
            cn: '包夜',
            code: 0x0008
        },
        double: {
            cn: 'N女一男',
            code: 0x0001 << 16,
        },
        np: {
            cn: 'N男一女',
            code: 0x0002 << 16,
        },
        mix: {
            cn: '乱交',
            code: 0x0004 << 16,
            weight: 1,
        },
        car: {
            cn: '车震',
            code: 0x0010 << 16,
            weight: 1,
        },
        outdoor: {
            cn: '野外',
            code: 0x0020 << 16,
            weight: 1,
        },
        play: {
            cn: '角色扮演',
            code: 0x0040 << 16,
            weight: 1,
        },
        sm1: {
            cn: '轻度SM',
            code: 0x0100 << 16,
        },
        sm2: {
            cn: '中度SM',
            code: 0x0200 << 16,
        },
        sm3: {
            cn: '重度SM',
            code: 0x0400 << 16,
        },
        s: {
            cn: '女王调教',
            code: 0x1000 << 16,
        },
        m: {
            cn: '女奴调教',
            code: 0x2000 << 16,
        },
    };

    M.ATTRZ.service_cn = {
        open:  '服务',
        mouth: '口技',
        hand:  '手工',
        body:  '体触',
        pubis: '耻尾',
        tool:  '器具',
        form:  '玩志',
    };

    M.ATTRZCODE.service = UTIL.map.switchKeyGroup(M.ATTRZ.service, 'code');

    M.ATTRZ.rating = {
        overall: {
            cn: "整体",
        },
        face: {
            cn: "颜值"
        },
        body: {
            cn: "身材",
            weight: 1,
        },
        shape: {
            cn: "身形"
        },
        service: {
            cn: "服务"
        },
        attitude: {
            cn: '态度',
        },
        character: {
            cn: "性格",
            weight: 1,
        },
        massage: {
            cn: "按摩"
        },
        mouth: {
            cn: '口技'
        },
        technique: {
            cn: '床技'
        },
        slutty: {
            cn: "骚浪"
        },
        cooperative: {
            cn: '配合',
            weight: 1,
        },
        young: {
            cn: '嫩口',
            weight: 1,
        },
        environ: {
            cn: "环境",
            weight: 1,
        },
        leg: {
            cn: "腿型",
            weight: 1,
        },
        skin: {
            cn: "皮肤",
            weight: 1,
        },
    };

    M.ATTRZCODE.star = {
        70: {
            cn: '一⭐',
            value: 70,
        },
        75: {
            cn: '二⭐',
            value: 75,
        },
        80: {
            cn: '三⭐',
            value: 80,
        },
        85: {
            cn: '四⭐',
            value: 85,
        },
        90: {
            cn: '五⭐',
            value: 90,
        },
        95: {
            cn: '六⭐',
            value: 95,
        },
        100: {
            cn: '七⭐',
            value: 100,
        }
    };


    M.ATTRZ.character = {
        hot: {
            cn: '热情型',
            code: 0x0010,
        },
        slutty: {
            cn: '骚浪型',
            code: 0x0020,
        },
        cute: {
            cn: '可爱型',
            code: 0x0040,
            weight: 1,
        },
        cooperative: {
            cn: '配合',
            code: 0x0080,
        },
        talkative: {
            cn: '健谈',
            code: 0x0100,
            weight: 1,
        },
        tender: {
            cn: '温柔',
            code: 0x0200,
            weight: 1,
        },
        aura: {
            cn: '气质型',
            code: 0x0400,
            weight: 1,
        },
        active: {
            cn: '主动型',
            code: 0x0800,
            weight: 1,
        },
        pure: {
            cn: '清纯型',
            code: 0x1000,
            weight: 1,
        },
        technique : {
            cn: '床技型',
            code: 0x2000,
            weight: 1,
        },
        reactive: {
            cn: '反应好',
            code: 0x4000,
            weight: 1,
        },
        service: {
            cn: '服务型',
            code: 0x8000,
        },

        lang: {
            cn: '会外语',
            code: 0x0001 << 16,
            weight: 1,
        },

        special: {
            cn: '特殊技术',
            code: 0x0002 << 16,
        },

        heavy: {
            cn: '重口型',
            code: 0x0004 << 16,
            weight: 1,
        },

        beauty: {
            cn: '颜值型',
            code: 0x0008 << 16,
        },

        club: {
            cn: '浦妹型',
            code: 0x0010 << 16,
            weight: 1,
        },

        young: {
            cn: '嫩口型',
            code: 0x0020 << 16,
        }

    };


    M.ATTRZCODE.character = UTIL.map.switchKey(M.ATTRZ.character, 'code');

    M.ATTRZ.charge = {

        resource: {
            cn: '资源费用'
        },

        threshold: {
            cn: '门槛费用（给妹的）'
        },

        h1: {
            cn: '半套手工',
            code: 0x0001,
        },
        h2: {
            cn: '半套口手',
            code: 0x0002,
        },
        h3: {
            cn: '半套口爆',
            code: 0x0004,
        },
        n1: {
            cn: '简单服务',
            code: 0x0010,
        },
        n2: {
            cn: '简单服务x2',
            code: 0x0010,
        },
        x1: {
            cn: '全套',
            code: 0x0100,
        },
        x2: {
            cn: '全套x2',
            code: 0x0200,
        },
        g1: {
            cn: '多服务',
            code: 0x0100,
        },
        g2: {
            cn: '多服务x2',
            code: 0x0200,
        },
        hour60: {
            cn: '包时(60min)'
        },
        hour90: {
            cn: '包时(90min)'
        },
        hour120: {
            cn: '包时(120min)'
        },
        hour180: {
            cn: '包时(180min)'
        },
        night1: {
            cn: '包夜',
        },
        night2: {
            cn: '包日',
        },
        night3: {
            cn: '包游',
        },

        kiss: {
            cn: '舌吻',
        },
        six_nine: {
            cn: '69',
        },
        pantyhose: {
            cn: '丝袜',
        },
        anal: {
            cn: '额外后门'
        },
        cumshot: {
            cn: '额外无套'
        },
        np: {
            cn: '额外多P'
        },
        outdoor: {
            cn: '上门',
        },
        booking: {
            cn: '订金',
        },

        sm1: {
            cn: 'SM(轻度)',
        },
        sm2: {
            cn: 'SM(中度)',
        },
        sm3: {
            cn: 'SM(重度)',
        },

    };

    /* ====================================== feed =============================== */

    M.ATTRZ.feed = { };
    const feedHole = [ 1, 2, 3, 5, 10 ];
    for(let i = 0; i < feedHole.length; i++) {
        const hole = feedHole[i];
        M.ATTRZ.feed[hole] = {
            cn: i + '+',
            code: i,
        }
    }


    return M;
}

export default init;