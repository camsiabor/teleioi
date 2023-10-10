const legacy = {

    'meta.sha': async function(ctx, { path, ref }) {

        let stamp = stamping(ctx);
        const reqopts = {
            method: 'GET',
        };
        axiosopts(ctx, reqopts);

        const user = C.SELF.github.name;
        const repo = 'teleioi_limni';
        ref = ref || 'main';
        reqopts.url = UTIL.path.concat(
            'https://api.github.com/repos',
            user, repo,
            '/contents',
            path,
            '?ref=' + ref + '&_=' + stamp
        );
        let sha = '';
        const resp = await axios(reqopts);
        //const resp = await axios.get(reqopts.url);
        const data = resp.data;
        for(let i = 0; i < data.length; i++) {
            const one = data[i];
            if (one.name === target) {
                sha = one.sha;
            }
        }
        return sha;
    },

    'meta.cache': async function(ctx, { sha, path, target, }) {
        if (sha) {
            const shaprev = UTIL.local.load('meta/' + path + target + '?sha' );
            sha = await ctx.dispatch('meta.sha', params);
            if (sha) {
                UTIL.local.save('meta/' + path + target + '?sha', sha);
            }
            if (shaprev !== sha) {
                return { sha };
            }
        }
        const data = UTIL.local.load('meta/' + path + target);
        return { data, sha, cache: true };
    },
};