

const UTIL = require('util');
const CHILD_PROCESS = require('child_process');
const PROTO = require('../../util/protocol');

const attachWeb = (express) => {

    const win32 = process.platform.indexOf('win') >= 0;

    async function exec(cmd) {
        const exec = UTIL.promisify(CHILD_PROCESS.exec);
        if (win32) {
            cmd = '@chcp 650001 >nul & ' + cmd;
        }
        const start = new Date().getTime();
        const data = await exec(cmd, {encoding: "UTF-8"});
        const end = new Date().getTime();
        const consume = end - start;
        return {
            cmd,
            start, end, consume,
            ...data,
        };
    }

    express.route('/api/git/sync').all(async (req, res) => {
        let dir = req.query.dir;
        let cmd = '';
        if (dir && dir !== '.') {
            if (dir.indexOf("'") >= 0 ||  dir.indexOf('"') >= 0) {
                res.json(
                    PROTO.json.error(250, "you are bad guy")
                );
                return;
            }
            if (win32) {
                dir = '"' + dir + '"';
            } else {
                dir = "'" + dir + "'";
            }
            cmd = 'cd ' + dir;
            if (win32) {
                cmd = cmd + ' & ';
            } else {
                cmd = cmd + ' && ';
            }
        }
        cmd = cmd + ' git reset --hard HEAD && git pull';
        const ret = await exec(cmd);
        res.json(PROTO.json.data(ret || ''));
    });

};

module.exports = {
    attachWeb,
};