# 信息  
这是一份来自安居客的浏览器指纹分析，仅被我用来学习浏览器指纹的知识  

## 获取方式  
1. 开启`Devtool`进行记录抓包  
2. 访问网址: https://beijing.anjuke.com/market/  
3. 观察到一个`report`报文  
   ![1.png](https://i.loli.net/2020/11/30/NhY6MvOlpbxKFBn.png)  
   查看堆栈即到达 `teemo_core.js` 这个收集指纹的js中  
   `teemo_core.js`原文我备份了一份在当前目录，感兴趣可以查看  

## 简化与分析  
为了方便记录与理解，我简化了 `teemo_core.js` 提取信息的代码，并添加了大量注释以帮助理解  
具体可以查看 `simply_core.js` 

这里会将部分内容记录到文档之中，后续也会将一些内容写入练习平台中  

### navigator.languages[0] 与 navigator.language  
~~~javascript
hasLiedLanguagesKey: function() {
    if ("undefined" != typeof navigator.languages)
        try {
            if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2))
                return 1
        } catch (e) {
            return -1
        }
    return 0
}
~~~
`navigator.languages[0]` 是浏览器语言的首选项  
`navigator.language` 是浏览器语言
这两个东西在一般的浏览器中是一样的  

而在`Chrome`中，这两个内容可能会不同  
如果你`User-Agent`里声明自己不是不是`Chrome`, 而此处又不同的话，那么你显然是人机  


另外 无头浏览器 有`navigator.language`, 但可能不会含有 `navigator.languages`(也许会返回空字符串)  
如果没有 `navigator.languages`, 那么显然你是人机  
参考：  
* https://stackoverflow.com/questions/53004350/when-will-navigator-language-different-to-navigator-languages0  


### navigator.userAgent 与 navigator.platform  

~~~javascript
hasLiedOsKey: function() {
    // UA指明的平台与触控是否匹配
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
    }
~~~

通过`navigator.userAgent`检查`User-Agent`  
通过`navigator.platform`检查平台  
通过`navigator.oscpu`检查系统信息  
通过`navigator.maxTouchPoints`检查触控支持  

对触控与平台的检测  
* 如果是PC，那么必定不支持触控  
* 如果是移动端，那么支持触控  

对系统与平台进行检测  
* 安卓端对应`linux`系统  
* `mac`对应`IOS`系统  

对系统与`UserAgent`进行检测  
* 如果是移动端的平台，那么就不会有PC端的`UserAgent`  


### navigator.productSub  

~~~javascript
hasLiedBrowserKey: function() {
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
    if (("Chrome" === e || "Safari" === e || "Opera" === e) && "20030107" !== n)
        return 1;

~~~
`Navigator.productSub` 只读属性返回当前浏览器的编译版本号  
参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/productSub  
在 `Safari`, `Chrome` 这个属性总是返回 20030107  
如果声明的浏览器是其中之一，而这个值不是20030107。那么必定为人机  
参考：https://stackoverflow.com/questions/53004350/when-will-navigator-language-different-to-navigator-languages0  


### eval.toString().length  
~~~javascript
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
~~~

通过对比`eval.toString().length`长度识别出你的浏览器是什么，不同浏览器的长度不一样  
如果伪造了`UserAgent`，声明了和原本不同的浏览器，那么你就是人机  

2020-11-30  
EvilRecluse  
