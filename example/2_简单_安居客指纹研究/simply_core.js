// 要从 u.js 引入 UAParser 
var ua_parser = new UAParser;

// teemo_core.js
var c = {};

c = {
    getCookie: function(e) {
        var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
        return (t = document.cookie.match(n)) ? decodeURI(t[2]) : "-1"
    },
    sessionStorageKey: function() {
        try {
            return window.sessionStorage ? 1 : 0
        } catch (e) {
            return -1
        }
    },
    localStorageKey: function() {
        try {
            return window.localStorage ? 1 : 0
        } catch (e) {
            return -1
        }
    },
    indexedDbKey: function() {
        try {
            return window.indexedDB ? 1 : 0
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
            return window.openDatabase ? 1 : 0
        } catch (e) {
            return -1
        }
    },
    cpuClassKey: function() {
        // navigator.cpuClass详细 http://help.dottoro.com/ljjsison.php
        return navigator.cpuClass ? navigator.cpuClass : "-1"
    },
    platformKey: function() {
        return navigator.platform ? navigator.platform : "-1"
    },
    doNotTrackKey: function() {
        // navigator.doNotTrack详细 https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/doNotTrack
        return navigator.doNotTrack ? navigator.doNotTrack ? "1" : "0" : "-1"
    },
    touchSupportKey: function() {  
        // ontouchend 事件是移动端，进行触屏操作后手指抬起的一瞬间产生的事件
        try {
            return "ontouchend"in window ? 1 : 0
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
        return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight ? 1 : 0
    },
    hasLiedOsKey: function() {
        var e, t = navigator.userAgent.toLowerCase(), n = navigator.oscpu, a = navigator.platform.toLowerCase();
        if (e = 0 <= t.indexOf("windows phone") ? "Windows Phone" : 0 <= t.indexOf("win") ? "Windows" : 0 <= t.indexOf("android") ? "Android" : 0 <= t.indexOf("linux") ? "Linux" : 0 <= t.indexOf("iPhone") || 0 <= t.indexOf("iPad") ? "iOS" : 0 <= t.indexOf("mac") ? "Mac" : "Other",
        ("ontouchstart"in window || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints ? 1 : 0) && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e)
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
        // Navigator.productSub 只读属性返回当前浏览器的编译版本号。 
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/productSub
        var e, t = navigator.userAgent.toLowerCase(), n = navigator.productSub;
        
        function ua_to_brower(){  // 将UA中的浏览器名字对应出来
            var ua_map = {"firefox":"Firefox", "opera":"Opera", "chrome":"Chrome", "safari":"Safari", "trident":"Internet Explorer"}
            for(var _word in ua_map){
                if(0 <= t.indexOf(_word)){
                    return ua_map[_word]
                }
            }
            return "Other"
        }
        // 将UA中的浏览器名字对应出来
        e = ua_to_brower();
        // 在 Safari, Chrome 这个属性总是返回20030107，如果不是，必定为人机
        // https://stackoverflow.com/questions/53004350/when-will-navigator-language-different-to-navigator-languages0
        if (("Chrome" === e || "Safari" === e || "Opera" === e) && "20030107" !== n)
            return 1;
        
        // eval.toString().length 对比长度，不同浏览器的长度不一样
        // 如果伪造了UA，用了不同的浏览器，那么会被识别出来
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
    // -----------------------------
    pluginsKey: function() {
        var e;
        this.isIE() ? e = "" !== (e = this.getIEPluginsString()) ? e : "-1" : e = "" !== (e = this.getRegularPluginsString()) ? e : "-1";
        return "-1" == e ? "-1" : e
    },
    isIE: function() {
        // 有三种 IE<=10, IE11, Edge 
        // "Microsoft Internet Explorer" === navigator.appName 是用来识别是否 IE<11 版本的语句
        //   在 IE11 和 Edge 中, 或者说绝大多数现在流行的浏览器中
        //     navigator.appName === "Netscape" 
        //   在那些更久远版本的IE中
        //     navigator.appName === "Microsoft Internet Explorer"
        //  /Trident/.test(navigator.userAgent) 根据 旧版IE浏览器内核字段 来判断是否是IE
        //    Trident 是旧版IE浏览器的内核名称
        // 补充：如果你想区分 IE11 和 Edge，你可以通过 navigator.appVersion 是否包含 Trident 来判断，Edge 不包含这个东西
        //   if(navigator.appVersion.indexOf('Trident') === -1)
        // 参考：https://stackoverflow.com/questions/31757852/how-can-i-detect-internet-explorer-ie-and-microsoft-edge-using-javascript
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
    getRegularPluginsString: function() {  // 用来获取浏览器插件名称
        // 名称间用|分割
        // NavigatorPlugins.plugins 返回一个 PluginArray 类型的对象, 包含了当前所使用的浏览器安装的所有插件  
        // https://developer.mozilla.org/zh-CN/docs/Web/API/NavigatorPlugins/plugins
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
    nativeMap : Array.prototype.map,
    map: function(e, a, r) {
        var i = [];
        return null == e ? i : this.nativeMap && e.map === this.nativeMap ? e.map(a, r) : (this.each(e, function(e, t, n) {
            i[i.length] = a.call(r, e, t, n)
        }),
        i)
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
    // -------------------------
    getFontsKey: function() {
        // 将三种指定的字体与一堆其它字体进行渲染优先级比较，得到一个结果
        //   如果某个其它字体比3个指定字体的优先级高，那么在那个位置标1，否则返回-1
        // 列出三种 字体，指定字符，字体大小，记录渲染在页面上得到的宽与高,后续用来判断是否是原字体
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
            // 关于 HTMLElement.offsetWidth
            // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth
            s[r[e]] = o.offsetWidth,
            c[r[e]] = o.offsetHeight,
            i.removeChild(o);
        for (var t = function(e) {  
            // 传入一个字体，与上面声明的3个字体做优先级比较
            //   如果默认字体优先级高，那么返回T
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
    //----------------------------
    canvasKey: function() {
        // Function.prototype.bind()
        //   bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
        //   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
        return this.isCanvasSupported() ? this.tryManyTimes(this.getCanvasFp.bind(this)) : -1
    },
    isCanvasSupported: function() {  // 是否支持canvas
        var e = document.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"))
    },
    tryManyTimes: function(e) {  // 将函数运行多次，取结果不为-1的结果
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
    getCanvasFp: function() {
        // 用 canvas画 一张图。画完以后拿到图片 Base64 ，解 Base64 后切出一小段，转 16进 返回
        try {  // 画图
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
            // 画好的图片转 URI后去除标识
            //   HTMLCanvasElement.toDataURL()
            //     返回一个包含图片展示的 data URI 。可以使用 type 参数其类型，默认为 PNG 格式。图片的分辨率为 96dpi
            //     https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL
            var a = t.toDataURL().replace("data:image/png;base64,", "")
              , r = this.atob(a);  // 进行 base64解码
            return this.bin2hex(r.slice(-16, -12))  // 切割部分内容，转16进
        } catch (e) {
            return "-1"
        }
    },
    atob: function(e) {  // Base64 解码
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
    bin2hex: function(e) {  // 每个字符转16进
        for (var t = "", n = 0; n < e.length; n++) {
            var a = e.charCodeAt(n);
            t += this.byte2Hex(a >> 8 & 255),
            t += this.byte2Hex(255 & a)
        }
        return t
    },
    byte2Hex: function(e) {  // 补位
        return e < 16 ? "0" + e.toString(16) : e.toString(16)
    },
    //-----------------------
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
    isWebGlSupported: function() {  // 检查是否支持webgl
        if (!this.isCanvasSupported())
            return !1;
        var t, n = document.createElement("canvas");
        n.width = "1px",
        n.height = "1px",
        document.body.appendChild(n);
        try {
            // 早期 WebGL 的 context，还不能通过正式的名称 webgl 来获取，必须使用 experimental-webgl 来获取 context 对象。
            // 但是，随着技术的发展更新，后来就可以通过正式的名称来获取context
            // 所以，在获取context对象的时候，一些比较旧的代码使用或运算（||）来按照名称的顺序来执行
            t = n.getContext && (n.getContext("webgl") || n.getContext("experimental-webgl"))
        } catch (e) {
            t = !1
        }
        return !!window.WebGLRenderingContext && !!t
    },
    getWebglFp: function() {
        // 获取context
        var e;
        if (!(e = this.getWebglCanvas()))
            return "-1|-1|-1";
        var t = []
          , n = e.createBuffer();
        // 画图
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
                // canvas内容 转 URI 去除声明，Base64 解码，转16进
                var s = e.canvas.toDataURL().replace("data:image/png;base64,", "")
                  , c = this.atob(s)
                  , l = this.bin2hex(c.slice(-16, -12));
                t.push(l)
        }
        var u = "-1"
          , p = "-1";
        // WEBGL_debug_renderer_info 实际上是通过 WEBGL来获取硬件的信息，结果中会包含两个信息
        //   https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_renderer_info
        //   ext.UNMASKED_VENDOR_WEBGL
        //     显卡驱动公司标识
        //   ext.UNMASKED_RENDERER_WEBGL
        //     显卡的具体信息
        return 0 <= e.getSupportedExtensions().indexOf("WEBGL_debug_renderer_info") && (u = e.getParameter(e.getExtension("WEBGL_debug_renderer_info").UNMASKED_VENDOR_WEBGL),
        p = e.getParameter(e.getExtension("WEBGL_debug_renderer_info").UNMASKED_RENDERER_WEBGL)),
        t.push(p),
        t.push(u),
        t.join("|")
    },
    getWebglCanvas: function() {  // 获取 webgl 的 context
        var t = document.createElement("canvas")
          , n = null;
        try {
            n = t.getContext("webgl") || t.getContext("experimental-webgl")
        } catch (e) {}
        return n = n || null
    },
    //---------------------------
    getDomain: function() {
        // 如果用户直接打开了这个页面（不是通过页面跳转，而是通过地址栏或者书签等打开的），则该属性为空字符串。
        // 由于该属性只是返回一个字符串，所以不能够通过该属性引用页面的 DOM。
        return document.referrer && document.referrer.split("/")[2] ? document.referrer.split("/")[2] : -1
    },
    getDeviceType: function() {  // 根据 document.userAgent 判断是否是移动端
        var u = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
        return u ? "m" : "pc"
    },
    canvasArr: function() {
        return this.isCanvasSupported() ? this.getCanvasFpArr() : -1
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
    hashcode: function(e) {
        for (var t = 0, n = 0, a = (e += "").length, r = 0; r < a; r++)
            (2147483647 < (t = 31 * t + e.charCodeAt(n++)) || t < 2147483648) && (t &= 4294967295);
        return t
    },
    navigatorKey: function() {
        var e = new Array;
        for (var t in navigator)
            e.push(t);
        return e.join("|")
    },

}






var l = []
// Cookies
l.push({
    // 检查Cookies
    id58: c.getCookie("id58") + "|" + c.getCookie("58cooper") + "|" + c.getCookie("GanjiUserInfo") + "|" + c.getCookie("xxzl_deviceid") + "|" + c.getCookie("PPU")
});

l.push({  // 此处原本是检查剩余的 cookie 的，此处不可能存在这东西，直接改个默认值
    cookie: "-1"
}),
l.push({ // 记录 User-Agent 获取
    ua: navigator.userAgent
}),
l.push({  // 记录用户首选语言 获取
    // navigator.language返回一个字符串,该字符串代表用户的首选语言，通常是浏览器使用的语言
    language: navigator.language
}),
l.push({  // 记录用户屏幕设备颜色深度n，可以简单理解为 可以显示 2^n 种颜色
    color: screen.colorDepth
}),
l.push({  // 记录用户屏幕的 高度 与 宽度
    screen_r: window.screen.height + "," + window.screen.width
}),
l.push({  // 记录时区信息
    // getTimezoneOffset() 方法可返回格林威治时间和本地时间之间的时差，以分钟为单位。
    // 例如，如果时区为 GMT+2, 将返回-120 。
    timezone: (new Date).getTimezoneOffset()
}),
l.push({  // 记录 是否使用 session_storage 
    // sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。
    session_storage: c.sessionStorageKey()
}),
l.push({  // 记录是否使用 localStorage
    // localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
    local_storage: c.localStorageKey()
}),
l.push({  // 记录是否使用 indexedDB
    // IndexedDB 很适合存储大量数据，它的 API 是异步调用的。
    // IndexedDB 使用索引存储数据，各种数据库操作放在事务中执行。
    // IndexedDB 甚至还支持简单的数据类型。IndexedDB 比 localstorage 强大得多，但它的 API 也相对复杂。
    // 对于简单的数据，你应该继续使用 localstorage，但当你希望存储大量数据时，IndexedDB 会明显的更适合，IndexedDB 能提供你更为复杂的查询数据的方式。
    indexed_db: c.indexedDbKey()
}),
l.push({  // 检查 body 和 body 中指定的函数是否存在
    add_behavior: c.addBehaviorKey()
}),
l.push({  // 检查浏览器是否支持数据库
    open_database: c.openDatabaseKey()
}),
l.push({  // 获取系统位数，这个参数这种的内容，仅在旧版IE中能够生效
    cpu: c.cpuClassKey()
}),
l.push({  // 获取系统与位数
    platform: c.platformKey()
}),
l.push({  // 用户是否允许网站跟踪 
    treed: c.doNotTrackKey()
}),
l.push({  // 检查是否支持触屏
    touch: c.touchSupportKey()
}),
l.push({  // 检查是否开启了反广告的内容
    adblock: c.adBlockKey()
}),
l.push({  // 检测 浏览器语言首选项 与 浏览器语言 对应问题，如果不是Chrome可能会被识别出来是机器人
    // 另外 无头浏览器 可能不含 navigator.languages
    // https://stackoverflow.com/questions/53004350/when-will-navigator-language-different-to-navigator-languages0
    change_lang: c.hasLiedLanguagesKey()
}),
l.push({  // 检测 使用 屏幕宽高 与 页面宽高 做比较，如果内容比屏幕还大，那么显然不是人
    change_size: c.hasLiedResolutionKey()
}),
l.push({  // 检查 UA指明的平台与触控是否匹配。 对于非移动端的访问，window不会提供触摸的方法，如果提供，那么就是机器人
    change_os: c.hasLiedOsKey()
}),
l.push({  // 检测 系统与UA 是否对应。比如说 OS查出来是安卓，UA给win就一定不是人 
    change_browser: c.hasLiedBrowserKey()
});







// ----------------------------------------
var r = c.pluginsKey()
  , i = c.getFontsKey();
l.push({
    // 返回使用的插件
    // 无头模式浏览器一般不会装插件，如果这里返回空，那么有大概率是人机
    plugin: c.pluginsKey()
}),
l.push({
    // 将三种指定的字体与一堆其它字体进行渲染优先级比较，得到一个结果
    font: c.getFontsKey()
}),
l.push({
    // 用 canvas画 一张图。画完以后拿到图片 Base64 ，解 Base64 后切出一小段，转 16进 返回
    canvas: c.canvasKey()
}),
l.push({
    // 用 webgl 画 一张图。画完以后拿到图片 Base64, 解 Base64 后切出一小段，转16进
    // 顺便返回 显卡供应商的标识 与 浏览器渲染器供应商的标识  
    //   这个标识可以用来识别无头浏览器，在无头模式下，会获得 Mesa OffScreen（这是一种无需使用任何窗口系统即可进行渲染的技术）和 Brian Paul（这是启动开源Mesa图形库的程序）
    webgl: c.webglKey()
}),
l.push({  // 返回 document.referrer 中的域名
    // 并不清楚其后续操作是什么
    // 与 header中的 referrer 或者 host 比较？
    domain: c.getDomain()
}),
l.push({  // 根据 document.userAgent 返回是否是移动端
    device_type: c.getDeviceType()
}),
l.push({  // 得到本地时间)(时间戳)
    local_time: (new Date).getTime()
}),
l.push({  // window.screenTop属性返回窗口相对于屏幕的X和Y坐标, 如果铺满全屏，返回-1
    // 注意：screenTop 是旧版 window.screenY 属性的别名。 screenTop 最初仅在IE中受支持，但由于普及而在各处引入
    // https://developer.mozilla.org/zh-CN/docs/web/api/window/screentop
    screen_top: window.screenTop ? window.screenTop : "-1"
}),
l.push({  // 返回浏览器顶部距离系统桌面顶部的垂直距离, 如果铺满全屏，返回-1
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screenY
    screen_y: window.screenY ? window.screenY : "-1"
}),
l.push({  // 返回浏览器左边框到左边屏幕边缘的 CSS 像素数, 如果铺满全屏，返回-1
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screenLeft
    screen_left: window.screenLeft ? window.screenLeft : "-1"
}),
l.push({  // 返回浏览器窗口可占用的水平宽度
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/availWidth
    avail_width: window.screen.availWidth ? window.screen.availWidth : "-1"
}),
l.push({  // 返回浏览器窗口在屏幕上可占用的垂直空间，即最大高度。
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/availHeight
    avail_height: window.screen.availHeight ? window.screen.availHeight : "-1"
}),
l.push({  // 浏览器窗口 在屏幕上的可占用空间上边距离屏幕上边界的像素值
    // 整句读完也不懂是什么意思......
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/availTop
    avail_top: window.screen.availTop ? window.screen.availTop : "-1"
}),
l.push({  // 返回浏览器可用空间左边距离屏幕（系统桌面）左边界的距离。
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/availLeft
    avail_left: window.screen.availLeft ? window.screen.availLeft : "-1"
}),
l.push({  // 浏览器窗口的视口（viewport）高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度。
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight
    inner_height: window.innerHeight ? window.innerHeight : "-1"
}),
l.push({  // 浏览器窗口的视口（viewport）高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度。
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight
    inner_width: window.innerWidth ? window.innerWidth : "-1"
}),
l.push({  // 返回 当前显示设备的物理像素分辨率 与 CSS像素分辨率之比
    // 此值也可以解释为像素大小的比率：一个CSS像素的大小与一个物理像素的大小
    // 简单来说，它告诉浏览器应使用多少屏幕实际像素来绘制单个CSS像素
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio
    device_pixel_ratio: window.devicePixelRatio ? window.devicePixelRatio : "-1"
}),
l.push({  // 返回屏幕的位深度/色彩深度（bit depth）
    // 根据CSSOM( CSS对象模型 )视图，为兼容起见，该值总为24。
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/pixelDepth
    pixel_depth: window.screen.pixelDepth ? window.screen.pixelDepth : "-1"
}),
l.push({  // 返回所使用浏览器的构建标识符  
    // 现代浏览器中，这个属性返回一个固定的时间戳作为私有的计量方法，比如 Firefox 64 及以后的版本返回 20181001000000。
    build_id: navigator.buildID ? navigator.buildID : "-1"
}),
l.push({  // Navigator.productSub 只读属性返回当前浏览器的编译版本号
    // 在 Safari 和 Chrome 上这个属性总是返回 20030107
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/productSub
    product_sub: navigator.productSub ? navigator.productSub : "-1"
}),
l.push({  // 返回浏览器引擎（产品）名称
    // 注意：不要依赖此属性返回真实的引擎名称。所有浏览器都将“ Gecko”作为此属性的值返回
    // 保留此属性仅出于兼容性目的
    // https://www.nhooo.com/jsref/nav_product.html
    product: navigator.product ? navigator.product : "-1"
}),
l.push({  // 返回当前设备能够支持的最大同时触摸的点数
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/maxTouchPoints
    max_touch_points: navigator.maxTouchPoints ? navigator.maxTouchPoints : "-1"
}),
l.push({  // deviceMemory 只读属性返回千兆字节为单位的大概的机器内存。
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/deviceMemory
    device_memory: navigator.deviceMemory ? navigator.deviceMemory : "-1"
}),
l.push({  // userLanguage 属性可返回操作系统的自然语言设置
    // https://www.w3school.com.cn/jsref/prop_nav_userlanguage.asp
    user_language: navigator.userLanguage ? navigator.userLanguage : "-1"
}),
l.push({  // browserLanguage 属性可返回当前浏览器的语言
    // https://www.w3school.com.cn/jsref/prop_nav_browserlanguage.asp
    browser_language: navigator.browserLanguage ? navigator.browserLanguage : "-1"
}),
l.push({  // systemLanguage 属性可返回操作系统使用的默认语言
    // https://www.w3school.com.cn/jsref/prop_nav_systemlanguage.asp
    system_language: navigator.systemLanguage ? navigator.systemLanguage : "-1"
}),
l.push({  // 返回 window 的所有属性的属性名
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
    window_api_num: Object.getOwnPropertyNames(window) ? Object.getOwnPropertyNames(window).length : "-1"
}),
l.push({  // 是否支持 canvas
    is_canvas_supported: c.isCanvasSupported()
}),
l.push({  // 与前面的 canvas 生成内容类似，不过，这个会一次性生成3个
    canvas_arr: c.canvasArr()
}),
l.push({  // 检查 window.Infinity, 会得到 "Infinity", 不知道作用...
    infinity: window.Infinity ? window.Infinity : "-1"
}),
l.push({  // 返回 网络下行速度
    // Navigator.connection 是只读的，提供一个NetworkInformation 对象来获取设备的网络连接信息。
    // navigator.connection.downlink 获取网络的下行速度
    downlink: navigator.connection && navigator.connection.downlink ? navigator.connection.downlink : "-1"
}),
l.push({
    effective_type: navigator.connection && navigator.connection.effectiveType ? navigator.connection.effectiveType : "-1"
}),
l.push({  // 返回估计往返时间
    // navigator.connection.rtt（估算的往返时间）
    rtt: navigator.connection && navigator.connection.rtt ? navigator.connection.rtt : "-1"
}),
l.push({  // 数据请求模式
    // navigator.connection.saveData 打开/请求数据保护模式
    save_data: navigator.connection && navigator.connection.saveData ? navigator.connection.saveData : "-1"
}),
l.push({  // 是否启用了 cookie
    // navigator.cookieEnabled 返回一个布尔值，来表示当前页面是否启用了 cookie。本属性为只读属性
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/cookieEnabled
    cookie_enabled: navigator.cookieEnabled ? navigator.cookieEnabled : "-1"
}),
l.push({  // 滚动恢复设置
    // 滚动恢复属性允许web应用程序在历史导航上显式地设置默认滚动恢复行为
    // https://jsonz.cn/2018/05/history-scroll-restoration/
    // https://developer.mozilla.org/zh-CN/docs/Web/API/History/scrollRestoration
    scroll_restoration: history.scrollRestoration ? history.scrollRestoration : "-1"
}),
l.push({  // 是否能够使用安全上下文的特征
    // window.isSecureContext是一个判断上下文是否能够使用安全上下文的特征的只读属性。
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/isSecureContext
    is_secure_context: window.isSecureContext ? window.isSecureContext : "-1"
}),

l.push({  // 浏览器的代码名
    // appCodeName 属性是一个只读字符串，声明了浏览器的代码名
    // https://www.w3cschool.cn/jsref/jsref-appcodename.html
    app_name: navigator.appCodeName
}),
l.push({  // 浏览器的名称
    // appName 属性可返回浏览器
    app_code_name: navigator.appName
}),
l.push({  // 浏览器的平台和版本信息
    // appVersion 属性可返回浏览器的平台和版本信息。该属性是一个只读的字符串
    // https://www.w3cschool.cn/jsref/jsref-nav-appversion.html
    app_version: navigator.appVersion
}),
l.push({  // 浏览器供应商名称
    // 返回当前所使用浏览器的浏览器供应商的名称
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/vendor
    vendor: navigator.vendor
}),
l.push({  // 是否为自动化控制
    // webdriver只读属性指示用户代理是否由自动化控制
    web_driver: navigator.webdriver ? navigator.webdriver : "-1"
}),
l.push({  // 浏览器环境的 CPU核心数
    // navigator.hardwareConcurrency 指明当前浏览器环境所拥有的CPU核心数，这来自于操作系统提供的API来获取。
    hardware_concurrency: navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "-1"
}),

l.push({
    plugin_hash: c.pluginsKey() && c.pluginsKey() != "-1" ? c.hashcode(c.pluginsKey()) : -1
}),
// r && "-1" != r ? l.push({
//     plugin_hash: c.hashcode(r)
// }) : l.push({
//     plugin_hash: "-1"
// }),


l.push({
    font_hash: c.pluginsKey() && c.pluginsKey() != "-1" ? c.hashcode(c.getFontsKey()) : -1
}),
// i && "-1" != i ? l.push({
//     font_hash: c.hashcode(i)
// }) : l.push({
//     font_hash: "-1"
// }),


// c.getBrowserKey(l),解析UA的内容，我改写了单独拿了出来，不过，这些东西应该没什么用
l.push({
    browser_name: ua_parser.getBrowser().name ? ua_parser.getBrowser().name : "-1"
}),
l.push({
    browser_version: ua_parser.getBrowser().version ? ua_parser.getBrowser().version : "-1"
}),
l.push({
    device_info: (ua_parser.getDevice().model ? ua_parser.getDevice().model : "-1") + "|" + (ua_parser.getDevice().type ? ua_parser.getDevice().type : "-1") + "|" + (ua_parser.getDevice().vendor ? ua_parser.getDevice().vendor : "-1")
}),
l.push({
    engine_name: ua_parser.getEngine().name ? ua_parser.getEngine().name : "-1"
}),
l.push({
    os_name: ua_parser.getOS().name ? ua_parser.getOS().name : "-1"
}),
l.push({
    os_version: ua_parser.getOS().version ? ua_parser.getOS().version : "-1"
}),


l.push({ // 获取所有的语言项
    languages: navigator.languages ? navigator.languages.join(",") : "-1"
}),
l.push({  // navigator 的键
    navigator_keys: c.navigatorKey()
})
// l.push({  // 网页相关的ID，不管
//     uuid: a
// })






console.log(l)