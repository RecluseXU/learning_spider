var X, yb, z = typeof p,
lc = n.location,
q = n.document,
zb = q.documentElement,
mc = n.jQuery,
nc = n.$,
ra = {},
ba = [],
Ab = ba.concat,
Ja = ba.push,
G = ba.slice,
Bb = ba.indexOf,
oc = ra.toString,
Y = ra.hasOwnProperty,
Ka = "1.10.1".trim,
c = function (a, b) {
    return new c.fn.init(a, b, yb)
},
sa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
O = /\S+/g,
pc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
qc = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
Cb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
Db = /^[\],:{}\s]*$/,
Eb = /(?:^|:|,)(?:\s*\[)+/g,
Fb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
Gb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
rc = /^-ms-/,
sc = /-([\da-z])/gi,
tc = function (a, b) {
    return b.toUpperCase()
},
T = function (a) {
    if (q.addEventListener || "load" === a.type || "complete" === q.readyState)
        Hb(),
        c.ready()
},
Hb = function () {
    q.addEventListener ? (q.removeEventListener("DOMContentLoaded", T, !1),
        n.removeEventListener("load", T, !1)) : (q.detachEvent("onreadystatechange", T),
        n.detachEvent("onload", T))
};