!function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.GitHub = e()
    }
}(function () {
    var e;
    return function () {
        function e(t, r, n) {
            function o(s, u) {
                if (!r[s]) {
                    if (!t[s]) {
                        var a = "function" == typeof require && require;
                        if (!u && a) return a(s, !0);
                        if (i) return i(s, !0);
                        var f = new Error("Cannot find module '" + s + "'");
                        throw f.code = "MODULE_NOT_FOUND", f
                    }
                    var c = r[s] = {exports: {}};
                    t[s][0].call(c.exports, function (e) {
                        return o(t[s][1][e] || e)
                    }, c, c.exports, e, t, r, n)
                }
                return r[s].exports
            }

            for (var i = "function" == typeof require && require, s = 0; s < n.length; s++) o(n[s]);
            return o
        }

        return e
    }()({
        1: [function (e, t, r) {
            "use strict";

            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function o(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function i(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            var s = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }

                return function (t, r, n) {
                    return r && e(t.prototype, r), n && e(t, n), t
                }
            }(), u = e("./Requestable"), a = function (e) {
                return e && e.__esModule ? e : {default: e}
            }(u), f = function (e) {
                function t(e, r, i) {
                    n(this, t);
                    var s = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, r, i));
                    return s.__id = e, s
                }

                return i(t, e), s(t, [{
                    key: "read", value: function (e) {
                        return this._request("GET", "/gists/" + this.__id, null, e)
                    }
                }, {
                    key: "create", value: function (e, t) {
                        var r = this;
                        return this._request("POST", "/gists", e, t).then(function (e) {
                            return r.__id = e.data.id, e
                        })
                    }
                }, {
                    key: "delete", value: function (e) {
                        return this._request("DELETE", "/gists/" + this.__id, null, e)
                    }
                }, {
                    key: "fork", value: function (e) {
                        return this._request("POST", "/gists/" + this.__id + "/forks", null, e)
                    }
                }, {
                    key: "update", value: function (e, t) {
                        return this._request("PATCH", "/gists/" + this.__id, e, t)
                    }
                }, {
                    key: "star", value: function (e) {
                        return this._request("PUT", "/gists/" + this.__id + "/star", null, e)
                    }
                }, {
                    key: "unstar", value: function (e) {
                        return this._request("DELETE", "/gists/" + this.__id + "/star", null, e)
                    }
                }, {
                    key: "isStarred", value: function (e) {
                        return this._request204or404("/gists/" + this.__id + "/star", null, e)
                    }
                }, {
                    key: "listCommits", value: function (e) {
                        return this._requestAllPages("/gists/" + this.__id + "/commits", null, e)
                    }
                }, {
                    key: "getRevision", value: function (e, t) {
                        return this._request("GET", "/gists/" + this.__id + "/" + e, null, t)
                    }
                }, {
                    key: "listComments", value: function (e) {
                        return this._requestAllPages("/gists/" + this.__id + "/comments", null, e)
                    }
                }, {
                    key: "getComment", value: function (e, t) {
                        return this._request("GET", "/gists/" + this.__id + "/comments/" + e, null, t)
                    }
                }, {
                    key: "createComment", value: function (e, t) {
                        return this._request("POST", "/gists/" + this.__id + "/comments", {body: e}, t)
                    }
                }, {
                    key: "editComment", value: function (e, t, r) {
                        return this._request("PATCH", "/gists/" + this.__id + "/comments/" + e, {body: t}, r)
                    }
                }, {
                    key: "deleteComment", value: function (e, t) {
                        return this._request("DELETE", "/gists/" + this.__id + "/comments/" + e, null, t)
                    }
                }]), t
            }(a.default);
            t.exports = f
        }, {"./Requestable": 9}],
        2: [function (e, t, r) {
            "use strict";

            function n(e) {
                return e && e.__esModule ? e : {default: e}
            }

            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            var i = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var n = t[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                        }
                    }

                    return function (t, r, n) {
                        return r && e(t.prototype, r), n && e(t, n), t
                    }
                }(), s = e("./Gist"), u = n(s), a = e("./User"), f = n(a), c = e("./Issue"), l = n(c), h = e("./Search"),
                p = n(h), d = e("./RateLimit"), y = n(d), _ = e("./Repository"), g = n(_), m = e("./Organization"),
                v = n(m), b = e("./Team"), w = n(b), E = e("./Markdown"), T = n(E), k = e("./Project"), A = n(k),
                P = function () {
                    function e(t) {
                        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "https://api.github.com";
                        o(this, e), this.__apiBase = r, this.__auth = t || {}
                    }

                    return i(e, [{
                        key: "getGist", value: function (e) {
                            return new u.default(e, this.__auth, this.__apiBase)
                        }
                    }, {
                        key: "getUser", value: function (e) {
                            return new f.default(e, this.__auth, this.__apiBase)
                        }
                    }, {
                        key: "getOrganization", value: function (e) {
                            return new v.default(e, this.__auth, this.__apiBase)
                        }
                    }, {
                        key: "getTeam", value: function (e) {
                            return new w.default(e, this.__auth, this.__apiBase)
                        }
                    }, {
                        key: "getRepo", value: function (e, t) {
                            return new g.default(this._getFullName(e, t), this.__auth, this.__apiBase)
                        }
                    }, {
                        key: "getIssues", value: function (e, t) {
                            return new l.default(this._getFullName(e, t), this.__auth, this.__apiBase)
                        }
                    }, {
                        key: "search", value: function (e) {
                            return new p.default(e, this.__auth, this.__apiBase)
                        }
                    }, {
                        key: "getRateLimit", value: function () {
                            return new y.default(this.__auth, this.__apiBase)
                        }
                    }, {
                        key: "getMarkdown", value: function () {
                            return new T.default(this.__auth, this.__apiBase)
                        }
                    }, {
                        key: "getProject", value: function (e) {
                            return new A.default(e, this.__auth, this.__apiBase)
                        }
                    }, {
                        key: "_getFullName", value: function (e, t) {
                            var r = e;
                            return t && (r = e + "/" + t), r
                        }
                    }]), e
                }();
            t.exports = P
        }, {
            "./Gist": 1,
            "./Issue": 3,
            "./Markdown": 4,
            "./Organization": 5,
            "./Project": 6,
            "./RateLimit": 7,
            "./Repository": 8,
            "./Search": 10,
            "./Team": 11,
            "./User": 12
        }],
        3: [function (e, t, r) {
            "use strict";

            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function o(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function i(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            var s = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }

                return function (t, r, n) {
                    return r && e(t.prototype, r), n && e(t, n), t
                }
            }(), u = e("./Requestable"), a = function (e) {
                return e && e.__esModule ? e : {default: e}
            }(u), f = function (e) {
                function t(e, r, i) {
                    n(this, t);
                    var s = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, r, i));
                    return s.__repository = e, s
                }

                return i(t, e), s(t, [{
                    key: "createIssue", value: function (e, t) {
                        return this._request("POST", "/repos/" + this.__repository + "/issues", e, t)
                    }
                }, {
                    key: "listIssues", value: function (e, t) {
                        return this._requestAllPages("/repos/" + this.__repository + "/issues", e, t)
                    }
                }, {
                    key: "listIssueEvents", value: function (e, t) {
                        return this._request("GET", "/repos/" + this.__repository + "/issues/" + e + "/events", null, t)
                    }
                }, {
                    key: "listIssueComments", value: function (e, t) {
                        return this._request("GET", "/repos/" + this.__repository + "/issues/" + e + "/comments", null, t)
                    }
                }, {
                    key: "getIssueComment", value: function (e, t) {
                        return this._request("GET", "/repos/" + this.__repository + "/issues/comments/" + e, null, t)
                    }
                }, {
                    key: "createIssueComment", value: function (e, t, r) {
                        return this._request("POST", "/repos/" + this.__repository + "/issues/" + e + "/comments", {body: t}, r)
                    }
                }, {
                    key: "editIssueComment", value: function (e, t, r) {
                        return this._request("PATCH", "/repos/" + this.__repository + "/issues/comments/" + e, {body: t}, r)
                    }
                }, {
                    key: "deleteIssueComment", value: function (e, t) {
                        return this._request("DELETE", "/repos/" + this.__repository + "/issues/comments/" + e, null, t)
                    }
                }, {
                    key: "editIssue", value: function (e, t, r) {
                        return this._request("PATCH", "/repos/" + this.__repository + "/issues/" + e, t, r)
                    }
                }, {
                    key: "getIssue", value: function (e, t) {
                        return this._request("GET", "/repos/" + this.__repository + "/issues/" + e, null, t)
                    }
                }, {
                    key: "listMilestones", value: function (e, t) {
                        return this._request("GET", "/repos/" + this.__repository + "/milestones", e, t)
                    }
                }, {
                    key: "getMilestone", value: function (e, t) {
                        return this._request("GET", "/repos/" + this.__repository + "/milestones/" + e, null, t)
                    }
                }, {
                    key: "createMilestone", value: function (e, t) {
                        return this._request("POST", "/repos/" + this.__repository + "/milestones", e, t)
                    }
                }, {
                    key: "editMilestone", value: function (e, t, r) {
                        return this._request("PATCH", "/repos/" + this.__repository + "/milestones/" + e, t, r)
                    }
                }, {
                    key: "deleteMilestone", value: function (e, t) {
                        return this._request("DELETE", "/repos/" + this.__repository + "/milestones/" + e, null, t)
                    }
                }, {
                    key: "createLabel", value: function (e, t) {
                        return this._request("POST", "/repos/" + this.__repository + "/labels", e, t)
                    }
                }, {
                    key: "listLabels", value: function (e, t) {
                        return this._request("GET", "/repos/" + this.__repository + "/labels", e, t)
                    }
                }, {
                    key: "getLabel", value: function (e, t) {
                        return this._request("GET", "/repos/" + this.__repository + "/labels/" + e, null, t)
                    }
                }, {
                    key: "editLabel", value: function (e, t, r) {
                        return this._request("PATCH", "/repos/" + this.__repository + "/labels/" + e, t, r)
                    }
                }, {
                    key: "deleteLabel", value: function (e, t) {
                        return this._request("DELETE", "/repos/" + this.__repository + "/labels/" + e, null, t)
                    }
                }]), t
            }(a.default);
            t.exports = f
        }, {"./Requestable": 9}],
        4: [function (e, t, r) {
            "use strict";

            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function o(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function i(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            var s = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }

                return function (t, r, n) {
                    return r && e(t.prototype, r), n && e(t, n), t
                }
            }(), u = e("./Requestable"), a = function (e) {
                return e && e.__esModule ? e : {default: e}
            }(u), f = function (e) {
                function t(e, r) {
                    return n(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r))
                }

                return i(t, e), s(t, [{
                    key: "render", value: function (e, t) {
                        return this._request("POST", "/markdown", e, t, !0)
                    }
                }]), t
            }(a.default);
            t.exports = f
        }, {"./Requestable": 9}],
        5: [function (e, t, r) {
            "use strict";

            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function o(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function i(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            var s = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }

                return function (t, r, n) {
                    return r && e(t.prototype, r), n && e(t, n), t
                }
            }(), u = e("./Requestable"), a = function (e) {
                return e && e.__esModule ? e : {default: e}
            }(u), f = function (e) {
                function t(e, r, i) {
                    n(this, t);
                    var s = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, r, i));
                    return s.__name = e, s
                }

                return i(t, e), s(t, [{
                    key: "createRepo", value: function (e, t) {
                        return this._request("POST", "/orgs/" + this.__name + "/repos", e, t)
                    }
                }, {
                    key: "getRepos", value: function (e) {
                        var t = this._getOptionsWithDefaults({direction: "desc"});
                        return this._requestAllPages("/orgs/" + this.__name + "/repos", t, e)
                    }
                }, {
                    key: "isMember", value: function (e, t) {
                        return this._request204or404("/orgs/" + this.__name + "/members/" + e, null, t)
                    }
                }, {
                    key: "listMembers", value: function (e, t) {
                        return this._request("GET", "/orgs/" + this.__name + "/members", e, t)
                    }
                }, {
                    key: "getTeams", value: function (e) {
                        return this._requestAllPages("/orgs/" + this.__name + "/teams", void 0, e)
                    }
                }, {
                    key: "createTeam", value: function (e, t) {
                        return this._request("POST", "/orgs/" + this.__name + "/teams", e, t)
                    }
                }, {
                    key: "listProjects", value: function (e) {
                        return this._requestAllPages("/orgs/" + this.__name + "/projects", {AcceptHeader: "inertia-preview"}, e)
                    }
                }, {
                    key: "createProject", value: function (e, t) {
                        return e = e || {}, e.AcceptHeader = "inertia-preview", this._request("POST", "/orgs/" + this.__name + "/projects", e, t)
                    }
                }]), t
            }(a.default);
            t.exports = f
        }, {"./Requestable": 9}],
        6: [function (e, t, r) {
            "use strict";

            function n(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                    return r
                }
                return Array.from(e)
            }

            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function i(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            var u = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }

                return function (t, r, n) {
                    return r && e(t.prototype, r), n && e(t, n), t
                }
            }(), a = e("./Requestable"), f = function (e) {
                return e && e.__esModule ? e : {default: e}
            }(a), c = function (e) {
                function t(e, r, n) {
                    o(this, t);
                    var s = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, r, n, "inertia-preview"));
                    return s.__id = e, s
                }

                return s(t, e), u(t, [{
                    key: "getProject", value: function (e) {
                        return this._request("GET", "/projects/" + this.__id, null, e)
                    }
                }, {
                    key: "updateProject", value: function (e, t) {
                        return this._request("PATCH", "/projects/" + this.__id, e, t)
                    }
                }, {
                    key: "deleteProject", value: function (e) {
                        return this._request("DELETE", "/projects/" + this.__id, null, e)
                    }
                }, {
                    key: "listProjectColumns", value: function (e) {
                        return this._requestAllPages("/projects/" + this.__id + "/columns", null, e)
                    }
                }, {
                    key: "getProjectColumn", value: function (e, t) {
                        return this._request("GET", "/projects/columns/" + e, null, t)
                    }
                }, {
                    key: "createProjectColumn", value: function (e, t) {
                        return this._request("POST", "/projects/" + this.__id + "/columns", e, t)
                    }
                }, {
                    key: "updateProjectColumn", value: function (e, t, r) {
                        return this._request("PATCH", "/projects/columns/" + e, t, r)
                    }
                }, {
                    key: "deleteProjectColumn", value: function (e, t) {
                        return this._request("DELETE", "/projects/columns/" + e, null, t)
                    }
                }, {
                    key: "moveProjectColumn", value: function (e, t, r) {
                        return this._request("POST", "/projects/columns/" + e + "/moves", {position: t}, r)
                    }
                }, {
                    key: "listProjectCards", value: function (e) {
                        var t = this;
                        return this.listProjectColumns().then(function (e) {
                            var r = e.data;
                            return Promise.all(r.map(function (e) {
                                return t._requestAllPages("/projects/columns/" + e.id + "/cards", null)
                            }))
                        }).then(function (t) {
                            var r = t.reduce(function (e, t) {
                                var r = t.data;
                                return e.push.apply(e, n(r)), e
                            }, []);
                            return e && e(null, r), r
                        }).catch(function (t) {
                            if (e) return void e(t);
                            throw t
                        })
                    }
                }, {
                    key: "listColumnCards", value: function (e, t) {
                        return this._requestAllPages("/projects/columns/" + e + "/cards", null, t)
                    }
                }, {
                    key: "getProjectCard", value: function (e, t) {
                        return this._request("GET", "/projects/columns/cards/" + e, null, t)
                    }
                }, {
                    key: "createProjectCard", value: function (e, t, r) {
                        return this._request("POST", "/projects/columns/" + e + "/cards", t, r)
                    }
                }, {
                    key: "updateProjectCard", value: function (e, t, r) {
                        return this._request("PATCH", "/projects/columns/cards/" + e, t, r)
                    }
                }, {
                    key: "deleteProjectCard", value: function (e, t) {
                        return this._request("DELETE", "/projects/columns/cards/" + e, null, t)
                    }
                }, {
                    key: "moveProjectCard", value: function (e, t, r, n) {
                        return this._request("POST", "/projects/columns/cards/" + e + "/moves", {
                            position: t,
                            column_id: r
                        }, n)
                    }
                }]), t
            }(f.default);
            t.exports = c
        }, {"./Requestable": 9}],
        7: [function (e, t, r) {
            "use strict";

            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function o(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function i(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            var s = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }

                return function (t, r, n) {
                    return r && e(t.prototype, r), n && e(t, n), t
                }
            }(), u = e("./Requestable"), a = function (e) {
                return e && e.__esModule ? e : {default: e}
            }(u), f = function (e) {
                function t(e, r) {
                    return n(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r))
                }

                return i(t, e), s(t, [{
                    key: "getRateLimit", value: function (e) {
                        return this._request("GET", "/rate_limit", null, e)
                    }
                }]), t
            }(a.default);
            t.exports = f
        }, {"./Requestable": 9}],
        8: [function (e, t, r) {
            (function (r) {
                (function () {
                    "use strict";

                    function n(e) {
                        return e && e.__esModule ? e : {default: e}
                    }

                    function o(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }

                    function i(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }

                    function s(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }

                    var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                            return typeof e
                        } : function (e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }, a = function () {
                            function e(e, t) {
                                for (var r = 0; r < t.length; r++) {
                                    var n = t[r];
                                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                                }
                            }

                            return function (t, r, n) {
                                return r && e(t.prototype, r), n && e(t, n), t
                            }
                        }(), f = e("./Requestable"), c = n(f), l = e("utf8"), h = n(l), p = e("js-base64"), d = e("debug"),
                        y = n(d), _ = (0, y.default)("github:repository"), g = function (e) {
                            function t(e, r, n) {
                                o(this, t);
                                var s = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, r, n));
                                return s.__fullname = e, s.__currentTree = {branch: null, sha: null}, s
                            }

                            return s(t, e), a(t, [{
                                key: "getRef", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/git/refs/" + e, null, t)
                                }
                            }, {
                                key: "createRef", value: function (e, t) {
                                    return this._request("POST", "/repos/" + this.__fullname + "/git/refs", e, t)
                                }
                            }, {
                                key: "deleteRef", value: function (e, t) {
                                    return this._request("DELETE", "/repos/" + this.__fullname + "/git/refs/" + e, null, t)
                                }
                            }, {
                                key: "deleteRepo", value: function (e) {
                                    return this._request("DELETE", "/repos/" + this.__fullname, null, e)
                                }
                            }, {
                                key: "listTags", value: function (e) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/tags", null, e)
                                }
                            }, {
                                key: "listPullRequests", value: function (e, t) {
                                    return e = e || {}, this._request("GET", "/repos/" + this.__fullname + "/pulls", e, t)
                                }
                            }, {
                                key: "getPullRequest", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/pulls/" + e, null, t)
                                }
                            }, {
                                key: "listPullRequestFiles", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/pulls/" + e + "/files", null, t)
                                }
                            }, {
                                key: "compareBranches", value: function (e, t, r) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/compare/" + e + "..." + t, null, r)
                                }
                            }, {
                                key: "listBranches", value: function (e) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/branches", null, e)
                                }
                            }, {
                                key: "getBlob", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/git/blobs/" + e, null, t, "raw")
                                }
                            }, {
                                key: "getBranch", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/branches/" + e, null, t)
                                }
                            }, {
                                key: "getCommit", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/git/commits/" + e, null, t)
                                }
                            }, {
                                key: "listCommits", value: function (e, t) {
                                    return e = e || {}, "function" == typeof e && (t = e, e = {}), e.since = this._dateToISO(e.since), e.until = this._dateToISO(e.until), this._request("GET", "/repos/" + this.__fullname + "/commits", e, t)
                                }
                            }, {
                                key: "listCommitsOnPR", value: function (e, t, r) {
                                    return t = t || {}, "function" == typeof t && (r = t, t = {}), this._request("GET", "/repos/" + this.__fullname + "/pulls/" + e + "/commits", t, r)
                                }
                            }, {
                                key: "getSingleCommit", value: function (e, t) {
                                    return e = e || "", this._request("GET", "/repos/" + this.__fullname + "/commits/" + e, null, t)
                                }
                            }, {
                                key: "getSha", value: function (e, t, r) {
                                    return e = e ? "?ref=" + e : "", this._request("GET", "/repos/" + this.__fullname + "/contents/" + t + e, null, r)
                                }
                            }, {
                                key: "listStatuses", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/commits/" + e + "/statuses", null, t)
                                }
                            }, {
                                key: "getCombinedStatus", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/commits/" + e + "/status", null, t)
                                }
                            }, {
                                key: "getTree", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/git/trees/" + e, null, t)
                                }
                            }, {
                                key: "createBlob", value: function (e, t) {
                                    var r = this._getContentObject(e);
                                    return _("sending content", r), this._request("POST", "/repos/" + this.__fullname + "/git/blobs", r, t)
                                }
                            }, {
                                key: "_getContentObject", value: function (e) {
                                    if ("string" == typeof e) return _("contet is a string"), {
                                        content: h.default.encode(e),
                                        encoding: "utf-8"
                                    };
                                    if (void 0 !== r && e instanceof r) return _("We appear to be in Node"), {
                                        content: e.toString("base64"),
                                        encoding: "base64"
                                    };
                                    if ("undefined" != typeof Blob && e instanceof Blob) return _("We appear to be in the browser"), {
                                        content: p.Base64.encode(e),
                                        encoding: "base64"
                                    };
                                    throw _("Not sure what this content is: " + (void 0 === e ? "undefined" : u(e)) + ", " + JSON.stringify(e)), new Error("Unknown content passed to postBlob. Must be string or Buffer (node) or Blob (web)")
                                }
                            }, {
                                key: "updateTree", value: function (e, t, r, n) {
                                    var o = {base_tree: e, tree: [{path: t, sha: r, mode: "100644", type: "blob"}]};
                                    return this._request("POST", "/repos/" + this.__fullname + "/git/trees", o, n)
                                }
                            }, {
                                key: "createTree", value: function (e, t, r) {
                                    return this._request("POST", "/repos/" + this.__fullname + "/git/trees", {
                                        tree: e,
                                        base_tree: t
                                    }, r)
                                }
                            }, {
                                key: "commit", value: function (e, t, r, n, o) {
                                    var i = this;
                                    "function" == typeof n && (o = n, n = {});
                                    var s = {message: r, tree: t, parents: [e]};
                                    return s = Object.assign({}, n, s), this._request("POST", "/repos/" + this.__fullname + "/git/commits", s, o).then(function (e) {
                                        return i.__currentTree.sha = e.data.sha, e
                                    })
                                }
                            }, {
                                key: "updateHead", value: function (e, t, r, n) {
                                    return this._request("PATCH", "/repos/" + this.__fullname + "/git/refs/" + e, {
                                        sha: t,
                                        force: r
                                    }, n)
                                }
                            }, {
                                key: "updateStatus", value: function (e, t, r) {
                                    return this._request("POST", "/repos/" + this.__fullname + "/statuses/" + e, t, r)
                                }
                            }, {
                                key: "updateRepository", value: function (e, t) {
                                    return this._request("PATCH", "/repos/" + this.__fullname, e, t)
                                }
                            }, {
                                key: "getDetails", value: function (e) {
                                    return this._request("GET", "/repos/" + this.__fullname, null, e)
                                }
                            }, {
                                key: "getContributors", value: function (e) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/contributors", null, e)
                                }
                            }, {
                                key: "getContributorStats", value: function (e) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/stats/contributors", null, e)
                                }
                            }, {
                                key: "getCollaborators", value: function (e) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/collaborators", null, e)
                                }
                            }, {
                                key: "isCollaborator", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/collaborators/" + e, null, t)
                                }
                            }, {
                                key: "getContents", value: function (e, t, r, n) {
                                    return t = t ? "" + encodeURI(t) : "", this._request("GET", "/repos/" + this.__fullname + "/contents/" + t, {ref: e}, n, r)
                                }
                            }, {
                                key: "getReadme", value: function (e, t, r) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/readme", {ref: e}, r, t)
                                }
                            }, {
                                key: "fork", value: function (e) {
                                    return this._request("POST", "/repos/" + this.__fullname + "/forks", null, e)
                                }
                            }, {
                                key: "forkToOrg", value: function (e, t) {
                                    return this._request("POST", "/repos/" + this.__fullname + "/forks?organization=" + e, null, t)
                                }
                            }, {
                                key: "listForks", value: function (e) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/forks", null, e)
                                }
                            }, {
                                key: "createBranch", value: function (e, t, r) {
                                    var n = this;
                                    return "function" == typeof t && (r = t, t = e, e = "master"), this.getRef("heads/" + e).then(function (e) {
                                        var o = e.data.object.sha;
                                        return n.createRef({sha: o, ref: "refs/heads/" + t}, r)
                                    })
                                }
                            }, {
                                key: "createPullRequest", value: function (e, t) {
                                    return this._request("POST", "/repos/" + this.__fullname + "/pulls", e, t)
                                }
                            }, {
                                key: "updatePullRequest", value: function (e, t, r) {
                                    return this._request("PATCH", "/repos/" + this.__fullname + "/pulls/" + e, t, r)
                                }
                            }, {
                                key: "listHooks", value: function (e) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/hooks", null, e)
                                }
                            }, {
                                key: "getHook", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/hooks/" + e, null, t)
                                }
                            }, {
                                key: "createHook", value: function (e, t) {
                                    return this._request("POST", "/repos/" + this.__fullname + "/hooks", e, t)
                                }
                            }, {
                                key: "updateHook", value: function (e, t, r) {
                                    return this._request("PATCH", "/repos/" + this.__fullname + "/hooks/" + e, t, r)
                                }
                            }, {
                                key: "deleteHook", value: function (e, t) {
                                    return this._request("DELETE", "/repos/" + this.__fullname + "/hooks/" + e, null, t)
                                }
                            }, {
                                key: "listKeys", value: function (e) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/keys", null, e)
                                }
                            }, {
                                key: "getKey", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/keys/" + e, null, t)
                                }
                            }, {
                                key: "createKey", value: function (e, t) {
                                    return this._request("POST", "/repos/" + this.__fullname + "/keys", e, t)
                                }
                            }, {
                                key: "deleteKey", value: function (e, t) {
                                    return this._request("DELETE", "/repos/" + this.__fullname + "/keys/" + e, null, t)
                                }
                            }, {
                                key: "deleteFile", value: function (e, t, r) {
                                    var n = this;
                                    return this.getSha(e, t).then(function (o) {
                                        var i = {message: "Delete the file at '" + t + "'", sha: o.data.sha, branch: e};
                                        return n._request("DELETE", "/repos/" + n.__fullname + "/contents/" + t, i, r)
                                    })
                                }
                            }, {
                                key: "move", value: function (e, t, r, n) {
                                    var o = this, i = void 0;
                                    return this.getRef("heads/" + e).then(function (e) {
                                        var t = e.data.object;
                                        return o.getTree(t.sha + "?recursive=true")
                                    }).then(function (e) {
                                        var n = e.data, s = n.tree, u = n.sha;
                                        i = u;
                                        var a = s.map(function (e) {
                                            return e.path === t && (e.path = r), "tree" === e.type && delete e.sha, e
                                        });
                                        return o.createTree(a)
                                    }).then(function (e) {
                                        var n = e.data;
                                        return o.commit(i, n.sha, "Renamed '" + t + "' to '" + r + "'")
                                    }).then(function (t) {
                                        var r = t.data;
                                        return o.updateHead("heads/" + e, r.sha, !0, n)
                                    })
                                }
                            }, {
                                key: "writeFile", value: function (e, t, r, n, o, i) {
                                    var s = this;
                                    "function" == typeof (o = o || {}) && (i = o, o = {});
                                    var u = t ? encodeURI(t) : "", a = !1 !== o.encode, f = {
                                        branch: e,
                                        message: n,
                                        author: o.author,
                                        committer: o.committer,
                                        content: a ? p.Base64.encode(r) : r
                                    };
                                    return this.getSha(e, u).then(function (e) {
                                        return f.sha = e.data.sha, s._request("PUT", "/repos/" + s.__fullname + "/contents/" + u, f, i)
                                    }, function () {
                                        return s._request("PUT", "/repos/" + s.__fullname + "/contents/" + u, f, i)
                                    })
                                }
                            }, {
                                key: "isStarred", value: function (e) {
                                    return this._request204or404("/user/starred/" + this.__fullname, null, e)
                                }
                            }, {
                                key: "star", value: function (e) {
                                    return this._request("PUT", "/user/starred/" + this.__fullname, null, e)
                                }
                            }, {
                                key: "unstar", value: function (e) {
                                    return this._request("DELETE", "/user/starred/" + this.__fullname, null, e)
                                }
                            }, {
                                key: "createRelease", value: function (e, t) {
                                    return this._request("POST", "/repos/" + this.__fullname + "/releases", e, t)
                                }
                            }, {
                                key: "updateRelease", value: function (e, t, r) {
                                    return this._request("PATCH", "/repos/" + this.__fullname + "/releases/" + e, t, r)
                                }
                            }, {
                                key: "listReleases", value: function (e) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/releases", null, e)
                                }
                            }, {
                                key: "getRelease", value: function (e, t) {
                                    return this._request("GET", "/repos/" + this.__fullname + "/releases/" + e, null, t)
                                }
                            }, {
                                key: "deleteRelease", value: function (e, t) {
                                    return this._request("DELETE", "/repos/" + this.__fullname + "/releases/" + e, null, t)
                                }
                            }, {
                                key: "mergePullRequest", value: function (e, t, r) {
                                    return this._request("PUT", "/repos/" + this.__fullname + "/pulls/" + e + "/merge", t, r)
                                }
                            }, {
                                key: "listProjects", value: function (e) {
                                    return this._requestAllPages("/repos/" + this.__fullname + "/projects", {AcceptHeader: "inertia-preview"}, e)
                                }
                            }, {
                                key: "createProject", value: function (e, t) {
                                    return e = e || {}, e.AcceptHeader = "inertia-preview", this._request("POST", "/repos/" + this.__fullname + "/projects", e, t)
                                }
                            }]), t
                        }(c.default);
                    t.exports = g
                }).call(this)
            }).call(this, e("buffer").Buffer)
        }, {"./Requestable": 9, buffer: 41, debug: 42, "js-base64": 46, utf8: 49}],
        9: [function (e, t, r) {
            "use strict";

            function n(e) {
                return e && e.__esModule ? e : {default: e}
            }

            function o(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                    return r
                }
                return Array.from(e)
            }

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function s(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function u(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            function a(e) {
                return -1 !== w.indexOf(e)
            }

            function f() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").split(/\s*,\s*/).reduce(function (e, t) {
                    return -1 !== t.search(/rel="next"/) ? (t.match(/<(.*)>/) || [])[1] : e
                }, void 0)
            }

            function c(e, t) {
                return function (r) {
                    var n = void 0;
                    if (r.hasOwnProperty("config")) {
                        var o = r.response, i = o.status, s = o.statusText, u = r.config, a = u.method, f = u.url,
                            c = i + " error making request " + a + " " + f + ': "' + s + '"';
                        n = new v(c, t, r), m(c + " " + JSON.stringify(r.data))
                    } else n = r;
                    if (!e) throw m("throwing error"), n;
                    m("going to error callback"), e(n)
                }
            }

            var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                } : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, h = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var n = t[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                        }
                    }

                    return function (t, r, n) {
                        return r && e(t.prototype, r), n && e(t, n), t
                    }
                }(), p = e("axios"), d = n(p), y = e("debug"), _ = n(y), g = e("js-base64"),
                m = (0, _.default)("github:request"), v = function (e) {
                    function t(e, r, n) {
                        i(this, t);
                        var o = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                        return o.path = r, o.request = n.config, o.response = (n || {}).response || n, o.status = n.status, o
                    }

                    return u(t, e), t
                }(Error), b = function () {
                    function e(t, r, n) {
                        i(this, e), this.__apiBase = r || "https://api.github.com", this.__auth = {
                            token: t.token,
                            username: t.username,
                            password: t.password
                        }, this.__AcceptHeader = n || "v3", t.token ? this.__authorizationHeader = "token " + t.token : t.username && t.password && (this.__authorizationHeader = "Basic " + g.Base64.encode(t.username + ":" + t.password))
                    }

                    return h(e, [{
                        key: "__getURL", value: function (e) {
                            var t = e;
                            -1 === e.indexOf("//") && (t = this.__apiBase + e);
                            var r = "timestamp=" + (new Date).getTime();
                            return t.replace(/(timestamp=\d+)/, r)
                        }
                    }, {
                        key: "__getRequestHeaders", value: function (e, t) {
                            var r = {
                                "Content-Type": "application/json;charset=UTF-8",
                                Accept: "application/vnd.github." + (t || this.__AcceptHeader)
                            };
                            return e && (r.Accept += ".raw"), r.Accept += "+json", this.__authorizationHeader && (r.Authorization = this.__authorizationHeader), r
                        }
                    }, {
                        key: "_getOptionsWithDefaults", value: function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            return e.visibility || e.affiliation || (e.type = e.type || "all"), e.sort = e.sort || "updated", e.per_page = e.per_page || "100", e
                        }
                    }, {
                        key: "_dateToISO", value: function (e) {
                            return e && e instanceof Date && (e = e.toISOString()), e
                        }
                    }, {
                        key: "_request", value: function (e, t, r, n, o) {

                            var stamp = new Date().getTime();
                            var iq = t.lastIndexOf('?');
                            if (iq < 0) {
                                t = t + '?_=' + stamp;
                            } else {
                                t = t + '&_=' + stamp;
                            }

                            var i = this.__getURL(t), s = (r || {}).AcceptHeader;
                            s && delete r.AcceptHeader;
                            var u = this.__getRequestHeaders(o, s), f = {};
                            r && "object" === (void 0 === r ? "undefined" : l(r)) && a(e) && (f = r, r = void 0);
                            var h = {url: i, method: e, headers: u, params: f, data: r, responseType: o ? "text" : "json"};
                            m(h.method + " to " + h.url);
                            var p = (0, d.default)(h).catch(c(n, t));
                            return n && p.then(function (e) {
                                e.data && Object.keys(e.data).length > 0 ? n(null, e.data, e) : "GET" !== h.method && Object.keys(e.data).length < 1 ? n(null, e.status < 300, e) : n(null, e.data, e)
                            }), p
                        }
                    }, {
                        key: "_request204or404", value: function (e, t, r) {
                            var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "GET";
                            return this._request(n, e, t).then(function (e) {
                                return r && r(null, !0, e), !0
                            }, function (e) {
                                if (404 === e.response.status) return r && r(null, !1, e), !1;
                                throw r && r(e), e
                            })
                        }
                    }, {
                        key: "_requestAllPages", value: function (e, t, r, n) {
                            var i = this;
                            return n = n || [], this._request("GET", e, t).then(function (s) {
                                var u, a = void 0
                                ;
                                if (s.data instanceof Array) a = s.data; else {
                                    if (!(s.data.items instanceof Array)) {
                                        var c = "cannot figure out how to append " + s.data + " to the result set";
                                        throw new v(c, e, s)
                                    }
                                    a = s.data.items
                                }
                                (u = n).push.apply(u, o(a));
                                var l = f(s.headers.link);
                                return l && (t || (t = {}), t.page = parseInt(l.match(/([&\?]page=[0-9]*)/g).shift().split("=").pop()), !t || "number" == typeof t.page) ? (m("getting next page: " + l), i._requestAllPages(l, t, r, n)) : (r && r(null, n, s), s.data = n, s)
                            }).catch(c(r, e))
                        }
                    }]), e
                }();
            t.exports = b;
            var w = ["GET", "HEAD", "DELETE"]
        }, {axios: 13, debug: 42, "js-base64": 46}],
        10: [function (e, t, r) {
            "use strict";

            function n(e) {
                return e && e.__esModule ? e : {default: e}
            }

            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function i(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            var u = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var n = t[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                        }
                    }

                    return function (t, r, n) {
                        return r && e(t.prototype, r), n && e(t, n), t
                    }
                }(), a = e("./Requestable"), f = n(a), c = e("debug"), l = n(c), h = (0, l.default)("github:search"),
                p = function (e) {
                    function t(e, r, n) {
                        o(this, t);
                        var s = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, r, n));
                        return s.__defaults = s._getOptionsWithDefaults(e), s
                    }

                    return s(t, e), u(t, [{
                        key: "_search", value: function (e) {
                            var t = this, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0, o = {};
                            return Object.keys(this.__defaults).forEach(function (e) {
                                o[e] = t.__defaults[e]
                            }), Object.keys(r).forEach(function (e) {
                                o[e] = r[e]
                            }), h("searching " + e + " with options:", o), this._requestAllPages("/search/" + e, o, n)
                        }
                    }, {
                        key: "forRepositories", value: function (e, t) {
                            return this._search("repositories", e, t)
                        }
                    }, {
                        key: "forCode", value: function (e, t) {
                            return this._search("code", e, t)
                        }
                    }, {
                        key: "forIssues", value: function (e, t) {
                            return this._search("issues", e, t)
                        }
                    }, {
                        key: "forUsers", value: function (e, t) {
                            return this._search("users", e, t)
                        }
                    }]), t
                }(f.default);
            t.exports = p
        }, {"./Requestable": 9, debug: 42}],
        11: [function (e, t, r) {
            "use strict";

            function n(e) {
                return e && e.__esModule ? e : {default: e}
            }

            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function i(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            var u = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var n = t[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                        }
                    }

                    return function (t, r, n) {
                        return r && e(t.prototype, r), n && e(t, n), t
                    }
                }(), a = e("./Requestable"), f = n(a), c = e("debug"), l = n(c), h = (0, l.default)("github:team"),
                p = function (e) {
                    function t(e, r, n) {
                        o(this, t);
                        var s = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, r, n));
                        return s.__teamId = e, s
                    }

                    return s(t, e), u(t, [{
                        key: "getTeam", value: function (e) {
                            return h("Fetching Team " + this.__teamId), this._request("Get", "/teams/" + this.__teamId, void 0, e)
                        }
                    }, {
                        key: "listRepos", value: function (e) {
                            return h("Fetching repositories for Team " + this.__teamId), this._requestAllPages("/teams/" + this.__teamId + "/repos", void 0, e)
                        }
                    }, {
                        key: "editTeam", value: function (e, t) {
                            return h("Editing Team " + this.__teamId), this._request("PATCH", "/teams/" + this.__teamId, e, t)
                        }
                    }, {
                        key: "listMembers", value: function (e, t) {
                            return h("Getting members of Team " + this.__teamId), this._requestAllPages("/teams/" + this.__teamId + "/members", e, t)
                        }
                    }, {
                        key: "getMembership", value: function (e, t) {
                            return h("Getting membership of user " + e + " in Team " + this.__teamId), this._request("GET", "/teams/" + this.__teamId + "/memberships/" + e, void 0, t)
                        }
                    }, {
                        key: "addMembership", value: function (e, t, r) {
                            return h("Adding user " + e + " to Team " + this.__teamId), this._request("PUT", "/teams/" + this.__teamId + "/memberships/" + e, t, r)
                        }
                    }, {
                        key: "isManagedRepo", value: function (e, t, r) {
                            return h("Getting repo management by Team " + this.__teamId + " for repo " + e + "/" + t), this._request204or404("/teams/" + this.__teamId + "/repos/" + e + "/" + t, void 0, r)
                        }
                    }, {
                        key: "manageRepo", value: function (e, t, r, n) {
                            return h("Adding or Updating repo management by Team " + this.__teamId + " for repo " + e + "/" + t), this._request204or404("/teams/" + this.__teamId + "/repos/" + e + "/" + t, r, n, "PUT")
                        }
                    }, {
                        key: "unmanageRepo", value: function (e, t, r) {
                            return h("Remove repo management by Team " + this.__teamId + " for repo " + e + "/" + t), this._request204or404("/teams/" + this.__teamId + "/repos/" + e + "/" + t, void 0, r, "DELETE")
                        }
                    }, {
                        key: "deleteTeam", value: function (e) {
                            return h("Deleting Team " + this.__teamId), this._request204or404("/teams/" + this.__teamId, void 0, e, "DELETE")
                        }
                    }]), t
                }(f.default);
            t.exports = p
        }, {"./Requestable": 9, debug: 42}],
        12: [function (e, t, r) {
            "use strict";

            function n(e) {
                return e && e.__esModule ? e : {default: e}
            }

            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function i(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            var u = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var n = t[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                        }
                    }

                    return function (t, r, n) {
                        return r && e(t.prototype, r), n && e(t, n), t
                    }
                }(), a = e("./Requestable"), f = n(a), c = e("debug"), l = n(c), h = (0, l.default)("github:user"),
                p = function (e) {
                    function t(e, r, n) {
                        o(this, t);
                        var s = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, r, n));
                        return s.__user = e, s
                    }

                    return s(t, e), u(t, [{
                        key: "__getScopedUrl", value: function (e) {
                            if (this.__user) return e ? "/users/" + this.__user + "/" + e : "/users/" + this.__user;
                            switch (e) {
                                case"":
                                    return "/user";
                                case"notifications":
                                case"gists":
                                    return "/" + e;
                                default:
                                    return "/user/" + e
                            }
                        }
                    }, {
                        key: "listRepos", value: function (e, t) {
                            return "function" == typeof e && (t = e, e = {}), e = this._getOptionsWithDefaults(e), h("Fetching repositories with options: " + JSON.stringify(e)), this._requestAllPages(this.__getScopedUrl("repos"), e, t)
                        }
                    }, {
                        key: "listOrgs", value: function (e) {
                            return this._request("GET", this.__getScopedUrl("orgs"), null, e)
                        }
                    }, {
                        key: "listFollowers", value: function (e) {
                            return this._request("GET", this.__getScopedUrl("followers"), null, e)
                        }
                    }, {
                        key: "listFollowing", value: function (e) {
                            return this._request("GET", this.__getScopedUrl("following"), null, e)
                        }
                    }, {
                        key: "listGists", value: function (e) {
                            return this._request("GET", this.__getScopedUrl("gists"), null, e)
                        }
                    }, {
                        key: "listNotifications", value: function (e, t) {
                            return e = e || {}, "function" == typeof e && (t = e, e = {}), e.since = this._dateToISO(e.since), e.before = this._dateToISO(e.before), this._request("GET", this.__getScopedUrl("notifications"), e, t)
                        }
                    }, {
                        key: "getProfile", value: function (e) {
                            return this._request("GET", this.__getScopedUrl(""), null, e)
                        }
                    }, {
                        key: "listStarredRepos", value: function (e) {
                            var t = this._getOptionsWithDefaults();
                            return this._requestAllPages(this.__getScopedUrl("starred"), t, e)
                        }
                    }, {
                        key: "listStarredGists", value: function (e, t) {
                            return e = e || {}, "function" == typeof e && (t = e, e = {}), e.since = this._dateToISO(e.since), this._request("GET", "/gists/starred", e, t)
                        }
                    }, {
                        key: "getEmails", value: function (e) {
                            return this._request("GET", "/user/emails", null, e)
                        }
                    }, {
                        key: "follow", value: function (e, t) {
                            return this._request("PUT", "/user/following/" + e, null, t)
                        }
                    }, {
                        key: "unfollow", value: function (e, t) {
                            return this._request("DELETE", "/user/following/" + e, null, t)
                        }
                    }, {
                        key: "createRepo", value: function (e, t) {
                            return this._request("POST", "/user/repos", e, t)
                        }
                    }]), t
                }(f.default);
            t.exports = p
        }, {"./Requestable": 9, debug: 42}],
        13: [function (e, t, r) {
            t.exports = e("./lib/axios")
        }, {"./lib/axios": 15}],
        14: [function (e, t, r) {
            "use strict";
            var n = e("./../utils"), o = e("./../core/settle"), i = e("./../helpers/cookies"),
                s = e("./../helpers/buildURL"), u = e("../core/buildFullPath"), a = e("./../helpers/parseHeaders"),
                f = e("./../helpers/isURLSameOrigin"), c = e("../core/createError");
            t.exports = function (e) {
                return new Promise(function (t, r) {
                    var l = e.data, h = e.headers;
                    n.isFormData(l) && delete h["Content-Type"];
                    var p = new XMLHttpRequest;
                    if (e.auth) {
                        var d = e.auth.username || "",
                            y = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                        h.Authorization = "Basic " + btoa(d + ":" + y)
                    }
                    var _ = u(e.baseURL, e.url);
                    if (p.open(e.method.toUpperCase(), s(_, e.params, e.paramsSerializer), !0), p.timeout = e.timeout, p.onreadystatechange = function () {
                        if (p && 4 === p.readyState && (0 !== p.status || p.responseURL && 0 === p.responseURL.indexOf("file:"))) {
                            var n = "getAllResponseHeaders" in p ? a(p.getAllResponseHeaders()) : null,
                                i = e.responseType && "text" !== e.responseType ? p.response : p.responseText, s = {
                                    data: i,
                                    status: p.status,
                                    statusText: p.statusText,
                                    headers: n,
                                    config: e,
                                    request: p
                                };
                            o(t, r, s), p = null
                        }
                    }, p.onabort = function () {
                        p && (r(c("Request aborted", e, "ECONNABORTED", p)), p = null)
                    }, p.onerror = function () {
                        r(c("Network Error", e, null, p)), p = null
                    }, p.ontimeout = function () {
                        var t = "timeout of " + e.timeout + "ms exceeded";
                        e.timeoutErrorMessage && (t = e.timeoutErrorMessage), r(c(t, e, "ECONNABORTED", p)), p = null
                    }, n.isStandardBrowserEnv()) {
                        var g = (e.withCredentials || f(_)) && e.xsrfCookieName ? i.read(e.xsrfCookieName) : void 0;
                        g && (h[e.xsrfHeaderName] = g)
                    }
                    if ("setRequestHeader" in p && n.forEach(h, function (e, t) {
                        void 0 === l && "content-type" === t.toLowerCase() ? delete h[t] : p.setRequestHeader(t, e)
                    }), n.isUndefined(e.withCredentials) || (p.withCredentials = !!e.withCredentials), e.responseType) try {
                        p.responseType = e.responseType
                    } catch (t) {
                        if ("json" !== e.responseType) throw t
                    }
                    "function" == typeof e.onDownloadProgress && p.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && p.upload && p.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {
                        p && (p.abort(), r(e), p = null)
                    }), l || (l = null), p.send(l)
                })
            }
        }, {
            "../core/buildFullPath": 21,
            "../core/createError": 22,
            "./../core/settle": 26,
            "./../helpers/buildURL": 30,
            "./../helpers/cookies": 32,
            "./../helpers/isURLSameOrigin": 35,
            "./../helpers/parseHeaders": 37,
            "./../utils": 39
        }],
        15: [function (e, t, r) {
            "use strict";

            function n(e) {
                var t = new s(e), r = i(s.prototype.request, t);
                return o.extend(r, s.prototype, t), o.extend(r, t), r
            }

            var o = e("./utils"), i = e("./helpers/bind"), s = e("./core/Axios"), u = e("./core/mergeConfig"),
                a = e("./defaults"), f = n(a);
            f.Axios = s, f.create = function (e) {
                return n(u(f.defaults, e))
            }, f.Cancel = e("./cancel/Cancel"), f.CancelToken = e("./cancel/CancelToken"), f.isCancel = e("./cancel/isCancel"), f.all = function (e) {
                return Promise.all(e)
            }, f.spread = e("./helpers/spread"), f.isAxiosError = e("./helpers/isAxiosError"), t.exports = f, t.exports.default = f
        }, {
            "./cancel/Cancel": 16,
            "./cancel/CancelToken": 17,
            "./cancel/isCancel": 18,
            "./core/Axios": 19,
            "./core/mergeConfig": 25,
            "./defaults": 28,
            "./helpers/bind": 29,
            "./helpers/isAxiosError": 34,
            "./helpers/spread": 38,
            "./utils": 39
        }],
        16: [function (e, t, r) {
            "use strict";

            function n(e) {
                this.message = e
            }

            n.prototype.toString = function () {
                return "Cancel" + (this.message ? ": " + this.message : "")
            }, n.prototype.__CANCEL__ = !0, t.exports = n
        }, {}],
        17: [function (e, t, r) {
            "use strict";

            function n(e) {
                if ("function" != typeof e) throw new TypeError("executor must be a function.");
                var t;
                this.promise = new Promise(function (e) {
                    t = e
                });
                var r = this;
                e(function (e) {
                    r.reason || (r.reason = new o(e), t(r.reason))
                })
            }

            var o = e("./Cancel");
            n.prototype.throwIfRequested = function () {
                if (this.reason) throw this.reason
            }, n.source = function () {
                var e;
                return {
                    token: new n(function (t) {
                        e = t
                    }), cancel: e
                }
            }, t.exports = n
        }, {"./Cancel": 16}],
        18: [function (e, t, r) {
            "use strict";
            t.exports = function (e) {
                return !(!e || !e.__CANCEL__)
            }
        }, {}],
        19: [function (e, t, r) {
            "use strict";

            function n(e) {
                this.defaults = e, this.interceptors = {request: new s, response: new s}
            }

            var o = e("./../utils"), i = e("../helpers/buildURL"), s = e("./InterceptorManager"),
                u = e("./dispatchRequest"), a = e("./mergeConfig");
            n.prototype.request = function (e) {
                "string" == typeof e ? (e = arguments[1] || {}, e.url = arguments[0]) : e = e || {}, e = a(this.defaults, e), e.method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
                var t = [u, void 0], r = Promise.resolve(e);
                for (this.interceptors.request.forEach(function (e) {
                    t.unshift(e.fulfilled, e.rejected)
                }), this.interceptors.response.forEach(function (e) {
                    t.push(e.fulfilled, e.rejected)
                }); t.length;) r = r.then(t.shift(), t.shift());
                return r
            }, n.prototype.getUri = function (e) {
                return e = a(this.defaults, e), i(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
            }, o.forEach(["delete", "get", "head", "options"], function (e) {
                n.prototype[e] = function (t, r) {
                    return this.request(a(r || {}, {method: e, url: t, data: (r || {}).data}))
                }
            }), o.forEach(["post", "put", "patch"], function (e) {
                n.prototype[e] = function (t, r, n) {
                    return this.request(a(n || {}, {method: e, url: t, data: r}))
                }
            }), t.exports = n
        }, {
            "../helpers/buildURL": 30,
            "./../utils": 39,
            "./InterceptorManager": 20,
            "./dispatchRequest": 23,
            "./mergeConfig": 25
        }],
        20: [function (e, t, r) {
            "use strict";

            function n() {
                this.handlers = []
            }

            var o = e("./../utils");
            n.prototype.use = function (e, t) {
                return this.handlers.push({fulfilled: e, rejected: t}), this.handlers.length - 1
            }, n.prototype.eject = function (e) {
                this.handlers[e] && (this.handlers[e] = null)
            }, n.prototype.forEach = function (e) {
                o.forEach(this.handlers, function (t) {
                    null !== t && e(t)
                })
            }, t.exports = n
        }, {"./../utils": 39}],
        21: [function (e, t, r) {
            "use strict";
            var n = e("../helpers/isAbsoluteURL"), o = e("../helpers/combineURLs");
            t.exports = function (e, t) {
                return e && !n(t) ? o(e, t) : t
            }
        }, {"../helpers/combineURLs": 31, "../helpers/isAbsoluteURL": 33}],
        22: [function (e, t, r) {
            "use strict";
            var n = e("./enhanceError");
            t.exports = function (e, t, r, o, i) {
                var s = new Error(e);
                return n(s, t, r, o, i)
            }
        }, {"./enhanceError": 24}],
        23: [function (e, t, r) {
            "use strict";

            function n(e) {
                e.cancelToken && e.cancelToken.throwIfRequested()
            }

            var o = e("./../utils"), i = e("./transformData"), s = e("../cancel/isCancel"), u = e("../defaults");
            t.exports = function (e) {
                return n(e), e.headers = e.headers || {}, e.data = i(e.data, e.headers, e.transformRequest), e.headers = o.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), o.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {
                    delete e.headers[t]
                }), (e.adapter || u.adapter)(e).then(function (t) {
                    return n(e), t.data = i(t.data, t.headers, e.transformResponse), t
                }, function (t) {
                    return s(t) || (n(e), t && t.response && (t.response.data = i(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
                })
            }
        }, {"../cancel/isCancel": 18, "../defaults": 28, "./../utils": 39, "./transformData": 27}],
        24: [function (e, t, r) {
            "use strict";
            t.exports = function (e, t, r, n, o) {
                return e.config = t, r && (e.code = r), e.request = n, e.response = o, e.isAxiosError = !0, e.toJSON = function () {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: this.config,
                        code: this.code
                    }
                }, e
            }
        }, {}],
        25: [function (e, t, r) {
            "use strict";
            var n = e("../utils");
            t.exports = function (e, t) {
                function r(e, t) {
                    return n.isPlainObject(e) && n.isPlainObject(t) ? n.merge(e, t) : n.isPlainObject(t) ? n.merge({}, t) : n.isArray(t) ? t.slice() : t
                }

                function o(o) {
                    n.isUndefined(t[o]) ? n.isUndefined(e[o]) || (i[o] = r(void 0, e[o])) : i[o] = r(e[o], t[o])
                }

                t = t || {};
                var i = {}, s = ["url", "method", "data"], u = ["headers", "auth", "proxy", "params"],
                    a = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"],
                    f = ["validateStatus"];
                n.forEach(s, function (e) {
                    n.isUndefined(t[e]) || (i[e] = r(void 0, t[e]))
                }), n.forEach(u, o), n.forEach(a, function (o) {
                    n.isUndefined(t[o]) ? n.isUndefined(e[o]) || (i[o] = r(void 0, e[o])) : i[o] = r(void 0, t[o])
                }), n.forEach(f, function (n) {
                    n in t ? i[n] = r(e[n], t[n]) : n in e && (i[n] = r(void 0, e[n]))
                });
                var c = s.concat(u).concat(a).concat(f), l = Object.keys(e).concat(Object.keys(t)).filter(function (e) {
                    return -1 === c.indexOf(e)
                });
                return n.forEach(l, o), i
            }
        }, {"../utils": 39}],
        26: [function (e, t, r) {
            "use strict";
            var n = e("./createError");
            t.exports = function (e, t, r) {
                var o = r.config.validateStatus;
                r.status && o && !o(r.status) ? t(n("Request failed with status code " + r.status, r.config, null, r.request, r)) : e(r)
            }
        }, {"./createError": 22}],
        27: [function (e, t, r) {
            "use strict";
            var n = e("./../utils");
            t.exports = function (e, t, r) {
                return n.forEach(r, function (r) {
                    e = r(e, t)
                }), e
            }
        }, {"./../utils": 39}],
        28: [function (e, t, r) {
            (function (r) {
                (function () {
                    "use strict";

                    function n(e, t) {
                        !o.isUndefined(e) && o.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
                    }

                    var o = e("./utils"), i = e("./helpers/normalizeHeaderName"),
                        s = {"Content-Type": "application/x-www-form-urlencoded"}, u = {
                            adapter: function () {
                                var t;
                                return "undefined" != typeof XMLHttpRequest ? t = e("./adapters/xhr") : void 0 !== r && "[object process]" === Object.prototype.toString.call(r) && (t = e("./adapters/http")), t
                            }(),
                            transformRequest: [function (e, t) {
                                return i(t, "Accept"), i(t, "Content-Type"), o.isFormData(e) || o.isArrayBuffer(e) || o.isBuffer(e) || o.isStream(e) || o.isFile(e) || o.isBlob(e) ? e : o.isArrayBufferView(e) ? e.buffer : o.isURLSearchParams(e) ? (n(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : o.isObject(e) ? (n(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
                            }],
                            transformResponse: [function (e) {
                                if ("string" == typeof e) try {
                                    e = JSON.parse(e)
                                } catch (e) {
                                }
                                return e
                            }],
                            timeout: 0,
                            xsrfCookieName: "XSRF-TOKEN",
                            xsrfHeaderName: "X-XSRF-TOKEN",
                            maxContentLength: -1,
                            maxBodyLength: -1,
                            validateStatus: function (e) {
                                return e >= 200 && e < 300
                            }
                        };
                    u.headers = {common: {Accept: "application/json, text/plain, */*"}}, o.forEach(["delete", "get", "head"], function (e) {
                        u.headers[e] = {}
                    }), o.forEach(["post", "put", "patch"], function (e) {
                        u.headers[e] = o.merge(s)
                    }), t.exports = u
                }).call(this)
            }).call(this, e("_process"))
        }, {
            "./adapters/http": 14,
            "./adapters/xhr": 14,
            "./helpers/normalizeHeaderName": 36,
            "./utils": 39,
            _process: 48
        }],
        29: [function (e, t, r) {
            "use strict";
            t.exports = function (e, t) {
                return function () {
                    for (var r = new Array(arguments.length), n = 0; n < r.length; n++) r[n] = arguments[n];
                    return e.apply(t, r)
                }
            }
        }, {}],
        30: [function (e, t, r) {
            "use strict";

            function n(e) {
                return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
            }

            var o = e("./../utils");
            t.exports = function (e, t, r) {
                if (!t) return e;
                var i;
                if (r) i = r(t); else if (o.isURLSearchParams(t)) i = t.toString(); else {
                    var s = [];
                    o.forEach(t, function (e, t) {
                        null !== e && void 0 !== e && (o.isArray(e) ? t += "[]" : e = [e], o.forEach(e, function (e) {
                            o.isDate(e) ? e = e.toISOString() : o.isObject(e) && (e = JSON.stringify(e)), s.push(n(t) + "=" + n(e))
                        }))
                    }), i = s.join("&")
                }
                if (i) {
                    var u = e.indexOf("#");
                    -1 !== u && (e = e.slice(0, u)), e += (-1 === e.indexOf("?") ? "?" : "&") + i
                }
                return e
            }
        }, {"./../utils": 39}],
        31: [function (e, t, r) {
            "use strict";
            t.exports = function (e, t) {
                return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
            }
        }, {}],
        32: [function (e, t, r) {
            "use strict";
            var n = e("./../utils");
            t.exports = n.isStandardBrowserEnv() ? function () {
                return {
                    write: function (e, t, r, o, i, s) {
                        var u = [];
                        u.push(e + "=" + encodeURIComponent(t)), n.isNumber(r) && u.push("expires=" + new Date(r).toGMTString()), n.isString(o) && u.push("path=" + o), n.isString(i) && u.push("domain=" + i), !0 === s && u.push("secure"), document.cookie = u.join("; ")
                    }, read: function (e) {
                        var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                        return t ? decodeURIComponent(t[3]) : null
                    }, remove: function (e) {
                        this.write(e, "", Date.now() - 864e5)
                    }
                }
            }() : function () {
                return {
                    write: function () {
                    }, read: function () {
                        return null
                    }, remove: function () {
                    }
                }
            }()
        }, {"./../utils": 39}],
        33: [function (e, t, r) {
            "use strict";
            t.exports = function (e) {
                return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
            }
        }, {}],
        34: [function (e, t, r) {
            "use strict";
            t.exports = function (e) {
                return "object" == typeof e && !0 === e.isAxiosError
            }
        }, {}],
        35: [function (e, t, r) {
            "use strict";
            var n = e("./../utils");
            t.exports = n.isStandardBrowserEnv() ? function () {
                function e(e) {
                    var t = e;
                    return r && (o.setAttribute("href", t), t = o.href), o.setAttribute("href", t), {
                        href: o.href,
                        protocol: o.protocol ? o.protocol.replace(/:$/, "") : "",
                        host: o.host,
                        search: o.search ? o.search.replace(/^\?/, "") : "",
                        hash: o.hash ? o.hash.replace(/^#/, "") : "",
                        hostname: o.hostname,
                        port: o.port,
                        pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname
                    }
                }

                var t, r = /(msie|trident)/i.test(navigator.userAgent), o = document.createElement("a");
                return t = e(window.location.href), function (r) {
                    var o = n.isString(r) ? e(r) : r;
                    return o.protocol === t.protocol && o.host === t.host
                }
            }() : function () {
                return function () {
                    return !0
                }
            }()
        }, {"./../utils": 39}],
        36: [function (e, t, r) {
            "use strict";
            var n = e("../utils");
            t.exports = function (e, t) {
                n.forEach(e, function (r, n) {
                    n !== t && n.toUpperCase() === t.toUpperCase() && (e[t] = r, delete e[n])
                })
            }
        }, {"../utils": 39}],
        37: [function (e, t, r) {
            "use strict";
            var n = e("./../utils"),
                o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
            t.exports = function (e) {
                var t, r, i, s = {};
                return e ? (n.forEach(e.split("\n"), function (e) {
                    if (i = e.indexOf(":"), t = n.trim(e.substr(0, i)).toLowerCase(), r = n.trim(e.substr(i + 1)), t) {
                        if (s[t] && o.indexOf(t) >= 0) return;
                        s[t] = "set-cookie" === t ? (s[t] ? s[t] : []).concat([r]) : s[t] ? s[t] + ", " + r : r
                    }
                }), s) : s
            }
        }, {"./../utils": 39}],
        38: [function (e, t, r) {
            "use strict";
            t.exports = function (e) {
                return function (t) {
                    return e.apply(null, t)
                }
            }
        }, {}],
        39: [function (e, t, r) {
            "use strict";

            function n(e) {
                return "[object Array]" === P.call(e)
            }

            function o(e) {
                return void 0 === e
            }

            function i(e) {
                return null !== e && !o(e) && null !== e.constructor && !o(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
            }

            function s(e) {
                return "[object ArrayBuffer]" === P.call(e)
            }

            function u(e) {
                return "undefined" != typeof FormData && e instanceof FormData
            }

            function a(e) {
                return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
            }

            function f(e) {
                return "string" == typeof e
            }

            function c(e) {
                return "number" == typeof e
            }

            function l(e) {
                return null !== e && "object" == typeof e
            }

            function h(e) {
                if ("[object Object]" !== P.call(e)) return !1;
                var t = Object.getPrototypeOf(e);
                return null === t || t === Object.prototype
            }

            function p(e) {
                return "[object Date]" === P.call(e)
            }

            function d(e) {
                return "[object File]" === P.call(e)
            }

            function y(e) {
                return "[object Blob]" === P.call(e)
            }

            function _(e) {
                return "[object Function]" === P.call(e)
            }

            function g(e) {
                return l(e) && _(e.pipe)
            }

            function m(e) {
                return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
            }

            function v(e) {
                return e.replace(/^\s*/, "").replace(/\s*$/, "")
            }

            function b() {
                return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
            }

            function w(e, t) {
                if (null !== e && void 0 !== e) if ("object" != typeof e && (e = [e]), n(e)) for (var r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e); else for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e)
            }

            function E() {
                function e(e, r) {
                    h(t[r]) && h(e) ? t[r] = E(t[r], e) : h(e) ? t[r] = E({}, e) : n(e) ? t[r] = e.slice() : t[r] = e
                }

                for (var t = {}, r = 0, o = arguments.length; r < o; r++) w(arguments[r], e);
                return t
            }

            function T(e, t, r) {
                return w(t, function (t, n) {
                    e[n] = r && "function" == typeof t ? A(t, r) : t
                }), e
            }

            function k(e) {
                return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e
            }

            var A = e("./helpers/bind"), P = Object.prototype.toString;
            t.exports = {
                isArray: n,
                isArrayBuffer: s,
                isBuffer: i,
                isFormData: u,
                isArrayBufferView: a,
                isString: f,
                isNumber: c,
                isObject: l,
                isPlainObject: h,
                isUndefined: o,
                isDate: p,
                isFile: d,
                isBlob: y,
                isFunction: _,
                isStream: g,
                isURLSearchParams: m,
                isStandardBrowserEnv: b,
                forEach: w,
                merge: E,
                extend: T,
                trim: v,
                stripBOM: k
            }
        }, {"./helpers/bind": 29}],
        40: [function (e, t, r) {
            "use strict";

            function n(e) {
                var t = e.length;
                if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var r = e.indexOf("=");
                return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
            }

            function o(e) {
                var t = n(e), r = t[0], o = t[1];
                return 3 * (r + o) / 4 - o
            }

            function i(e, t, r) {
                return 3 * (t + r) / 4 - r
            }

            function s(e) {
                var t, r, o = n(e), s = o[0], u = o[1], a = new h(i(e, s, u)), f = 0, c = u > 0 ? s - 4 : s;
                for (r = 0; r < c; r += 4) t = l[e.charCodeAt(r)] << 18 | l[e.charCodeAt(r + 1)] << 12 | l[e.charCodeAt(r + 2)] << 6 | l[e.charCodeAt(r + 3)], a[f++] = t >> 16 & 255, a[f++] = t >> 8 & 255, a[f++] = 255 & t;
                return 2 === u && (t = l[e.charCodeAt(r)] << 2 | l[e.charCodeAt(r + 1)] >> 4, a[f++] = 255 & t), 1 === u && (t = l[e.charCodeAt(r)] << 10 | l[e.charCodeAt(r + 1)] << 4 | l[e.charCodeAt(r + 2)] >> 2, a[f++] = t >> 8 & 255, a[f++] = 255 & t), a
            }

            function u(e) {
                return c[e >> 18 & 63] + c[e >> 12 & 63] + c[e >> 6 & 63] + c[63 & e]
            }

            function a(e, t, r) {
                for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (255 & e[i + 2]), o.push(u(n));
                return o.join("")
            }

            function f(e) {
                for (var t, r = e.length, n = r % 3, o = [], i = 0, s = r - n; i < s; i += 16383) o.push(a(e, i, i + 16383 > s ? s : i + 16383));
                return 1 === n ? (t = e[r - 1], o.push(c[t >> 2] + c[t << 4 & 63] + "==")) : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], o.push(c[t >> 10] + c[t >> 4 & 63] + c[t << 2 & 63] + "=")), o.join("")
            }

            r.byteLength = o, r.toByteArray = s, r.fromByteArray = f;
            for (var c = [], l = [], h = "undefined" != typeof Uint8Array ? Uint8Array : Array, p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = 0, y = p.length; d < y; ++d) c[d] = p[d], l[p.charCodeAt(d)] = d;
            l["-".charCodeAt(0)] = 62, l["_".charCodeAt(0)] = 63
        }, {}],
        41: [function (e, t, r) {
            (function (t, n) {
                (function () {
                    "use strict";

                    function n() {
                        return i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                    }

                    function o(e, t) {
                        if (n() < t) throw new RangeError("Invalid typed array length");
                        return i.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = i.prototype) : (null === e && (e = new i(t)), e.length = t), e
                    }

                    function i(e, t, r) {
                        if (!(i.TYPED_ARRAY_SUPPORT || this instanceof i)) return new i(e, t, r);
                        if ("number" == typeof e) {
                            if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                            return f(this, e)
                        }
                        return s(this, e, t, r)
                    }

                    function s(e, t, r, n) {
                        if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
                        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? h(e, t, r, n) : "string" == typeof t ? c(e, t, r) : p(e, t)
                    }

                    function u(e) {
                        if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
                        if (e < 0) throw new RangeError('"size" argument must not be negative')
                    }

                    function a(e, t, r, n) {
                        return u(t), t <= 0 ? o(e, t) : void 0 !== r ? "string" == typeof n ? o(e, t).fill(r, n) : o(e, t).fill(r) : o(e, t)
                    }

                    function f(e, t) {
                        if (u(t), e = o(e, t < 0 ? 0 : 0 | d(t)), !i.TYPED_ARRAY_SUPPORT) for (var r = 0; r < t; ++r) e[r] = 0;
                        return e
                    }

                    function c(e, t, r) {
                        if ("string" == typeof r && "" !== r || (r = "utf8"), !i.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
                        var n = 0 | _(t, r);
                        e = o(e, n);
                        var s = e.write(t, r);
                        return s !== n && (e = e.slice(0, s)), e
                    }

                    function l(e, t) {
                        var r = t.length < 0 ? 0 : 0 | d(t.length);
                        e = o(e, r);
                        for (var n = 0; n < r; n += 1) e[n] = 255 & t[n];
                        return e
                    }

                    function h(e, t, r, n) {
                        if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");
                        if (t.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
                        return t = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, r) : new Uint8Array(t, r, n), i.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = i.prototype) : e = l(e, t), e
                    }

                    function p(e, t) {
                        if (i.isBuffer(t)) {
                            var r = 0 | d(t.length);
                            return e = o(e, r), 0 === e.length ? e : (t.copy(e, 0, 0, r), e)
                        }
                        if (t) {
                            if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || X(t.length) ? o(e, 0) : l(e, t);
                            if ("Buffer" === t.type && Z(t.data)) return l(e, t.data)
                        }
                        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                    }

                    function d(e) {
                        if (e >= n()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n().toString(16) + " bytes");
                        return 0 | e
                    }

                    function y(e) {
                        return +e != e && (e = 0), i.alloc(+e)
                    }

                    function _(e, t) {
                        if (i.isBuffer(e)) return e.length;
                        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
                        "string" != typeof e && (e = "" + e);
                        var r = e.length;
                        if (0 === r) return 0;
                        for (var n = !1; ;) switch (t) {
                            case"ascii":
                            case"latin1":
                            case"binary":
                                return r;
                            case"utf8":
                            case"utf-8":
                            case void 0:
                                return Y(e).length;
                            case"ucs2":
                            case"ucs-2":
                            case"utf16le":
                            case"utf-16le":
                                return 2 * r;
                            case"hex":
                                return r >>> 1;
                            case"base64":
                                return W(e).length;
                            default:
                                if (n) return Y(e).length;
                                t = ("" + t).toLowerCase(), n = !0
                        }
                    }

                    function g(e, t, r) {
                        var n = !1;
                        if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                        if (r >>>= 0, t >>>= 0, r <= t) return "";
                        for (e || (e = "utf8"); ;) switch (e) {
                            case"hex":
                                return j(this, t, r);
                            case"utf8":
                            case"utf-8":
                                return R(this, t, r);
                            case"ascii":
                                return S(this, t, r);
                            case"latin1":
                            case"binary":
                                return C(this, t, r);
                            case"base64":
                                return O(this, t, r);
                            case"ucs2":
                            case"ucs-2":
                            case"utf16le":
                            case"utf-16le":
                                return x(this, t, r);
                            default:
                                if (n) throw new TypeError("Unknown encoding: " + e);
                                e = (e + "").toLowerCase(), n = !0
                        }
                    }

                    function m(e, t, r) {
                        var n = e[t];
                        e[t] = e[r], e[r] = n
                    }

                    function v(e, t, r, n, o) {
                        if (0 === e.length) return -1;
                        if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = o ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                            if (o) return -1;
                            r = e.length - 1
                        } else if (r < 0) {
                            if (!o) return -1;
                            r = 0
                        }
                        if ("string" == typeof t && (t = i.from(t, n)), i.isBuffer(t)) return 0 === t.length ? -1 : b(e, t, r, n, o);
                        if ("number" == typeof t) return t &= 255, i.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : b(e, [t], r, n, o);
                        throw new TypeError("val must be string, number or Buffer")
                    }

                    function b(e, t, r, n, o) {
                        function i(e, t) {
                            return 1 === s ? e[t] : e.readUInt16BE(t * s)
                        }

                        var s = 1, u = e.length, a = t.length;
                        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                            if (e.length < 2 || t.length < 2) return -1;
                            s = 2, u /= 2, a /= 2, r /= 2
                        }
                        var f;
                        if (o) {
                            var c = -1;
                            for (f = r; f < u; f++) if (i(e, f) === i(t, -1 === c ? 0 : f - c)) {
                                if (-1 === c && (c = f), f - c + 1 === a) return c * s
                            } else -1 !== c && (f -= f - c), c = -1
                        } else for (r + a > u && (r = u - a), f = r; f >= 0; f--) {
                            for (var l = !0, h = 0; h < a; h++) if (i(e, f + h) !== i(t, h)) {
                                l = !1;
                                break
                            }
                            if (l) return f
                        }
                        return -1
                    }

                    function w(e, t, r, n) {
                        r = Number(r) || 0;
                        var o = e.length - r;
                        n ? (n = Number(n)) > o && (n = o) : n = o;
                        var i = t.length;
                        if (i % 2 != 0) throw new TypeError("Invalid hex string");
                        n > i / 2 && (n = i / 2);
                        for (var s = 0; s < n; ++s) {
                            var u = parseInt(t.substr(2 * s, 2), 16);
                            if (isNaN(u)) return s;
                            e[r + s] = u
                        }
                        return s
                    }

                    function E(e, t, r, n) {
                        return V(Y(t, e.length - r), e, r, n)
                    }

                    function T(e, t, r, n) {
                        return V(z(t), e, r, n)
                    }

                    function k(e, t, r, n) {
                        return T(e, t, r, n)
                    }

                    function A(e, t, r, n) {
                        return V(W(t), e, r, n)
                    }

                    function P(e, t, r, n) {
                        return V(J(t, e.length - r), e, r, n)
                    }

                    function O(e, t, r) {
                        return 0 === t && r === e.length ? $.fromByteArray(e) : $.fromByteArray(e.slice(t, r))
                    }

                    function R(e, t, r) {
                        r = Math.min(e.length, r);
                        for (var n = [], o = t; o < r;) {
                            var i = e[o], s = null, u = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                            if (o + u <= r) {
                                var a, f, c, l;
                                switch (u) {
                                    case 1:
                                        i < 128 && (s = i);
                                        break;
                                    case 2:
                                        a = e[o + 1], 128 == (192 & a) && (l = (31 & i) << 6 | 63 & a) > 127 && (s = l);
                                        break;
                                    case 3:
                                        a = e[o + 1], f = e[o + 2], 128 == (192 & a) && 128 == (192 & f) && (l = (15 & i) << 12 | (63 & a) << 6 | 63 & f) > 2047 && (l < 55296 || l > 57343) && (s = l);
                                        break;
                                    case 4:
                                        a = e[o + 1], f = e[o + 2], c = e[o + 3], 128 == (192 & a) && 128 == (192 & f) && 128 == (192 & c) && (l = (15 & i) << 18 | (63 & a) << 12 | (63 & f) << 6 | 63 & c) > 65535 && l < 1114112 && (s = l)
                                }
                            }
                            null === s ? (s = 65533, u = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), n.push(s), o += u
                        }
                        return q(n)
                    }

                    function q(e) {
                        var t = e.length;
                        if (t <= Q) return String.fromCharCode.apply(String, e);
                        for (var r = "", n = 0; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += Q));
                        return r
                    }

                    function S(e, t, r) {
                        var n = "";
                        r = Math.min(e.length, r);
                        for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
                        return n
                    }

                    function C(e, t, r) {
                        var n = "";
                        r = Math.min(e.length, r);
                        for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
                        return n
                    }

                    function j(e, t, r) {
                        var n = e.length;
                        (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
                        for (var o = "", i = t; i < r; ++i) o += H(e[i]);
                        return o
                    }

                    function x(e, t, r) {
                        for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                        return o
                    }

                    function B(e, t, r) {
                        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                        if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
                    }

                    function U(e, t, r, n, o, s) {
                        if (!i.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                        if (t > o || t < s) throw new RangeError('"value" argument is out of bounds');
                        if (r + n > e.length) throw new RangeError("Index out of range")
                    }

                    function I(e, t, r, n) {
                        t < 0 && (t = 65535 + t + 1);
                        for (var o = 0, i = Math.min(e.length - r, 2); o < i; ++o) e[r + o] = (t & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o)
                    }

                    function L(e, t, r, n) {
                        t < 0 && (t = 4294967295 + t + 1);
                        for (var o = 0, i = Math.min(e.length - r, 4); o < i; ++o) e[r + o] = t >>> 8 * (n ? o : 3 - o) & 255
                    }

                    function D(e, t, r, n, o, i) {
                        if (r + n > e.length) throw new RangeError("Index out of range");
                        if (r < 0) throw new RangeError("Index out of range")
                    }

                    function M(e, t, r, n, o) {
                        return o || D(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), K.write(e, t, r, n, 23, 4), r + 4
                    }

                    function G(e, t, r, n, o) {
                        return o || D(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), K.write(e, t, r, n, 52, 8), r + 8
                    }

                    function N(e) {
                        if (e = F(e).replace(ee, ""), e.length < 2) return "";
                        for (; e.length % 4 != 0;) e += "=";
                        return e
                    }

                    function F(e) {
                        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                    }

                    function H(e) {
                        return e < 16 ? "0" + e.toString(16) : e.toString(16)
                    }

                    function Y(e, t) {
                        t = t || 1 / 0;
                        for (var r, n = e.length, o = null, i = [], s = 0; s < n; ++s) {
                            if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
                                if (!o) {
                                    if (r > 56319) {
                                        (t -= 3) > -1 && i.push(239, 191, 189);
                                        continue
                                    }
                                    if (s + 1 === n) {
                                        (t -= 3) > -1 && i.push(239, 191, 189);
                                        continue
                                    }
                                    o = r;
                                    continue
                                }
                                if (r < 56320) {
                                    (t -= 3) > -1 && i.push(239, 191, 189), o = r;
                                    continue
                                }
                                r = 65536 + (o - 55296 << 10 | r - 56320)
                            } else o && (t -= 3) > -1 && i.push(239, 191, 189);
                            if (o = null, r < 128) {
                                if ((t -= 1) < 0) break;
                                i.push(r)
                            } else if (r < 2048) {
                                if ((t -= 2) < 0) break;
                                i.push(r >> 6 | 192, 63 & r | 128)
                            } else if (r < 65536) {
                                if ((t -= 3) < 0) break;
                                i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                            } else {
                                if (!(r < 1114112)) throw new Error("Invalid code point");
                                if ((t -= 4) < 0) break;
                                i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                            }
                        }
                        return i
                    }

                    function z(e) {
                        for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                        return t
                    }

                    function J(e, t) {
                        for (var r, n, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) r = e.charCodeAt(s), n = r >> 8, o = r % 256, i.push(o), i.push(n);
                        return i
                    }

                    function W(e) {
                        return $.toByteArray(N(e))
                    }

                    function V(e, t, r, n) {
                        for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
                        return o
                    }

                    function X(e) {
                        return e !== e
                    }

                    var $ = e("base64-js"), K = e("ieee754"), Z = e("isarray");
                    r.Buffer = i, r.SlowBuffer = y, r.INSPECT_MAX_BYTES = 50, i.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function () {
                        try {
                            var e = new Uint8Array(1);
                            return e.__proto__ = {
                                __proto__: Uint8Array.prototype, foo: function () {
                                    return 42
                                }
                            }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                        } catch (e) {
                            return !1
                        }
                    }(), r.kMaxLength = n(), i.poolSize = 8192, i._augment = function (e) {
                        return e.__proto__ = i.prototype, e
                    }, i.from = function (e, t, r) {
                        return s(null, e, t, r)
                    }, i.TYPED_ARRAY_SUPPORT && (i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
                        value: null,
                        configurable: !0
                    })), i.alloc = function (e, t, r) {
                        return a(null, e, t, r)
                    }, i.allocUnsafe = function (e) {
                        return f(null, e)
                    }, i.allocUnsafeSlow = function (e) {
                        return f(null, e)
                    }, i.isBuffer = function (e) {
                        return !(null == e || !e._isBuffer)
                    }, i.compare = function (e, t) {
                        if (!i.isBuffer(e) || !i.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
                        if (e === t) return 0;
                        for (var r = e.length, n = t.length, o = 0, s = Math.min(r, n); o < s; ++o) if (e[o] !== t[o]) {
                            r = e[o], n = t[o];
                            break
                        }
                        return r < n ? -1 : n < r ? 1 : 0
                    }, i.isEncoding = function (e) {
                        switch (String(e).toLowerCase()) {
                            case"hex":
                            case"utf8":
                            case"utf-8":
                            case"ascii":
                            case"latin1":
                            case"binary":
                            case"base64":
                            case"ucs2":
                            case"ucs-2":
                            case"utf16le":
                            case"utf-16le":
                                return !0;
                            default:
                                return !1
                        }
                    }, i.concat = function (e, t) {
                        if (!Z(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                        if (0 === e.length) return i.alloc(0);
                        var r;
                        if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
                        var n = i.allocUnsafe(t), o = 0;
                        for (r = 0; r < e.length; ++r) {
                            var s = e[r];
                            if (!i.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                            s.copy(n, o), o += s.length
                        }
                        return n
                    }, i.byteLength = _, i.prototype._isBuffer = !0, i.prototype.swap16 = function () {
                        var e = this.length;
                        if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                        for (var t = 0; t < e; t += 2) m(this, t, t + 1);
                        return this
                    }, i.prototype.swap32 = function () {
                        var e = this.length;
                        if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                        for (var t = 0; t < e; t += 4) m(this, t, t + 3), m(this, t + 1, t + 2);
                        return this
                    }, i.prototype.swap64 = function () {
                        var e = this.length;
                        if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                        for (var t = 0; t < e; t += 8) m(this, t, t + 7), m(this, t + 1, t + 6), m(this, t + 2, t + 5), m(this, t + 3, t + 4);
                        return this
                    }, i.prototype.toString = function () {
                        var e = 0 | this.length;
                        return 0 === e ? "" : 0 === arguments.length ? R(this, 0, e) : g.apply(this, arguments)
                    }, i.prototype.equals = function (e) {
                        if (!i.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                        return this === e || 0 === i.compare(this, e)
                    }, i.prototype.inspect = function () {
                        var e = "", t = r.INSPECT_MAX_BYTES;
                        return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
                    }, i.prototype.compare = function (e, t, r, n, o) {
                        if (!i.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                        if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), t < 0 || r > e.length || n < 0 || o > this.length) throw new RangeError("out of range index");
                        if (n >= o && t >= r) return 0;
                        if (n >= o) return -1;
                        if (t >= r) return 1;
                        if (t >>>= 0, r >>>= 0, n >>>= 0, o >>>= 0, this === e) return 0;
                        for (var s = o - n, u = r - t, a = Math.min(s, u), f = this.slice(n, o), c = e.slice(t, r), l = 0; l < a; ++l) if (f[l] !== c[l]) {
                            s = f[l], u = c[l];
                            break
                        }
                        return s < u ? -1 : u < s ? 1 : 0
                    }, i.prototype.includes = function (e, t, r) {
                        return -1 !== this.indexOf(e, t, r)
                    }, i.prototype.indexOf = function (e, t, r) {
                        return v(this, e, t, r, !0)
                    }, i.prototype.lastIndexOf = function (e, t, r) {
                        return v(this, e, t, r, !1)
                    }, i.prototype.write = function (e, t, r, n) {
                        if (void 0 === t) n = "utf8", r = this.length, t = 0; else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0; else {
                            if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                            t |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                        }
                        var o = this.length - t;
                        if ((void 0 === r || r > o) && (r = o), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                        n || (n = "utf8");
                        for (var i = !1; ;) switch (n) {
                            case"hex":
                                return w(this, e, t, r);
                            case"utf8":
                            case"utf-8":
                                return E(this, e, t, r);
                            case"ascii":
                                return T(this, e, t, r);
                            case"latin1":
                            case"binary":
                                return k(this, e, t, r);
                            case"base64":
                                return A(this, e, t, r);
                            case"ucs2":
                            case"ucs-2":
                            case"utf16le":
                            case"utf-16le":
                                return P(this, e, t, r);
                            default:
                                if (i) throw new TypeError("Unknown encoding: " + n);
                                n = ("" + n).toLowerCase(), i = !0
                        }
                    }, i.prototype.toJSON = function () {
                        return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
                    };
                    var Q = 4096;
                    i.prototype.slice = function (e, t) {
                        var r = this.length;
                        e = ~~e, t = void 0 === t ? r : ~~t, e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);
                        var n;
                        if (i.TYPED_ARRAY_SUPPORT) n = this.subarray(e, t), n.__proto__ = i.prototype; else {
                            var o = t - e;
                            n = new i(o, void 0);
                            for (var s = 0; s < o; ++s) n[s] = this[s + e]
                        }
                        return n
                    }, i.prototype.readUIntLE = function (e, t, r) {
                        e |= 0, t |= 0, r || B(e, t, this.length);
                        for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
                        return n
                    }, i.prototype.readUIntBE = function (e, t, r) {
                        e |= 0, t |= 0, r || B(e, t, this.length);
                        for (var n = this[e + --t], o = 1; t > 0 && (o *= 256);) n += this[e + --t] * o;
                        return n
                    }, i.prototype.readUInt8 = function (e, t) {
                        return t || B(e, 1, this.length), this[e]
                    }, i.prototype.readUInt16LE = function (e, t) {
                        return t || B(e, 2, this.length), this[e] | this[e + 1] << 8
                    }, i.prototype.readUInt16BE = function (e, t) {
                        return t || B(e, 2, this.length), this[e] << 8 | this[e + 1]
                    }, i.prototype.readUInt32LE = function (e, t) {
                        return t || B(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                    }, i.prototype.readUInt32BE = function (e, t) {
                        return t || B(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                    }, i.prototype.readIntLE = function (e, t, r) {
                        e |= 0, t |= 0, r || B(e, t, this.length);
                        for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
                        return o *= 128, n >= o && (n -= Math.pow(2, 8 * t)), n
                    }, i.prototype.readIntBE = function (e, t, r) {
                        e |= 0, t |= 0, r || B(e, t, this.length);
                        for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256);) i += this[e + --n] * o;
                        return o *= 128, i >= o && (i -= Math.pow(2, 8 * t)), i
                    }, i.prototype.readInt8 = function (e, t) {
                        return t || B(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                    }, i.prototype.readInt16LE = function (e, t) {
                        t || B(e, 2, this.length);
                        var r = this[e] | this[e + 1] << 8;
                        return 32768 & r ? 4294901760 | r : r
                    }, i.prototype.readInt16BE = function (e, t) {
                        t || B(e, 2, this.length);
                        var r = this[e + 1] | this[e] << 8;
                        return 32768 & r ? 4294901760 | r : r
                    }, i.prototype.readInt32LE = function (e, t) {
                        return t || B(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                    }, i.prototype.readInt32BE = function (e, t) {
                        return t || B(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                    }, i.prototype.readFloatLE = function (e, t) {
                        return t || B(e, 4, this.length), K.read(this, e, !0, 23, 4)
                    }, i.prototype.readFloatBE = function (e, t) {
                        return t || B(e, 4, this.length), K.read(this, e, !1, 23, 4)
                    }, i.prototype.readDoubleLE = function (e, t) {
                        return t || B(e, 8, this.length), K.read(this, e, !0, 52, 8)
                    }, i.prototype.readDoubleBE = function (e, t) {
                        return t || B(e, 8, this.length), K.read(this, e, !1, 52, 8)
                    }, i.prototype.writeUIntLE = function (e, t, r, n) {
                        if (e = +e, t |= 0, r |= 0, !n) {
                            U(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
                        }
                        var o = 1, i = 0;
                        for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
                        return t + r
                    }, i.prototype.writeUIntBE = function (e, t, r, n) {
                        if (e = +e, t |= 0, r |= 0, !n) {
                            U(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
                        }
                        var o = r - 1, i = 1;
                        for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) this[t + o] = e / i & 255;
                        return t + r
                    }, i.prototype.writeUInt8 = function (e, t, r) {
                        return e = +e, t |= 0, r || U(this, e, t, 1, 255, 0), i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
                    }, i.prototype.writeUInt16LE = function (e, t, r) {
                        return e = +e, t |= 0, r || U(this, e, t, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : I(this, e, t, !0), t + 2
                    }, i.prototype.writeUInt16BE = function (e, t, r) {
                        return e = +e, t |= 0, r || U(this, e, t, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : I(this, e, t, !1), t + 2
                    }, i.prototype.writeUInt32LE = function (e, t, r) {
                        return e = +e, t |= 0, r || U(this, e, t, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : L(this, e, t, !0), t + 4
                    }, i.prototype.writeUInt32BE = function (e, t, r) {
                        return e = +e, t |= 0, r || U(this, e, t, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : L(this, e, t, !1), t + 4
                    }, i.prototype.writeIntLE = function (e, t, r, n) {
                        if (e = +e, t |= 0, !n) {
                            var o = Math.pow(2, 8 * r - 1);
                            U(this, e, t, r, o - 1, -o)
                        }
                        var i = 0, s = 1, u = 0;
                        for (this[t] = 255 & e; ++i < r && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + i - 1] && (u = 1), this[t + i] = (e / s >> 0) - u & 255;
                        return t + r
                    }, i.prototype.writeIntBE = function (e, t, r, n) {
                        if (e = +e, t |= 0, !n) {
                            var o = Math.pow(2, 8 * r - 1);
                            U(this, e, t, r, o - 1, -o)
                        }
                        var i = r - 1, s = 1, u = 0;
                        for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + i + 1] && (u = 1), this[t + i] = (e / s >> 0) - u & 255;
                        return t + r
                    }, i.prototype.writeInt8 = function (e, t, r) {
                        return e = +e, t |= 0, r || U(this, e, t, 1, 127, -128), i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
                    }, i.prototype.writeInt16LE = function (e, t, r) {
                        return e = +e, t |= 0, r || U(this, e, t, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : I(this, e, t, !0), t + 2
                    }, i.prototype.writeInt16BE = function (e, t, r) {
                        return e = +e, t |= 0, r || U(this, e, t, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : I(this, e, t, !1), t + 2
                    }, i.prototype.writeInt32LE = function (e, t, r) {
                        return e = +e, t |= 0, r || U(this, e, t, 4, 2147483647, -2147483648), i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : L(this, e, t, !0), t + 4
                    }, i.prototype.writeInt32BE = function (e, t, r) {
                        return e = +e, t |= 0, r || U(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : L(this, e, t, !1), t + 4
                    }, i.prototype.writeFloatLE = function (e, t, r) {
                        return M(this, e, t, !0, r)
                    }, i.prototype.writeFloatBE = function (e, t, r) {
                        return M(this, e, t, !1, r)
                    }, i.prototype.writeDoubleLE = function (e, t, r) {
                        return G(this, e, t, !0, r)
                    }, i.prototype.writeDoubleBE = function (e, t, r) {
                        return G(this, e, t, !1, r)
                    }, i.prototype.copy = function (e, t, r, n) {
                        if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;
                        if (0 === e.length || 0 === this.length) return 0;
                        if (t < 0) throw new RangeError("targetStart out of bounds");
                        if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                        if (n < 0) throw new RangeError("sourceEnd out of bounds");
                        n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
                        var o, s = n - r;
                        if (this === e && r < t && t < n) for (o = s - 1; o >= 0; --o) e[o + t] = this[o + r]; else if (s < 1e3 || !i.TYPED_ARRAY_SUPPORT) for (o = 0; o < s; ++o) e[o + t] = this[o + r]; else Uint8Array.prototype.set.call(e, this.subarray(r, r + s), t);
                        return s
                    }, i.prototype.fill = function (e, t, r, n) {
                        if ("string" == typeof e) {
                            if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === e.length) {
                                var o = e.charCodeAt(0);
                                o < 256 && (e = o)
                            }
                            if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                            if ("string" == typeof n && !i.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
                        } else "number" == typeof e && (e &= 255);
                        if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                        if (r <= t) return this;
                        t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0);
                        var s;
                        if ("number" == typeof e) for (s = t; s < r; ++s) this[s] = e; else {
                            var u = i.isBuffer(e) ? e : Y(new i(e, n).toString()), a = u.length;
                            for (s = 0; s < r - t; ++s) this[s + t] = u[s % a]
                        }
                        return this
                    };
                    var ee = /[^+\/0-9A-Za-z-_]/g
                }).call(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer)
        }, {"base64-js": 40, buffer: 41, ieee754: 44, isarray: 45}],
        42: [function (e, t, r) {
            (function (n) {
                (function () {
                    function o() {
                        return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
                    }

                    function i(e) {
                        var t = this.useColors;
                        if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + r.humanize(this.diff), t) {
                            var n = "color: " + this.color;
                            e.splice(1, 0, n, "color: inherit");
                            var o = 0, i = 0;
                            e[0].replace(/%[a-zA-Z%]/g, function (e) {
                                "%%" !== e && (o++, "%c" === e && (i = o))
                            }), e.splice(i, 0, n)
                        }
                    }

                    function s() {
                        return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                    }

                    function u(e) {
                        try {
                            null == e ? r.storage.removeItem("debug") : r.storage.debug = e
                        } catch (e) {
                        }
                    }

                    function a() {
                        var e;
                        try {
                            e = r.storage.debug
                        } catch (e) {
                        }
                        return !e && void 0 !== n && "env" in n && (e = n.env.DEBUG), e
                    }

                    r = t.exports = e("./debug"), r.log = s, r.formatArgs = i, r.save = u, r.load = a, r.useColors = o, r.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function () {
                        try {
                            return window.localStorage
                        } catch (e) {
                        }
                    }(), r.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], r.formatters.j = function (e) {
                        try {
                            return JSON.stringify(e)
                        } catch (e) {
                            return "[UnexpectedJSONParseError]: " + e.message
                        }
                    }, r.enable(a())
                }).call(this)
            }).call(this, e("_process"))
        }, {"./debug": 43, _process: 48}],
        43: [function (e, t, r) {
            function n(e) {
                var t, n = 0;
                for (t in e) n = (n << 5) - n + e.charCodeAt(t), n |= 0;
                return r.colors[Math.abs(n) % r.colors.length]
            }

            function o(e) {
                function t() {
                    if (t.enabled) {
                        var e = t, n = +new Date, o = n - (f || n);
                        e.diff = o, e.prev = f, e.curr = n, f = n;
                        for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
                        i[0] = r.coerce(i[0]), "string" != typeof i[0] && i.unshift("%O");
                        var u = 0;
                        i[0] = i[0].replace(/%([a-zA-Z%])/g, function (t, n) {
                            if ("%%" === t) return t;
                            u++;
                            var o = r.formatters[n];
                            if ("function" == typeof o) {
                                var s = i[u];
                                t = o.call(e, s), i.splice(u, 1), u--
                            }
                            return t
                        }), r.formatArgs.call(e, i);
                        (t.log || r.log || console.log.bind(console)).apply(e, i)
                    }
                }

                return t.namespace = e, t.enabled = r.enabled(e), t.useColors = r.useColors(), t.color = n(e), "function" == typeof r.init && r.init(t), t
            }

            function i(e) {
                r.save(e), r.names = [], r.skips = [];
                for (var t = ("string" == typeof e ? e : "").split(/[\s,]+/), n = t.length, o = 0; o < n; o++) t[o] && (e = t[o].replace(/\*/g, ".*?"), "-" === e[0] ? r.skips.push(new RegExp("^" + e.substr(1) + "$")) : r.names.push(new RegExp("^" + e + "$")))
            }

            function s() {
                r.enable("")
            }

            function u(e) {
                var t, n;
                for (t = 0, n = r.skips.length; t < n; t++) if (r.skips[t].test(e)) return !1;
                for (t = 0, n = r.names.length; t < n; t++) if (r.names[t].test(e)) return !0;
                return !1
            }

            function a(e) {
                return e instanceof Error ? e.stack || e.message : e
            }

            r = t.exports = o.debug = o.default = o, r.coerce = a, r.disable = s, r.enable = i, r.enabled = u, r.humanize = e("ms"), r.names = [], r.skips = [], r.formatters = {};
            var f
        }, {ms: 47}],
        44: [function (e, t, r) {
            r.read = function (e, t, r, n, o) {
                var i, s, u = 8 * o - n - 1, a = (1 << u) - 1, f = a >> 1, c = -7, l = r ? o - 1 : 0, h = r ? -1 : 1,
                    p = e[t + l];
                for (l += h, i = p & (1 << -c) - 1, p >>= -c, c += u; c > 0; i = 256 * i + e[t + l], l += h, c -= 8) ;
                for (s = i & (1 << -c) - 1, i >>= -c, c += n; c > 0; s = 256 * s + e[t + l], l += h, c -= 8) ;
                if (0 === i) i = 1 - f; else {
                    if (i === a) return s ? NaN : 1 / 0 * (p ? -1 : 1);
                    s += Math.pow(2, n), i -= f
                }
                return (p ? -1 : 1) * s * Math.pow(2, i - n)
            }, r.write = function (e, t, r, n, o, i) {
                var s, u, a, f = 8 * i - o - 1, c = (1 << f) - 1, l = c >> 1,
                    h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : i - 1, d = n ? 1 : -1,
                    y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), t += s + l >= 1 ? h / a : h * Math.pow(2, 1 - l), t * a >= 2 && (s++, a /= 2), s + l >= c ? (u = 0, s = c) : s + l >= 1 ? (u = (t * a - 1) * Math.pow(2, o), s += l) : (u = t * Math.pow(2, l - 1) * Math.pow(2, o), s = 0)); o >= 8; e[r + p] = 255 & u, p += d, u /= 256, o -= 8) ;
                for (s = s << o | u, f += o; f > 0; e[r + p] = 255 & s, p += d, s /= 256, f -= 8) ;
                e[r + p - d] |= 128 * y
            }
        }, {}],
        45: [function (e, t, r) {
            var n = {}.toString;
            t.exports = Array.isArray || function (e) {
                return "[object Array]" == n.call(e)
            }
        }, {}],
        46: [function (t, r, n) {
            (function (t) {
                (function () {
                    !function (t, o) {
                        "object" == typeof n && void 0 !== r ? r.exports = o(t) : "function" == typeof e && e.amd ? e(o) : o(t)
                    }("undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== t ? t : this, function (t) {
                        "use strict";
                        t = t || {};
                        var n, o = t.Base64, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                            s = function (e) {
                                for (var t = {}, r = 0, n = e.length; r < n; r++) t[e.charAt(r)] = r;
                                return t
                            }(i), u = String.fromCharCode, a = function (e) {
                                if (e.length < 2) {
                                    var t = e.charCodeAt(0);
                                    return t < 128 ? e : t < 2048 ? u(192 | t >>> 6) + u(128 | 63 & t) : u(224 | t >>> 12 & 15) + u(128 | t >>> 6 & 63) + u(128 | 63 & t)
                                }
                                var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                                return u(240 | t >>> 18 & 7) + u(128 | t >>> 12 & 63) + u(128 | t >>> 6 & 63) + u(128 | 63 & t)
                            }, f = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, c = function (e) {
                                return e.replace(f, a)
                            }, l = function (e) {
                                var t = [0, 2, 1][e.length % 3],
                                    r = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
                                return [i.charAt(r >>> 18), i.charAt(r >>> 12 & 63), t >= 2 ? "=" : i.charAt(r >>> 6 & 63), t >= 1 ? "=" : i.charAt(63 & r)].join("")
                            }, h = t.btoa && "function" == typeof t.btoa ? function (e) {
                                return t.btoa(e)
                            } : function (e) {
                                if (e.match(/[^\x00-\xFF]/)) throw new RangeError("The string contains invalid characters.");
                                return e.replace(/[\s\S]{1,3}/g, l)
                            }, p = function (e) {
                                return h(c(String(e)))
                            }, d = function (e) {
                                return e.replace(/[+\/]/g, function (e) {
                                    return "+" == e ? "-" : "_"
                                }).replace(/=/g, "")
                            }, y = function (e, t) {
                                return t ? d(p(e)) : p(e)
                            }, _ = function (e) {
                                return y(e, !0)
                            };
                        t.Uint8Array && (n = function (e, t) {
                            for (var r = "", n = 0, o = e.length; n < o; n += 3) {
                                var s = e[n], u = e[n + 1], a = e[n + 2], f = s << 16 | u << 8 | a;
                                r += i.charAt(f >>> 18) + i.charAt(f >>> 12 & 63) + (void 0 !== u ? i.charAt(f >>> 6 & 63) : "=") + (void 0 !== a ? i.charAt(63 & f) : "=")
                            }
                            return t ? d(r) : r
                        });
                        var g, m = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,
                            v = function (e) {
                                switch (e.length) {
                                    case 4:
                                        var t = (7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3),
                                            r = t - 65536;
                                        return u(55296 + (r >>> 10)) + u(56320 + (1023 & r));
                                    case 3:
                                        return u((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                                    default:
                                        return u((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
                                }
                            }, b = function (e) {
                                return e.replace(m, v)
                            }, w = function (e) {
                                var t = e.length, r = t % 4,
                                    n = (t > 0 ? s[e.charAt(0)] << 18 : 0) | (t > 1 ? s[e.charAt(1)] << 12 : 0) | (t > 2 ? s[e.charAt(2)] << 6 : 0) | (t > 3 ? s[e.charAt(3)] : 0),
                                    o = [u(n >>> 16), u(n >>> 8 & 255), u(255 & n)];
                                return o.length -= [0, 0, 2, 1][r], o.join("")
                            }, E = t.atob && "function" == typeof t.atob ? function (e) {
                                return t.atob(e)
                            } : function (e) {
                                return e.replace(/\S{1,4}/g, w)
                            }, T = function (e) {
                                return E(String(e).replace(/[^A-Za-z0-9\+\/]/g, ""))
                            }, k = function (e) {
                                return b(E(e))
                            }, A = function (e) {
                                return String(e).replace(/[-_]/g, function (e) {
                                    return "-" == e ? "+" : "/"
                                }).replace(/[^A-Za-z0-9\+\/]/g, "")
                            }, P = function (e) {
                                return k(A(e))
                            };
                        t.Uint8Array && (g = function (e) {
                            return Uint8Array.from(T(A(e)), function (e) {
                                return e.charCodeAt(0)
                            })
                        });
                        var O = function () {
                            var e = t.Base64;
                            return t.Base64 = o, e
                        };
                        if (t.Base64 = {
                            VERSION: "2.6.4",
                            atob: T,
                            btoa: h,
                            fromBase64: P,
                            toBase64: y,
                            utob: c,
                            encode: y,
                            encodeURI: _,
                            btou: b,
                            decode: P,
                            noConflict: O,
                            fromUint8Array: n,
                            toUint8Array: g
                        }, "function" == typeof Object.defineProperty) {
                            var R = function (e) {
                                return {value: e, enumerable: !1, writable: !0, configurable: !0}
                            };
                            t.Base64.extendString = function () {
                                Object.defineProperty(String.prototype, "fromBase64", R(function () {
                                    return P(this)
                                })), Object.defineProperty(String.prototype, "toBase64", R(function (e) {
                                    return y(this, e)
                                })), Object.defineProperty(String.prototype, "toBase64URI", R(function () {
                                    return y(this, !0)
                                }))
                            }
                        }
                        return t.Meteor && (Base64 = t.Base64), void 0 !== r && r.exports ? r.exports.Base64 = t.Base64 : "function" == typeof e && e.amd && e([], function () {
                            return t.Base64
                        }), {Base64: t.Base64}
                    })
                }).call(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        47: [function (e, t, r) {
            function n(e) {
                if (e = String(e), !(e.length > 100)) {
                    var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                    if (t) {
                        var r = parseFloat(t[1]);
                        switch ((t[2] || "ms").toLowerCase()) {
                            case"years":
                            case"year":
                            case"yrs":
                            case"yr":
                            case"y":
                                return r * l;
                            case"days":
                            case"day":
                            case"d":
                                return r * c;
                            case"hours":
                            case"hour":
                            case"hrs":
                            case"hr":
                            case"h":
                                return r * f;
                            case"minutes":
                            case"minute":
                            case"mins":
                            case"min":
                            case"m":
                                return r * a;
                            case"seconds":
                            case"second":
                            case"secs":
                            case"sec":
                            case"s":
                                return r * u;
                            case"milliseconds":
                            case"millisecond":
                            case"msecs":
                            case"msec":
                            case"ms":
                                return r;
                            default:
                                return
                        }
                    }
                }
            }

            function o(e) {
                return e >= c ? Math.round(e / c) + "d" : e >= f ? Math.round(e / f) + "h" : e >= a ? Math.round(e / a) + "m" : e >= u ? Math.round(e / u) + "s" : e + "ms"
            }

            function i(e) {
                return s(e, c, "day") || s(e, f, "hour") || s(e, a, "minute") || s(e, u, "second") || e + " ms"
            }

            function s(e, t, r) {
                if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
            }

            var u = 1e3, a = 60 * u, f = 60 * a, c = 24 * f, l = 365.25 * c;
            t.exports = function (e, t) {
                t = t || {};
                var r = typeof e;
                if ("string" === r && e.length > 0) return n(e);
                if ("number" === r && !1 === isNaN(e)) return t.long ? i(e) : o(e);
                throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
            }
        }, {}],
        48: [function (e, t, r) {
            function n() {
                throw new Error("setTimeout has not been defined")
            }

            function o() {
                throw new Error("clearTimeout has not been defined")
            }

            function i(e) {
                if (l === setTimeout) return setTimeout(e, 0);
                if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0);
                try {
                    return l(e, 0)
                } catch (t) {
                    try {
                        return l.call(null, e, 0)
                    } catch (t) {
                        return l.call(this, e, 0)
                    }
                }
            }

            function s(e) {
                if (h === clearTimeout) return clearTimeout(e);
                if ((h === o || !h) && clearTimeout) return h = clearTimeout, clearTimeout(e);
                try {
                    return h(e)
                } catch (t) {
                    try {
                        return h.call(null, e)
                    } catch (t) {
                        return h.call(this, e)
                    }
                }
            }

            function u() {
                _ && d && (_ = !1, d.length ? y = d.concat(y) : g = -1, y.length && a())
            }

            function a() {
                if (!_) {
                    var e = i(u);
                    _ = !0;
                    for (var t = y.length; t;) {
                        for (d = y, y = []; ++g < t;) d && d[g].run();
                        g = -1, t = y.length
                    }
                    d = null, _ = !1, s(e)
                }
            }

            function f(e, t) {
                this.fun = e, this.array = t
            }

            function c() {
            }

            var l, h, p = t.exports = {};
            !function () {
                try {
                    l = "function" == typeof setTimeout ? setTimeout : n
                } catch (e) {
                    l = n
                }
                try {
                    h = "function" == typeof clearTimeout ? clearTimeout : o
                } catch (e) {
                    h = o
                }
            }();
            var d, y = [], _ = !1, g = -1;
            p.nextTick = function (e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                y.push(new f(e, t)), 1 !== y.length || _ || i(a)
            }, f.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = c, p.addListener = c, p.once = c, p.off = c, p.removeListener = c, p.removeAllListeners = c, p.emit = c, p.prependListener = c, p.prependOnceListener = c, p.listeners = function (e) {
                return []
            }, p.binding = function (e) {
                throw new Error("process.binding is not supported")
            }, p.cwd = function () {
                return "/"
            }, p.chdir = function (e) {
                throw new Error("process.chdir is not supported")
            }, p.umask = function () {
                return 0
            }
        }, {}],
        49: [function (t, r, n) {
            (function (t) {
                (function () {
                    !function (o) {
                        function i(e) {
                            for (var t, r, n = [], o = 0, i = e.length; o < i;) t = e.charCodeAt(o++), t >= 55296 && t <= 56319 && o < i ? (r = e.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), o--)) : n.push(t);
                            return n
                        }

                        function s(e) {
                            for (var t, r = e.length, n = -1, o = ""; ++n < r;) t = e[n], t > 65535 && (t -= 65536, o += b(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), o += b(t);
                            return o
                        }

                        function u(e) {
                            if (e >= 55296 && e <= 57343) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value")
                        }

                        function a(e, t) {
                            return b(e >> t & 63 | 128)
                        }

                        function f(e) {
                            if (0 == (4294967168 & e)) return b(e);
                            var t = "";
                            return 0 == (4294965248 & e) ? t = b(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (u(e), t = b(e >> 12 & 15 | 224), t += a(e, 6)) : 0 == (4292870144 & e) && (t = b(e >> 18 & 7 | 240), t += a(e, 12), t += a(e, 6)), t += b(63 & e | 128)
                        }

                        function c(e) {
                            for (var t, r = i(e), n = r.length, o = -1, s = ""; ++o < n;) t = r[o], s += f(t);
                            return s
                        }

                        function l() {
                            if (v >= m) throw Error("Invalid byte index");
                            var e = 255 & g[v];
                            if (v++, 128 == (192 & e)) return 63 & e;
                            throw Error("Invalid continuation byte")
                        }

                        function h() {
                            var e, t, r, n, o;
                            if (v > m) throw Error("Invalid byte index");
                            if (v == m) return !1;
                            if (e = 255 & g[v], v++, 0 == (128 & e)) return e;
                            if (192 == (224 & e)) {
                                if (t = l(), (o = (31 & e) << 6 | t) >= 128) return o;
                                throw Error("Invalid continuation byte")
                            }
                            if (224 == (240 & e)) {
                                if (t = l(), r = l(), (o = (15 & e) << 12 | t << 6 | r) >= 2048) return u(o), o;
                                throw Error("Invalid continuation byte")
                            }
                            if (240 == (248 & e) && (t = l(), r = l(), n = l(), (o = (7 & e) << 18 | t << 12 | r << 6 | n) >= 65536 && o <= 1114111)) return o;
                            throw Error("Invalid UTF-8 detected")
                        }

                        function p(e) {
                            g = i(e), m = g.length, v = 0;
                            for (var t, r = []; !1 !== (t = h());) r.push(t);
                            return s(r)
                        }

                        var d = "object" == typeof n && n, y = "object" == typeof r && r && r.exports == d && r,
                            _ = "object" == typeof t && t;
                        _.global !== _ && _.window !== _ || (o = _);
                        var g, m, v, b = String.fromCharCode, w = {version: "2.1.2", encode: c, decode: p};
                        if ("function" == typeof e && "object" == typeof e.amd && e.amd) e(function () {
                            return w
                        }); else if (d && !d.nodeType) if (y) y.exports = w; else {
                            var E = {}, T = E.hasOwnProperty;
                            for (var k in w) T.call(w, k) && (d[k] = w[k])
                        } else o.utf8 = w
                    }(this)
                }).call(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}]
    }, {}, [2])(2)
});
//# sourceMappingURL=GitHub.bundle.min.js.map