var window =global;
(function(window) {
 
/* Keep source code the same */
 
// })(typeof window == "undefined" ? global : window);
// or 
})(this);


(function(n, p) {
    function wa(a) {
        var b = a.length
          , d = c.type(a);
        return c.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === d || "function" !== d && (0 === b || "number" === typeof b && 0 < b && b - 1 in a)
    }
    function cc(a) {
        var b = Xa[a] = {};
        c.each(a.match(O) || [], function(a, c) {
            b[c] = !0
        });
        return b
    }
    function Ya(a, b, d, e) {
        if (c.acceptData(a)) {
            var f = c.expando
              , g = a.nodeType
              , h = g ? c.cache : a
              , k = g ? a[f] : a[f] && f;
            if (k && h[k] && (e || h[k].data) || d !== p || "string" !== typeof b) {
                k || (k = g ? a[f] = ba.pop() || c.guid++ : f);
                h[k] || (h[k] = g ? {} : {
                    toJSON: c.noop
                });
                if ("object" === typeof b || "function" === typeof b)
                    e ? h[k] = c.extend(h[k], b) : h[k].data = c.extend(h[k].data, b);
                a = h[k];
                e || (a.data || (a.data = {}),
                a = a.data);
                d !== p && (a[c.camelCase(b)] = d);
                "string" === typeof b ? (d = a[b],
                null == d && (d = a[c.camelCase(b)])) : d = a;
                return d
            }
        }
    }
    function Za(a, b, d) {
        if (c.acceptData(a)) {
            var e, f, g = a.nodeType, h = g ? c.cache : a, k = g ? a[c.expando] : c.expando;
            if (h[k]) {
                if (b && (e = d ? h[k] : h[k].data)) {
                    c.isArray(b) ? b = b.concat(c.map(b, c.camelCase)) : b in e ? b = [b] : (b = c.camelCase(b),
                    b = b in e ? [b] : b.split(" "));
                    for (f = b.length; f--; )
                        delete e[b[f]];
                    if (d ? !xa(e) : !c.isEmptyObject(e))
                        return
                }
                if (!d && (delete h[k].data,
                !xa(h[k])))
                    return;
                g ? c.cleanData([a], !0) : c.support.deleteExpando || h != h.window ? delete h[k] : h[k] = null
            }
        }
    }
    function $a(a, b, d) {
        if (d === p && 1 === a.nodeType)
            if (d = "data-" + b.replace(dc, "-$1").toLowerCase(),
            d = a.getAttribute(d),
            "string" === typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : ec.test(d) ? c.parseJSON(d) : d
                } catch (e) {}
                c.data(a, b, d)
            } else
                d = p;
        return d
    }
    function xa(a) {
        for (var b in a)
            if (("data" !== b || !c.isEmptyObject(a[b])) && "toJSON" !== b)
                return !1;
        return !0
    }
    function ca() {
        return !0
    }
    function da() {
        return !1
    }
    function ab() {
        try {
            return q.activeElement
        } catch (a) {}
    }
    function bb(a, b) {
        do
            a = a[b];
        while (a && 1 !== a.nodeType);return a
    }
    function Da(a, b, d) {
        if (c.isFunction(b))
            return c.grep(a, function(a, c) {
                return !!b.call(a, c, a) !== d
            });
        if (b.nodeType)
            return c.grep(a, function(a) {
                return a === b !== d
            });
        if ("string" === typeof b) {
            if (fc.test(b))
                return c.filter(b, a, d);
            b = c.filter(b, a)
        }
        return c.grep(a, function(a) {
            return 0 <= c.inArray(a, b) !== d
        })
    }
    function cb(a) {
        var b = db.split("|");
        a = a.createDocumentFragment();
        if (a.createElement)
            for (; b.length; )
                a.createElement(b.pop());
        return a
    }
    function eb(a, b) {
        return c.nodeName(a, "table") && c.nodeName(1 === b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function fb(a) {
        a.type = (null !== c.find.attr(a, "type")) + "/" + a.type;
        return a
    }
    function gb(a) {
        var b = gc.exec(a.type);
        b ? a.type = b[1] : a.removeAttribute("type");
        return a
    }
    function Ea(a, b) {
        for (var d, e = 0; null != (d = a[e]); e++)
            c._data(d, "globalEval", !b || c._data(b[e], "globalEval"))
    }
    function hb(a, b) {
        if (1 === b.nodeType && c.hasData(a)) {
            var d, e, f;
            e = c._data(a);
            var g = c._data(b, e)
              , h = e.events;
            if (h)
                for (d in delete g.handle,
                g.events = {},
                h)
                    for (e = 0,
                    f = h[d].length; e < f; e++)
                        c.event.add(b, d, h[d][e]);
            g.data && (g.data = c.extend({}, g.data))
        }
    }
    function B(a, b) {
        var d, e, f = 0, g = typeof a.getElementsByTagName !== z ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== z ? a.querySelectorAll(b || "*") : p;
        if (!g)
            for (g = [],
            d = a.childNodes || a; null != (e = d[f]); f++)
                !b || c.nodeName(e, b) ? g.push(e) : c.merge(g, B(e, b));
        return b === p || b && c.nodeName(a, b) ? c.merge([a], g) : g
    }
    function hc(a) {
        Fa.test(a.type) && (a.defaultChecked = a.checked)
    }
    function ib(a, b) {
        if (b in a)
            return b;
        for (var d = b.charAt(0).toUpperCase() + b.slice(1), c = b, f = jb.length; f--; )
            if (b = jb[f] + d,
            b in a)
                return b;
        return c
    }
    function W(a, b) {
        a = b || a;
        return "none" === c.css(a, "display") || !c.contains(a.ownerDocument, a)
    }
    function kb(a, b) {
        for (var d, e, f, g = [], h = 0, k = a.length; h < k; h++)
            e = a[h],
            e.style && (g[h] = c._data(e, "olddisplay"),
            d = e.style.display,
            b ? (g[h] || "none" !== d || (e.style.display = ""),
            "" === e.style.display && W(e) && (g[h] = c._data(e, "olddisplay", lb(e.nodeName)))) : g[h] || (f = W(e),
            (d && "none" !== d || !f) && c._data(e, "olddisplay", f ? d : c.css(e, "display"))));
        for (h = 0; h < k; h++)
            e = a[h],
            !e.style || b && "none" !== e.style.display && "" !== e.style.display || (e.style.display = b ? g[h] || "" : "none");
        return a
    }
    function mb(a, b, d) {
        return (a = ic.exec(b)) ? Math.max(0, a[1] - (d || 0)) + (a[2] || "px") : b
    }
    function nb(a, b, d, e, f) {
        b = d === (e ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
        for (var g = 0; 4 > b; b += 2)
            "margin" === d && (g += c.css(a, d + Q[b], !0, f)),
            e ? ("content" === d && (g -= c.css(a, "padding" + Q[b], !0, f)),
            "margin" !== d && (g -= c.css(a, "border" + Q[b] + "Width", !0, f))) : (g += c.css(a, "padding" + Q[b], !0, f),
            "padding" !== d && (g += c.css(a, "border" + Q[b] + "Width", !0, f)));
        return g
    }
    function ob(a, b, d) {
        var e = !0
          , f = "width" === b ? a.offsetWidth : a.offsetHeight
          , g = R(a)
          , h = c.support.boxSizing && "border-box" === c.css(a, "boxSizing", !1, g);
        if (0 >= f || null == f) {
            f = A(a, b, g);
            if (0 > f || null == f)
                f = a.style[b];
            if (oa.test(f))
                return f;
            e = h && (c.support.boxSizingReliable || f === a.style[b]);
            f = parseFloat(f) || 0
        }
        return f + nb(a, b, d || (h ? "border" : "content"), e, g) + "px"
    }
    function lb(a) {
        var b = q
          , d = pb[a];
        d || (d = qb(a, b),
        "none" !== d && d || (S = (S || c("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement),
        b = (S[0].contentWindow || S[0].contentDocument).document,
        b.write("<!doctype html><html><body>"),
        b.close(),
        d = qb(a, b),
        S.detach()),
        pb[a] = d);
        return d
    }
    function qb(a, b) {
        var d = c(b.createElement(a)).appendTo(b.body)
          , e = c.css(d[0], "display");
        d.remove();
        return e
    }
    function Ga(a, b, d, e) {
        var f;
        if (c.isArray(b))
            c.each(b, function(b, c) {
                d || jc.test(a) ? e(a, c) : Ga(a + "[" + ("object" === typeof c ? b : "") + "]", c, d, e)
            });
        else if (d || "object" !== c.type(b))
            e(a, b);
        else
            for (f in b)
                Ga(a + "[" + f + "]", b[f], d, e)
    }
    function rb(a) {
        return function(b, d) {
            "string" !== typeof b && (d = b,
            b = "*");
            var e, f = 0, g = b.toLowerCase().match(O) || [];
            if (c.isFunction(d))
                for (; e = g[f++]; )
                    "+" === e[0] ? (e = e.slice(1) || "*",
                    (a[e] = a[e] || []).unshift(d)) : (a[e] = a[e] || []).push(d)
        }
    }
    function sb(a, b, d, e) {
        function f(k) {
            var l;
            g[k] = !0;
            c.each(a[k] || [], function(a, c) {
                var k = c(b, d, e);
                if ("string" === typeof k && !h && !g[k])
                    return b.dataTypes.unshift(k),
                    f(k),
                    !1;
                if (h)
                    return !(l = k)
            });
            return l
        }
        var g = {}
          , h = a === Ha;
        return f(b.dataTypes[0]) || !g["*"] && f("*")
    }
    function Ia(a, b) {
        var d, e, f = c.ajaxSettings.flatOptions || {};
        for (e in b)
            b[e] !== p && ((f[e] ? a : d || (d = {}))[e] = b[e]);
        d && c.extend(!0, a, d);
        return a
    }
    function tb() {
        try {
            return new n.XMLHttpRequest
        } catch (a) {}
    }
    function ub() {
        setTimeout(function() {
            ea = p
        });
        return ea = c.now()
    }
    function vb(a, b, d) {
        for (var c, f = (ja[b] || []).concat(ja["*"]), g = 0, h = f.length; g < h; g++)
            if (c = f[g].call(d, b, a))
                return c
    }
    function wb(a, b, d) {
        var e, f = 0, g = pa.length, h = c.Deferred().always(function() {
            delete k.elem
        }), k = function() {
            if (e)
                return !1;
            for (var b = ea || ub(), b = Math.max(0, l.startTime + l.duration - b), d = 1 - (b / l.duration || 0), c = 0, f = l.tweens.length; c < f; c++)
                l.tweens[c].run(d);
            h.notifyWith(a, [l, d, b]);
            if (1 > d && f)
                return b;
            h.resolveWith(a, [l]);
            return !1
        }, l = h.promise({
            elem: a,
            props: c.extend({}, b),
            opts: c.extend(!0, {
                specialEasing: {}
            }, d),
            originalProperties: b,
            originalOptions: d,
            startTime: ea || ub(),
            duration: d.duration,
            tweens: [],
            createTween: function(b, d) {
                var e = c.Tween(a, l.opts, b, d, l.opts.specialEasing[b] || l.opts.easing);
                l.tweens.push(e);
                return e
            },
            stop: function(b) {
                var d = 0
                  , c = b ? l.tweens.length : 0;
                if (e)
                    return this;
                for (e = !0; d < c; d++)
                    l.tweens[d].run(1);
                b ? h.resolveWith(a, [l, b]) : h.rejectWith(a, [l, b]);
                return this
            }
        });
        d = l.props;
        for (kc(d, l.opts.specialEasing); f < g; f++)
            if (b = pa[f].call(l, a, d, l.opts))
                return b;
        c.map(d, vb, l);
        c.isFunction(l.opts.start) && l.opts.start.call(a, l);
        c.fx.timer(c.extend(k, {
            elem: a,
            anim: l,
            queue: l.opts.queue
        }));
        return l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }
    function kc(a, b) {
        var d, e, f, g, h;
        for (d in a)
            if (e = c.camelCase(d),
            f = b[e],
            g = a[d],
            c.isArray(g) && (f = g[1],
            g = a[d] = g[0]),
            d !== e && (a[e] = g,
            delete a[d]),
            (h = c.cssHooks[e]) && "expand"in h)
                for (d in g = h.expand(g),
                delete a[e],
                g)
                    d in a || (a[d] = g[d],
                    b[d] = f);
            else
                b[e] = f
    }
    function y(a, b, d, c, f) {
        return new y.prototype.init(a,b,d,c,f)
    }
    function qa(a, b) {
        var d, c = {
            height: a
        }, f = 0;
        for (b = b ? 1 : 0; 4 > f; f += 2 - b)
            d = Q[f],
            c["margin" + d] = c["padding" + d] = a;
        b && (c.opacity = c.width = a);
        return c
    }
    function xb(a) {
        return c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var X, yb, z = typeof p, lc = n.location, q = n.document, zb = q.documentElement, mc = n.jQuery, nc = n.$, ra = {}, ba = [], Ab = ba.concat, Ja = ba.push, G = ba.slice, Bb = ba.indexOf, oc = ra.toString, Y = ra.hasOwnProperty, Ka = "1.10.1".trim, c = function(a, b) {
        return new c.fn.init(a,b,yb)
    }, sa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, O = /\S+/g, pc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, qc = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, Cb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Db = /^[\],:{}\s]*$/, Eb = /(?:^|:|,)(?:\s*\[)+/g, Fb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, Gb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, rc = /^-ms-/, sc = /-([\da-z])/gi, tc = function(a, b) {
        return b.toUpperCase()
    }, T = function(a) {
        if (q.addEventListener || "load" === a.type || "complete" === q.readyState)
            Hb(),
            c.ready()
    }, Hb = function() {
        q.addEventListener ? (q.removeEventListener("DOMContentLoaded", T, !1),
        n.removeEventListener("load", T, !1)) : (q.detachEvent("onreadystatechange", T),
        n.detachEvent("onload", T))
    };
    c.fn = c.prototype = {
        jquery: "1.10.1",
        constructor: c,
        init: function(a, b, d) {
            var e;
            if (!a)
                return this;
            if ("string" === typeof a) {
                e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : qc.exec(a);
                if (!e || !e[1] && b)
                    return !b || b.jquery ? (b || d).find(a) : this.constructor(b).find(a);
                if (e[1]) {
                    if (b = b instanceof c ? b[0] : b,
                    c.merge(this, c.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : q, !0)),
                    Cb.test(e[1]) && c.isPlainObject(b))
                        for (e in b)
                            if (c.isFunction(this[e]))
                                this[e](b[e]);
                            else
                                this.attr(e, b[e])
                } else {
                    if ((b = q.getElementById(e[2])) && b.parentNode) {
                        if (b.id !== e[2])
                            return d.find(a);
                        this.length = 1;
                        this[0] = b
                    }
                    this.context = q;
                    this.selector = a
                }
                return this
            }
            if (a.nodeType)
                return this.context = this[0] = a,
                this.length = 1,
                this;
            if (c.isFunction(a))
                return d.ready(a);
            a.selector !== p && (this.selector = a.selector,
            this.context = a.context);
            return c.makeArray(a, this)
        },
        selector: "",
        length: 0,
        toArray: function() {
            return G.call(this)
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function(a) {
            a = c.merge(this.constructor(), a);
            a.prevObject = this;
            a.context = this.context;
            return a
        },
        each: function(a, b) {
            return c.each(this, a, b)
        },
        ready: function(a) {
            c.ready.promise().done(a);
            return this
        },
        slice: function() {
            return this.pushStack(G.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length;
            a = +a + (0 > a ? b : 0);
            return this.pushStack(0 <= a && a < b ? [this[a]] : [])
        },
        map: function(a) {
            return this.pushStack(c.map(this, function(b, d) {
                return a.call(b, d, b)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Ja,
        sort: [].sort,
        splice: [].splice
    };
    c.fn.init.prototype = c.fn;
    c.extend = c.fn.extend = function() {
        var a, b, d, e, f, g = arguments[0] || {}, h = 1, k = arguments.length, l = !1;
        "boolean" === typeof g && (l = g,
        g = arguments[1] || {},
        h = 2);
        "object" === typeof g || c.isFunction(g) || (g = {});
        k === h && (g = this,
        --h);
        for (; h < k; h++)
            if (null != (f = arguments[h]))
                for (e in f)
                    a = g[e],
                    d = f[e],
                    g !== d && (l && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1,
                    a = a && c.isArray(a) ? a : []) : a = a && c.isPlainObject(a) ? a : {},
                    g[e] = c.extend(l, a, d)) : d !== p && (g[e] = d));
        return g
    }
    ;
    c.extend({
        expando: "jQuery" + ("1.10.1" + Math.random()).replace(/\D/g, ""),
        noConflict: function(a) {
            n.$ === c && (n.$ = nc);
            a && n.jQuery === c && (n.jQuery = mc);
            return c
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? c.readyWait++ : c.ready(!0)
        },
        ready: function(a) {
            if (!0 === a ? !--c.readyWait : !c.isReady) {
                if (!q.body)
                    return setTimeout(c.ready);
                c.isReady = !0;
                !0 !== a && 0 < --c.readyWait || (X.resolveWith(q, [c]),
                c.fn.trigger && c(q).trigger("ready").off("ready"))
            }
        },
        isFunction: function(a) {
            return "function" === c.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === c.type(a)
        }
        ,
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return null == a ? String(a) : "object" === typeof a || "function" === typeof a ? ra[oc.call(a)] || "object" : typeof a
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a))
                return !1;
            try {
                if (a.constructor && !Y.call(a, "constructor") && !Y.call(a.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (d) {
                return !1
            }
            if (c.support.ownLast)
                for (b in a)
                    return Y.call(a, b);
            for (b in a)
                ;
            return b === p || Y.call(a, b)
        },
        isEmptyObject: function(a) {
            for (var b in a)
                return !1;
            return !0
        },
        error: function(a) {
            throw Error(a);
        },
        parseHTML: function(a, b, d) {
            if (!a || "string" !== typeof a)
                return null;
            "boolean" === typeof b && (d = b,
            b = !1);
            b = b || q;
            var e = Cb.exec(a);
            d = !d && [];
            if (e)
                return [b.createElement(e[1])];
            e = c.buildFragment([a], b, d);
            d && c(d).remove();
            return c.merge([], e.childNodes)
        },
        parseJSON: function(a) {
            if (n.JSON && n.JSON.parse)
                return n.JSON.parse(a);
            if (null === a)
                return a;
            if ("string" === typeof a && (a = c.trim(a)) && Db.test(a.replace(Fb, "@").replace(Gb, "]").replace(Eb, "")))
                return (new Function("return " + a))();
            c.error("Invalid JSON: " + a)
        },
        parseXML: function(a) {
            var b, d;
            if (!a || "string" !== typeof a)
                return null;
            try {
                n.DOMParser ? (d = new DOMParser,
                b = d.parseFromString(a, "text/xml")) : (b = new ActiveXObject("Microsoft.XMLDOM"),
                b.async = "false",
                b.loadXML(a))
            } catch (e) {
                b = p
            }
            b && b.documentElement && !b.getElementsByTagName("parsererror").length || c.error("Invalid XML: " + a);
            return b
        },
        noop: function() {},
        globalEval: function(a) {
            a && c.trim(a) && (n.execScript || function(a) {
                n.eval.call(n, a)
            }
            )(a)
        },
        camelCase: function(a) {
            return a.replace(rc, "ms-").replace(sc, tc)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, d) {
            var c, f = 0, g = a.length;
            c = wa(a);
            if (d)
                if (c)
                    for (; f < g && (c = b.apply(a[f], d),
                    !1 !== c); f++)
                        ;
                else
                    for (f in a) {
                        if (c = b.apply(a[f], d),
                        !1 === c)
                            break
                    }
            else if (c)
                for (; f < g && (c = b.call(a[f], f, a[f]),
                !1 !== c); f++)
                    ;
            else
                for (f in a)
                    if (c = b.call(a[f], f, a[f]),
                    !1 === c)
                        break;
            return a
        },
        trim: Ka && !Ka.call("﻿ ") ? function(a) {
            return null == a ? "" : Ka.call(a)
        }
        : function(a) {
            return null == a ? "" : (a + "").replace(pc, "")
        }
        ,
        makeArray: function(a, b) {
            var d = b || [];
            null != a && (wa(Object(a)) ? c.merge(d, "string" === typeof a ? [a] : a) : Ja.call(d, a));
            return d
        },
        inArray: function(a, b, d) {
            var c;
            if (b) {
                if (Bb)
                    return Bb.call(b, a, d);
                c = b.length;
                for (d = d ? 0 > d ? Math.max(0, c + d) : d : 0; d < c; d++)
                    if (d in b && b[d] === a)
                        return d
            }
            return -1
        },
        merge: function(a, b) {
            var d = b.length
              , c = a.length
              , f = 0;
            if ("number" === typeof d)
                for (; f < d; f++)
                    a[c++] = b[f];
            else
                for (; b[f] !== p; )
                    a[c++] = b[f++];
            a.length = c;
            return a
        },
        grep: function(a, b, d) {
            var c, f = [], g = 0, h = a.length;
            for (d = !!d; g < h; g++)
                c = !!b(a[g], g),
                d !== c && f.push(a[g]);
            return f
        },
        map: function(a, b, d) {
            var c, f = 0, g = a.length, h = [];
            if (wa(a))
                for (; f < g; f++)
                    c = b(a[f], f, d),
                    null != c && (h[h.length] = c);
            else
                for (f in a)
                    c = b(a[f], f, d),
                    null != c && (h[h.length] = c);
            return Ab.apply([], h)
        },
        guid: 1,
        proxy: function(a, b) {
            var d, e;
            "string" === typeof b && (e = a[b],
            b = a,
            a = e);
            if (!c.isFunction(a))
                return p;
            d = G.call(arguments, 2);
            e = function() {
                return a.apply(b || this, d.concat(G.call(arguments)))
            }
            ;
            e.guid = a.guid = a.guid || c.guid++;
            return e
        },
        access: function(a, b, d, e, f, g, h) {
            var k = 0
              , l = a.length
              , r = null == d;
            if ("object" === c.type(d))
                for (k in f = !0,
                d)
                    c.access(a, b, k, d[k], !0, g, h);
            else if (e !== p && (f = !0,
            c.isFunction(e) || (h = !0),
            r && (h ? (b.call(a, e),
            b = null) : (r = b,
            b = function(a, b, d) {
                return r.call(c(a), d)
            }
            )),
            b))
                for (; k < l; k++)
                    b(a[k], d, h ? e : e.call(a[k], k, b(a[k], d)));
            return f ? a : r ? b.call(a) : l ? b(a[0], d) : g
        },
        now: function() {
            return (new Date).getTime()
        },
        swap: function(a, b, d, c) {
            var f, g = {};
            for (f in b)
                g[f] = a.style[f],
                a.style[f] = b[f];
            d = d.apply(a, c || []);
            for (f in b)
                a.style[f] = g[f];
            return d
        }
    });
    c.ready.promise = function(a) {
        if (!X)
            if (X = c.Deferred(),
            "complete" === q.readyState)
                setTimeout(c.ready);
            else if (q.addEventListener)
                q.addEventListener("DOMContentLoaded", T, !1),
                n.addEventListener("load", T, !1);
            else {
                q.attachEvent("onreadystatechange", T);
                n.attachEvent("onload", T);
                var b = !1;
                try {
                    b = null == n.frameElement && q.documentElement
                } catch (d) {}
                b && b.doScroll && function f() {
                    if (!c.isReady) {
                        try {
                            b.doScroll("left")
                        } catch (a) {
                            return setTimeout(f, 50)
                        }
                        Hb();
                        c.ready()
                    }
                }()
            }
        return X.promise(a)
    }
    ;
    c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        ra["[object " + b + "]"] = b.toLowerCase()
    });
    yb = c(q);
    (function(a, b) {
        function d(a, b, d, c) {
            var e, f, g, h, k;
            (b ? b.ownerDocument || b : z) !== C && ka(b);
            b = b || C;
            d = d || [];
            if (!a || "string" !== typeof a)
                return d;
            if (1 !== (h = b.nodeType) && 9 !== h)
                return [];
            if (I && !c) {
                if (e = sa.exec(a))
                    if (g = e[1])
                        if (9 === h)
                            if ((f = b.getElementById(g)) && f.parentNode) {
                                if (f.id === g)
                                    return d.push(f),
                                    d
                            } else
                                return d;
                        else {
                            if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && N(b, f) && f.id === g)
                                return d.push(f),
                                d
                        }
                    else {
                        if (e[2])
                            return fa.apply(d, b.getElementsByTagName(a)),
                            d;
                        if ((g = e[3]) && w.getElementsByClassName && b.getElementsByClassName)
                            return fa.apply(d, b.getElementsByClassName(g)),
                            d
                    }
                if (w.qsa && (!D || !D.test(a))) {
                    f = e = F;
                    g = b;
                    k = 9 === h && a;
                    if (1 === h && "object" !== b.nodeName.toLowerCase()) {
                        h = n(a);
                        (e = b.getAttribute("id")) ? f = e.replace(wa, "\\$&") : b.setAttribute("id", f);
                        f = "[id='" + f + "'] ";
                        for (g = h.length; g--; )
                            h[g] = f + za(h[g]);
                        g = ca.test(a) && b.parentNode || b;
                        k = h.join(",")
                    }
                    if (k)
                        try {
                            return fa.apply(d, g.querySelectorAll(k)),
                            d
                        } catch (l) {} finally {
                            e || b.removeAttribute("id")
                        }
                }
            }
            var m;
            a: {
                a = a.replace(S, "$1");
                f = n(a);
                if (!c && 1 === f.length) {
                    e = f[0] = f[0].slice(0);
                    if (2 < e.length && "ID" === (m = e[0]).type && w.getById && 9 === b.nodeType && I && v.relative[e[1].type]) {
                        b = (v.find.ID(m.matches[0].replace(ga, ha), b) || [])[0];
                        if (!b) {
                            m = d;
                            break a
                        }
                        a = a.slice(e.shift().value.length)
                    }
                    for (h = X.needsContext.test(a) ? 0 : e.length; h--; ) {
                        m = e[h];
                        if (v.relative[g = m.type])
                            break;
                        if (g = v.find[g])
                            if (c = g(m.matches[0].replace(ga, ha), ca.test(e[0].type) && b.parentNode || b)) {
                                e.splice(h, 1);
                                a = c.length && za(e);
                                if (!a) {
                                    fa.apply(d, c);
                                    m = d;
                                    break a
                                }
                                break
                            }
                    }
                }
                Ma(a, f)(c, b, !I, d, ca.test(a));
                m = d
            }
            return m
        }
        function e(a) {
            return ra.test(a + "")
        }
        function f() {
            function a(d, c) {
                b.push(d += " ") > v.cacheLength && delete a[b.shift()];
                return a[d] = c
            }
            var b = [];
            return a
        }
        function g(a) {
            a[F] = !0;
            return a
        }
        function h(a) {
            var b = C.createElement("div");
            try {
                return !!a(b)
            } catch (d) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b)
            }
        }
        function k(a, b, d) {
            a = a.split("|");
            var c, e = a.length;
            for (d = d ? null : b; e--; )
                (c = v.attrHandle[a[e]]) && c !== b || (v.attrHandle[a[e]] = d)
        }
        function l(a, b) {
            var d = a.getAttributeNode(b);
            return d && d.specified ? d.value : !0 === a[b] ? b.toLowerCase() : null
        }
        function r(a, b) {
            return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }
        function s(a) {
            if ("input" === a.nodeName.toLowerCase())
                return a.defaultValue
        }
        function m(a, b) {
            var d = b && a
              , c = d && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (c)
                return c;
            if (d)
                for (; d = d.nextSibling; )
                    if (d === b)
                        return -1;
            return a ? 1 : -1
        }
        function p(a) {
            return function(b) {
                return "input" === b.nodeName.toLowerCase() && b.type === a
            }
        }
        function M(a) {
            return function(b) {
                var d = b.nodeName.toLowerCase();
                return ("input" === d || "button" === d) && b.type === a
            }
        }
        function q(a) {
            return g(function(b) {
                b = +b;
                return g(function(d, c) {
                    for (var e, f = a([], d.length, b), g = f.length; g--; )
                        d[e = f[g]] && (d[e] = !(c[e] = d[e]))
                })
            })
        }
        function n(a, b) {
            var c, e, f, g, h, k, m;
            if (h = Q[a + " "])
                return b ? 0 : h.slice(0);
            h = a;
            k = [];
            for (m = v.preFilter; h; ) {
                if (!c || (e = ja.exec(h)))
                    e && (h = h.slice(e[0].length) || h),
                    k.push(f = []);
                c = !1;
                if (e = na.exec(h))
                    c = e.shift(),
                    f.push({
                        value: c,
                        type: e[0].replace(S, " ")
                    }),
                    h = h.slice(c.length);
                for (g in v.filter)
                    !(e = X[g].exec(h)) || m[g] && !(e = m[g](e)) || (c = e.shift(),
                    f.push({
                        value: c,
                        type: g,
                        matches: e
                    }),
                    h = h.slice(c.length));
                if (!c)
                    break
            }
            return b ? h.length : h ? d.error(a) : Q(a, k).slice(0)
        }
        function za(a) {
            for (var b = 0, d = a.length, c = ""; b < d; b++)
                c += a[b].value;
            return c
        }
        function B(a, b, d) {
            var c = b.dir
              , e = d && "parentNode" === c
              , f = T++;
            return b.first ? function(b, d, f) {
                for (; b = b[c]; )
                    if (1 === b.nodeType || e)
                        return a(b, d, f)
            }
            : function(b, d, g) {
                var h, k, La, m = U + " " + f;
                if (g)
                    for (; b = b[c]; ) {
                        if ((1 === b.nodeType || e) && a(b, d, g))
                            return !0
                    }
                else
                    for (; b = b[c]; )
                        if (1 === b.nodeType || e)
                            if (La = b[F] || (b[F] = {}),
                            (k = La[c]) && k[0] === m) {
                                if (!0 === (h = k[1]) || h === Aa)
                                    return !0 === h
                            } else if (k = La[c] = [m],
                            k[1] = a(b, d, g) || Aa,
                            !0 === k[1])
                                return !0
            }
        }
        function y(a) {
            return 1 < a.length ? function(b, d, c) {
                for (var e = a.length; e--; )
                    if (!a[e](b, d, c))
                        return !1;
                return !0
            }
            : a[0]
        }
        function L(a, b, d, c, e) {
            for (var f, g = [], h = 0, k = a.length, m = null != b; h < k; h++)
                if (f = a[h])
                    if (!d || d(f, c, e))
                        g.push(f),
                        m && b.push(h);
            return g
        }
        function u(a, b, c, e, f, h) {
            e && !e[F] && (e = u(e));
            f && !f[F] && (f = u(f, h));
            return g(function(g, h, k, m) {
                var l, r, s = [], p = [], K = h.length, q;
                if (!(q = g)) {
                    q = b || "*";
                    for (var n = k.nodeType ? [k] : k, M = [], w = 0, ya = n.length; w < ya; w++)
                        d(q, n[w], M);
                    q = M
                }
                q = !a || !g && b ? q : L(q, s, a, k, m);
                n = c ? f || (g ? a : K || e) ? [] : h : q;
                c && c(q, n, k, m);
                if (e)
                    for (l = L(n, p),
                    e(l, [], k, m),
                    k = l.length; k--; )
                        if (r = l[k])
                            n[p[k]] = !(q[p[k]] = r);
                if (g) {
                    if (f || a) {
                        if (f) {
                            l = [];
                            for (k = n.length; k--; )
                                (r = n[k]) && l.push(q[k] = r);
                            f(null, n = [], l, m)
                        }
                        for (k = n.length; k--; )
                            (r = n[k]) && -1 < (l = f ? la.call(g, r) : s[k]) && (g[l] = !(h[l] = r))
                    }
                } else
                    n = L(n === h ? n.splice(K, n.length) : n),
                    f ? f(null, h, n, m) : fa.apply(h, n)
            })
        }
        function t(a) {
            var b, d, c, e = a.length, f = v.relative[a[0].type];
            d = f || v.relative[" "];
            for (var g = f ? 1 : 0, h = B(function(a) {
                return a === b
            }, d, !0), k = B(function(a) {
                return -1 < la.call(b, a)
            }, d, !0), m = [function(a, d, c) {
                return !f && (c || d !== Ba) || ((b = d).nodeType ? h(a, d, c) : k(a, d, c))
            }
            ]; g < e; g++)
                if (d = v.relative[a[g].type])
                    m = [B(y(m), d)];
                else {
                    d = v.filter[a[g].type].apply(null, a[g].matches);
                    if (d[F]) {
                        for (c = ++g; c < e && !v.relative[a[c].type]; c++)
                            ;
                        return u(1 < g && y(m), 1 < g && za(a.slice(0, g - 1).concat({
                            value: " " === a[g - 2].type ? "*" : ""
                        })).replace(S, "$1"), d, g < c && t(a.slice(g, c)), c < e && t(a = a.slice(c)), c < e && za(a))
                    }
                    m.push(d)
                }
            return y(m)
        }
        function O(a, b) {
            var c = 0
              , e = 0 < b.length
              , f = 0 < a.length
              , h = function(g, h, k, m, l) {
                var r, s, p = [], K = 0, n = "0", q = g && [], M = null != l, w = Ba, t = g || f && v.find.TAG("*", l && h.parentNode || h), ya = U += null == w ? 1 : Math.random() || 0.1;
                M && (Ba = h !== C && h,
                Aa = c);
                for (; null != (l = t[n]); n++) {
                    if (f && l) {
                        for (r = 0; s = a[r++]; )
                            if (s(l, h, k)) {
                                m.push(l);
                                break
                            }
                        M && (U = ya,
                        Aa = ++c)
                    }
                    e && ((l = !s && l) && K--,
                    g && q.push(l))
                }
                K += n;
                if (e && n !== K) {
                    for (r = 0; s = b[r++]; )
                        s(q, p, h, k);
                    if (g) {
                        if (0 < K)
                            for (; n--; )
                                q[n] || p[n] || (p[n] = da.call(m));
                        p = L(p)
                    }
                    fa.apply(m, p);
                    M && !g && 0 < p.length && 1 < K + b.length && d.uniqueSort(m)
                }
                M && (U = ya,
                Ba = w);
                return q
            };
            return e ? g(h) : h
        }
        function Ib() {}
        var ta, w, Aa, v, Ca, Jb, Ma, Ba, H, ka, C, x, I, D, ma, J, N, F = "sizzle" + -new Date, z = a.document, U = 0, T = 0, P = f(), Q = f(), R = f(), A = !1, G = function() {
            return 0
        }, E = typeof b, V = -2147483648, ba = {}.hasOwnProperty, ia = [], da = ia.pop, ea = ia.push, fa = ia.push, Y = ia.slice, la = ia.indexOf || function(a) {
            for (var b = 0, d = this.length; b < d; b++)
                if (this[b] === a)
                    return b;
            return -1
        }
        , Z = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"), aa = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + Z + ")|)|)[\\x20\\t\\r\\n\\f]*\\]", W = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + aa.replace(3, 8) + ")*)|.*)\\)|)", S = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"), ja = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, na = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/, ca = /[\x20\t\r\n\f]*[+~]/, oa = RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*)[\\x20\\t\\r\\n\\f]*\\]", "g"), pa = RegExp(W), qa = RegExp("^" + Z + "$"), X = {
            ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
            CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
            TAG: RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
            ATTR: RegExp("^" + aa),
            PSEUDO: RegExp("^" + W),
            CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
            bool: RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i"),
            needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
        }, ra = /^[^{]+\{\s*\[native \w/, sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ua = /^(?:input|select|textarea|button)$/i, va = /^h\d$/i, wa = /'|\\/g, ga = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"), ha = function(a, b, d) {
            a = "0x" + b - 65536;
            return a !== a || d ? b : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, a & 1023 | 56320)
        };
        try {
            fa.apply(ia = Y.call(z.childNodes), z.childNodes),
            ia[z.childNodes.length].nodeType
        } catch (xa) {
            fa = {
                apply: ia.length ? function(a, b) {
                    ea.apply(a, Y.call(b))
                }
                : function(a, b) {
                    for (var d = a.length, c = 0; a[d++] = b[c++]; )
                        ;
                    a.length = d - 1
                }
            }
        }
        Jb = d.isXML = function(a) {
            return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
        }
        ;
        w = d.support = {};
        ka = d.setDocument = function(a) {
            var b = a ? a.ownerDocument || a : z;
            a = b.parentWindow;
            if (b === C || 9 !== b.nodeType || !b.documentElement)
                return C;
            C = b;
            x = b.documentElement;
            I = !Jb(b);
            a && a.frameElement && a.attachEvent("onbeforeunload", function() {
                ka()
            });
            w.attributes = h(function(a) {
                a.innerHTML = "<a href='#'></a>";
                k("type|href|height|width", r, "#" === a.firstChild.getAttribute("href"));
                k("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", l, null == a.getAttribute("disabled"));
                a.className = "i";
                return !a.getAttribute("className")
            });
            w.input = h(function(a) {
                a.innerHTML = "<input>";
                a.firstChild.setAttribute("value", "");
                return "" === a.firstChild.getAttribute("value")
            });
            k("value", s, w.attributes && w.input);
            w.getElementsByTagName = h(function(a) {
                a.appendChild(b.createComment(""));
                return !a.getElementsByTagName("*").length
            });
            w.getElementsByClassName = h(function(a) {
                a.innerHTML = "<div class='a'></div><div class='a i'></div>";
                a.firstChild.className = "i";
                return 2 === a.getElementsByClassName("i").length
            });
            w.getById = h(function(a) {
                x.appendChild(a).id = F;
                return !b.getElementsByName || !b.getElementsByName(F).length
            });
            w.getById ? (v.find.ID = function(a, b) {
                if (typeof b.getElementById !== E && I) {
                    var d = b.getElementById(a);
                    return d && d.parentNode ? [d] : []
                }
            }
            ,
            v.filter.ID = function(a) {
                var b = a.replace(ga, ha);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }
            ) : (delete v.find.ID,
            v.filter.ID = function(a) {
                var b = a.replace(ga, ha);
                return function(a) {
                    return (a = typeof a.getAttributeNode !== E && a.getAttributeNode("id")) && a.value === b
                }
            }
            );
            v.find.TAG = w.getElementsByTagName ? function(a, b) {
                if (typeof b.getElementsByTagName !== E)
                    return b.getElementsByTagName(a)
            }
            : function(a, b) {
                var d, c = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; d = f[e++]; )
                        1 === d.nodeType && c.push(d);
                    return c
                }
                return f
            }
            ;
            v.find.CLASS = w.getElementsByClassName && function(a, b) {
                if (typeof b.getElementsByClassName !== E && I)
                    return b.getElementsByClassName(a)
            }
            ;
            ma = [];
            D = [];
            if (w.qsa = e(b.querySelectorAll))
                h(function(a) {
                    a.innerHTML = "<select><option selected=''></option></select>";
                    a.querySelectorAll("[selected]").length || D.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                    a.querySelectorAll(":checked").length || D.push(":checked")
                }),
                h(function(a) {
                    var d = b.createElement("input");
                    d.setAttribute("type", "hidden");
                    a.appendChild(d).setAttribute("t", "");
                    a.querySelectorAll("[t^='']").length && D.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                    a.querySelectorAll(":enabled").length || D.push(":enabled", ":disabled");
                    a.querySelectorAll("*,:x");
                    D.push(",.*:")
                });
            (w.matchesSelector = e(J = x.webkitMatchesSelector || x.mozMatchesSelector || x.oMatchesSelector || x.msMatchesSelector)) && h(function(a) {
                w.disconnectedMatch = J.call(a, "div");
                J.call(a, "[s!='']:x");
                ma.push("!=", W)
            });
            D = D.length && RegExp(D.join("|"));
            ma = ma.length && RegExp(ma.join("|"));
            N = e(x.contains) || x.compareDocumentPosition ? function(a, b) {
                var d = 9 === a.nodeType ? a.documentElement : a
                  , c = b && b.parentNode;
                return a === c || !!(c && 1 === c.nodeType && (d.contains ? d.contains(c) : a.compareDocumentPosition && a.compareDocumentPosition(c) & 16))
            }
            : function(a, b) {
                if (b)
                    for (; b = b.parentNode; )
                        if (b === a)
                            return !0;
                return !1
            }
            ;
            w.sortDetached = h(function(a) {
                return a.compareDocumentPosition(b.createElement("div")) & 1
            });
            G = x.compareDocumentPosition ? function(a, d) {
                if (a === d)
                    return A = !0,
                    0;
                var c = d.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(d);
                return c ? c & 1 || !w.sortDetached && d.compareDocumentPosition(a) === c ? a === b || N(z, a) ? -1 : d === b || N(z, d) ? 1 : H ? la.call(H, a) - la.call(H, d) : 0 : c & 4 ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
            }
            : function(a, d) {
                var c, e = 0;
                c = a.parentNode;
                var f = d.parentNode
                  , g = [a]
                  , h = [d];
                if (a === d)
                    return A = !0,
                    0;
                if (!c || !f)
                    return a === b ? -1 : d === b ? 1 : c ? -1 : f ? 1 : H ? la.call(H, a) - la.call(H, d) : 0;
                if (c === f)
                    return m(a, d);
                for (c = a; c = c.parentNode; )
                    g.unshift(c);
                for (c = d; c = c.parentNode; )
                    h.unshift(c);
                for (; g[e] === h[e]; )
                    e++;
                return e ? m(g[e], h[e]) : g[e] === z ? -1 : h[e] === z ? 1 : 0
            }
            ;
            return b
        }
        ;
        d.matches = function(a, b) {
            return d(a, null, null, b)
        }
        ;
        d.matchesSelector = function(a, b) {
            (a.ownerDocument || a) !== C && ka(a);
            b = b.replace(oa, "='$1']");
            if (w.matchesSelector && I && !(ma && ma.test(b) || D && D.test(b)))
                try {
                    var c = J.call(a, b);
                    if (c || w.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                        return c
                } catch (e) {}
            return 0 < d(b, C, null, [a]).length
        }
        ;
        d.contains = function(a, b) {
            (a.ownerDocument || a) !== C && ka(a);
            return N(a, b)
        }
        ;
        d.attr = function(a, d) {
            (a.ownerDocument || a) !== C && ka(a);
            var c = v.attrHandle[d.toLowerCase()]
              , c = c && ba.call(v.attrHandle, d.toLowerCase()) ? c(a, d, !I) : b;
            return c === b ? w.attributes || !I ? a.getAttribute(d) : (c = a.getAttributeNode(d)) && c.specified ? c.value : null : c
        }
        ;
        d.error = function(a) {
            throw Error("Syntax error, unrecognized expression: " + a);
        }
        ;
        d.uniqueSort = function(a) {
            var b, d = [], c = 0, e = 0;
            A = !w.detectDuplicates;
            H = !w.sortStable && a.slice(0);
            a.sort(G);
            if (A) {
                for (; b = a[e++]; )
                    b === a[e] && (c = d.push(e));
                for (; c--; )
                    a.splice(d[c], 1)
            }
            return a
        }
        ;
        Ca = d.getText = function(a) {
            var b, d = "", c = 0;
            b = a.nodeType;
            if (!b)
                for (; b = a[c]; c++)
                    d += Ca(b);
            else if (1 === b || 9 === b || 11 === b) {
                if ("string" === typeof a.textContent)
                    return a.textContent;
                for (a = a.firstChild; a; a = a.nextSibling)
                    d += Ca(a)
            } else if (3 === b || 4 === b)
                return a.nodeValue;
            return d
        }
        ;
        v = d.selectors = {
            cacheLength: 50,
            createPseudo: g,
            match: X,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    a[1] = a[1].replace(ga, ha);
                    a[3] = (a[4] || a[5] || "").replace(ga, ha);
                    "~=" === a[2] && (a[3] = " " + a[3] + " ");
                    return a.slice(0, 4)
                },
                CHILD: function(a) {
                    a[1] = a[1].toLowerCase();
                    "nth" === a[1].slice(0, 3) ? (a[3] || d.error(a[0]),
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])),
                    a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && d.error(a[0]);
                    return a
                },
                PSEUDO: function(a) {
                    var d, c = !a[5] && a[2];
                    if (X.CHILD.test(a[0]))
                        return null;
                    a[3] && a[4] !== b ? a[2] = a[4] : c && pa.test(c) && (d = n(c, !0)) && (d = c.indexOf(")", c.length - d) - c.length) && (a[0] = a[0].slice(0, d),
                    a[2] = c.slice(0, d));
                    return a.slice(0, 3)
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ga, ha).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    }
                    : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = P[a + " "];
                    return b || (b = RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) && P(a, function(a) {
                        return b.test("string" === typeof a.className && a.className || typeof a.getAttribute !== E && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(e) {
                        e = d.attr(e, a);
                        if (null == e)
                            return "!=" === b;
                        if (!b)
                            return !0;
                        e += "";
                        return "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && -1 < e.indexOf(c) : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? -1 < (" " + e + " ").indexOf(c) : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1
                    }
                },
                CHILD: function(a, b, d, c, e) {
                    var f = "nth" !== a.slice(0, 3)
                      , g = "last" !== a.slice(-4)
                      , h = "of-type" === b;
                    return 1 === c && 0 === e ? function(a) {
                        return !!a.parentNode
                    }
                    : function(b, d, k) {
                        var m, l, r, s, p;
                        d = f !== g ? "nextSibling" : "previousSibling";
                        var K = b.parentNode
                          , n = h && b.nodeName.toLowerCase();
                        k = !k && !h;
                        if (K) {
                            if (f) {
                                for (; d; ) {
                                    for (l = b; l = l[d]; )
                                        if (h ? l.nodeName.toLowerCase() === n : 1 === l.nodeType)
                                            return !1;
                                    p = d = "only" === a && !p && "nextSibling"
                                }
                                return !0
                            }
                            p = [g ? K.firstChild : K.lastChild];
                            if (g && k)
                                for (k = K[F] || (K[F] = {}),
                                m = k[a] || [],
                                s = m[0] === U && m[1],
                                r = m[0] === U && m[2],
                                l = s && K.childNodes[s]; l = ++s && l && l[d] || (r = s = 0) || p.pop(); ) {
                                    if (1 === l.nodeType && ++r && l === b) {
                                        k[a] = [U, s, r];
                                        break
                                    }
                                }
                            else if (k && (m = (b[F] || (b[F] = {}))[a]) && m[0] === U)
                                r = m[1];
                            else
                                for (; (l = ++s && l && l[d] || (r = s = 0) || p.pop()) && ((h ? l.nodeName.toLowerCase() !== n : 1 !== l.nodeType) || !++r || (k && ((l[F] || (l[F] = {}))[a] = [U, r]),
                                l !== b)); )
                                    ;
                            r -= e;
                            return r === c || 0 === r % c && 0 <= r / c
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, e = v.pseudos[a] || v.setFilters[a.toLowerCase()] || d.error("unsupported pseudo: " + a);
                    return e[F] ? e(b) : 1 < e.length ? (c = [a, a, "", b],
                    v.setFilters.hasOwnProperty(a.toLowerCase()) ? g(function(a, d) {
                        for (var c, f = e(a, b), g = f.length; g--; )
                            c = la.call(a, f[g]),
                            a[c] = !(d[c] = f[g])
                    }) : function(a) {
                        return e(a, 0, c)
                    }
                    ) : e
                }
            },
            pseudos: {
                not: g(function(a) {
                    var b = []
                      , d = []
                      , c = Ma(a.replace(S, "$1"));
                    return c[F] ? g(function(a, b, d, e) {
                        e = c(a, null, e, []);
                        for (var f = a.length; f--; )
                            if (d = e[f])
                                a[f] = !(b[f] = d)
                    }) : function(a, e, f) {
                        b[0] = a;
                        c(b, null, f, d);
                        return !d.pop()
                    }
                }),
                has: g(function(a) {
                    return function(b) {
                        return 0 < d(a, b).length
                    }
                }),
                contains: g(function(a) {
                    return function(b) {
                        return -1 < (b.textContent || b.innerText || Ca(b)).indexOf(a)
                    }
                }),
                lang: g(function(a) {
                    qa.test(a || "") || d.error("unsupported lang: " + a);
                    a = a.replace(ga, ha).toLowerCase();
                    return function(b) {
                        var d;
                        do
                            if (d = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                                return d = d.toLowerCase(),
                                d === a || 0 === d.indexOf(a + "-");
                        while ((b = b.parentNode) && 1 === b.nodeType);return !1
                    }
                }),
                target: function(b) {
                    var d = a.location && a.location.hash;
                    return d && d.slice(1) === b.id
                },
                root: function(a) {
                    return a === x
                },
                focus: function(a) {
                    return a === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return !1 === a.disabled
                },
                disabled: function(a) {
                    return !0 === a.disabled
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return !0 === a.selected
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if ("@" < a.nodeName || 3 === a.nodeType || 4 === a.nodeType)
                            return !1;
                    return !0
                },
                parent: function(a) {
                    return !v.pseudos.empty(a)
                },
                header: function(a) {
                    return va.test(a.nodeName)
                },
                input: function(a) {
                    return ua.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type)
                },
                first: q(function() {
                    return [0]
                }),
                last: q(function(a, b) {
                    return [b - 1]
                }),
                eq: q(function(a, b, d) {
                    return [0 > d ? d + b : d]
                }),
                even: q(function(a, b) {
                    for (var d = 0; d < b; d += 2)
                        a.push(d);
                    return a
                }),
                odd: q(function(a, b) {
                    for (var d = 1; d < b; d += 2)
                        a.push(d);
                    return a
                }),
                lt: q(function(a, b, d) {
                    for (b = 0 > d ? d + b : d; 0 <= --b; )
                        a.push(b);
                    return a
                }),
                gt: q(function(a, b, d) {
                    for (d = 0 > d ? d + b : d; ++d < b; )
                        a.push(d);
                    return a
                })
            }
        };
        for (ta in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            v.pseudos[ta] = p(ta);
        for (ta in {
            submit: !0,
            reset: !0
        })
            v.pseudos[ta] = M(ta);
        Ma = d.compile = function(a, b) {
            var d, c = [], e = [], f = R[a + " "];
            if (!f) {
                b || (b = n(a));
                for (d = b.length; d--; )
                    f = t(b[d]),
                    f[F] ? c.push(f) : e.push(f);
                f = R(a, O(e, c))
            }
            return f
        }
        ;
        v.pseudos.nth = v.pseudos.eq;
        Ib.prototype = v.filters = v.pseudos;
        v.setFilters = new Ib;
        w.sortStable = F.split("").sort(G).join("") === F;
        ka();
        [0, 0].sort(G);
        w.detectDuplicates = A;
        c.find = d;
        c.expr = d.selectors;
        c.expr[":"] = c.expr.pseudos;
        c.unique = d.uniqueSort;
        c.text = d.getText;
        c.isXMLDoc = d.isXML;
        c.contains = d.contains
    }
    )(n);
    var Xa = {};
    c.Callbacks = function(a) {
        a = "string" === typeof a ? Xa[a] || cc(a) : c.extend({}, a);
        var b, d, e, f, g, h, k = [], l = !a.once && [], r = function(c) {
            d = a.memory && c;
            e = !0;
            g = h || 0;
            h = 0;
            f = k.length;
            for (b = !0; k && g < f; g++)
                if (!1 === k[g].apply(c[0], c[1]) && a.stopOnFalse) {
                    d = !1;
                    break
                }
            b = !1;
            k && (l ? l.length && r(l.shift()) : d ? k = [] : s.disable())
        }, s = {
            add: function() {
                if (k) {
                    var e = k.length;
                    (function M(b) {
                        c.each(b, function(b, d) {
                            var e = c.type(d);
                            "function" === e ? a.unique && s.has(d) || k.push(d) : d && d.length && "string" !== e && M(d)
                        })
                    }
                    )(arguments);
                    b ? f = k.length : d && (h = e,
                    r(d))
                }
                return this
            },
            remove: function() {
                k && c.each(arguments, function(a, d) {
                    for (var e; -1 < (e = c.inArray(d, k, e)); )
                        k.splice(e, 1),
                        b && (e <= f && f--,
                        e <= g && g--)
                });
                return this
            },
            has: function(a) {
                return a ? -1 < c.inArray(a, k) : !(!k || !k.length)
            },
            empty: function() {
                k = [];
                f = 0;
                return this
            },
            disable: function() {
                k = l = d = p;
                return this
            },
            disabled: function() {
                return !k
            },
            lock: function() {
                l = p;
                d || s.disable();
                return this
            },
            locked: function() {
                return !l
            },
            fireWith: function(a, d) {
                d = d || [];
                d = [a, d.slice ? d.slice() : d];
                !k || e && !l || (b ? l.push(d) : r(d));
                return this
            },
            fire: function() {
                s.fireWith(this, arguments);
                return this
            },
            fired: function() {
                return !!e
            }
        };
        return s
    }
    ;
    c.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", c.Callbacks("once memory"), "resolved"], ["reject", "fail", c.Callbacks("once memory"), "rejected"], ["notify", "progress", c.Callbacks("memory")]]
              , d = "pending"
              , e = {
                state: function() {
                    return d
                },
                always: function() {
                    f.done(arguments).fail(arguments);
                    return this
                },
                then: function() {
                    var a = arguments;
                    return c.Deferred(function(d) {
                        c.each(b, function(b, l) {
                            var r = l[0]
                              , s = c.isFunction(a[b]) && a[b];
                            f[l[1]](function() {
                                var a = s && s.apply(this, arguments);
                                if (a && c.isFunction(a.promise))
                                    a.promise().done(d.resolve).fail(d.reject).progress(d.notify);
                                else
                                    d[r + "With"](this === e ? d.promise() : this, s ? [a] : arguments)
                            })
                        });
                        a = null
                    }).promise()
                },
                promise: function(a) {
                    return null != a ? c.extend(a, e) : e
                }
            }
              , f = {};
            e.pipe = e.then;
            c.each(b, function(a, c) {
                var k = c[2]
                  , l = c[3];
                e[c[1]] = k.add;
                l && k.add(function() {
                    d = l
                }, b[a ^ 1][2].disable, b[2][2].lock);
                f[c[0]] = function() {
                    f[c[0] + "With"](this === f ? e : this, arguments);
                    return this
                }
                ;
                f[c[0] + "With"] = k.fireWith
            });
            e.promise(f);
            a && a.call(f, f);
            return f
        },
        when: function(a) {
            var b = 0, d = G.call(arguments), e = d.length, f = 1 !== e || a && c.isFunction(a.promise) ? e : 0, g = 1 === f ? a : c.Deferred(), h = function(a, b, d) {
                return function(c) {
                    b[a] = this;
                    d[a] = 1 < arguments.length ? G.call(arguments) : c;
                    d === k ? g.notifyWith(b, d) : --f || g.resolveWith(b, d)
                }
            }, k, l, r;
            if (1 < e)
                for (k = Array(e),
                l = Array(e),
                r = Array(e); b < e; b++)
                    d[b] && c.isFunction(d[b].promise) ? d[b].promise().done(h(b, r, d)).fail(g.reject).progress(h(b, l, k)) : --f;
            f || g.resolveWith(r, d);
            return g.promise()
        }
    });
    c.support = function(a) {
        var b, d, e, f, g, h, k = q.createElement("div");
        k.setAttribute("className", "t");
        k.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        b = k.getElementsByTagName("*") || [];
        d = k.getElementsByTagName("a")[0];
        if (!d || !d.style || !b.length)
            return a;
        e = q.createElement("select");
        f = e.appendChild(q.createElement("option"));
        b = k.getElementsByTagName("input")[0];
        d.style.cssText = "top:1px;float:left;opacity:.5";
        a.getSetAttribute = "t" !== k.className;
        a.leadingWhitespace = 3 === k.firstChild.nodeType;
        a.tbody = !k.getElementsByTagName("tbody").length;
        a.htmlSerialize = !!k.getElementsByTagName("link").length;
        a.style = /top/.test(d.getAttribute("style"));
        a.hrefNormalized = "/a" === d.getAttribute("href");
        a.opacity = /^0.5/.test(d.style.opacity);
        a.cssFloat = !!d.style.cssFloat;
        a.checkOn = !!b.value;
        a.optSelected = f.selected;
        a.enctype = !!q.createElement("form").enctype;
        a.html5Clone = "<:nav></:nav>" !== q.createElement("nav").cloneNode(!0).outerHTML;
        a.inlineBlockNeedsLayout = !1;
        a.shrinkWrapBlocks = !1;
        a.pixelPosition = !1;
        a.deleteExpando = !0;
        a.noCloneEvent = !0;
        a.reliableMarginRight = !0;
        a.boxSizingReliable = !0;
        b.checked = !0;
        a.noCloneChecked = b.cloneNode(!0).checked;
        e.disabled = !0;
        a.optDisabled = !f.disabled;
        try {
            delete k.test
        } catch (l) {
            a.deleteExpando = !1
        }
        b = q.createElement("input");
        b.setAttribute("value", "");
        a.input = "" === b.getAttribute("value");
        b.value = "t";
        b.setAttribute("type", "radio");
        a.radioValue = "t" === b.value;
        b.setAttribute("checked", "t");
        b.setAttribute("name", "t");
        d = q.createDocumentFragment();
        d.appendChild(b);
        a.appendChecked = b.checked;
        a.checkClone = d.cloneNode(!0).cloneNode(!0).lastChild.checked;
        k.attachEvent && (k.attachEvent("onclick", function() {
            a.noCloneEvent = !1
        }),
        k.cloneNode(!0).click());
        for (h in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            k.setAttribute(d = "on" + h, "t"),
            a[h + "Bubbles"] = d in n || !1 === k.attributes[d].expando;
        k.style.backgroundClip = "content-box";
        k.cloneNode(!0).style.backgroundClip = "";
        a.clearCloneStyle = "content-box" === k.style.backgroundClip;
        for (h in c(a))
            break;
        a.ownLast = "0" !== h;
        c(function() {
            var b, d, e = q.getElementsByTagName("body")[0];
            e && (b = q.createElement("div"),
            b.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",
            e.appendChild(b).appendChild(k),
            k.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            d = k.getElementsByTagName("td"),
            d[0].style.cssText = "padding:0;margin:0;border:0;display:none",
            g = 0 === d[0].offsetHeight,
            d[0].style.display = "",
            d[1].style.display = "none",
            a.reliableHiddenOffsets = g && 0 === d[0].offsetHeight,
            k.innerHTML = "",
            k.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
            c.swap(e, null != e.style.zoom ? {
                zoom: 1
            } : {}, function() {
                a.boxSizing = 4 === k.offsetWidth
            }),
            n.getComputedStyle && (a.pixelPosition = "1%" !== (n.getComputedStyle(k, null) || {}).top,
            a.boxSizingReliable = "4px" === (n.getComputedStyle(k, null) || {
                width: "4px"
            }).width,
            d = k.appendChild(q.createElement("div")),
            d.style.cssText = k.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
            d.style.marginRight = d.style.width = "0",
            k.style.width = "1px",
            a.reliableMarginRight = !parseFloat((n.getComputedStyle(d, null) || {}).marginRight)),
            typeof k.style.zoom !== z && (k.innerHTML = "",
            k.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1",
            a.inlineBlockNeedsLayout = 3 === k.offsetWidth,
            k.style.display = "block",
            k.innerHTML = "<div></div>",
            k.firstChild.style.width = "5px",
            a.shrinkWrapBlocks = 3 !== k.offsetWidth,
            a.inlineBlockNeedsLayout && (e.style.zoom = 1)),
            e.removeChild(b),
            b = k = d = d = null)
        });
        b = e = d = f = d = b = null;
        return a
    }({});
    var ec = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
      , dc = /([A-Z])/g;
    c.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando];
            return !!a && !xa(a)
        },
        data: function(a, b, d) {
            return Ya(a, b, d)
        },
        removeData: function(a, b) {
            return Za(a, b)
        },
        _data: function(a, b, d) {
            return Ya(a, b, d, !0)
        },
        _removeData: function(a, b) {
            return Za(a, b, !0)
        },
        acceptData: function(a) {
            if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType)
                return !1;
            var b = a.nodeName && c.noData[a.nodeName.toLowerCase()];
            return !b || !0 !== b && a.getAttribute("classid") === b
        }
    });
    c.fn.extend({
        data: function(a, b) {
            var d, e, f = null, g = 0, h = this[0];
            if (a === p) {
                if (this.length && (f = c.data(h),
                1 === h.nodeType && !c._data(h, "parsedAttrs"))) {
                    for (d = h.attributes; g < d.length; g++)
                        e = d[g].name,
                        0 === e.indexOf("data-") && (e = c.camelCase(e.slice(5)),
                        $a(h, e, f[e]));
                    c._data(h, "parsedAttrs", !0)
                }
                return f
            }
            return "object" === typeof a ? this.each(function() {
                c.data(this, a)
            }) : 1 < arguments.length ? this.each(function() {
                c.data(this, a, b)
            }) : h ? $a(h, a, c.data(h, a)) : null
        },
        removeData: function(a) {
            return this.each(function() {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        queue: function(a, b, d) {
            var e;
            if (a)
                return b = (b || "fx") + "queue",
                e = c._data(a, b),
                d && (!e || c.isArray(d) ? e = c._data(a, b, c.makeArray(d)) : e.push(d)),
                e || []
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var d = c.queue(a, b)
              , e = d.length
              , f = d.shift()
              , g = c._queueHooks(a, b)
              , h = function() {
                c.dequeue(a, b)
            };
            "inprogress" === f && (f = d.shift(),
            e--);
            f && ("fx" === b && d.unshift("inprogress"),
            delete g.stop,
            f.call(a, h, g));
            !e && g && g.empty.fire()
        },
        _queueHooks: function(a, b) {
            var d = b + "queueHooks";
            return c._data(a, d) || c._data(a, d, {
                empty: c.Callbacks("once memory").add(function() {
                    c._removeData(a, b + "queue");
                    c._removeData(a, d)
                })
            })
        }
    });
    c.fn.extend({
        queue: function(a, b) {
            var d = 2;
            "string" !== typeof a && (b = a,
            a = "fx",
            d--);
            return arguments.length < d ? c.queue(this[0], a) : b === p ? this : this.each(function() {
                var d = c.queue(this, a, b);
                c._queueHooks(this, a);
                "fx" === a && "inprogress" !== d[0] && c.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                c.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            a = c.fx ? c.fx.speeds[a] || a : a;
            return this.queue(b || "fx", function(b, c) {
                var f = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(f)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var d, e = 1, f = c.Deferred(), g = this, h = this.length, k = function() {
                --e || f.resolveWith(g, [g])
            };
            "string" !== typeof a && (b = a,
            a = p);
            for (a = a || "fx"; h--; )
                (d = c._data(g[h], a + "queueHooks")) && d.empty && (e++,
                d.empty.add(k));
            k();
            return f.promise(b)
        }
    });
    var Z, Kb, Na = /[\t\r\n\f]/g, uc = /\r/g, vc = /^(?:input|select|textarea|button|object)$/i, wc = /^(?:a|area)$/i, Oa = /^(?:checked|selected)$/i, E = c.support.getSetAttribute, ua = c.support.input;
    c.fn.extend({
        attr: function(a, b) {
            return c.access(this, c.attr, a, b, 1 < arguments.length)
        },
        removeAttr: function(a) {
            return this.each(function() {
                c.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return c.access(this, c.prop, a, b, 1 < arguments.length)
        },
        removeProp: function(a) {
            a = c.propFix[a] || a;
            return this.each(function() {
                try {
                    this[a] = p,
                    delete this[a]
                } catch (b) {}
            })
        },
        addClass: function(a) {
            var b, d, e, f, g, h = 0, k = this.length;
            b = "string" === typeof a && a;
            if (c.isFunction(a))
                return this.each(function(b) {
                    c(this).addClass(a.call(this, b, this.className))
                });
            if (b)
                for (b = (a || "").match(O) || []; h < k; h++)
                    if (d = this[h],
                    e = 1 === d.nodeType && (d.className ? (" " + d.className + " ").replace(Na, " ") : " ")) {
                        for (g = 0; f = b[g++]; )
                            0 > e.indexOf(" " + f + " ") && (e += f + " ");
                        d.className = c.trim(e)
                    }
            return this
        },
        removeClass: function(a) {
            var b, d, e, f, g, h = 0, k = this.length;
            b = 0 === arguments.length || "string" === typeof a && a;
            if (c.isFunction(a))
                return this.each(function(b) {
                    c(this).removeClass(a.call(this, b, this.className))
                });
            if (b)
                for (b = (a || "").match(O) || []; h < k; h++)
                    if (d = this[h],
                    e = 1 === d.nodeType && (d.className ? (" " + d.className + " ").replace(Na, " ") : "")) {
                        for (g = 0; f = b[g++]; )
                            for (; 0 <= e.indexOf(" " + f + " "); )
                                e = e.replace(" " + f + " ", " ");
                        d.className = a ? c.trim(e) : ""
                    }
            return this
        },
        toggleClass: function(a, b) {
            var d = typeof a
              , e = "boolean" === typeof b;
            return c.isFunction(a) ? this.each(function(d) {
                c(this).toggleClass(a.call(this, d, this.className, b), b)
            }) : this.each(function() {
                if ("string" === d)
                    for (var f, g = 0, h = c(this), k = b, l = a.match(O) || []; f = l[g++]; )
                        k = e ? k : !h.hasClass(f),
                        h[k ? "addClass" : "removeClass"](f);
                else if (d === z || "boolean" === d)
                    this.className && c._data(this, "__className__", this.className),
                    this.className = this.className || !1 === a ? "" : c._data(this, "__className__") || ""
            })
        },
        hasClass: function(a) {
            a = " " + a + " ";
            for (var b = 0, d = this.length; b < d; b++)
                if (1 === this[b].nodeType && 0 <= (" " + this[b].className + " ").replace(Na, " ").indexOf(a))
                    return !0;
            return !1
        },
        val: function(a) {
            var b, d, e, f = this[0];
            if (arguments.length)
                return e = c.isFunction(a),
                this.each(function(b) {
                    1 === this.nodeType && (b = e ? a.call(this, b, c(this).val()) : a,
                    null == b ? b = "" : "number" === typeof b ? b += "" : c.isArray(b) && (b = c.map(b, function(a) {
                        return null == a ? "" : a + ""
                    })),
                    d = c.valHooks[this.type] || c.valHooks[this.nodeName.toLowerCase()],
                    d && "set"in d && d.set(this, b, "value") !== p || (this.value = b))
                });
            if (f) {
                if ((d = c.valHooks[f.type] || c.valHooks[f.nodeName.toLowerCase()]) && "get"in d && (b = d.get(f, "value")) !== p)
                    return b;
                b = f.value;
                return "string" === typeof b ? b.replace(uc, "") : null == b ? "" : b
            }
        }
    });
    c.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = c.find.attr(a, "value");
                    return null != b ? b : a.text
                }
            },
            select: {
                get: function(a) {
                    for (var b, d = a.options, e = a.selectedIndex, f = (a = "select-one" === a.type || 0 > e) ? null : [], g = a ? e + 1 : d.length, h = 0 > e ? g : a ? e : 0; h < g; h++)
                        if (b = d[h],
                        !(!b.selected && h !== e || (c.support.optDisabled ? b.disabled : null !== b.getAttribute("disabled")) || b.parentNode.disabled && c.nodeName(b.parentNode, "optgroup"))) {
                            b = c(b).val();
                            if (a)
                                return b;
                            f.push(b)
                        }
                    return f
                },
                set: function(a, b) {
                    for (var d, e, f = a.options, g = c.makeArray(b), h = f.length; h--; )
                        if (e = f[h],
                        e.selected = 0 <= c.inArray(c(e).val(), g))
                            d = !0;
                    d || (a.selectedIndex = -1);
                    return g
                }
            }
        },
        attr: function(a, b, d) {
            var e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) {
                if (typeof a.getAttribute === z)
                    return c.prop(a, b, d);
                1 === g && c.isXMLDoc(a) || (b = b.toLowerCase(),
                e = c.attrHooks[b] || (c.expr.match.bool.test(b) ? Kb : Z));
                if (d !== p)
                    if (null === d)
                        c.removeAttr(a, b);
                    else {
                        if (e && "set"in e && (f = e.set(a, d, b)) !== p)
                            return f;
                        a.setAttribute(b, d + "");
                        return d
                    }
                else {
                    if (e && "get"in e && null !== (f = e.get(a, b)))
                        return f;
                    f = c.find.attr(a, b);
                    return null == f ? p : f
                }
            }
        },
        removeAttr: function(a, b) {
            var d, e, f = 0, g = b && b.match(O);
            if (g && 1 === a.nodeType)
                for (; d = g[f++]; )
                    e = c.propFix[d] || d,
                    c.expr.match.bool.test(d) ? ua && E || !Oa.test(d) ? a[e] = !1 : a[c.camelCase("default-" + d)] = a[e] = !1 : c.attr(a, d, ""),
                    a.removeAttribute(E ? d : e)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!c.support.radioValue && "radio" === b && c.nodeName(a, "input")) {
                        var d = a.value;
                        a.setAttribute("type", b);
                        d && (a.value = d);
                        return b
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, d) {
            var e, f, g;
            g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) {
                if (g = 1 !== g || !c.isXMLDoc(a))
                    b = c.propFix[b] || b,
                    f = c.propHooks[b];
                return d !== p ? f && "set"in f && (e = f.set(a, d, b)) !== p ? e : a[b] = d : f && "get"in f && null !== (e = f.get(a, b)) ? e : a[b]
            }
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = c.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : vc.test(a.nodeName) || wc.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    });
    Kb = {
        set: function(a, b, d) {
            !1 === b ? c.removeAttr(a, d) : ua && E || !Oa.test(d) ? a.setAttribute(!E && c.propFix[d] || d, d) : a[c.camelCase("default-" + d)] = a[d] = !0;
            return d
        }
    };
    c.each(c.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var d = c.expr.attrHandle[b] || c.find.attr;
        c.expr.attrHandle[b] = ua && E || !Oa.test(b) ? function(a, b, g) {
            var h = c.expr.attrHandle[b];
            a = g ? p : (c.expr.attrHandle[b] = p) != d(a, b, g) ? b.toLowerCase() : null;
            c.expr.attrHandle[b] = h;
            return a
        }
        : function(a, b, d) {
            return d ? p : a[c.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    });
    ua && E || (c.attrHooks.value = {
        set: function(a, b, d) {
            if (c.nodeName(a, "input"))
                a.defaultValue = b;
            else
                return Z && Z.set(a, b, d)
        }
    });
    E || (Z = {
        set: function(a, b, d) {
            var c = a.getAttributeNode(d);
            c || a.setAttributeNode(c = a.ownerDocument.createAttribute(d));
            c.value = b += "";
            return "value" === d || b === a.getAttribute(d) ? b : p
        }
    },
    c.expr.attrHandle.id = c.expr.attrHandle.name = c.expr.attrHandle.coords = function(a, b, d) {
        var c;
        return d ? p : (c = a.getAttributeNode(b)) && "" !== c.value ? c.value : null
    }
    ,
    c.valHooks.button = {
        get: function(a, b) {
            var d = a.getAttributeNode(b);
            return d && d.specified ? d.value : p
        },
        set: Z.set
    },
    c.attrHooks.contenteditable = {
        set: function(a, b, d) {
            Z.set(a, "" === b ? !1 : b, d)
        }
    },
    c.each(["width", "height"], function(a, b) {
        c.attrHooks[b] = {
            set: function(a, c) {
                if ("" === c)
                    return a.setAttribute(b, "auto"),
                    c
            }
        }
    }));
    c.support.hrefNormalized || c.each(["href", "src"], function(a, b) {
        c.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    });
    c.support.style || (c.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || p
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    });
    c.support.optSelected || (c.propHooks.selected = {
        get: function(a) {
            if (a = a.parentNode)
                a.selectedIndex,
                a.parentNode && a.parentNode.selectedIndex;
            return null
        }
    });
    c.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function() {
        c.propFix[this.toLowerCase()] = this
    });
    c.support.enctype || (c.propFix.enctype = "encoding");
    c.each(["radio", "checkbox"], function() {
        c.valHooks[this] = {
            set: function(a, b) {
                if (c.isArray(b))
                    return a.checked = 0 <= c.inArray(c(a).val(), b)
            }
        };
        c.support.checkOn || (c.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        }
        )
    });
    var Pa = /^(?:input|select|textarea)$/i
      , xc = /^key/
      , yc = /^(?:mouse|contextmenu)|click/
      , Lb = /^(?:focusinfocus|focusoutblur)$/
      , Mb = /^([^.]*)(?:\.(.+)|)$/;
    c.event = {
        global: {},
        add: function(a, b, d, e, f) {
            var g, h, k, l, r, s, m, n, q;
            if (k = c._data(a)) {
                d.handler && (l = d,
                d = l.handler,
                f = l.selector);
                d.guid || (d.guid = c.guid++);
                (h = k.events) || (h = k.events = {});
                (r = k.handle) || (r = k.handle = function(a) {
                    return typeof c === z || a && c.event.triggered === a.type ? p : c.event.dispatch.apply(r.elem, arguments)
                }
                ,
                r.elem = a);
                b = (b || "").match(O) || [""];
                for (k = b.length; k--; )
                    g = Mb.exec(b[k]) || [],
                    n = s = g[1],
                    q = (g[2] || "").split(".").sort(),
                    n && (g = c.event.special[n] || {},
                    n = (f ? g.delegateType : g.bindType) || n,
                    g = c.event.special[n] || {},
                    s = c.extend({
                        type: n,
                        origType: s,
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: f,
                        needsContext: f && c.expr.match.needsContext.test(f),
                        namespace: q.join(".")
                    }, l),
                    (m = h[n]) || (m = h[n] = [],
                    m.delegateCount = 0,
                    g.setup && !1 !== g.setup.call(a, e, q, r) || (a.addEventListener ? a.addEventListener(n, r, !1) : a.attachEvent && a.attachEvent("on" + n, r))),
                    g.add && (g.add.call(a, s),
                    s.handler.guid || (s.handler.guid = d.guid)),
                    f ? m.splice(m.delegateCount++, 0, s) : m.push(s),
                    c.event.global[n] = !0);
                a = null
            }
        },
        remove: function(a, b, d, e, f) {
            var g, h, k, l, r, p, m, n, q, B, z, y = c.hasData(a) && c._data(a);
            if (y && (p = y.events)) {
                b = (b || "").match(O) || [""];
                for (r = b.length; r--; )
                    if (k = Mb.exec(b[r]) || [],
                    q = z = k[1],
                    B = (k[2] || "").split(".").sort(),
                    q) {
                        m = c.event.special[q] || {};
                        q = (e ? m.delegateType : m.bindType) || q;
                        n = p[q] || [];
                        k = k[2] && RegExp("(^|\\.)" + B.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        for (l = g = n.length; g--; )
                            h = n[g],
                            !f && z !== h.origType || d && d.guid !== h.guid || k && !k.test(h.namespace) || e && !(e === h.selector || "**" === e && h.selector) || (n.splice(g, 1),
                            h.selector && n.delegateCount--,
                            m.remove && m.remove.call(a, h));
                        l && !n.length && (m.teardown && !1 !== m.teardown.call(a, B, y.handle) || c.removeEvent(a, q, y.handle),
                        delete p[q])
                    } else
                        for (q in p)
                            c.event.remove(a, q + b[r], d, e, !0);
                c.isEmptyObject(p) && (delete y.handle,
                c._removeData(a, "events"))
            }
        },
        trigger: function(a, b, d, e) {
            var f, g, h, k, l, r, s = [d || q], m = Y.call(a, "type") ? a.type : a;
            l = Y.call(a, "namespace") ? a.namespace.split(".") : [];
            h = f = d = d || q;
            if (3 !== d.nodeType && 8 !== d.nodeType && !Lb.test(m + c.event.triggered) && (0 <= m.indexOf(".") && (l = m.split("."),
            m = l.shift(),
            l.sort()),
            g = 0 > m.indexOf(":") && "on" + m,
            a = a[c.expando] ? a : new c.Event(m,"object" === typeof a && a),
            a.isTrigger = e ? 2 : 3,
            a.namespace = l.join("."),
            a.namespace_re = a.namespace ? RegExp("(^|\\.)" + l.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            a.result = p,
            a.target || (a.target = d),
            b = null == b ? [a] : c.makeArray(b, [a]),
            l = c.event.special[m] || {},
            e || !l.trigger || !1 !== l.trigger.apply(d, b))) {
                if (!e && !l.noBubble && !c.isWindow(d)) {
                    k = l.delegateType || m;
                    Lb.test(k + m) || (h = h.parentNode);
                    for (; h; h = h.parentNode)
                        s.push(h),
                        f = h;
                    f === (d.ownerDocument || q) && s.push(f.defaultView || f.parentWindow || n)
                }
                for (r = 0; (h = s[r++]) && !a.isPropagationStopped(); )
                    a.type = 1 < r ? k : l.bindType || m,
                    (f = (c._data(h, "events") || {})[a.type] && c._data(h, "handle")) && f.apply(h, b),
                    (f = g && h[g]) && c.acceptData(h) && f.apply && !1 === f.apply(h, b) && a.preventDefault();
                a.type = m;
                if (!(e || a.isDefaultPrevented() || l._default && !1 !== l._default.apply(s.pop(), b)) && c.acceptData(d) && g && d[m] && !c.isWindow(d)) {
                    (f = d[g]) && (d[g] = null);
                    c.event.triggered = m;
                    try {
                        d[m]()
                    } catch (K) {}
                    c.event.triggered = p;
                    f && (d[g] = f)
                }
                return a.result
            }
        },
        dispatch: function(a) {
            a = c.event.fix(a);
            var b, d, e, f, g = [], h = G.call(arguments);
            b = (c._data(this, "events") || {})[a.type] || [];
            var k = c.event.special[a.type] || {};
            h[0] = a;
            a.delegateTarget = this;
            if (!k.preDispatch || !1 !== k.preDispatch.call(this, a)) {
                g = c.event.handlers.call(this, a, b);
                for (b = 0; (e = g[b++]) && !a.isPropagationStopped(); )
                    for (a.currentTarget = e.elem,
                    f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped(); )
                        if (!a.namespace_re || a.namespace_re.test(d.namespace))
                            a.handleObj = d,
                            a.data = d.data,
                            d = ((c.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h),
                            d !== p && !1 === (a.result = d) && (a.preventDefault(),
                            a.stopPropagation());
                k.postDispatch && k.postDispatch.call(this, a);
                return a.result
            }
        },
        handlers: function(a, b) {
            var d, e, f, g, h = [], k = b.delegateCount, l = a.target;
            if (k && l.nodeType && (!a.button || "click" !== a.type))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (!0 !== l.disabled || "click" !== a.type)) {
                        f = [];
                        for (g = 0; g < k; g++)
                            e = b[g],
                            d = e.selector + " ",
                            f[d] === p && (f[d] = e.needsContext ? 0 <= c(d, this).index(l) : c.find(d, this, null, [l]).length),
                            f[d] && f.push(e);
                        f.length && h.push({
                            elem: l,
                            handlers: f
                        })
                    }
            k < b.length && h.push({
                elem: this,
                handlers: b.slice(k)
            });
            return h
        },
        fix: function(a) {
            if (a[c.expando])
                return a;
            var b, d, e;
            b = a.type;
            var f = a
              , g = this.fixHooks[b];
            g || (this.fixHooks[b] = g = yc.test(b) ? this.mouseHooks : xc.test(b) ? this.keyHooks : {});
            e = g.props ? this.props.concat(g.props) : this.props;
            a = new c.Event(f);
            for (b = e.length; b--; )
                d = e[b],
                a[d] = f[d];
            a.target || (a.target = f.srcElement || q);
            3 === a.target.nodeType && (a.target = a.target.parentNode);
            a.metaKey = !!a.metaKey;
            return g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(a, b) {
                null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var d, c, f = b.button, g = b.fromElement;
                null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || q,
                c = d.documentElement,
                d = d.body,
                a.pageX = b.clientX + (c && c.scrollLeft || d && d.scrollLeft || 0) - (c && c.clientLeft || d && d.clientLeft || 0),
                a.pageY = b.clientY + (c && c.scrollTop || d && d.scrollTop || 0) - (c && c.clientTop || d && d.clientTop || 0));
                !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g);
                a.which || f === p || (a.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0);
                return a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== ab() && this.focus)
                        try {
                            return this.focus(),
                            !1
                        } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === ab() && this.blur)
                        return this.blur(),
                        !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (c.nodeName(this, "input") && "checkbox" === this.type && this.click)
                        return this.click(),
                        !1
                },
                _default: function(a) {
                    return c.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    a.result !== p && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, d, e) {
            a = c.extend(new c.Event, d, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            e ? c.event.trigger(a, null, b) : c.event.dispatch.call(b, a);
            a.isDefaultPrevented() && d.preventDefault()
        }
    };
    c.removeEvent = q.removeEventListener ? function(a, b, d) {
        a.removeEventListener && a.removeEventListener(b, d, !1)
    }
    : function(a, b, d) {
        b = "on" + b;
        a.detachEvent && (typeof a[b] === z && (a[b] = null),
        a.detachEvent(b, d))
    }
    ;
    c.Event = function(a, b) {
        if (!(this instanceof c.Event))
            return new c.Event(a,b);
        a && a.type ? (this.originalEvent = a,
        this.type = a.type,
        this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? ca : da) : this.type = a;
        b && c.extend(this, b);
        this.timeStamp = a && a.timeStamp || c.now();
        this[c.expando] = !0
    }
    ;
    c.Event.prototype = {
        isDefaultPrevented: da,
        isPropagationStopped: da,
        isImmediatePropagationStopped: da,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = ca;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = ca;
            a && (a.stopPropagation && a.stopPropagation(),
            a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = ca;
            this.stopPropagation()
        }
    };
    c.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        c.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var e, f = a.relatedTarget, g = a.handleObj;
                if (!f || f !== this && !c.contains(this, f))
                    a.type = g.origType,
                    e = g.handler.apply(this, arguments),
                    a.type = b;
                return e
            }
        }
    });
    c.support.submitBubbles || (c.event.special.submit = {
        setup: function() {
            if (c.nodeName(this, "form"))
                return !1;
            c.event.add(this, "click._submit keypress._submit", function(a) {
                a = a.target;
                (a = c.nodeName(a, "input") || c.nodeName(a, "button") ? a.form : p) && !c._data(a, "submitBubbles") && (c.event.add(a, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }),
                c._data(a, "submitBubbles", !0))
            })
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble,
            this.parentNode && !a.isTrigger && c.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            if (c.nodeName(this, "form"))
                return !1;
            c.event.remove(this, "._submit")
        }
    });
    c.support.changeBubbles || (c.event.special.change = {
        setup: function() {
            if (Pa.test(this.nodeName)) {
                if ("checkbox" === this.type || "radio" === this.type)
                    c.event.add(this, "propertychange._change", function(a) {
                        "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                    }),
                    c.event.add(this, "click._change", function(a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1);
                        c.event.simulate("change", this, a, !0)
                    });
                return !1
            }
            c.event.add(this, "beforeactivate._change", function(a) {
                a = a.target;
                Pa.test(a.nodeName) && !c._data(a, "changeBubbles") && (c.event.add(a, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || c.event.simulate("change", this.parentNode, a, !0)
                }),
                c._data(a, "changeBubbles", !0))
            })
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type)
                return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            c.event.remove(this, "._change");
            return !Pa.test(this.nodeName)
        }
    });
    c.support.focusinBubbles || c.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var d = 0
          , e = function(a) {
            c.event.simulate(b, a.target, c.event.fix(a), !0)
        };
        c.event.special[b] = {
            setup: function() {
                0 === d++ && q.addEventListener(a, e, !0)
            },
            teardown: function() {
                0 === --d && q.removeEventListener(a, e, !0)
            }
        }
    });
    c.fn.extend({
        on: function(a, b, d, e, f) {
            var g, h;
            if ("object" === typeof a) {
                "string" !== typeof b && (d = d || b,
                b = p);
                for (g in a)
                    this.on(g, b, d, a[g], f);
                return this
            }
            null == d && null == e ? (e = b,
            d = b = p) : null == e && ("string" === typeof b ? (e = d,
            d = p) : (e = d,
            d = b,
            b = p));
            if (!1 === e)
                e = da;
            else if (!e)
                return this;
            1 === f && (h = e,
            e = function(a) {
                c().off(a);
                return h.apply(this, arguments)
            }
            ,
            e.guid = h.guid || (h.guid = c.guid++));
            return this.each(function() {
                c.event.add(this, a, e, d, b)
            })
        },
        one: function(a, b, d, c) {
            return this.on(a, b, d, c, 1)
        },
        off: function(a, b, d) {
            var e;
            if (a && a.preventDefault && a.handleObj)
                return e = a.handleObj,
                c(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler),
                this;
            if ("object" === typeof a) {
                for (e in a)
                    this.off(e, b, a[e]);
                return this
            }
            if (!1 === b || "function" === typeof b)
                d = b,
                b = p;
            !1 === d && (d = da);
            return this.each(function() {
                c.event.remove(this, a, d, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                c.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var d = this[0];
            if (d)
                return c.event.trigger(a, b, d, !0)
        }
    });
    var fc = /^.[^:#\[\.,]*$/
      , zc = /^(?:parents|prev(?:Until|All))/
      , Nb = c.expr.match.needsContext
      , Ac = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    c.fn.extend({
        find: function(a) {
            var b, d = [], e = this, f = e.length;
            if ("string" !== typeof a)
                return this.pushStack(c(a).filter(function() {
                    for (b = 0; b < f; b++)
                        if (c.contains(e[b], this))
                            return !0
                }));
            for (b = 0; b < f; b++)
                c.find(a, e[b], d);
            d = this.pushStack(1 < f ? c.unique(d) : d);
            d.selector = this.selector ? this.selector + " " + a : a;
            return d
        },
        has: function(a) {
            var b, d = c(a, this), e = d.length;
            return this.filter(function() {
                for (b = 0; b < e; b++)
                    if (c.contains(this, d[b]))
                        return !0
            })
        },
        not: function(a) {
            return this.pushStack(Da(this, a || [], !0))
        },
        filter: function(a) {
            return this.pushStack(Da(this, a || [], !1))
        },
        is: function(a) {
            return !!Da(this, "string" === typeof a && Nb.test(a) ? c(a) : a || [], !1).length
        },
        closest: function(a, b) {
            for (var d, e = 0, f = this.length, g = [], h = Nb.test(a) || "string" !== typeof a ? c(a, b || this.context) : 0; e < f; e++)
                for (d = this[e]; d && d !== b; d = d.parentNode)
                    if (11 > d.nodeType && (h ? -1 < h.index(d) : 1 === d.nodeType && c.find.matchesSelector(d, a))) {
                        g.push(d);
                        break
                    }
            return this.pushStack(1 < g.length ? c.unique(g) : g)
        },
        index: function(a) {
            return a ? "string" === typeof a ? c.inArray(this[0], c(a)) : c.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            var d = "string" === typeof a ? c(a, b) : c.makeArray(a && a.nodeType ? [a] : a)
              , d = c.merge(this.get(), d);
            return this.pushStack(c.unique(d))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });
    c.each({
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        },
        parents: function(a) {
            return c.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, d) {
            return c.dir(a, "parentNode", d)
        },
        next: function(a) {
            return bb(a, "nextSibling")
        },
        prev: function(a) {
            return bb(a, "previousSibling")
        },
        nextAll: function(a) {
            return c.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return c.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, d) {
            return c.dir(a, "nextSibling", d)
        },
        prevUntil: function(a, b, d) {
            return c.dir(a, "previousSibling", d)
        },
        siblings: function(a) {
            return c.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return c.sibling(a.firstChild)
        },
        contents: function(a) {
            return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.merge([], a.childNodes)
        }
    }, function(a, b) {
        c.fn[a] = function(d, e) {
            var f = c.map(this, b, d);
            "Until" !== a.slice(-5) && (e = d);
            e && "string" === typeof e && (f = c.filter(e, f));
            1 < this.length && (Ac[a] || (f = c.unique(f)),
            zc.test(a) && (f = f.reverse()));
            return this.pushStack(f)
        }
    });
    c.extend({
        filter: function(a, b, d) {
            var e = b[0];
            d && (a = ":not(" + a + ")");
            return 1 === b.length && 1 === e.nodeType ? c.find.matchesSelector(e, a) ? [e] : [] : c.find.matches(a, c.grep(b, function(a) {
                return 1 === a.nodeType
            }))
        },
        dir: function(a, b, d) {
            var e = [];
            for (a = a[b]; a && 9 !== a.nodeType && (d === p || 1 !== a.nodeType || !c(a).is(d)); )
                1 === a.nodeType && e.push(a),
                a = a[b];
            return e
        },
        sibling: function(a, b) {
            for (var d = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && d.push(a);
            return d
        }
    });
    var db = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , Bc = / jQuery\d+="(?:null|\d+)"/g
      , Ob = RegExp("<(?:" + db + ")[\\s/>]", "i")
      , Qa = /^\s+/
      , Pb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , Qb = /<([\w:]+)/
      , Rb = /<tbody/i
      , Cc = /<|&#?\w+;/
      , Dc = /<(?:script|style|link)/i
      , Fa = /^(?:checkbox|radio)$/i
      , Ec = /checked\s*(?:[^=]|=\s*.checked.)/i
      , Sb = /^$|\/(?:java|ecma)script/i
      , gc = /^true\/(.*)/
      , Fc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , u = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: c.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }
      , Ra = cb(q).appendChild(q.createElement("div"));
    u.optgroup = u.option;
    u.tbody = u.tfoot = u.colgroup = u.caption = u.thead;
    u.th = u.td;
    c.fn.extend({
        text: function(a) {
            return c.access(this, function(a) {
                return a === p ? c.text(this) : this.empty().append((this[0] && this[0].ownerDocument || q).createTextNode(a))
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || eb(this, a).appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = eb(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var d, e = a ? c.filter(a, this) : this, f = 0; null != (d = e[f]); f++)
                b || 1 !== d.nodeType || c.cleanData(B(d)),
                d.parentNode && (b && c.contains(d.ownerDocument, d) && Ea(B(d, "script")),
                d.parentNode.removeChild(d));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && c.cleanData(B(a, !1)); a.firstChild; )
                    a.removeChild(a.firstChild);
                a.options && c.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, b) {
            a = null == a ? !1 : a;
            b = null == b ? a : b;
            return this.map(function() {
                return c.clone(this, a, b)
            })
        },
        html: function(a) {
            return c.access(this, function(a) {
                var d = this[0] || {}
                  , e = 0
                  , f = this.length;
                if (a === p)
                    return 1 === d.nodeType ? d.innerHTML.replace(Bc, "") : p;
                if ("string" === typeof a && !(Dc.test(a) || !c.support.htmlSerialize && Ob.test(a) || !c.support.leadingWhitespace && Qa.test(a) || u[(Qb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(Pb, "<$1></$2>");
                    try {
                        for (; e < f; e++)
                            d = this[e] || {},
                            1 === d.nodeType && (c.cleanData(B(d, !1)),
                            d.innerHTML = a);
                        d = 0
                    } catch (g) {}
                }
                d && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = c.map(this, function(a) {
                return [a.nextSibling, a.parentNode]
            })
              , b = 0;
            this.domManip(arguments, function(d) {
                var e = a[b++]
                  , f = a[b++];
                f && (e && e.parentNode !== f && (e = this.nextSibling),
                c(this).remove(),
                f.insertBefore(d, e))
            }, !0);
            return b ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b, d) {
            a = Ab.apply([], a);
            var e, f, g, h, k = 0, l = this.length, r = this, p = l - 1, m = a[0], n = c.isFunction(m);
            if (n || !(1 >= l || "string" !== typeof m || c.support.checkClone) && Ec.test(m))
                return this.each(function(c) {
                    var e = r.eq(c);
                    n && (a[0] = m.call(this, c, e.html()));
                    e.domManip(a, b, d)
                });
            if (l && (h = c.buildFragment(a, this[0].ownerDocument, !1, !d && this),
            e = h.firstChild,
            1 === h.childNodes.length && (h = e),
            e)) {
                g = c.map(B(h, "script"), fb);
                for (f = g.length; k < l; k++)
                    e = h,
                    k !== p && (e = c.clone(e, !0, !0),
                    f && c.merge(g, B(e, "script"))),
                    b.call(this[k], e, k);
                if (f)
                    for (h = g[g.length - 1].ownerDocument,
                    c.map(g, gb),
                    k = 0; k < f; k++)
                        e = g[k],
                        Sb.test(e.type || "") && !c._data(e, "globalEval") && c.contains(h, e) && (e.src ? c._evalUrl(e.src) : c.globalEval((e.text || e.textContent || e.innerHTML || "").replace(Fc, "")));
                h = e = null
            }
            return this
        }
    });
    c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        c.fn[a] = function(a) {
            for (var e = 0, f = [], g = c(a), h = g.length - 1; e <= h; e++)
                a = e === h ? this : this.clone(!0),
                c(g[e])[b](a),
                Ja.apply(f, a.get());
            return this.pushStack(f)
        }
    });
    c.extend({
        clone: function(a, b, d) {
            var e, f, g, h, k, l = c.contains(a.ownerDocument, a);
            c.support.html5Clone || c.isXMLDoc(a) || !Ob.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (Ra.innerHTML = a.outerHTML,
            Ra.removeChild(g = Ra.firstChild));
            if (!(c.support.noCloneEvent && c.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || c.isXMLDoc(a)))
                for (e = B(g),
                k = B(a),
                h = 0; null != (f = k[h]); ++h)
                    if (e[h]) {
                        var r = e[h]
                          , p = void 0
                          , m = void 0
                          , n = void 0;
                        if (1 === r.nodeType) {
                            p = r.nodeName.toLowerCase();
                            if (!c.support.noCloneEvent && r[c.expando]) {
                                n = c._data(r);
                                for (m in n.events)
                                    c.removeEvent(r, m, n.handle);
                                r.removeAttribute(c.expando)
                            }
                            if ("script" === p && r.text !== f.text)
                                fb(r).text = f.text,
                                gb(r);
                            else if ("object" === p)
                                r.parentNode && (r.outerHTML = f.outerHTML),
                                c.support.html5Clone && f.innerHTML && !c.trim(r.innerHTML) && (r.innerHTML = f.innerHTML);
                            else if ("input" === p && Fa.test(f.type))
                                r.defaultChecked = r.checked = f.checked,
                                r.value !== f.value && (r.value = f.value);
                            else if ("option" === p)
                                r.defaultSelected = r.selected = f.defaultSelected;
                            else if ("input" === p || "textarea" === p)
                                r.defaultValue = f.defaultValue
                        }
                    }
            if (b)
                if (d)
                    for (k = k || B(a),
                    e = e || B(g),
                    h = 0; null != (f = k[h]); h++)
                        hb(f, e[h]);
                else
                    hb(a, g);
            e = B(g, "script");
            0 < e.length && Ea(e, !l && B(a, "script"));
            return g
        },
        buildFragment: function(a, b, d, e) {
            for (var f, g, h, k, l, r, p = a.length, m = cb(b), n = [], q = 0; q < p; q++)
                if ((g = a[q]) || 0 === g)
                    if ("object" === c.type(g))
                        c.merge(n, g.nodeType ? [g] : g);
                    else if (Cc.test(g)) {
                        h = h || m.appendChild(b.createElement("div"));
                        k = (Qb.exec(g) || ["", ""])[1].toLowerCase();
                        r = u[k] || u._default;
                        h.innerHTML = r[1] + g.replace(Pb, "<$1></$2>") + r[2];
                        for (f = r[0]; f--; )
                            h = h.lastChild;
                        !c.support.leadingWhitespace && Qa.test(g) && n.push(b.createTextNode(Qa.exec(g)[0]));
                        if (!c.support.tbody)
                            for (f = (g = "table" !== k || Rb.test(g) ? "<table>" !== r[1] || Rb.test(g) ? 0 : h : h.firstChild) && g.childNodes.length; f--; )
                                c.nodeName(l = g.childNodes[f], "tbody") && !l.childNodes.length && g.removeChild(l);
                        c.merge(n, h.childNodes);
                        for (h.textContent = ""; h.firstChild; )
                            h.removeChild(h.firstChild);
                        h = m.lastChild
                    } else
                        n.push(b.createTextNode(g));
            h && m.removeChild(h);
            c.support.appendChecked || c.grep(B(n, "input"), hc);
            for (q = 0; g = n[q++]; )
                if (!e || -1 === c.inArray(g, e))
                    if (a = c.contains(g.ownerDocument, g),
                    h = B(m.appendChild(g), "script"),
                    a && Ea(h),
                    d)
                        for (f = 0; g = h[f++]; )
                            Sb.test(g.type || "") && d.push(g);
            return m
        },
        cleanData: function(a, b) {
            for (var d, e, f, g, h = 0, k = c.expando, l = c.cache, r = c.support.deleteExpando, p = c.event.special; null != (d = a[h]); h++)
                if (b || c.acceptData(d))
                    if (g = (f = d[k]) && l[f]) {
                        if (g.events)
                            for (e in g.events)
                                p[e] ? c.event.remove(d, e) : c.removeEvent(d, e, g.handle);
                        l[f] && (delete l[f],
                        r ? delete d[k] : typeof d.removeAttribute !== z ? d.removeAttribute(k) : d[k] = null,
                        ba.push(f))
                    }
        },
        _evalUrl: function(a) {
            return c.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    });
    c.fn.extend({
        wrapAll: function(a) {
            if (c.isFunction(a))
                return this.each(function(b) {
                    c(this).wrapAll(a.call(this, b))
                });
            if (this[0]) {
                var b = c(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; )
                        a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return c.isFunction(a) ? this.each(function(b) {
                c(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = c(this)
                  , d = b.contents();
                d.length ? d.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = c.isFunction(a);
            return this.each(function(d) {
                c(this).wrapAll(b ? a.call(this, d) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var S, R, A, Sa = /alpha\([^)]*\)/i, Gc = /opacity\s*=\s*([^)]*)/, Hc = /^(top|right|bottom|left)$/, Ic = /^(none|table(?!-c[ea]).+)/, Tb = /^margin/, ic = RegExp("^(" + sa + ")(.*)$", "i"), oa = RegExp("^(" + sa + ")(?!px)[a-z%]+$", "i"), Jc = RegExp("^([+-])=(" + sa + ")", "i"), pb = {
        BODY: "block"
    }, Kc = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Ub = {
        letterSpacing: 0,
        fontWeight: 400
    }, Q = ["Top", "Right", "Bottom", "Left"], jb = ["Webkit", "O", "Moz", "ms"];
    c.fn.extend({
        css: function(a, b) {
            return c.access(this, function(a, b, f) {
                var g, h = {}, k = 0;
                if (c.isArray(b)) {
                    g = R(a);
                    for (f = b.length; k < f; k++)
                        h[b[k]] = c.css(a, b[k], !1, g);
                    return h
                }
                return f !== p ? c.style(a, b, f) : c.css(a, b)
            }, a, b, 1 < arguments.length)
        },
        show: function() {
            return kb(this, !0)
        },
        hide: function() {
            return kb(this)
        },
        toggle: function(a) {
            var b = "boolean" === typeof a;
            return this.each(function() {
                (b ? a : W(this)) ? c(this).show() : c(this).hide()
            })
        }
    });
    c.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var d = A(a, "opacity");
                        return "" === d ? "1" : d
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": c.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h, k = c.camelCase(b), l = a.style;
                b = c.cssProps[k] || (c.cssProps[k] = ib(l, k));
                h = c.cssHooks[b] || c.cssHooks[k];
                if (d !== p) {
                    if (g = typeof d,
                    "string" === g && (f = Jc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(c.css(a, b)),
                    g = "number"),
                    !(null == d || "number" === g && isNaN(d) || ("number" !== g || c.cssNumber[k] || (d += "px"),
                    c.support.clearCloneStyle || "" !== d || 0 !== b.indexOf("background") || (l[b] = "inherit"),
                    h && "set"in h && (d = h.set(a, d, e)) === p)))
                        try {
                            l[b] = d
                        } catch (r) {}
                } else
                    return h && "get"in h && (f = h.get(a, !1, e)) !== p ? f : l[b]
            }
        },
        css: function(a, b, d, e) {
            var f, g;
            g = c.camelCase(b);
            b = c.cssProps[g] || (c.cssProps[g] = ib(a.style, g));
            (g = c.cssHooks[b] || c.cssHooks[g]) && "get"in g && (f = g.get(a, !0, d));
            f === p && (f = A(a, b, e));
            "normal" === f && b in Ub && (f = Ub[b]);
            return "" === d || d ? (a = parseFloat(f),
            !0 === d || c.isNumeric(a) ? a || 0 : f) : f
        }
    });
    n.getComputedStyle ? (R = function(a) {
        return n.getComputedStyle(a, null)
    }
    ,
    A = function(a, b, d) {
        var e, f = (d = d || R(a)) ? d.getPropertyValue(b) || d[b] : p, g = a.style;
        d && ("" !== f || c.contains(a.ownerDocument, a) || (f = c.style(a, b)),
        oa.test(f) && Tb.test(b) && (a = g.width,
        b = g.minWidth,
        e = g.maxWidth,
        g.minWidth = g.maxWidth = g.width = f,
        f = d.width,
        g.width = a,
        g.minWidth = b,
        g.maxWidth = e));
        return f
    }
    ) : q.documentElement.currentStyle && (R = function(a) {
        return a.currentStyle
    }
    ,
    A = function(a, b, d) {
        var c, f, g = (d = d || R(a)) ? d[b] : p, h = a.style;
        null == g && h && h[b] && (g = h[b]);
        if (oa.test(g) && !Hc.test(b)) {
            d = h.left;
            if (f = (c = a.runtimeStyle) && c.left)
                c.left = a.currentStyle.left;
            h.left = "fontSize" === b ? "1em" : g;
            g = h.pixelLeft + "px";
            h.left = d;
            f && (c.left = f)
        }
        return "" === g ? "auto" : g
    }
    );
    c.each(["height", "width"], function(a, b) {
        c.cssHooks[b] = {
            get: function(a, e, f) {
                if (e)
                    return 0 === a.offsetWidth && Ic.test(c.css(a, "display")) ? c.swap(a, Kc, function() {
                        return ob(a, b, f)
                    }) : ob(a, b, f)
            },
            set: function(a, e, f) {
                var g = f && R(a);
                return mb(a, e, f ? nb(a, b, f, c.support.boxSizing && "border-box" === c.css(a, "boxSizing", !1, g), g) : 0)
            }
        }
    });
    c.support.opacity || (c.cssHooks.opacity = {
        get: function(a, b) {
            return Gc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var d = a.style
              , e = a.currentStyle
              , f = c.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : ""
              , g = e && e.filter || d.filter || "";
            d.zoom = 1;
            if ((1 <= b || "" === b) && "" === c.trim(g.replace(Sa, "")) && d.removeAttribute && (d.removeAttribute("filter"),
            "" === b || e && !e.filter))
                return;
            d.filter = Sa.test(g) ? g.replace(Sa, f) : g + " " + f
        }
    });
    c(function() {
        c.support.reliableMarginRight || (c.cssHooks.marginRight = {
            get: function(a, b) {
                if (b)
                    return c.swap(a, {
                        display: "inline-block"
                    }, A, [a, "marginRight"])
            }
        });
        !c.support.pixelPosition && c.fn.position && c.each(["top", "left"], function(a, b) {
            c.cssHooks[b] = {
                get: function(a, e) {
                    if (e)
                        return e = A(a, b),
                        oa.test(e) ? c(a).position()[b] + "px" : e
                }
            }
        })
    });
    c.expr && c.expr.filters && (c.expr.filters.hidden = function(a) {
        return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !c.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || c.css(a, "display"))
    }
    ,
    c.expr.filters.visible = function(a) {
        return !c.expr.filters.hidden(a)
    }
    );
    c.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        c.cssHooks[a + b] = {
            expand: function(d) {
                var c = 0
                  , f = {};
                for (d = "string" === typeof d ? d.split(" ") : [d]; 4 > c; c++)
                    f[a + Q[c] + b] = d[c] || d[c - 2] || d[0];
                return f
            }
        };
        Tb.test(a) || (c.cssHooks[a + b].set = mb)
    });
    var Lc = /%20/g
      , jc = /\[\]$/
      , Vb = /\r?\n/g
      , Mc = /^(?:submit|button|image|reset|file)$/i
      , Nc = /^(?:input|select|textarea|keygen)/i;
    c.fn.extend({
        serialize: function() {
            return c.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = c.prop(this, "elements");
                return a ? c.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !c(this).is(":disabled") && Nc.test(this.nodeName) && !Mc.test(a) && (this.checked || !Fa.test(a))
            }).map(function(a, b) {
                var d = c(this).val();
                return null == d ? null : c.isArray(d) ? c.map(d, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Vb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: d.replace(Vb, "\r\n")
                }
            }).get()
        }
    });
    c.param = function(a, b) {
        var d, e = [], f = function(a, b) {
            b = c.isFunction(b) ? b() : null == b ? "" : b;
            e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        b === p && (b = c.ajaxSettings && c.ajaxSettings.traditional);
        if (c.isArray(a) || a.jquery && !c.isPlainObject(a))
            c.each(a, function() {
                f(this.name, this.value)
            });
        else
            for (d in a)
                Ga(d, a[d], b, f);
        return e.join("&").replace(Lc, "+")
    }
    ;
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        c.fn[b] = function(a, c) {
            return 0 < arguments.length ? this.on(b, null, a, c) : this.trigger(b)
        }
    });
    c.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, e) {
            return this.on(b, a, c, e)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var V, P, Ta = c.now(), Ua = /\?/, Oc = /#.*$/, Wb = /([?&])_=[^&]*/, Pc = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, Qc = /^(?:GET|HEAD)$/, Rc = /^\/\//, Xb = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Yb = c.fn.load, Zb = {}, Ha = {}, $b = "*/".concat("*");
    try {
        P = lc.href
    } catch (Vc) {
        P = q.createElement("a"),
        P.href = "",
        P = P.href
    }
    V = Xb.exec(P.toLowerCase()) || [];
    c.fn.load = function(a, b, d) {
        if ("string" !== typeof a && Yb)
            return Yb.apply(this, arguments);
        var e, f, g, h = this, k = a.indexOf(" ");
        0 <= k && (e = a.slice(k, a.length),
        a = a.slice(0, k));
        c.isFunction(b) ? (d = b,
        b = p) : b && "object" === typeof b && (g = "POST");
        0 < h.length && c.ajax({
            url: a,
            type: g,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments;
            h.html(e ? c("<div>").append(c.parseHTML(a)).find(e) : a)
        }).complete(d && function(a, b) {
            h.each(d, f || [a.responseText, b, a])
        }
        );
        return this
    }
    ;
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        c.fn[b] = function(a) {
            return this.on(b, a)
        }
    });
    c.extend({
        slpParseJSON: function(a, b) {
            if (n.JSON && n.JSON.parse)
                return b.utf8Encode ? n.JSON.parse(a, function(a, b) {
                    var c = b;
                    if ("string" === typeof c)
                        try {
                            c = decodeURIComponent(c)
                        } catch (g) {}
                    return c
                }) : n.JSON.parse(a);
            if (null === a)
                return a;
            if ("string" === typeof a && (a = c.trim(a)) && Db.test(a.replace(Fb, "@").replace(Gb, "]").replace(Eb, "")))
                return (new Function("return " + a))();
            c.error("Invalid JSON: " + a)
        }
    });
    c.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: P,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(V[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": $b,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": c.slpParseJSON,
                "text xml": c.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? Ia(Ia(a, c.ajaxSettings), b) : Ia(c.ajaxSettings, a)
        },
        ajaxPrefilter: rb(Zb),
        ajaxTransport: rb(Ha),
        ajax: function(a, b) {
            function d(a, b, d, e) {
                var f, n, s, u;
                u = b;
                if (2 !== L) {
                    L = 2;
                    k && clearTimeout(k);
                    r = p;
                    h = e || "";
                    t.readyState = 0 < a ? 4 : 0;
                    e = 200 <= a && 300 > a || 304 === a || 401 === a;
                    if (d) {
                        s = m;
                        for (var A = t, H, E, C, x, I = s.contents, D = s.dataTypes; "*" === D[0]; )
                            D.shift(),
                            E === p && (E = s.mimeType || A.getResponseHeader("Content-Type"));
                        if (E)
                            for (x in I)
                                if (I[x] && I[x].test(E)) {
                                    D.unshift(x);
                                    break
                                }
                        if (D[0]in d)
                            C = D[0];
                        else {
                            for (x in d) {
                                if (!D[0] || s.converters[x + " " + D[0]]) {
                                    C = x;
                                    break
                                }
                                H || (H = x)
                            }
                            C = C || H
                        }
                        C ? (C !== D[0] && D.unshift(C),
                        s = d[C]) : s = void 0
                    }
                    a: {
                        d = m;
                        H = s;
                        E = t;
                        C = e;
                        var G, J, N, A = {}, I = d.dataTypes.slice();
                        if (I[1])
                            for (J in d.converters)
                                A[J.toLowerCase()] = d.converters[J];
                        for (x = I.shift(); x; )
                            if (d.responseFields[x] && (E[d.responseFields[x]] = H),
                            !N && C && d.dataFilter && (H = d.dataFilter(H, d.dataType)),
                            N = x,
                            x = I.shift())
                                if ("*" === x)
                                    x = N;
                                else if ("*" !== N && N !== x) {
                                    J = A[N + " " + x] || A["* " + x];
                                    if (!J)
                                        for (G in A)
                                            if (s = G.split(" "),
                                            s[1] === x && (J = A[N + " " + s[0]] || A["* " + s[0]])) {
                                                !0 === J ? J = A[G] : !0 !== A[G] && (x = s[0],
                                                I.unshift(s[1]));
                                                break
                                            }
                                    if (!0 !== J)
                                        if (J && d["throws"])
                                            H = J(H, d);
                                        else
                                            try {
                                                H = J(H, d)
                                            } catch (F) {
                                                s = {
                                                    state: "parsererror",
                                                    error: J ? F : "No conversion from " + N + " to " + x
                                                };
                                                break a
                                            }
                                }
                        s = {
                            state: "success",
                            data: H
                        }
                    }
                    if (e)
                        m.ifModified && ((u = t.getResponseHeader("Last-Modified")) && (c.lastModified[g] = u),
                        (u = t.getResponseHeader("etag")) && (c.etag[g] = u)),
                        204 === a || "HEAD" === m.type ? u = "nocontent" : 304 === a ? u = "notmodified" : (u = s.state,
                        f = s.data,
                        n = s.error,
                        e = !n);
                    else if (n = u,
                    a || !u)
                        u = "error",
                        0 > a && (a = 0);
                    t.status = a;
                    t.statusText = (b || u) + "";
                    e ? y.resolveWith(q, [f, u, t]) : y.rejectWith(q, [t, u, n]);
                    t.statusCode(z);
                    z = p;
                    l && M.trigger(e ? "ajaxSuccess" : "ajaxError", [t, m, e ? f : n]);
                    B.fireWith(q, [t, u]);
                    l && (M.trigger("ajaxComplete", [t, m]),
                    --c.active || c.event.trigger("ajaxStop"))
                }
            }
            "object" === typeof a && (b = a,
            a = p);
            b = b || {};
            var e, f, g, h, k, l, r, n, m = c.ajaxSetup({}, b), q = m.context || m, M = m.context && (q.nodeType || q.jquery) ? c(q) : c.event, y = c.Deferred(), B = c.Callbacks("once memory"), z = m.statusCode || {}, u = {}, A = {}, L = 0, E = "canceled", t = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === L) {
                        if (!n)
                            for (n = {}; b = Pc.exec(h); )
                                n[b[1].toLowerCase()] = b[2];
                        b = n[a.toLowerCase()]
                    }
                    return null == b ? null : b
                },
                getAllResponseHeaders: function() {
                    return 2 === L ? h : null
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    L || (a = A[c] = A[c] || a,
                    u[a] = b);
                    return this
                },
                overrideMimeType: function(a) {
                    L || (m.mimeType = a);
                    return this
                },
                statusCode: function(a) {
                    var b;
                    if (a)
                        if (2 > L)
                            for (b in a)
                                z[b] = [z[b], a[b]];
                        else
                            t.always(a[t.status]);
                    return this
                },
                abort: function(a) {
                    a = a || E;
                    r && r.abort(a);
                    d(0, a);
                    return this
                }
            };
            y.promise(t).complete = B.add;
            t.success = t.done;
            t.error = t.fail;
            m.url = ((a || m.url || P) + "").replace(Oc, "").replace(Rc, V[1] + "//");
            m.type = b.method || b.type || m.method || m.type;
            m.dataTypes = c.trim(m.dataType || "*").toLowerCase().match(O) || [""];
            null == m.crossDomain && (e = Xb.exec(m.url.toLowerCase()),
            m.crossDomain = !(!e || e[1] === V[1] && e[2] === V[2] && (e[3] || ("http:" === e[1] ? "80" : "443")) === (V[3] || ("http:" === V[1] ? "80" : "443"))));
            m.data && m.processData && "json" == m.postDataType && "string" !== typeof m.data ? m.data = m.utf8Encode ? JSON.stringify(m.data, function(a, b) {
                return "string" === typeof b ? encodeURIComponent(b) : b
            }) : JSON.stringify(m.data) : m.data && m.processData && "string" !== typeof m.data && (m.data = c.param(m.data, m.traditional));
            sb(Zb, m, b, t);
            if (2 === L)
                return t;
            (l = m.global) && 0 === c.active++ && c.event.trigger("ajaxStart");
            m.type = m.type.toUpperCase();
            m.hasContent = !Qc.test(m.type);
            g = m.url;
            m.hasContent || (m.data && (g = m.url += (Ua.test(g) ? "&" : "?") + m.data,
            delete m.data),
            !1 === m.cache && (m.url = Wb.test(g) ? g.replace(Wb, "$1_=" + Ta++) : g + (Ua.test(g) ? "&" : "?") + "_=" + Ta++));
            m.ifModified && (c.lastModified[g] && t.setRequestHeader("If-Modified-Since", c.lastModified[g]),
            c.etag[g] && t.setRequestHeader("If-None-Match", c.etag[g]));
            (m.data && m.hasContent && !1 !== m.contentType || b.contentType) && t.setRequestHeader("Content-Type", m.contentType);
            t.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + $b + "; q=0.01" : "") : m.accepts["*"]);
            for (f in m.headers)
                t.setRequestHeader(f, m.headers[f]);
            if (m.beforeSend && (!1 === m.beforeSend.call(q, t, m) || 2 === L))
                return t.abort();
            E = "abort";
            for (f in {
                success: 1,
                error: 1,
                complete: 1
            })
                t[f](m[f]);
            if (r = sb(Ha, m, b, t)) {
                t.readyState = 1;
                l && M.trigger("ajaxSend", [t, m]);
                m.async && 0 < m.timeout && (k = setTimeout(function() {
                    t.abort("timeout")
                }, m.timeout));
                try {
                    L = 1,
                    r.send(u, d)
                } catch (G) {
                    if (2 > L)
                        d(-1, G);
                    else
                        throw G;
                }
            } else
                d(-1, "No Transport");
            return t
        },
        getJSON: function(a, b, d) {
            return c.get(a, b, d, "json")
        },
        getScript: function(a, b) {
            return c.get(a, p, b, "script")
        }
    });
    c.each(["get", "post"], function(a, b) {
        c[b] = function(a, e, f, g) {
            c.isFunction(e) && (g = g || f,
            f = e,
            e = p);
            return c.ajax({
                url: a,
                type: b,
                dataType: g,
                data: e,
                success: f
            })
        }
    });
    c.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                c.globalEval(a);
                return a
            }
        }
    });
    c.ajaxPrefilter("script", function(a) {
        a.cache === p && (a.cache = !1);
        a.crossDomain && (a.type = "GET",
        a.global = !1)
    });
    c.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, d = q.head || c("head")[0] || q.documentElement;
            return {
                send: function(c, f) {
                    b = q.createElement("script");
                    b.async = !0;
                    a.scriptCharset && (b.charset = a.scriptCharset);
                    b.src = a.url;
                    b.onload = b.onreadystatechange = function(a, c) {
                        if (c || !b.readyState || /loaded|complete/.test(b.readyState))
                            b.onload = b.onreadystatechange = null,
                            b.parentNode && b.parentNode.removeChild(b),
                            b = null,
                            c || f(200, "success")
                    }
                    ;
                    d.insertBefore(b, d.firstChild)
                },
                abort: function() {
                    if (b)
                        b.onload(p, !0)
                }
            }
        }
    });
    var ac = []
      , Va = /(=)\?(?=&|$)|\?\?/;
    c.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = ac.pop() || c.expando + "_" + Ta++;
            this[a] = !0;
            return a
        }
    });
    c.ajaxPrefilter("json jsonp", function(a, b, d) {
        var e, f, g, h = !1 !== a.jsonp && (Va.test(a.url) ? "url" : "string" === typeof a.data && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && Va.test(a.data) && "data");
        if (h || "jsonp" === a.dataTypes[0])
            return e = a.jsonpCallback = c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback,
            h ? a[h] = a[h].replace(Va, "$1" + e) : !1 !== a.jsonp && (a.url += (Ua.test(a.url) ? "&" : "?") + a.jsonp + "=" + e),
            a.converters["script json"] = function() {
                g || c.error(e + " was not called");
                return g[0]
            }
            ,
            a.dataTypes[0] = "json",
            f = n[e],
            n[e] = function() {
                g = arguments
            }
            ,
            d.always(function() {
                n[e] = f;
                a[e] && (a.jsonpCallback = b.jsonpCallback,
                ac.push(e));
                g && c.isFunction(f) && f(g[0]);
                g = f = p
            }),
            "script"
    });
    var aa, na, Sc = 0, Wa = n.ActiveXObject && function() {
        for (var a in aa)
            aa[a](p, !0)
    }
    ;
    c.ajaxSettings.xhr = n.ActiveXObject ? function() {
        var a;
        if (!(a = !this.isLocal && tb()))
            a: {
                try {
                    a = new n.ActiveXObject("Microsoft.XMLHTTP");
                    break a
                } catch (b) {}
                a = void 0
            }
        return a
    }
    : tb;
    na = c.ajaxSettings.xhr();
    c.support.cors = !!na && "withCredentials"in na;
    (na = c.support.ajax = !!na) && c.ajaxTransport(function(a) {
        if (!a.crossDomain || c.support.cors) {
            var b;
            return {
                send: function(d, e) {
                    var f, g, h = a.xhr();
                    a.username ? h.open(a.type, a.url, a.async, a.username, a.password) : h.open(a.type, a.url, a.async);
                    if (a.xhrFields)
                        for (g in a.xhrFields)
                            h[g] = a.xhrFields[g];
                    a.mimeType && h.overrideMimeType && h.overrideMimeType(a.mimeType);
                    a.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (g in d)
                            h.setRequestHeader(g, d[g])
                    } catch (k) {}
                    h.send(a.hasContent && a.data || null);
                    b = function(d, g) {
                        var k, m, n, q;
                        try {
                            if (b && (g || 4 === h.readyState))
                                if (b = p,
                                f && (h.onreadystatechange = c.noop,
                                Wa && delete aa[f]),
                                g)
                                    4 !== h.readyState && h.abort();
                                else {
                                    q = {};
                                    k = h.status;
                                    m = h.getAllResponseHeaders();
                                    "string" === typeof h.responseText && (q.text = h.responseText);
                                    try {
                                        n = h.statusText
                                    } catch (u) {
                                        n = ""
                                    }
                                    k || !a.isLocal || a.crossDomain ? 1223 === k && (k = 204) : k = q.text ? 200 : 404
                                }
                        } catch (y) {
                            g || e(-1, y)
                        }
                        q && e(k, n, q, m)
                    }
                    ;
                    a.async ? 4 === h.readyState ? setTimeout(b) : (f = ++Sc,
                    Wa && (aa || (aa = {},
                    c(n).unload(Wa)),
                    aa[f] = b),
                    h.onreadystatechange = b) : b()
                },
                abort: function() {
                    b && b(p, !0)
                }
            }
        }
    });
    var ea, va, Tc = /^(?:toggle|show|hide)$/, bc = RegExp("^(?:([+-])=|)(" + sa + ")([a-z%]*)$", "i"), Uc = /queueHooks$/, pa = [function(a, b, d) {
        var e, f, g, h, k, l = this, n = {}, p = a.style, m = a.nodeType && W(a), q = c._data(a, "fxshow");
        d.queue || (h = c._queueHooks(a, "fx"),
        null == h.unqueued && (h.unqueued = 0,
        k = h.empty.fire,
        h.empty.fire = function() {
            h.unqueued || k()
        }
        ),
        h.unqueued++,
        l.always(function() {
            l.always(function() {
                h.unqueued--;
                c.queue(a, "fx").length || h.empty.fire()
            })
        }));
        1 === a.nodeType && ("height"in b || "width"in b) && (d.overflow = [p.overflow, p.overflowX, p.overflowY],
        "inline" === c.css(a, "display") && "none" === c.css(a, "float") && (c.support.inlineBlockNeedsLayout && "inline" !== lb(a.nodeName) ? p.zoom = 1 : p.display = "inline-block"));
        d.overflow && (p.overflow = "hidden",
        c.support.shrinkWrapBlocks || l.always(function() {
            p.overflow = d.overflow[0];
            p.overflowX = d.overflow[1];
            p.overflowY = d.overflow[2]
        }));
        for (e in b)
            f = b[e],
            Tc.exec(f) && (delete b[e],
            g = g || "toggle" === f,
            f !== (m ? "hide" : "show") && (n[e] = q && q[e] || c.style(a, e)));
        if (!c.isEmptyObject(n))
            for (e in q ? "hidden"in q && (m = q.hidden) : q = c._data(a, "fxshow", {}),
            g && (q.hidden = !m),
            m ? c(a).show() : l.done(function() {
                c(a).hide()
            }),
            l.done(function() {
                var b;
                c._removeData(a, "fxshow");
                for (b in n)
                    c.style(a, b, n[b])
            }),
            n)
                b = vb(m ? q[e] : 0, e, l),
                e in q || (q[e] = b.start,
                m && (b.end = b.start,
                b.start = "width" === e || "height" === e ? 1 : 0))
    }
    ], ja = {
        "*": [function(a, b) {
            var d = this.createTween(a, b)
              , e = d.cur()
              , f = bc.exec(b)
              , g = f && f[3] || (c.cssNumber[a] ? "" : "px")
              , h = (c.cssNumber[a] || "px" !== g && +e) && bc.exec(c.css(d.elem, a))
              , k = 1
              , l = 20;
            if (h && h[3] !== g) {
                g = g || h[3];
                f = f || [];
                h = +e || 1;
                do
                    k = k || ".5",
                    h /= k,
                    c.style(d.elem, a, h + g);
                while (k !== (k = d.cur() / e) && 1 !== k && --l)
            }
            f && (h = d.start = +h || +e || 0,
            d.unit = g,
            d.end = f[1] ? h + (f[1] + 1) * f[2] : +f[2]);
            return d
        }
        ]
    };
    c.Animation = c.extend(wb, {
        tweener: function(a, b) {
            c.isFunction(a) ? (b = a,
            a = ["*"]) : a = a.split(" ");
            for (var d, e = 0, f = a.length; e < f; e++)
                d = a[e],
                ja[d] = ja[d] || [],
                ja[d].unshift(b)
        },
        prefilter: function(a, b) {
            b ? pa.unshift(a) : pa.push(a)
        }
    });
    c.Tween = y;
    y.prototype = {
        constructor: y,
        init: function(a, b, d, e, f, g) {
            this.elem = a;
            this.prop = d;
            this.easing = f || "swing";
            this.options = b;
            this.start = this.now = this.cur();
            this.end = e;
            this.unit = g || (c.cssNumber[d] ? "" : "px")
        },
        cur: function() {
            var a = y.propHooks[this.prop];
            return a && a.get ? a.get(this) : y.propHooks._default.get(this)
        },
        run: function(a) {
            var b, d = y.propHooks[this.prop];
            this.pos = this.options.duration ? b = c.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : b = a;
            this.now = (this.end - this.start) * b + this.start;
            this.options.step && this.options.step.call(this.elem, this.now, this);
            d && d.set ? d.set(this) : y.propHooks._default.set(this);
            return this
        }
    };
    y.prototype.init.prototype = y.prototype;
    y.propHooks = {
        _default: {
            get: function(a) {
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (a = c.css(a.elem, a.prop, "")) && "auto" !== a ? a : 0 : a.elem[a.prop]
            },
            set: function(a) {
                if (c.fx.step[a.prop])
                    c.fx.step[a.prop](a);
                else
                    a.elem.style && (null != a.elem.style[c.cssProps[a.prop]] || c.cssHooks[a.prop]) ? c.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    };
    y.propHooks.scrollTop = y.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    };
    c.each(["toggle", "show", "hide"], function(a, b) {
        var d = c.fn[b];
        c.fn[b] = function(a, c, g) {
            return null == a || "boolean" === typeof a ? d.apply(this, arguments) : this.animate(qa(b, !0), a, c, g)
        }
    });
    c.fn.extend({
        fadeTo: function(a, b, c, e) {
            return this.filter(W).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, e)
        },
        animate: function(a, b, d, e) {
            var f = c.isEmptyObject(a)
              , g = c.speed(b, d, e);
            b = function() {
                var b = wb(this, c.extend({}, a), g);
                (f || c._data(this, "finish")) && b.stop(!0)
            }
            ;
            b.finish = b;
            return f || !1 === g.queue ? this.each(b) : this.queue(g.queue, b)
        },
        stop: function(a, b, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop;
                b(d)
            };
            "string" !== typeof a && (d = b,
            b = a,
            a = p);
            b && !1 !== a && this.queue(a || "fx", []);
            return this.each(function() {
                var b = !0
                  , g = null != a && a + "queueHooks"
                  , h = c.timers
                  , k = c._data(this);
                if (g)
                    k[g] && k[g].stop && e(k[g]);
                else
                    for (g in k)
                        k[g] && k[g].stop && Uc.test(g) && e(k[g]);
                for (g = h.length; g--; )
                    h[g].elem !== this || null != a && h[g].queue !== a || (h[g].anim.stop(d),
                    b = !1,
                    h.splice(g, 1));
                !b && d || c.dequeue(this, a)
            })
        },
        finish: function(a) {
            !1 !== a && (a = a || "fx");
            return this.each(function() {
                var b, d = c._data(this), e = d[a + "queue"];
                b = d[a + "queueHooks"];
                var f = c.timers
                  , g = e ? e.length : 0;
                d.finish = !0;
                c.queue(this, a, []);
                b && b.stop && b.stop.call(this, !0);
                for (b = f.length; b--; )
                    f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0),
                    f.splice(b, 1));
                for (b = 0; b < g; b++)
                    e[b] && e[b].finish && e[b].finish.call(this);
                delete d.finish
            })
        }
    });
    c.each({
        slideDown: qa("show"),
        slideUp: qa("hide"),
        slideToggle: qa("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        c.fn[a] = function(a, c, f) {
            return this.animate(b, a, c, f)
        }
    });
    c.speed = function(a, b, d) {
        var e = a && "object" === typeof a ? c.extend({}, a) : {
            complete: d || !d && b || c.isFunction(a) && a,
            duration: a,
            easing: d && b || b && !c.isFunction(b) && b
        };
        e.duration = c.fx.off ? 0 : "number" === typeof e.duration ? e.duration : e.duration in c.fx.speeds ? c.fx.speeds[e.duration] : c.fx.speeds._default;
        if (null == e.queue || !0 === e.queue)
            e.queue = "fx";
        e.old = e.complete;
        e.complete = function() {
            c.isFunction(e.old) && e.old.call(this);
            e.queue && c.dequeue(this, e.queue)
        }
        ;
        return e
    }
    ;
    c.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return 0.5 - Math.cos(a * Math.PI) / 2
        }
    };
    c.timers = [];
    c.fx = y.prototype.init;
    c.fx.tick = function() {
        var a, b = c.timers, d = 0;
        for (ea = c.now(); d < b.length; d++)
            a = b[d],
            a() || b[d] !== a || b.splice(d--, 1);
        b.length || c.fx.stop();
        ea = p
    }
    ;
    c.fx.timer = function(a) {
        a() && c.timers.push(a) && c.fx.start()
    }
    ;
    c.fx.interval = 13;
    c.fx.start = function() {
        va || (va = setInterval(c.fx.tick, c.fx.interval))
    }
    ;
    c.fx.stop = function() {
        clearInterval(va);
        va = null
    }
    ;
    c.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    c.fx.step = {};
    c.expr && c.expr.filters && (c.expr.filters.animated = function(a) {
        return c.grep(c.timers, function(b) {
            return a === b.elem
        }).length
    }
    );
    c.fn.offset = function(a) {
        if (arguments.length)
            return a === p ? this : this.each(function(b) {
                c.offset.setOffset(this, a, b)
            });
        var b, d, e = {
            top: 0,
            left: 0
        }, f = (d = this[0]) && d.ownerDocument;
        if (f) {
            b = f.documentElement;
            if (!c.contains(b, d))
                return e;
            typeof d.getBoundingClientRect !== z && (e = d.getBoundingClientRect());
            d = xb(f);
            return {
                top: e.top + (d.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: e.left + (d.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }
        }
    }
    ;
    c.offset = {
        setOffset: function(a, b, d) {
            var e = c.css(a, "position");
            "static" === e && (a.style.position = "relative");
            var f = c(a)
              , g = f.offset()
              , h = c.css(a, "top")
              , k = c.css(a, "left")
              , l = {}
              , n = {};
            ("absolute" === e || "fixed" === e) && -1 < c.inArray("auto", [h, k]) ? (n = f.position(),
            e = n.top,
            k = n.left) : (e = parseFloat(h) || 0,
            k = parseFloat(k) || 0);
            c.isFunction(b) && (b = b.call(a, d, g));
            null != b.top && (l.top = b.top - g.top + e);
            null != b.left && (l.left = b.left - g.left + k);
            "using"in b ? b.using.call(a, l) : f.css(l)
        }
    };
    c.fn.extend({
        position: function() {
            if (this[0]) {
                var a, b, d = {
                    top: 0,
                    left: 0
                }, e = this[0];
                "fixed" === c.css(e, "position") ? b = e.getBoundingClientRect() : (a = this.offsetParent(),
                b = this.offset(),
                c.nodeName(a[0], "html") || (d = a.offset()),
                d.top += c.css(a[0], "borderTopWidth", !0),
                d.left += c.css(a[0], "borderLeftWidth", !0));
                return {
                    top: b.top - d.top - c.css(e, "marginTop", !0),
                    left: b.left - d.left - c.css(e, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || zb; a && !c.nodeName(a, "html") && "static" === c.css(a, "position"); )
                    a = a.offsetParent;
                return a || zb
            })
        }
    });
    c.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var d = /Y/.test(b);
        c.fn[a] = function(e) {
            return c.access(this, function(a, e, h) {
                var k = xb(a);
                if (h === p)
                    return k ? b in k ? k[b] : k.document.documentElement[e] : a[e];
                k ? k.scrollTo(d ? c(k).scrollLeft() : h, d ? h : c(k).scrollTop()) : a[e] = h
            }, a, e, arguments.length, null)
        }
    });
    c.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        c.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(d, e) {
            c.fn[e] = function(e, g) {
                var h = arguments.length && (d || "boolean" !== typeof e)
                  , k = d || (!0 === e || !0 === g ? "margin" : "border");
                return c.access(this, function(b, d, e) {
                    return c.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (d = b.documentElement,
                    Math.max(b.body["scroll" + a], d["scroll" + a], b.body["offset" + a], d["offset" + a], d["client" + a])) : e === p ? c.css(b, d, k) : c.style(b, d, e, k)
                }, b, h ? e : p, h, null)
            }
        })
    });
    c.fn.size = function() {
        return this.length
    }
    ;
    c.fn.andSelf = c.fn.addBack;
    "object" === typeof module && module && "object" === typeof module.exports ? module.exports = c : (n.jQuery = n.$ = c,
    "function" === typeof define && define.amd && define("jquery", [], function() {
        return c
    }));
    c.extend({
        replaceObjName: function(a) {
            var b = null, c, e, f = "", g = /\"(\w+)(\.(\w+)(\.(\w+))?)?\"\:/i, b = g.exec(a);
            try {
                for (; null != b; ) {
                    e = b[1];
                    p != b[2] && (e += "." + b[3],
                    p != b[4] && (e += "." + b[5]));
                    try {
                        c = eval("(" + e + ")"),
                        0 == c.length && (c = e),
                        a = a.replace(e, c),
                        f += a.substring(0, a.indexOf(c) + c.length + 2),
                        a = a.substring(a.indexOf(c) + c.length + 2)
                    } catch (h) {
                        f += a.substring(0, a.indexOf(e) + e.length + 2),
                        a = a.substring(a.indexOf(e) + e.length + 2)
                    }
                    b = g.exec(a)
                }
                f += a
            } catch (k) {}
            return f
        }
    });
    c.extend({
        sendAjaxReq: function(a, b, c, e, f, g) {
            if (!0 == $.local)
                return c && c({
                    err_code: ENONE
                });
            if ("string" !== typeof a)
                return !1;
            $.isFunction(b) && (e = e || c,
            c = b,
            b = {});
            e = e || "undefined" === typeof e;
            var h = !0;
            a = {
                url: a,
                data: b,
                type: "POST",
                async: e,
                postDataType: f,
                utf8Encode: g || "undefined" === typeof g,
                success: function(a) {
                    if (c)
                        try {
                            h = c(a)
                        } catch (b) {
                            h = null,
                            e && (h = !1)
                        }
                },
                dataType: "json"
            };
            "json" == f && (a.contentType = "application/json; charset=UTF-8");
            $.ajax(a);
            return h
        },
        sendDsReq: function(a, b, c, e) {
            var f;
            f = {};
            if (!1 === $.authRltObj.authStatus)
                return f[ERR_CODE] = ENONE,
                b && b(f);
            f = $.orgDsUrl();
            a.method = e;
            return $.sendAjaxReq(f, a, function(e) {
                !0 == $.local && (e[ERR_CODE] = ENONE);
                return EUNAUTH == e[ERR_CODE] ? $.postDsUnAuthHandle(a, b, c, e) : b && b(e)
            }, c, "json")
        },
        getLocalData: function(a, b, c, e) {
            c = {};
            c[ERR_CODE] = ENONE;
            for (var f in a)
                if ("method" != f)
                    if (e = a[f].name || a[f].table,
                    c[f] = {},
                    isArray(e))
                        for (var g = 0; g < e.length; g++)
                            c[f][e[g]] = localData[f][e[g]];
                    else
                        c[f][e] = localData[f][e];
            return b && b(c)
        },
        query: function(a, b, c) {
            return $.local ? $.getLocalData(a, b, c, "get") : $.sendDsReq(a, b, c, "get")
        },
        modify: function(a, b, c) {
            return $.sendDsReq(a, b, c, "set")
        },
        add: function(a, b, c) {
            return $.sendDsReq(a, b, c, "add")
        },
        del: function(a, b, c) {
            return $.sendDsReq(a, b, c, "delete")
        },
        action: function(a, b, c) {
            return $.sendDsReq(a, b, c, "do")
        }
    });
    c.extend({
        pwd: "",
        authRltObj: {
            code: "",
            key: "",
            group: 0,
            dictionary: "",
            time: 0,
            client: "",
            bHandLg: !1,
            authStatus: !0,
            authLog: null
        },
        accountStatus: {
            logoutHandle: !1
        },
        loginErrHandle: {},
        externPageHandle: {},
        pagePRHandle: {},
        setLoginErrHandle: function(a) {
            $.loginErrHandle = function(b) {
                $.setLgPwd("");
                a(b)
            }
        },
        setExternPageHandle: function(a) {
            $.externPageHandle = a
        },
        setPRHandle: function(a) {
            $.pagePRHandle = a
        },
        orgDsUrl: function() {
            return "/stok=" + encodeURIComponent($.session) + "/ds"
        },
        securityEncode: function(a, b, c) {
            var e = "", f, g, h, k, l = 187, n = 187;
            g = a.length;
            h = b.length;
            k = c.length;
            f = g > h ? g : h;
            for (var p = 0; p < f; p++)
                n = l = 187,
                p >= g ? n = b.charCodeAt(p) : p >= h ? l = a.charCodeAt(p) : (l = a.charCodeAt(p),
                n = b.charCodeAt(p)),
                e += c.charAt((l ^ n) % k);
            return e
        },
        orgAuthPwd: function(a) {
            return $.securityEncode("RDpbLfCPsJZ7fiv", a, "yLwVl0zKqws7LgKPRQ84Mdt708T1qQ3Ha7xv3H7NyU84p21BriUWBU43odz3iP4rBL3cD02KZciXTysVXiV8ngg6vL48rPJyAUw0HurW20xqxv9aYb4M9wK1Ae0wlro510qXeU07kV57fQMc8L6aLgMLwygtc0F10a0Dg70TOoouyFhdysuRMO51yY5ZlOZZLEal1h0t9YQW0Ko7oBwmCAHoic4HYbUyVeU3sfQ1xtXcPcf1aT303wAQhv66qzW")
        },
        objCopy: function(a, b) {
            var c, e;
            for (e in a)
                c = b[e],
                c != p && (a[e] = c)
        },
        setLgPwd: function(a) {
            try {
                sessionLS.setItem(LGKEYSTR, a),
                sessionLS.setItem(LGKEYLEN, gCloudAccountBR.pwdLen),
                $.pwd = a
            } catch (b) {}
        },
        getLgPwd: function() {
            return $.pwd
        },
        parseAuthRlt: function(a) {
            "object" == typeof a && ($.objCopy($.authRltObj, a),
            $.authRltObj.group = parseInt($.authRltObj.group, 10),
            $.pagePRHandle())
        },
        logout: function() {
            $.action({
                system: {
                    logout: "null"
                }
            }, function(a) {
                ENONE == a[ERR_CODE] && ($.session = "",
                $.setLgPwd(""),
                setLoadPage("Content.htm", "Con"),
                $.authRltObj.code = ESYSCLIENTNORMAL,
                showLogin(function() {
                    emptyNodes(id("Con"))
                }),
                $.accountStatus.logoutHandle = !0)
            })
        },
        queryAuthLog: function(a) {
            return $.sendAjaxReq("/", {
                query_auth_log: "null",
                method: "do"
            }, function(b) {
                !0 == $.local && (b[ERR_CODE] = ENONE);
                return a && a(b)
            }, !0, "json")
        },
        postDsUnAuthHandle: function(a, b, c, e) {
            if (!0 != $.accountStatus.logoutHandle && EUNAUTH == e[ERR_CODE])
                if ($.authRltObj.authStatus = !1,
                $.parseAuthRlt(e.data),
                null == $.pwd || 0 == $.pwd.length || ESYSRESET == $.authRltObj.code)
                    n.setTimeout(function() {
                        $.loginErrHandle()
                    }, 0);
                else
                    return $.auth($.pwd, function(e) {
                        if (ENONE == e)
                            return $.sendAjaxReq($.orgDsUrl(), a, function(a) {
                                if (EUNAUTH == a[ERR_CODE])
                                    $.authRltObj.authStatus = !1,
                                    $.parseAuthRlt(a.data),
                                    $.loginErrHandle();
                                else
                                    return $.authRltObj.authStatus = !0,
                                    b && b(a)
                            }, c, "json");
                        n.setTimeout(function() {
                            $.authRltObj.authStatus = !1;
                            $.loginErrHandle()
                        }, 0)
                    }, c)
        },
        changeDefaultPwd: function(a, b) {
            var c = orgAuthPwd(a)
              , e = {
                method: "do",
                set_password: {
                    password: c
                }
            };
            $.accountStatus.logoutHandle = !1;
            $.sendAjaxReq("", e, function(a) {
                var e = a[ERR_CODE];
                ENONE == e && ($.authRltObj.authStatus = !0,
                $.setLgPwd(c),
                $.session = decodeURIComponent(a.stok));
                b && b(e)
            }, !0, "json")
        },
        unAuthSendDsData: function(a, b, c) {
            a.method = "do";
            $.accountStatus.logoutHandle = !1;
            $.sendAjaxReq("", a, function(a) {
                b && b(a)
            }, c, "json")
        },
        changePwd: function(a, b, c) {
            a = {
                system: {
                    chg_pwd: {
                        old_pwd: orgAuthPwd(a),
                        new_pwd: orgAuthPwd(b)
                    }
                }
            };
            $.action(a, function(a) {
                a = a[ERR_CODE];
                ENONE == a && $.setLgPwd(orgAuthPwd(b));
                "function" == typeof c && c(a)
            })
        },
        auth: function(a, b, c) {
            $.accountStatus.logoutHandle = !1;
            (a == p || 0 == a.length) && b && b(EUNAUTH);
            return $.sendAjaxReq("", {
                method: "do",
                login: {
                    password: a
                }
            }, function(c) {
                var d = c[ERR_CODE];
                ENONE == d ? ($.session = decodeURIComponent(c.stok),
                $.setLgPwd(a),
                $.authRltObj.authStatus = !0) : ($.authRltObj.authStatus = !1,
                $.parseAuthRlt(c.data));
                return b && b(d)
            }, c || "undefined" === typeof c, "json")
        }
    })
}
)(window);
