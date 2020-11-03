# 基本信息  
目标：一些用户的用户文章页信内容信息  
目标URL：类似于[https://www.zhihu.com/people/revlx/posts](https://www.zhihu.com/people/revlx/posts)  
<!-- ![](info_res/browser_preview.png) -->
![1.png](https://i.loli.net/2020/11/03/DjFS7ZBHtUAvqJu.png)

## 描述  
静态网页+`Ajax`动态刷新信息  
对知乎文章接口加密参数问题的一次尝试，并非大规模抓取  

## 使用的包/工具/技术
| 步骤       | 包/工具/技术      |
| ---------- | ----------------- |
| 网页分析   | Devtools  Postman |
| 爬取网页   | requests          |
| 解析网页   | re                |
| 数据持久化 | json              |
| 参数处理   | pyexecjs          |


## 问题与对应处理  
* 特定header加密，限制访问  
通过在服务器服务接口设置特定的头部检查来限制访问  

# 分析  
## 基础分析  
### 文章页内容显示  
直接抓取 https://www.zhihu.com/people/revlx/posts   
![2.png](https://i.loli.net/2020/11/03/hF1HOTibeuWJgBc.png)  
直接抓取用户文章页后发现，这个页面会包含两篇文章  
但是总文章数量却远不止两篇，说明存在动态刷新的内容  

### 文章接口
#### 明文内容  
![3.png](https://i.loli.net/2020/11/03/Ly9Ntak7BrjhPGq.png)  
通过浏览器抓包，查看到了数据包的记录  
文章内容，标题等，都是明文传输  

#### 两次请求参数对比  
观察两次`Ajax`改变的参数  
![4.png](https://i.loli.net/2020/11/03/te4pYSWjyKdh1gA.png)  
![5.png](https://i.loli.net/2020/11/03/9Mgl6cGfnPvbUky.png)  
对比两次请求的参数，大致可以确定
* `offset`是用来控制偏移，即显示第几以后的内容  
* `limit`是返回的文章数  
* `sort_by`是内容排序方式信息  
* `include`长长的一串，似乎包含了一些其它参数以及填入的信息，两次请求此你内容相同，猜想是不变的东西  

#### 两次请求头部对比  
* 不变的内容  
  * authority : `www.zhihu.com`  
  * pragma : `no-cache`  
  * cache-control : `no-cache`  
  * x-requested-with : `fetch`  
  * user-agent : `Mozilla/5.0...... Safari/537.36`  
  * x-ab-param : `tsp_hotlist_ui=1;......pf_creator_card=1`  
  * x-ab-pb ： `CkISCycKtAqsC......AAAAAAAAAAQ==`  
  * x-zse-83 : `3_2.0`  
  * accept : `*/*`  
  * sec-fetch-site : `same-origin`  
  * sec-fetch-mode : `cors`  
  * sec-fetch-dest : `empty`  
  * referer : `https://www.zhihu.com/people/revlx/posts`  
  * accept-language : `zh-CN,zh;q=0.9`  
  * cookie : `d_c0="ACBay9FREhKPTgL......`  
    ![10.png](https://i.loli.net/2020/11/03/cqUlnZdA7iPgb9r.png)  
    Cookies在访问用户页的时候被赋予，在`Ajax`请求过程中并未改变，在爬取时先访问一次用户页来获取使用即可    

* 变化的内容  
  * x-zse-86 
    每次请求都会发生变化，是一个加密参数  


## x-zse-86 加密头部  
### 追寻定义位置  
首先全局搜索一下，有没有直接结果  
![6.png](https://i.loli.net/2020/11/03/Dj2sahPdYB3fqFv.png)   
结果发现有一个，那么追寻到结果处  
（你也可以通过将断点打在发送`Ajax`请求的地方一点点追到这里）  

### 逆向查找直到所有计算元素皆可获得  
![7.png](https://i.loli.net/2020/11/03/a2hqGbOx3RCF6ED.png)  
![8.png](https://i.loli.net/2020/11/03/lA1PfydYwgvXEDU.png)  
发现这个`x-zse-86`头部定义的地方，一点点往上寻找计算过程  

最终决定在ee函数计算得到结果的上一步打上断点，观察传入参数的情况  
![9.gif](https://i.loli.net/2020/11/03/i5BAfp8RHEJ1tI3.gif)

| 参数名                | 值                                                  | 说明                                                                          |
| --------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------- |
| r                     | `/api/v4/members/revlx/articles?in......`           | 可以看出来是`url`加上参数后，除去域名的内容                                   |
| a.body                | `undefined`                                         |                                                                               |
| 参数3<br>`zse83`:`u`  | `3_2.0`                                             | 前面分析头部的时候知道这个东西是`x-zse-83`的内容                              |
| 参数3<br>`dc0`:`d`    | `"ABDT05JmIxKPTrWQHnNF8qm3x8Z3xuIqsP0=|1604393344"` | 这个是`Cookies`中的`d_c0`的内容<br>(不知道为什么这个字符串里自带了一个双引号) |
| 参数3<br>`xZst81`:`l` | `undefined`                                         |                                                                               |

那么到现在，已经知道了所有的计算参数和函数位置了  
只要将函数的实际计算内容抓出来就能得到 加密过程函数了  

### ee函数分析  
~~~javascript main.app.js
    function ee(e, t, n) {
        var r = n.zse83
          , o = n.dc0
          , i = n.xZst81
          , a = location
          , c = a.hash
          , s = a.href
          , u = function(e) {
            var t = z()(e)
              , n = t.pathname
              , r = t.search;
            if (!r)
                return n;
            var o = r.replace(/[']/g, (function(e) {
                return "%" + e.charCodeAt(0).toString(16)
            }
            ));
            return "".concat(n, "?").concat(o)
        }(e)
          , l = c ? s.replace(c, "") : s
          , d = Q(t)
          , f = [r, u, l, o, Z(d) && d, i].filter(Boolean).join("+");
        return {
            source: f,
            signature: H()(B()(f))
        }
    }
~~~

这个分析的过程实际上就是分析函数作用的过程  
因为只抓需要文章的内容，所以函数中那些为了复用的内容可以删掉一些来提升代码可读性，降低阅读压力    

原本的ee函数有很多的计算过程，我将它简化了一下，删除了那些固定的流程  
~~~javascript
// 这个 user_url_token 和 offset 是为了方便抓取不同用户而设置的
// 是原本传入的是一长串的url的一部分
function get_x_zse_86(user_url_token, offset, cookie_d_c0){
    // 对应原本的 f = [r, u, l, o, Z(d) && d, i].filter(Boolean).join("+");
    var info = [ // 完整url计算
        "3_2.0", // n.zse83
        // 注意:完整url,其中包含的信息量需要更改
        "/api/v4/members/"+ user_url_token +"/articles?include=data%5B*%5D.comment_count%2Csuggest_edit%2Cis_normal%2Cthumbnail_extra_info%2Cthumbnail%2Ccan_comment%2Ccomment_permission%2Cadmin_closed_comment%2Ccontent%2Cvoteup_count%2Ccreated%2Cupdated%2Cupvoted_followees%2Cvoting%2Creview_info%2Cis_labeled%2Clabel_info%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics&offset="+offset+"&limit=20&sort_by=created",
        'https://www.zhihu.com/', // 注意: referer 上次浏览的页面,这里固定'https://www.zhihu.com/'
        cookie_d_c0,
    ].join("+");

    // 对应原本的 B()(f)
    var step1 = O(info);  // 似乎是md5，不过我还是扣下来了
    // 对应原本的 H()(B()(f))
    var signature = encrypt2(step1);  // 并不知道是什么加密
    // 外面的连接
    var x_zse_86 = "".concat("1.0", "_").concat(signature);
    return x_zse_86
}
~~~

现在，在整段代码理还剩下:  
`B()` (我改为了`O()`)  w
`H()` (我改为了`encrypt2()`)  
这两个函数是未定义的了  

### 函数引用补全  

查看到这两个函数其实是被`webpack`打包了的，那就整个挖出来  

`O()`提取  
~~~javascript
function(e, t, n) {
    var r;
    !function(o) {
        "use strict";
        function i(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
        }
        //  此处省略一大段
        //  此处省略一大段
        //  此处省略一大段
        function m(e, t) {
            return function(e, t) {
                var n, r, o = p(e), i = [], a = [];
                for (i[15] = a[15] = void 0,
                o.length > 16 && (o = d(o, 8 * e.length)),
                n = 0; n < 16; n += 1)
                    i[n] = 909522486 ^ o[n],
                    a[n] = 1549556828 ^ o[n];
                return r = d(i.concat(p(t)), 512 + 8 * t.length),
                f(d(a.concat(r), 640))
            }(b(e), b(t))
        }
        function O(e, t, n) {  // 打包内容的入口函数O()
            return t ? n ? m(t, e) : h(m(t, e)) : n ? v(e) : h(v(e))
        }
        void 0 === (r = function() {
            return O
        }
        .call(t, n, t, e)) || (e.exports = r)
    }()
}
~~~

`encrypt2()`提取  
~~~javascript
function(module, exports, __webpack_require__) {
    "use strict";
    function t(e) {
        return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.A ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        )(e)
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var A = "2.0"
      , __g = {};
    function s() {}
    //  此处省略一大段
    //  此处省略一大段
    //  此处省略一大段
    var b = function(e) { // 入口函数，即被我定义为encrypt2()
        return __g._encrypt(encodeURIComponent(e))
    };
    exports.ENCRYPT_VERSION = A,
    exports.default = b
}
~~~

在调试`encrypt2()`时，总是不能进一步调试到内部，于是我步进来查看什么地方出了问题  

### 陷阱1：时间计算  
![12.png](https://i.loli.net/2020/11/03/bmUNEC7TBnAKSGM.png)  
留意这一段代码，它计算了前后的时间，如果前后时间很长，那么就直接返回  
一般而言，如果不是进行调试，超不过这个时间，说明这个是一个时间反调试的手段  
直接将 500 改大一些就好 比如说 500000000  

### 陷阱2：UA参与加密计算  
调试过程中会发现它会调用 `window.navigator.userAgent`进行计算  
但是如果你不设置，它也能算出一个结果，但不正确  
将`window.navigator.userAgent`内容补上
~~~javascript
var window = {};
var Navigator = function() {};
Navigator.prototype = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
};
window.navigator = new Navigator;
~~~  
为了避免不知道存不存在的检查，将这个设置得和请求头一致好了  

### 测试  
编写一个简单的测试用例来证明过程正确  
~~~javascript
function test(){
    // 測試用
    var cookie_d_c0 = '\"' + 'APAadlxbyRGPTliEWVfcKPKPvJvx2RMOEXA=|1598350607' + '\"'
    var _referer = 'https://www.zhihu.com/'
    var x_zse_86 = get_x_zse_86('you-ju-aso', 0, cookie_d_c0)
    console.log(x_zse_86 === '1.0_a0YBFU9067YxngY8BTNBHvH0gBNXNh20hgYyS4HBUgFx')
}
test()
~~~
测试无误  

## 编写`python`代码调用`js`完成目标  
见`spider.py`



<p style="text-align:right">Recluse<br>2020-11-3</p>