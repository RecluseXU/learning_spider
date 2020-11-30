var locationHref = window.location.href
  , domainConfig = ""
  , appkey = "";
function getQuery(e, t) {
    var n = new RegExp("(^|&)" + t + "=([^&]*)(&|$)")
      , a = e.split("?")[1].match(n);
    return null != a ? a[2] : null
}
try {
    var searchParam = document.location.search;
    appkey = getQuery(searchParam, "appkey")
} catch (e) {}
function getBrowserInfo() {
    var e = navigator.userAgent.toLocaleLowerCase()
      , t = null;
    if (null != e.match(/msie/) || null != e.match(/trident/))
        t = "IE",
        browserVersion = null != e.match(/msie ([\d.]+)/) ? e.match(/msie ([\d.]+)/)[1] : e.match(/rv:([\d.]+)/)[1];
    else if (null != e.match(/firefox/))
        t = "firefox";
    else if (null != e.match(/ubrowser/))
        t = "UC";
    else if (null != e.match(/opera/))
        t = "opera";
    else if (null != e.match(/bidubrowser/))
        t = "bidubrowser";
    else if (null != e.match(/metasr/))
        t = "sogou";
    else if (null != e.match(/tencenttraveler/) || null != e.match(/qqbrowse/))
        t = "QQ";
    else if (null != e.match(/maxthon/))
        t = "maxthon";
    else if (-1 < navigator.userAgent.toLowerCase().indexOf("chrome")) {
        var n = "";
        navigator.mimeTypes["application/x-shockwave-flash"] && (n = navigator.mimeTypes["application/x-shockwave-flash"].description.toLowerCase()),
        -1 < n.indexOf("adobe") && (t = "360old")
    } else if (null != e.match(/safari/))
        t = "Safari";
    else if (null != e.match(/chrome/)) {
        (function r(e, t) {
            var n = navigator.mimeTypes;
            for (var a in n)
                if (n[a][e] == t)
                    return !0;
            return !1
        }
        )("type", "application/vnd.chromium.remoting-viewer") && (t = "360")
    }
    return t
}
var browserTypeReal = getBrowserInfo()
  , _0x1e29c = "OyqTyShf0jP47LDfDj5Er4Sz/NudHzIPNMX6riqvzBc1/4W+nKR6NVNYkBbMy41Iin35brBb//eSODvMgkQULA==";
