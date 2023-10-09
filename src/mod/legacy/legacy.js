/* ====================== Ping ============================ */

function Ping(opts) {
    Object.assign(this, opts);
    this.stamp = 0;
}

Ping.loop = function(pings) {
    for(let key in pings) {
        const ping = pings[key];
        setTimeout(ping.reach, 1);
    }
};

Ping.init = function() {
    Ping.all = {};
    const remotes = cfg.proxy.remotes || [];
    for(let i = 0; i < remotes.length; i++) {
        Ping.all[i] = new Ping(remotes[i]);
    }
    Ping.loop(Ping.all);
    setInterval(Ping.loop, 5000);
}

Ping.prototype.reach = async function() {
    try {
        if (!this.interval) {
            this.interval = 15000;
        }
        const now = new Date().getTime();
        if (now - this.stamp < this.interval) {
            return;
        }
        await AXIOS.post(this.endpoint, {
            name: this.name,
        });
        this.stamp = new Date().getTime();
    } catch (ex) {
        this.errmsg = ex.toString();
    }
};

const ipv4 = function(req) {
    const addr = req.socket.remoteAddress;
    const i = addr.lastIndexOf(':');
    if (i >= 0) {
        return addr.substr(i + 1);
    }
    return addr;
}

const proxier = HTTP_PROXY['createProxyServer']({});

gate.post('/proxy/register', (req, res) => {
    res.json({
        ip: req.ip
    });
});

const agent = HTTP.createServer((req, res) => {
    console.log('ip', ipv4(req));
    proxier.web(req, res, {
        target: 'https://szplay.net'
    });
});



async function testing(req, res) {

    const dir = 'D:/snapshot/';
    let name = req.query.name;
    if (!name) {
        return "no name";
    }
    name = name.toUpperCase();

    const img = dir + name + '.jpg';
    const mid = dir + name + '_test.jpg';
    const watermark = dir + 'water.png';
    const mp4 = dir + name + '.mp4';

    await mani.watermark({
        src: img,
        des: mid,
        mark: watermark,
    });

    await mani.videofy( {
        src: mid,
        des: mp4,
        loop: 30,
        fps: 1,
    });

    return mp4;

}

app.get('/api/test',  async (req, res, next) => {
    try {
        const testret = await testing(req, res);
        res.send( (testret || "ok").toString() );
    } catch (ex) {
        res.send(ex.toString());
        logger.error(ex);
    }
});


app.get('/api/compress', async (req, res) => {
    const src = req.params.src || cfg.compress.src;
    const des = req.params.des || cfg.compress.des;
    const quality = req.params.quality || cfg.compress.quality;
    const files = await compressor.compress(src, des, quality);
    const array = [];
    for(let i = 0; i < files.length; i++) {
        const file = files[i];
        array.push(file.destinationPath);
    }
    res.send(array.join("</br>"));
});
