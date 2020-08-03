function wa(a) {
    var b = a.length,
        d = c.type(a);
    return c.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === d || "function" !== d && (0 === b || "number" === typeof b && 0 < b && b - 1 in a)
}

function cc(a) {
    var b = Xa[a] = {};
    c.each(a.match(O) || [], function (a, c) {
        b[c] = !0
    });
    return b
}

function Ya(a, b, d, e) {
    if (c.acceptData(a)) {
        var f = c.expando,
            g = a.nodeType,
            h = g ? c.cache : a,
            k = g ? a[f] : a[f] && f;
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
        var e, f, g = a.nodeType,
            h = g ? c.cache : a,
            k = g ? a[c.expando] : c.expando;
        if (h[k]) {
            if (b && (e = d ? h[k] : h[k].data)) {
                c.isArray(b) ? b = b.concat(c.map(b, c.camelCase)) : b in e ? b = [b] : (b = c.camelCase(b),
                    b = b in e ? [b] : b.split(" "));
                for (f = b.length; f--;)
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
    while (a && 1 !== a.nodeType);
    return a
}

function Da(a, b, d) {
    if (c.isFunction(b))
        return c.grep(a, function (a, c) {
            return !!b.call(a, c, a) !== d
        });
    if (b.nodeType)
        return c.grep(a, function (a) {
            return a === b !== d
        });
    if ("string" === typeof b) {
        if (fc.test(b))
            return c.filter(b, a, d);
        b = c.filter(b, a)
    }
    return c.grep(a, function (a) {
        return 0 <= c.inArray(a, b) !== d
    })
}

function cb(a) {
    var b = db.split("|");
    a = a.createDocumentFragment();
    if (a.createElement)
        for (; b.length;)
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
        var g = c._data(b, e),
            h = e.events;
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
    var d, e, f = 0,
        g = typeof a.getElementsByTagName !== z ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== z ? a.querySelectorAll(b || "*") : p;
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
    for (var d = b.charAt(0).toUpperCase() + b.slice(1), c = b, f = jb.length; f--;)
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
    var e = !0,
        f = "width" === b ? a.offsetWidth : a.offsetHeight,
        g = R(a),
        h = c.support.boxSizing && "border-box" === c.css(a, "boxSizing", !1, g);
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
    var b = q,
        d = pb[a];
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
    var d = c(b.createElement(a)).appendTo(b.body),
        e = c.css(d[0], "display");
    d.remove();
    return e
}

function Ga(a, b, d, e) {
    var f;
    if (c.isArray(b))
        c.each(b, function (b, c) {
            d || jc.test(a) ? e(a, c) : Ga(a + "[" + ("object" === typeof c ? b : "") + "]", c, d, e)
        });
    else if (d || "object" !== c.type(b))
        e(a, b);
    else
        for (f in b)
            Ga(a + "[" + f + "]", b[f], d, e)
}

function rb(a) {
    return function (b, d) {
        "string" !== typeof b && (d = b,
            b = "*");
        var e, f = 0,
            g = b.toLowerCase().match(O) || [];
        if (c.isFunction(d))
            for (; e = g[f++];)
                "+" === e[0] ? (e = e.slice(1) || "*",
                    (a[e] = a[e] || []).unshift(d)) : (a[e] = a[e] || []).push(d)
    }
}

function sb(a, b, d, e) {
    function f(k) {
        var l;
        g[k] = !0;
        c.each(a[k] || [], function (a, c) {
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
    var g = {},
        h = a === Ha;
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
    setTimeout(function () {
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
    var e, f = 0,
        g = pa.length,
        h = c.Deferred().always(function () {
            delete k.elem
        }),
        k = function () {
            if (e)
                return !1;
            for (var b = ea || ub(), b = Math.max(0, l.startTime + l.duration - b), d = 1 - (b / l.duration || 0), c = 0, f = l.tweens.length; c < f; c++)
                l.tweens[c].run(d);
            h.notifyWith(a, [l, d, b]);
            if (1 > d && f)
                return b;
            h.resolveWith(a, [l]);
            return !1
        },
        l = h.promise({
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
            createTween: function (b, d) {
                var e = c.Tween(a, l.opts, b, d, l.opts.specialEasing[b] || l.opts.easing);
                l.tweens.push(e);
                return e
            },
            stop: function (b) {
                var d = 0,
                    c = b ? l.tweens.length : 0;
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
            (h = c.cssHooks[e]) && "expand" in h)
            for (d in g = h.expand(g),
                delete a[e],
                g)
                d in a || (a[d] = g[d],
                    b[d] = f);
        else
            b[e] = f
}

function y(a, b, d, c, f) {
    return new y.prototype.init(a, b, d, c, f)
}

function qa(a, b) {
    var d, c = {
            height: a
        },
        f = 0;
    for (b = b ? 1 : 0; 4 > f; f += 2 - b)
        d = Q[f],
        c["margin" + d] = c["padding" + d] = a;
    b && (c.opacity = c.width = a);
    return c
}

function xb(a) {
    return c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
}