if ("sogou" != browserTypeReal) {
    var domains, cookieDomain, regex = /[http:|https:]\/\/([^\/]+)\//i;
    try {
        var domainarr = (domains = regex.exec(document.location.href)[1]).split(".");
        cookieDomain = "." + domainarr[domainarr.length - 2] + "." + domainarr[domainarr.length - 1]
    } catch (e) {
        cookieDomain = ".58.com"
    }
    var options = {
        domain: cookieDomain
    }
      , _0xd7e6c = new __0x9527bc(options)
}
!function(g, l) {
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        var n;
        if (null == this)
            throw new TypeError("this is null or undefined");
        var a = Object(this)
          , r = a.length >>> 0;
        if (0 == r)
            return -1;
        var i = +t || 0;
        if (Math.abs(i) === Infinity && (i = 0),
        r <= i)
            return -1;
        for (n = Math.max(0 <= i ? i : r - Math.abs(i), 0); n < r; ) {
            if (n in a && a[n] === e)
                return n;
            n++
        }
        return -1
    }
    ),
    Array.prototype.forEach || (Array.prototype.forEach = function(e, t) {
        var n, a;
        if (null == this)
            throw new TypeError(" this is null or not defined");
        var r = Object(this)
          , i = r.length >>> 0;
        if ("[object Function]" != {}.toString.call(e))
            throw new TypeError(e + " is not a function");
        for (t && (n = t),
        a = 0; a < i; ) {
            var o;
            a in r && (o = r[a],
            e.call(n, o, a, r)),
            a++
        }
    }
    ),
    Array.prototype.map || (Array.prototype.map = function(e, t) {
        var n, a, r;
        if (null == this)
            throw new TypeError(" this is null or not defined");
        var i = Object(this)
          , o = i.length >>> 0;
        if ("function" != typeof e)
            throw new TypeError(e + " is not a function");
        for (t && (n = t),
        a = new Array(o),
        r = 0; r < o; ) {
            var s, c;
            r in i && (s = i[r],
            c = e.call(n, s, r, i),
            a[r] = c),
            r++
        }
        return a
    }
    );
    var t = function() {
        this.clientId = null,
        this.timer = null,
        this.pollingTimer = null,
        this.domain = null,
        this.configCatch = null,
        this.source = null
    }
      , u = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    t.prototype = {
        constructor: t,
        init: function(t) {
            var n = this;
            n.configCatch = t,
            n.clientId = t.clientType;
            var a = {};
            a.clientType = t !== l ? t.clientType : "1",
            a.cookieId = t !== l ? t.cookieId : [],
            a.url = "//j1.58cdn.com.cn/resource/xxzl/tracker/FontList.swf?v=201607281700";
            var r;
            try {
                var i = /[http:|https:]\/\/([^\/]+)\//i.exec(document.location.href)[1].split(".");
                r = "." + i[i.length - 2] + "." + i[i.length - 1],
                n.domain = r
            } catch (e) {
                r = ".58.com",
                n.domain = r
            }
            a.fpurl = domainConfig + "/api/v1/pcm/report",
            a.from = t.from == l ? "" : t.from,
            n.source = a.from,
            this.nativeForEach = Array.prototype.forEach,
            this.nativeMap = Array.prototype.map,
            this.sendData(a)
        },
        sendData: function(e) {
            var c = this
              , l = function(e) {
                function i(e) {
                    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)")
                      , n = g.location.search.substr(1).match(t);
                    return null != n ? unescape(n[2]) : null
                }
                function h() {
                    var e = {
                        appkey: appkey,
                        cid: i("cid"),
                        expire: "180",
                        nonce: Math.ceil(1e6 * Math.random()),
                        sessionid: i("token"),
                        timestamp: (new Date).getTime()
                    }
                      , t = CryptoJS.HmacSHA256("httpsgetcdata.58.com/api/v1/pcm/getfp?" + function o(e) {
                        try {
                            var t = [];
                            for (var n in e) {
                                var a = n
                                  , r = e[n];
                                t.push(a + "=" + r)
                            }
                            return t.join("&")
                        } catch (i) {
                            return ""
                        }
                    }(e), "7F5B9632B2F13918");
                    t = CryptoJS.enc.Base64.stringify(t);
                    e.signature = t;
                    var n = CryptoJS.enc.Utf8.parse("3279831EC33B4CA7")
                      , a = JSON.stringify(e)
                      , r = CryptoJS.AES.encrypt(a, n, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    return r = r.ciphertext.toString()
                }
                function f(e) {
                    if (200 == e.code) {
                        e.data.split("")[0],
                        e.data.split("")[1];
                        var t = e.data.split("")[2]
                          , n = e.data.split("")[3];
                        "sogou" == browserTypeReal ? ("" != t && c.hand_save_all("xxzl_cid", t),
                        "" != n && c.hand_save_all("xzuid", n)) : ("" != t && _0xd7e6c.set("xxzl_cid", t),
                        "" != n && _0xd7e6c.set("xzuid", n)),
                        messenger.send(e.data)
                    } else
                        setTimeout(function() {
                            a()
                        }, 3e3),
                        messenger.send(e.data)
                }
                function a() {
                    var n = ("dpjsonp_" + Math.random()).replace(".", "")
                      , a = ("dpjsonp_" + Math.random()).replace(".", "")
                      , r = ("dpjsonp_" + Math.random()).replace(".", "")
                      , i = ("dpjsonp_" + Math.random()).replace(".", "")
                      , o = ("dpjsonp_" + Math.random()).replace(".", "")
                      , s = document.getElementsByTagName("head")[0]
                      , c = document.createElement("script")
                      , l = document.createElement("script")
                      , u = document.createElement("script")
                      , p = document.createElement("script")
                      , d = document.createElement("script");
                    s.appendChild(c),
                    g[o] = function(e) {
                        var t = CryptoJS.AES.decrypt(e, CryptoJS.enc.Utf8.parse("3279831EC33B4CA7"), {
                            mode: CryptoJS.mode.ECB,
                            padding: CryptoJS.pad.Pkcs7
                        }).toString(CryptoJS.enc.Utf8);
                        "" != JSON.parse(t).data.split("")[1] && f(JSON.parse(t)),
                        s.removeChild(d),
                        g[o] = null
                    }
                    ,
                    g[i] = function(e) {
                        var t = CryptoJS.AES.decrypt(e, CryptoJS.enc.Utf8.parse("3279831EC33B4CA7"), {
                            mode: CryptoJS.mode.ECB,
                            padding: CryptoJS.pad.Pkcs7
                        }).toString(CryptoJS.enc.Utf8);
                        "" == JSON.parse(t).data.split("")[1] ? setTimeout(function() {
                            s.removeChild(p),
                            s.appendChild(d),
                            d.src = domainConfig + "/api/v1/pcm/getfp?param=" + h() + "&callback=" + o
                        }, 3e3) : (f(JSON.parse(t)),
                        s.removeChild(p)),
                        g[i] = null
                    }
                    ,
                    g[r] = function(e) {
                        var t = CryptoJS.AES.decrypt(e, CryptoJS.enc.Utf8.parse("3279831EC33B4CA7"), {
                            mode: CryptoJS.mode.ECB,
                            padding: CryptoJS.pad.Pkcs7
                        }).toString(CryptoJS.enc.Utf8);
                        "" == JSON.parse(t).data.split("")[1] ? setTimeout(function() {
                            s.removeChild(u),
                            s.appendChild(p),
                            p.src = domainConfig + "/api/v1/pcm/getfp?param=" + h() + "&callback=" + i
                        }, 3e3) : (f(JSON.parse(t)),
                        s.removeChild(u)),
                        g[r] = null
                    }
                    ,
                    g[a] = function(e) {
                        var t = CryptoJS.AES.decrypt(e, CryptoJS.enc.Utf8.parse("3279831EC33B4CA7"), {
                            mode: CryptoJS.mode.ECB,
                            padding: CryptoJS.pad.Pkcs7
                        }).toString(CryptoJS.enc.Utf8);
                        "" == JSON.parse(t).data.split("")[1] ? setTimeout(function() {
                            s.removeChild(l),
                            s.appendChild(u),
                            u.src = domainConfig + "/api/v1/pcm/getfp?param=" + h() + "&callback=" + r
                        }, 3e3) : (f(JSON.parse(t)),
                        s.removeChild(l)),
                        g[a] = null
                    }
                    ,
                    g[n] = function(e) {
                        var t = CryptoJS.AES.decrypt(e, CryptoJS.enc.Utf8.parse("3279831EC33B4CA7"), {
                            mode: CryptoJS.mode.ECB,
                            padding: CryptoJS.pad.Pkcs7
                        }).toString(CryptoJS.enc.Utf8);
                        "" == JSON.parse(t).data.split("")[1] ? setTimeout(function() {
                            s.removeChild(c),
                            s.appendChild(l),
                            l.src = domainConfig + "/api/v1/pcm/getfp?param=" + h() + "&callback=" + a
                        }, 3e3) : (f(JSON.parse(t)),
                        s.removeChild(c)),
                        g[n] = null
                    }
                    ,
                    c.src = domainConfig + "/api/v1/pcm/getfp?param=" + h() + "&callback=" + n
                }
                var t = CryptoJS.AES.decrypt(e, CryptoJS.enc.Utf8.parse("BF81BEE8DC405054"), {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(CryptoJS.enc.Utf8)
                  , n = JSON.parse(t);
                if (200 == n.code) {
                    n.data.split("")[0];
                    var r = n.data.split("")[1]
                      , o = n.data.split("")[2]
                      , s = n.data.split("")[3];
                    "sogou" == browserTypeReal ? ("" != o && c.hand_save_all("xxzl_cid", o),
                    "" != s && c.hand_save_all("xzuid", s)) : ("" != o && _0xd7e6c.set("xxzl_cid", o),
                    "" != s && _0xd7e6c.set("xzuid", s)),
                    "" == r && setTimeout(function() {
                        a()
                    }, 3e3),
                    messenger.send(n.data)
                } else
                    setTimeout(function() {
                        a()
                    }, 3e3),
                    messenger.send(n.data)
            }
              , u = function() {
                messenger.send({
                    status: "faile",
                    message: "server unkown error!"
                })
            }
              , p = (c = this,
            e.fpurl)
              , d = e.from;
            c.get(e, function(e) {
                function t(e) {
                    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)")
                      , n = g.location.search.substr(1).match(t);
                    return null != n ? unescape(n[2]) : null
                }
                e.xxzl_cid = t("cid"),
                e.sessionid = t("token"),
                e.xxzl_deviceid = t("deviceid");
                var n = CryptoJS.enc.Utf8.parse("6F579B981C222BB7")
                  , a = JSON.stringify(e);
                o = (o = CryptoJS.AES.encrypt(a, n, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                })).ciphertext.toString();
                var r = {
                    appkey: appkey,
                    data: o,
                    expire: "180",
                    nonce: Math.ceil(1e6 * Math.random()),
                    timestamp: (new Date).getTime()
                };
                var i = CryptoJS.HmacSHA256("httpspostcdata.58.com/api/v1/pcm/report?" + function s(e) {
                    try {
                        var t = [];
                        for (var n in e) {
                            var a = encodeURIComponent(n)
                              , r = encodeURIComponent(e[n]);
                            t.push(a + "=" + r)
                        }
                        return t.join("&")
                    } catch (i) {
                        return ""
                    }
                }(r), "3B9426B12A547049");
                i = CryptoJS.enc.Base64.stringify(i);
                r.signature = i;
                var o;
                n = CryptoJS.enc.Utf8.parse("BF81BEE8DC405054"),
                a = JSON.stringify(r);
                o = (o = CryptoJS.AES.encrypt(a, n, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                })).ciphertext.toString(),
                c.postData("xxzlfp", o, p, d, "post", l, u)
            })
        },
        postData: function(e, t, n, a, r, i, o) {
            var s = null;
            (s = g.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")).open(r, n, !0),
            "post" === r ? s.setRequestHeader("Content-Type", "text/html") : r = "get",
            s.send(t),
            s.onreadystatechange = function() {
                4 == s.readyState && (200 == s.status ? i && i(s.responseText) : o && o())
            }
        },
        hand_save_all: function(e, t) {
            this.setCookie(e, t),
            g.localStorage[e] = t,
            g.sessionStorage[e] = t
        },
        pollingEvent: function() {
            var r = this;
            r.pollingTimer = setInterval(function() {
                if (g.localStorage) {
                    var e = r.getCookie("xxzl_cid")
                      , t = g.localStorage.xxzl_cid;
                    g.XXZL_CID_WRITE = g.XXZL_CID_WRITE && "-1" != g.XXZL_CID_WRITE ? g.XXZL_CID_WRITE : e;
                    var n = r.getCookie("xzuid")
                      , a = g.localStorage.xzuid;
                    g.XXZL_UUID_WRITE = g.XXZL_UUID_WRITE && "-1" != g.XXZL_UUID_WRITE ? g.XXZL_UUID_WRITE : n,
                    "sogou" == browserTypeReal ? ("-1" != XXZL_CID_WRITE && XXZL_CID_WRITE && (e && "-1" != e && t || r.hand_save_all("xxzl_cid", XXZL_CID_WRITE)),
                    "-1" != XXZL_UUID_WRITE && XXZL_UUID_WRITE && (n && "-1" != n && a || r.hand_save_all("xzuid", XXZL_UUID_WRITE))) : ("-1" != XXZL_CID_WRITE && XXZL_CID_WRITE && (e && "-1" != e && t || _0xd7e6c.set("xxzl_cid", XXZL_CID_WRITE)),
                    "-1" != XXZL_UUID_WRITE && XXZL_UUID_WRITE && (n && "-1" != n && a || _0xd7e6c.set("xzuid", XXZL_UUID_WRITE)))
                }
            }, 1500)
        },
        $ajax: function(e) {
            var n = this;
            if (!e)
                throw new TypeError(e + " is not defined");
            var a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
              , r = "vertify_" + function() {
                for (var e = "", t = 0; t < 18; t++) {
                    var n = Math.ceil(35 * Math.random());
                    e += a[n]
                }
                return e
            }()
              , t = document.getElementById(r);
            t && t.parentNode.removeChild(t),
            g[r] = function(e) {
                "boolean" == typeof e && (e || n.init(n.configCatch));
                var t = document.getElementById(r);
                document.body.removeChild(t)
            }
            ,
            miScript = document.createElement("script"),
            miScript.type = "text/javascript",
            miScript.setAttribute("id", r),
            miScript.src = e.url + "&callback=" + r,
            document.body.appendChild(miScript)
        },
        setCookie: function(t, n) {
            var a, r;
            try {
                var i = /[http:|https:]\/\/([^\/]+)\//i.exec(document.location.href)[1].split(".");
                a = "." + i[i.length - 2] + "." + i[i.length - 1]
            } catch (e) {
                a = ".58.com"
            }
            (r = new Date).setTime(r.getTime() + 31536e7),
            document.cookie = t + "=" + n + ";expires=" + r + ";domain=" + a + ";path=/"
        },
        get: function(o, s) {
            var c = this
              , l = []
              , e = [];
            (l = []).push({
                id58: c.getCookie("id58") + "|" + c.getCookie("58cooper") + "|" + c.getCookie("GanjiUserInfo") + "|" + c.getCookie("xxzl_deviceid") + "|" + c.getCookie("PPU")
            });
            for (var t = 0, n = o.cookieId.length; t < n; t++)
                e.push(o.cookieId[t] + "," + c.getCookie(o.cookieId[t]));
            new UAParser;
            function a(a) {
                l.push({
                    cookie: 0 < e.length ? e.join("|") : "-1"
                }),
                l.push({
                    ua: navigator.userAgent
                }),
                l.push({
                    language: navigator.language
                }),
                l.push({
                    color: screen.colorDepth
                }),
                l.push({
                    screen_r: g.screen.height + "," + g.screen.width
                }),
                l.push({
                    timezone: (new Date).getTimezoneOffset()
                }),
                l.push({
                    session_storage: c.sessionStorageKey()
                }),
                l.push({
                    local_storage: c.localStorageKey()
                }),
                l.push({
                    indexed_db: c.indexedDbKey()
                }),
                l.push({
                    add_behavior: c.addBehaviorKey()
                }),
                l.push({
                    open_database: c.openDatabaseKey()
                }),
                l.push({
                    cpu: c.cpuClassKey()
                }),
                l.push({
                    platform: c.platformKey()
                }),
                l.push({
                    treed: c.doNotTrackKey()
                }),
                l.push({
                    touch: c.touchSupportKey()
                }),
                l.push({
                    adblock: c.adBlockKey()
                }),
                l.push({
                    change_lang: c.hasLiedLanguagesKey()
                }),
                l.push({
                    change_size: c.hasLiedResolutionKey()
                }),
                l.push({
                    change_os: c.hasLiedOsKey()
                }),
                l.push({
                    change_browser: c.hasLiedBrowserKey()
                });
                var r = c.pluginsKey()
                  , i = c.getFontsKey();
                l.push({
                    plugin: r
                }),
                l.push({
                    font: i
                }),
                l.push({
                    canvas: c.canvasKey()
                }),
                l.push({
                    webgl: c.webglKey()
                }),
                l.push({
                    domain: c.getDomain()
                }),
                l.push({
                    device_type: c.getDeviceType()
                }),
                l.push({
                    local_time: (new Date).getTime()
                }),
                l.push({
                    screen_top: g.screenTop ? g.screenTop : "-1"
                }),
                l.push({
                    screen_y: g.screenY ? g.screenY : "-1"
                }),
                l.push({
                    screen_left: g.screenLeft ? g.screenLeft : "-1"
                }),
                l.push({
                    avail_width: g.screen.availWidth ? g.screen.availWidth : "-1"
                }),
                l.push({
                    avail_height: g.screen.availHeight ? g.screen.availHeight : "-1"
                }),
                l.push({
                    avail_top: g.screen.availTop ? g.screen.availTop : "-1"
                }),
                l.push({
                    avail_left: g.screen.availLeft ? g.screen.availLeft : "-1"
                }),
                l.push({
                    inner_height: g.innerHeight ? g.innerHeight : "-1"
                }),
                l.push({
                    inner_width: g.innerWidth ? g.innerWidth : "-1"
                }),
                l.push({
                    device_pixel_ratio: g.devicePixelRatio ? g.devicePixelRatio : "-1"
                }),
                l.push({
                    pixel_depth: g.screen.pixelDepth ? g.screen.pixelDepth : "-1"
                }),
                l.push({
                    build_id: navigator.buildID ? navigator.buildID : "-1"
                }),
                l.push({
                    product_sub: navigator.productSub ? navigator.productSub : "-1"
                }),
                l.push({
                    product: navigator.product ? navigator.product : "-1"
                }),
                l.push({
                    max_touch_points: navigator.maxTouchPoints ? navigator.maxTouchPoints : "-1"
                }),
                l.push({
                    device_memory: navigator.deviceMemory ? navigator.deviceMemory : "-1"
                }),
                l.push({
                    user_language: navigator.userLanguage ? navigator.userLanguage : "-1"
                }),
                l.push({
                    browser_language: navigator.browserLanguage ? navigator.browserLanguage : "-1"
                }),
                l.push({
                    system_language: navigator.systemLanguage ? navigator.systemLanguage : "-1"
                }),
                l.push({
                    window_api_num: Object.getOwnPropertyNames(g) ? Object.getOwnPropertyNames(g).length : "-1"
                }),
                l.push({
                    is_canvas_supported: c.isCanvasSupported()
                }),
                l.push({
                    canvas_arr: c.canvasArr()
                }),
                l.push({
                    infinity: g.Infinity ? g.Infinity : "-1"
                }),
                l.push({
                    downlink: navigator.connection && navigator.connection.downlink ? navigator.connection.downlink : "-1"
                }),
                l.push({
                    effective_type: navigator.connection && navigator.connection.effectiveType ? navigator.connection.effectiveType : "-1"
                }),
                l.push({
                    rtt: navigator.connection && navigator.connection.rtt ? navigator.connection.rtt : "-1"
                }),
                l.push({
                    save_data: navigator.connection && navigator.connection.saveData ? navigator.connection.saveData : "-1"
                }),
                l.push({
                    cookie_enabled: navigator.cookieEnabled ? navigator.cookieEnabled : "-1"
                }),
                l.push({
                    scroll_restoration: history.scrollRestoration ? history.scrollRestoration : "-1"
                }),
                l.push({
                    is_secure_context: g.isSecureContext ? g.isSecureContext : "-1"
                });
                var n = function() {
                    l.push({
                        app_name: navigator.appCodeName
                    }),
                    l.push({
                        app_code_name: navigator.appName
                    }),
                    l.push({
                        app_version: navigator.appVersion
                    }),
                    l.push({
                        vendor: navigator.vendor
                    }),
                    l.push({
                        web_driver: navigator.webdriver ? navigator.webdriver : "-1"
                    }),
                    l.push({
                        hardware_concurrency: navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "-1"
                    }),
                    r && "-1" != r ? l.push({
                        plugin_hash: c.hashcode(r)
                    }) : l.push({
                        plugin_hash: "-1"
                    }),
                    i && "-1" != i ? l.push({
                        font_hash: c.hashcode(i)
                    }) : l.push({
                        font_hash: "-1"
                    }),
                    c.getBrowserKey(l),
                    l.push({
                        languages: navigator.languages ? navigator.languages.join(",") : "-1"
                    }),
                    l.push({
                        navigator_keys: c.navigatorKey()
                    }),
                    l.push({
                        uuid: a
                    });
                    for (var e = {}, t = 0; t < l.length; t++)
                        for (var n in l[t])
                            e[n] = l[t][n];
                    s(e)
                }
                  , t = function(e) {
                    l.push({
                        font_list: e
                    }),
                    c.getInnerIp(function(e) {
                        var t;
                        t = e,
                        l.push({
                            lan_ip: t
                        }),
                        c.getbatteryInfos(l, function() {
                            c.getwebrtcids(l, n)
                        })
                    })
                };
                getAudio = function(e) {
                    l.push({
                        audio: e
                    }),
                    c.getFlashFontsKey(o.url, t)
                }
                ,
                c.getAudioKey(getAudio)
            }
            "sogou" == browserTypeReal ? a("") : _0xd7e6c.get("xzuid", function(e) {
                e ? (c.monitor("xzuid", e),
                a(e)) : a(""),
                c.pollingEvent()
            })
        },
        monitor: function(t, n) {
            var a = this;
            n && (a.monit && clearInterval(a.monit),
            a.monit = setInterval(function() {
                var e = a.getCookie(t);
                e && "" != e && "-1" != e || "sogou" == browserTypeReal || _0xd7e6c.set(t, n)
            }, 200))
        },
        getFlashFontsKey: function(r, i) {
            var e = !0;
            function t() {
                for (var e = navigator.userAgent.split(" "), t = "", n = 0; n < e.length; n++)
                    /chrome/i.test(e[n]) && (t = e[n]);
                return !!t && Number(t.split("/")[1].split(".")[0])
            }
            if (t()) {
                var n = t();
                n && n < 59 && (e = !0)
            }
            if (e || "QQ" == browserTypeReal || "360" == browserTypeReal || "360old" == browserTypeReal || "sogou" == browserTypeReal || "IE" == browserTypeReal)
                i("-1");
            else {
                var o = this;
                try {
                    if (o.flashFlag = !1,
                    !u && swfobject) {
                        var s = function() {
                            var e = document.createElement("div");
                            e.setAttribute("id", "trackerFp"),
                            e.style.display = "block",
                            e.style.zIndex = "-9999",
                            e.style.width = "0",
                            e.style.height = "0",
                            document.body.appendChild(e)
                        }
                          , a = "";
                        !function(t) {
                            var e = "___fp_swf_loaded"
                              , n = r;
                            g[e] = function(e) {
                                0 == o.flashFlag && (o.flashFlag = !0,
                                t(e))
                            }
                            ;
                            s();
                            var a = {
                                onReady: e
                            };
                            if (!swfobject.hasFlashPlayerVersion("9.0.0") && 0 == o.flashFlag)
                                return o.flashFlag = !0,
                                i("-1");
                            swfobject.embedSWF(n, "trackerFp", "1", "1", "9.0.0", !1, a, {
                                allowScriptAccess: "always",
                                menu: "true"
                            }, {}),
                            g.setTimeout(function() {
                                0 == o.flashFlag && (o.flashFlag = !0,
                                g[e] = function() {}
                                ,
                                i("-1"))
                            }, 200)
                        }(function(e) {
                            a = e.join("|"),
                            0 == o.flashFlag && (o.flashFlag = !0,
                            i("" !== a ? decodeURI(a) : "-1"))
                        })
                    } else
                        0 == o.flashFlag && (o.flashFlag = !0,
                        i("-1"))
                } catch (c) {
                    0 == o.flashFlag && (o.flashFlag = !0,
                    i("-1"))
                }
            }
        },
        getCookie: function(e) {
            var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
            return (t = document.cookie.match(n)) ? decodeURI(t[2]) : "-1"
        },
        sessionStorageKey: function() {
            try {
                return g.sessionStorage ? 1 : 0
            } catch (e) {
                return -1
            }
        },
        localStorageKey: function() {
            try {
                return g.localStorage ? 1 : 0
            } catch (e) {
                return -1
            }
        },
        indexedDbKey: function() {
            try {
                return g.indexedDB ? 1 : 0
            } catch (e) {
                return -1
            }
        },
        addBehaviorKey: function() {
            try {
                return document.body && document.body.addBehavior ? 1 : 0
            } catch (e) {
                return -1
            }
        },
        openDatabaseKey: function() {
            try {
                return g.openDatabase ? 1 : 0
            } catch (e) {
                return -1
            }
        },
        cpuClassKey: function() {
            return navigator.cpuClass ? navigator.cpuClass : "-1"
        },
        platformKey: function() {
            return navigator.platform ? navigator.platform : "-1"
        },
        doNotTrackKey: function() {
            return navigator.doNotTrack ? navigator.doNotTrack ? "1" : "0" : "-1"
        },
        touchSupportKey: function() {
            try {
                return "ontouchend"in g ? 1 : 0
            } catch (e) {
                return -1
            }
        },
        adBlockKey: function() {
            var e = document.createElement("div");
            return e.setAttribute("id", "ads"),
            document.body.appendChild(e),
            document.getElementById("ads") ? -1 : 0
        },
        hasLiedLanguagesKey: function() {
            if ("undefined" != typeof navigator.languages)
                try {
                    if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2))
                        return 1
                } catch (e) {
                    return -1
                }
            return 0
        },
        hasLiedResolutionKey: function() {
            return g.screen.width < g.screen.availWidth || g.screen.height < g.screen.availHeight ? 1 : 0
        },
        hasLiedOsKey: function() {
            var e, t = navigator.userAgent.toLowerCase(), n = navigator.oscpu, a = navigator.platform.toLowerCase();
            if (e = 0 <= t.indexOf("windows phone") ? "Windows Phone" : 0 <= t.indexOf("win") ? "Windows" : 0 <= t.indexOf("android") ? "Android" : 0 <= t.indexOf("linux") ? "Linux" : 0 <= t.indexOf("iPhone") || 0 <= t.indexOf("iPad") ? "iOS" : 0 <= t.indexOf("mac") ? "Mac" : "Other",
            ("ontouchstart"in g || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints ? 1 : 0) && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e)
                return 1;
            if (void 0 !== n) {
                if (0 <= (n = n.toLowerCase()).indexOf("win") && "Windows" !== e && "Windows Phone" !== e)
                    return 1;
                if (0 <= n.indexOf("linux") && "Linux" !== e && "Android" !== e)
                    return 1;
                if (0 <= n.indexOf("mac") && "Mac" !== e && "iOS" !== e)
                    return 1;
                if (0 === n.indexOf("win") && 0 === n.indexOf("linux") && 0 <= n.indexOf("mac") && "other" !== e)
                    return 1
            }
            return 0 <= a.indexOf("win") && "Windows" !== e && "Windows Phone" !== e || (0 <= a.indexOf("linux") || 0 <= a.indexOf("android") || 0 <= a.indexOf("pike")) && "Linux" !== e && "Android" !== e || (0 <= a.indexOf("mac") || 0 <= a.indexOf("ipad") || 0 <= a.indexOf("ipod") || 0 <= a.indexOf("iphone")) && "Mac" !== e && "iOS" !== e || 0 === a.indexOf("win") && 0 === a.indexOf("linux") && 0 <= a.indexOf("mac") && "other" !== e || "undefined" == typeof navigator.plugins && "Windows" !== e && "Windows Phone" !== e ? 1 : 0
        },
        hasLiedBrowserKey: function() {
            var e, t = navigator.userAgent.toLowerCase(), n = navigator.productSub;
            if (("Chrome" === (e = 0 <= t.indexOf("firefox") ? "Firefox" : 0 <= t.indexOf("opera") || 0 <= t.indexOf("opr") ? "Opera" : 0 <= t.indexOf("chrome") ? "Chrome" : 0 <= t.indexOf("safari") ? "Safari" : 0 <= t.indexOf("trident") ? "Internet Explorer" : "Other") || "Safari" === e || "Opera" === e) && "20030107" !== n)
                return 1;
            var a, r = eval.toString().length;
            if (37 === r && "Safari" !== e && "Firefox" !== e && "Other" !== e)
                return 1;
            if (39 === r && "Internet Explorer" !== e && "Other" !== e)
                return 1;
            if (33 === r && "Chrome" !== e && "Opera" !== e && "Other" !== e)
                return 1;
            try {
                throw "a"
            } catch (i) {
                try {
                    i.toSource(),
                    a = !0
                } catch (o) {
                    a = !1
                }
            }
            return a && "Firefox" !== e && "Other" !== e ? 1 : 0
        },
        pluginsKey: function() {
            var e;
            this.isIE() ? e = "" !== (e = this.getIEPluginsString()) ? e : "-1" : e = "" !== (e = this.getRegularPluginsString()) ? e : "-1";
            return "-1" == e ? "-1" : e
        },
        getFontsKey: function() {
            var r = ["monospace", "sans-serif", "serif"]
              , i = document.getElementsByTagName("body")[0]
              , o = document.createElement("span");
            o.style.fontSize = "72px",
            o.innerHTML = "mmmmmmmmmmlli";
            var s = {}
              , c = {};
            for (var e in r)
                o.style.fontFamily = r[e],
                i.appendChild(o),
                s[r[e]] = o.offsetWidth,
                c[r[e]] = o.offsetHeight,
                i.removeChild(o);
            for (var t = function(e) {
                var t = !1;
                for (var n in r) {
                    o.style.fontFamily = e + "," + r[n],
                    i.appendChild(o);
                    var a = o.offsetWidth !== s[r[n]] || o.offsetHeight !== c[r[n]];
                    i.removeChild(o),
                    t = t || a
                }
                return t
            }, n = ["PMingLiU", "Microsoft JhengHei", "Microsoft YaHei", "LiSu", "YouYuan", "STXihei", "STKaiti", "STSong", "STZhongsong", "STFangsong", "FZShuTi", "FZYaoti", "STCaiyun", "STHupo", "STLiti", "STXingkai", "STXinwei", "STHeiti", "LiHei Pro Medium", "LiSong Pro Light", "BiauKai", "Apple LiGothic Medium", "Apple LiSung Light", "Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3", "Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter"], a = [], l = 0, u = n.length; l < u; l++)
                t(n[l]) ? a.push("1") : a.push("0");
            var p = a.join("");
            return p.indexOf("1") < 0 ? -1 : p
        },
        canvasKey: function() {
            return this.isCanvasSupported() ? this.tryManyTimes(this.getCanvasFp.bind(this)) : -1
        },
        canvasArr: function() {
            return this.isCanvasSupported() ? this.getCanvasFpArr() : -1
        },
        tryManyTimes: function(e) {
            var t = -1
              , n = e()
              , a = e();
            if (n == a && -1 != a)
                t = a;
            else if (n == a && -1 == a)
                t = e();
            else {
                var r = e();
                t = n == r ? r : a
            }
            return null != t && t != l && "" != t || (t = -1),
            t
        },
        webglKey: function() {
            if (this.isWebGlSupported()) {
                var e = this.getWebglFp()
                  , t = this.getWebglFp();
                if (e == t && -1 != t)
                    return t;
                if (e == t && -1 == t)
                    return this.getWebglFp();
                var n = this.getWebglFp();
                return e == n ? n : t
            }
            return "-1|-1|-1"
        },
        getDomain: function() {
            return document.referrer && document.referrer.split("/")[2] ? document.referrer.split("/")[2] : -1
        },
        getDeviceType: function() {
            return u ? "m" : "pc"
        },
        navigatorKey: function() {
            var e = new Array;
            for (var t in navigator)
                e.push(t);
            return e.join("|")
        },
        getBrowserKey: function(e) {
            var t = new UAParser;
            e.push({
                browser_name: t.getBrowser().name ? t.getBrowser().name : "-1"
            }),
            e.push({
                browser_version: t.getBrowser().version ? t.getBrowser().version : "-1"
            }),
            e.push({
                device_info: (t.getDevice().model ? t.getDevice().model : "-1") + "|" + (t.getDevice().type ? t.getDevice().type : "-1") + "|" + (t.getDevice().vendor ? t.getDevice().vendor : "-1")
            }),
            e.push({
                engine_name: t.getEngine().name ? t.getEngine().name : "-1"
            }),
            e.push({
                os_name: t.getOS().name ? t.getOS().name : "-1"
            }),
            e.push({
                os_version: t.getOS().version ? t.getOS().version : "-1"
            })
        },
        getAudioKey: function(r) {
            var i = !1;
            if (u)
                i || (i = !0,
                r("-1|-1"));
            else {
                navigator.userAgent.toLowerCase();
                var o = {};
                if ((g.AudioContext || g.webkitAudioContext) === l)
                    o.pxi_hash = -1,
                    o.pxi_output = -1,
                    i = !0,
                    r(o.pxi_hash + "|" + o.pxi_output);
                else
                    try {
                        var e, t, s, c;
                        (e = new (g.OfflineAudioContext || g.webkitOfflineAudioContext)(1,44100,44100)) || (o.pxi_output = 0),
                        (t = e.createOscillator()).type = "triangle",
                        t.frequency.value = 1e4,
                        (s = e.createDynamicsCompressor()).threshold && (s.threshold.value = -50),
                        s.knee && (s.knee.value = 40),
                        s.ratio && (s.ratio.value = 12),
                        s.reduction && (s.reduction.value = -20),
                        s.attack && (s.attack.value = 0),
                        s.release && (s.release.value = .25),
                        t.connect(s),
                        s.connect(e.destination),
                        t.start(0),
                        e.startRendering(),
                        e.oncomplete = function(e) {
                            o.pxi_output = 0;
                            for (var t = CryptoJS.SHA1, n = "", a = 0; a < e.renderedBuffer.length; a++)
                                n += e.renderedBuffer.getChannelData(0)[a].toString();
                            c = t(n),
                            o.pxi_hash = c.toString(CryptoJS.enc.Hex);
                            for (a = 4500; a < 5e3; a++)
                                o.pxi_output += Math.abs(e.renderedBuffer.getChannelData(0)[a]);
                            s.disconnect(),
                            i || (i = !0,
                            r(o.pxi_hash + "|" + o.pxi_output))
                        }
                    } catch (n) {
                        o.pxi_hash = -1,
                        o.pxi_output = -1,
                        i || (i = !0,
                        r(o.pxi_hash + "|" + o.pxi_output))
                    }
            }
            setTimeout(function() {
                i || (i = !0,
                r("-1|-1"))
            }, 100)
        },
        getCanvasFp: function() {
            try {
                var t = document.createElement("canvas");
                t.width = 2e3,
                t.height = 200,
                t.style.display = "inline";
                var n = t.getContext("2d");
                n.rect(0, 0, 10, 10),
                n.rect(2, 2, 6, 6),
                n.textBaseline = "alphabetic",
                n.fillStyle = "#f60",
                n.fillRect(125, 1, 62, 20),
                n.fillStyle = "#069",
                n.font = "11pt Arial",
                n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15),
                n.fillStyle = "rgba(102, 204, 0, 0.7)",
                n.font = "18pt Arial",
                n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45),
                n.globalCompositeOperation = "multiply",
                n.fillStyle = "rgb(255,0,255)",
                n.beginPath(),
                n.arc(50, 50, 50, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(0,255,255)",
                n.beginPath(),
                n.arc(100, 50, 50, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(255,255,0)",
                n.beginPath(),
                n.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(255,0,255)",
                n.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                n.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                n.fill("evenodd");
                var a = t.toDataURL().replace("data:image/png;base64,", "")
                  , r = this.atob(a);
                return this.bin2hex(r.slice(-16, -12))
            } catch (e) {
                return "-1"
            }
        },
        getCanvasFpArr: function() {
            try {
                var t = document.createElement("canvas");
                t.width = 2e3,
                t.height = 200,
                t.style.display = "inline";
                var n = t.getContext("2d");
                n.rect(0, 0, 10, 10),
                n.rect(2, 2, 6, 6),
                n.textBaseline = "alphabetic",
                n.fillStyle = "#f60",
                n.fillRect(125, 1, 62, 20),
                n.fillStyle = "#069",
                n.font = "11pt Arial",
                n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15),
                n.fillStyle = "rgba(102, 204, 0, 0.7)",
                n.font = "18pt Arial",
                n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45),
                n.globalCompositeOperation = "multiply",
                n.fillStyle = "rgb(255,0,255)",
                n.beginPath(),
                n.arc(50, 49, 49, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(0,255,255)",
                n.beginPath(),
                n.arc(100, 49, 49, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(255,255,0)",
                n.beginPath(),
                n.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(255,0,255)",
                n.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                n.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                n.fill("evenodd");
                var a = t.toDataURL().replace("data:image/png;base64,", "")
                  , r = this.atob(a)
                  , i = this.bin2hex(r.slice(-16, -12));
                n.rect(0, 0, 10, 10),
                n.rect(2, 2, 6, 6),
                n.textBaseline = "alphabetic",
                n.fillStyle = "#f60",
                n.fillRect(125, 1, 62, 20),
                n.fillStyle = "#069",
                n.font = "11pt Arial",
                n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15),
                n.fillStyle = "rgba(102, 204, 0, 0.7)",
                n.font = "18pt Arial",
                n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45),
                n.globalCompositeOperation = "multiply",
                n.fillStyle = "rgb(255,0,255)",
                n.beginPath(),
                n.arc(50, 51, 51, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(0,255,255)",
                n.beginPath(),
                n.arc(100, 51, 51, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(255,255,0)",
                n.beginPath(),
                n.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(255,0,255)",
                n.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                n.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                n.fill("evenodd");
                var o = t.toDataURL().replace("data:image/png;base64,", "")
                  , s = this.atob(o)
                  , c = this.bin2hex(s.slice(-16, -12));
                n.rect(0, 0, 10, 10),
                n.rect(2, 2, 6, 6),
                n.textBaseline = "alphabetic",
                n.fillStyle = "#f60",
                n.fillRect(125, 1, 62, 20),
                n.fillStyle = "#069",
                n.font = "11pt Arial",
                n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15),
                n.fillStyle = "rgba(102, 204, 0, 0.7)",
                n.font = "18pt Arial",
                n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45),
                n.globalCompositeOperation = "multiply",
                n.fillStyle = "rgb(255,0,255)",
                n.beginPath(),
                n.arc(50, 52, 52, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(0,255,255)",
                n.beginPath(),
                n.arc(100, 52, 52, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(255,255,0)",
                n.beginPath(),
                n.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                n.fillStyle = "rgb(255,0,255)",
                n.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                n.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                n.fill("evenodd");
                var l = t.toDataURL().replace("data:image/png;base64,", "")
                  , u = this.atob(l);
                return [i, c, this.bin2hex(u.slice(-16, -12))].join(",")
            } catch (e) {
                return "-1"
            }
        },
        isCanvasSupported: function() {
            var e = document.createElement("canvas");
            return !(!e.getContext || !e.getContext("2d"))
        },
        getWebglFp: function() {
            var e;
            if (!(e = this.getWebglCanvas()))
                return "-1|-1|-1";
            var t = []
              , n = e.createBuffer();
            e.bindBuffer(e.ARRAY_BUFFER, n);
            var a = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
            e.bufferData(e.ARRAY_BUFFER, a, e.STATIC_DRAW),
            n.itemSize = 3,
            n.numItems = 3;
            var r = e.createProgram()
              , i = e.createShader(e.VERTEX_SHADER);
            e.shaderSource(i, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"),
            e.compileShader(i);
            var o = e.createShader(e.FRAGMENT_SHADER);
            if (e.shaderSource(o, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"),
            e.compileShader(o),
            e.attachShader(r, i),
            e.attachShader(r, o),
            e.linkProgram(r),
            e.useProgram(r),
            r.vertexPosAttrib = e.getAttribLocation(r, "attrVertex"),
            r.offsetUniform = e.getUniformLocation(r, "uniformOffset"),
            e.enableVertexAttribArray(r.vertexPosArray),
            e.vertexAttribPointer(r.vertexPosAttrib, n.itemSize, e.FLOAT, !1, 0, 0),
            e.uniform2f(r.offsetUniform, 1, 1),
            e.drawArrays(e.TRIANGLE_STRIP, 0, n.numItems),
            null != e.canvas) {
                var s = e.canvas.toDataURL().replace("data:image/png;base64,", "")
                  , c = this.atob(s)
                  , l = this.bin2hex(c.slice(-16, -12));
                t.push(l)
            }
            var u = "-1"
              , p = "-1";
            return 0 <= e.getSupportedExtensions().indexOf("WEBGL_debug_renderer_info") && (u = e.getParameter(e.getExtension("WEBGL_debug_renderer_info").UNMASKED_VENDOR_WEBGL),
            p = e.getParameter(e.getExtension("WEBGL_debug_renderer_info").UNMASKED_RENDERER_WEBGL)),
            t.push(p),
            t.push(u),
            t.join("|")
        },
        isWebGlSupported: function() {
            if (!this.isCanvasSupported())
                return !1;
            var t, n = document.createElement("canvas");
            n.width = "1px",
            n.height = "1px",
            document.body.appendChild(n);
            try {
                t = n.getContext && (n.getContext("webgl") || n.getContext("experimental-webgl"))
            } catch (e) {
                t = !1
            }
            return !!g.WebGLRenderingContext && !!t
        },
        getWebglCanvas: function() {
            var t = document.createElement("canvas")
              , n = null;
            try {
                n = t.getContext("webgl") || t.getContext("experimental-webgl")
            } catch (e) {}
            return n = n || null
        },
        isIE: function() {
            return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent))
        },
        getIEPluginsString: function() {
            if (g.ActiveXObject) {
                return this.map(["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control", "RealVideo.RealVideo(tm) ActiveX Control", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"], function(t) {
                    try {
                        return new ActiveXObject(t),
                        t
                    } catch (e) {
                        return null
                    }
                }).join("|")
            }
            return "-1"
        },
        getRegularPluginsString: function() {
            for (var e = [], t = 0, n = navigator.plugins.length; t < n; t++)
                e.push(navigator.plugins[t]);
            return e = e.sort(function(e, t) {
                return e.name > t.name ? 1 : e.name < t.name ? -1 : 0
            }),
            this.map(e, function(e) {
                var t = this.map(e, function(e) {
                    return [e.type, e.suffixes].join("~")
                }).join(",");
                return [e.name, e.description, t].join(":")
            }, this).join("|")
        },
        atob: function(e) {
            function t(e) {
                this.message = e
            }
            (t.prototype = new Error).name = "InvalidCharacterError";
            var n = String(e).replace(/=+$/, "");
            if (n.length % 4 == 1)
                throw new t("atob failed: The string to be decoded is not correctly encoded.");
            for (var a, r, i = 0, o = 0, s = ""; r = n.charAt(o++); ~r && (a = i % 4 ? 64 * a + r : r,
            i++ % 4) && (s += String.fromCharCode(255 & a >> (-2 * i & 6))))
                r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r);
            return s
        },
        byte2Hex: function(e) {
            return e < 16 ? "0" + e.toString(16) : e.toString(16)
        },
        each: function(e, t, n) {
            if (null !== e)
                if (this.nativeForEach && e.forEach === this.nativeForEach)
                    e.forEach(t, n);
                else if (e.length === +e.length) {
                    for (var a = 0, r = e.length; a < r; a++)
                        if (t.call(n, e[a], a, e) === {})
                            return
                } else
                    for (var i in e)
                        if (e.hasOwnProperty(i) && t.call(n, e[i], i, e) === {})
                            return
        },
        map: function(e, a, r) {
            var i = [];
            return null == e ? i : this.nativeMap && e.map === this.nativeMap ? e.map(a, r) : (this.each(e, function(e, t, n) {
                i[i.length] = a.call(r, e, t, n)
            }),
            i)
        },
        bin2hex: function(e) {
            for (var t = "", n = 0; n < e.length; n++) {
                var a = e.charCodeAt(n);
                t += this.byte2Hex(a >> 8 & 255),
                t += this.byte2Hex(255 & a)
            }
            return t
        },
        getwebrtcids: function(t, n) {
            var a = !1;
            try {
                t.push({
                    webrt_cid_list: "-1"
                }),
                n()
            } catch (e) {
                a || (a = !0,
                t.push({
                    webrt_cid_list: "-1"
                }),
                n())
            }
        },
        getbatteryInfos: function(t, n) {
            try {
                "sogou" != browserTypeReal && "360old" != browserTypeReal && navigator.getBattery ? navigator.getBattery().then(function(e) {
                    new Array;
                    t.push({
                        battery_info: e.charging + "|" + e.chargingTime + "|" + e.dischargingTime
                    }),
                    n()
                }) : (t.push({
                    battery_info: "-1"
                }),
                n())
            } catch (e) {
                t.push({
                    battery_info: "-1"
                }),
                n()
            }
        },
        getInnerIp: function(a) {
            var r = !1;
            try {
                var i = {}
                  , t = g.RTCPeerConnection || g.mozRTCPeerConnection || g.webkitRTCPeerConnection;
                if (!t) {
                    var n = document.createElement("iframe");
                    n.sandbox = "allow-same-origin",
                    n.style.display = "none",
                    document.body.appendChild(n);
                    try {
                        var o = n.contentWindow;
                        g.RTCPeerConnection = o.RTCPeerConnection,
                        g.mozRTCPeerConnection = o.mozRTCPeerConnection,
                        g.webkitRTCPeerConnection = o.webkitRTCPeerConnection,
                        t = g.RTCPeerConnection || g.mozRTCPeerConnection || g.webkitRTCPeerConnection
                    } catch (e) {
                        if (!r)
                            return r = !0,
                            void a("-1")
                    }
                }
                try {
                    var s = l;
                    g.webkitRTCPeerConnection && (s = {
                        iceServers: [{
                            urls: "stun:stun.services.mozilla.com"
                        }]
                    });
                    var c = new t(s,{
                        optional: [{
                            RtpDataChannels: !0
                        }]
                    });
                    c.onicecandidate = function(t) {
                        if (t.candidate) {
                            try {
                                var n = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(t.candidate.candidate)[1];
                                i[n] === l && (r || (r = !0,
                                a(n))),
                                i[n] = !0
                            } catch (e) {
                                r || (r = !0,
                                a("-1"))
                            }
                        }
                    }
                    ,
                    c.createDataChannel(""),
                    c.createOffer(function(e) {
                        c.setLocalDescription(e, function() {}, function() {})
                    }, function() {})
                } catch (e) {
                    r || (r = !0,
                    a("-1"))
                }
            } catch (e) {
                r || (r = !0,
                a("-1"))
            }
            setTimeout(function() {
                r || (r = !0,
                a("-1"))
            }, 300)
        },
        hashcode: function(e) {
            for (var t = 0, n = 0, a = (e += "").length, r = 0; r < a; r++)
                (2147483647 < (t = 31 * t + e.charCodeAt(n++)) || t < 2147483648) && (t &= 4294967295);
            return t
        }
    },
    g._dfp = new t
}(window);
