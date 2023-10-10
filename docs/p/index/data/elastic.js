
const SchemaOne = {
    mappings: {
        properties: {
            id: { type: 'keyword' },
        }
    }
};



async function init(opts) {

    function resultToMap(res) {
        const map = {};
        const hits = res['hits']['hits'];
        for(let i = 0; i < hits.length; i += 1) {
            const hit = hits[i];
            const _id = hit['_id'];
            map[_id] = hit['_source'];
        }
        return map;
    }

    function resultToArray(res) {
        const array = [];
        const hits = res['hits']['hits'];
        for(let i = 0; i < hits.length; i += 1) {
            const hit = hits[i];
            array.push(hit['_source']);
        }
        return array;
    }

    return {
        SchemaOne,
        resultToMap,
        resultToArray,
    }
}

export default init;
