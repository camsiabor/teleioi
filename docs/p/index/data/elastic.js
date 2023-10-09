
const SchemaGirl = {
    mappings: {
        properties: {
            id: {
                type: "keyword"
            },

            code: {
                type: "keyword"
            },

            type: {
                type: "keyword"
            },

            name: {
                type: "keyword"
            },

            desc: {
                type: "text"
            },

            locator: {
                type: "keyword"
            },

            body: {
                properties: {
                    birth: {
                        type: "integer"
                    },
                    height: {
                        type: "integer"
                    },
                    weight: {
                        type: "integer"
                    },
                    chest: {
                        type: "integer"
                    },
                    cosmetic: {
                        type: "long"
                    }
                }
            },

            location: {
                properties: {
                    nation: {
                        type: "keyword"
                    },
                    province: {
                        type: "keyword"
                    },
                    city: {
                        type: "keyword"
                    },
                    district: {
                        type: "keyword"
                    },
                    area: {
                        type: "keyword"
                    },
                    street: {
                        type: "keyword"
                    }
                }
            },

            service: {
                properties: {
                    open: {
                      type: "integer"
                    },
                    mouth: {
                        type: "integer"
                    },
                    hand: {
                        type: "integer"
                    },
                    foot: {
                        type: "integer"
                    },
                    body: {
                        type: "integer"
                    },
                    pubis: {
                        type: "integer"
                    },
                    form: {
                        type: "integer"
                    },
                    charge: {
                        type: "integer"
                    },
                    duration: {
                        type: "integer"
                    },
                    services: {
                        type: "nested"
                    },
                }
            },

            charge : {
                properties: {
                    currency: {
                        type: "keyword"
                    },
                    h1: {
                        type: "integer",
                    },
                    h2: {
                        type: "integer",
                    },
                    h3: {
                        type: "integer",
                    },
                    n1: {
                        type: "integer"
                    },
                    n2: {
                        type: "integer"
                    },
                    n3: {
                        type: "integer"
                    },
                    x1: {
                        type: "integer"
                    },
                    x2: {
                        type: "integer"
                    },
                    x3: {
                        type: "integer"
                    },
                    g1: {
                        type: "integer"
                    },
                    g2: {
                        type: "integer"
                    },
                    g3: {
                        type: "integer"
                    },
                    hour60: {
                        type: "integer"
                    },
                    hour90: {
                        type: "integer"
                    },
                    hour120: {
                        type: "integer"
                    },
                    hour180: {
                        type: "integer"
                    },
                    night1: {
                        type: "integer"
                    },
                    night2: {
                        type: "integer"
                    },
                    night3: {
                        type: "integer"
                    },
                    sm1: {
                        type: "integer"
                    },
                    sm2: {
                        type: "integer"
                    },
                    sm3: {
                        type: "integer"
                    },
                    outdoor: {
                        type: "integer"
                    }
                }
            },

            // charater
            character: {
                properties: {
                    flag: {
                        type: "long"
                    },
                    elements: {
                        type: "text"
                    },
                }
            },

            status: {
                properties: {
                    flag: {
                        type: "long",
                    },
                    s1: {
                        type: "keyword"
                    },
                    s2: {
                        type: "keyword"
                    },
                    s3: {
                        type: "keyword"
                    },
                    t_work: {
                        type: "date"
                    },
                    t_rest: {
                        type: "date"
                    },
                    t_menses: {
                        type: "date"
                    },
                    t_change: {
                        type: "date"
                    },
                    t: {
                        type: "date"
                    }
                }
            },

            feed: {
                properties: {
                    feeds: {
                        type: "nested"
                    },
                    t: {
                        type: "date"
                    }
                }
            },

            rating: {
                properties: {
                    overall: {
                        type: "integer"
                    },
                    face: {
                        type: "integer"
                    },
                    body: {
                        type: "integer"
                    },
                    shape: {
                        type: "integer"
                    },
                    service: {
                        type: "integer"
                    },
                    character: {
                        type: "integer"
                    },
                    massage: {
                        type: "integer"
                    },
                    slutty: {
                        type: "integer"
                    },
                    environ: {
                        type: "integer"
                    },
                    leg: {
                        type: "integer"
                    },
                    skin: {
                        type: "integer"
                    },
                    t: {
                        type: "date"
                    }
                }
            },

            secret: {
                properties: {

                }
            },

            extra: {
                properties: {
                    t: {
                        type: "date"
                    }
                }
            }
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
        SchemaGirl,
        resultToMap,
        resultToArray,
    }
}

export default init;
