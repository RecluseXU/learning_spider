# 目标  
抓取的图片地址： https://www.carbosynth.com/carbosynth/website.nsf/(w-productdisplay)/6C2CE1DA0E6118CC802585F9006C02A6/$file/FF33415_structure.png  


# 信息  
这个图片如果使用简单的 requests 来请求，会返回包含了js代码的网页，功能应该是设置cookies  
（并未逆向此js，因此只是猜测）  
而在浏览器获取时，并不会发生这种情况   

在所有HTTP层面信息都相同的情况下，被服务器识别出来了问题  
那么大概率TLS指纹识别的问题了  

和大佬交流，大佬提供的一些信息，也给出了代码见`./大佬成功代码/cs.py`  
* Python 当下还没TLS1.3的库  
* requests 的加密组件可能会被识别  


requests中设置了默认的TLS加密组件设置  
~~~python
# A secure default.
# Sources for more information on TLS ciphers:
#
# - https://wiki.mozilla.org/Security/Server_Side_TLS
# - https://www.ssllabs.com/projects/best-practices/index.html
# - https://hynek.me/articles/hardening-your-web-servers-ssl-ciphers/
#
# The general intent is:
# - prefer cipher suites that offer perfect forward secrecy (DHE/ECDHE),
# - prefer ECDHE over DHE for better performance,
# - prefer any AES-GCM and ChaCha20 over any AES-CBC for better performance and
#   security,
# - prefer AES-GCM over ChaCha20 because hardware-accelerated AES is common,
# - disable NULL authentication, MD5 MACs, DSS, and other
#   insecure ciphers for security reasons.
# - NOTE: TLS 1.3 cipher suites are managed through a different interface
#   not exposed by CPython (yet!) and are enabled by default if they're available.
DEFAULT_CIPHERS = ":".join(
    [
        "ECDHE+AESGCM",
        "ECDHE+CHACHA20",
        "DHE+AESGCM",
        "DHE+CHACHA20",
        "ECDH+AESGCM",
        "DH+AESGCM",
        "ECDH+AES",
        "DH+AES",
        "RSA+AESGCM",
        "RSA+AES",
        "!aNULL",
        "!eNULL",
        "!MD5",
        "!DSS",
    ]
)
~~~
中间给出了一长串的说明：  

安全的安全组件设置  
有关TLS密码的更多信息的来源：
-https://wiki.mozilla.org/Security/Server_Side_TLS
-https://www.ssllabs.com/projects/best-practices/index.html
-https://hynek.me/articles/hardening-your-web-servers-ssl-ciphers/

总体意图是：
-更喜欢提供完美前向保密性（DHE / ECDHE）的密码套件
-与DHE相比，它更喜欢ECDHE，以获得更好的性能
-与任何AES-CBC相比，更喜欢使用任何AES-GCM和ChaCha20，以获得更好的性能和安全
-与ChaCha20相比，更喜欢AES-GCM，因为硬件加速的AES很常见
-禁用NULL身份验证，MD5 MAC，DSS和其他出于安全原因不安全的密码
-注意：TLS 1.3密码套件是通过其他接口管理的。目前尚未由CPython公开，并且默认可用（如果可用）
~~~

不同的客户端能使用的加密算法数量，种类大多都不相同  
如果很多时候，TLS指纹都会对这些东西进行一些校验  
为了requests的TLS加密组件变得不像requests加密组件，则需要进行一些修改（比如说，删除一些可以用的加密组件，实现一些原本不能用的组件）  

此处在requests载入前，对requests依赖的urllib中一些TLS加密组件删掉
~~~python
ciphers = [i for i in urllib3.util.ssl_.DEFAULT_CIPHERS.split(":") if not i.startswith("!")]
urllib3.util.ssl_.DEFAULT_CIPHERS = ":".join(ciphers)
~~~

对修改前后的TLS Hello Client包进行抓包对比，会发现修改后的加密组件少了一些   
![~_8OU6BGV1B_OBW_M@MCWBY.png](https://i.loli.net/2021/04/22/E3KvJLiUrAVf9hk.png)   
如果服务器只是依旧按照以前那个识别模板来匹配识别 requests 的话，这样子就识别不出来了  


# 其它方法  
* 代理  
找一个代理帮忙进行不被认为危险的TLS握手  
当然这种方案需要找一个不会被拦截的客户端代理才可以  

* 指定host绕过waf(仅仅对于使用了那些waf产品的服务器)
套了阿里云waf的服务器cname解析到了yundunwaf3.com的域名，这种情况可以直接ping 域名获取真实ip，然后请求地址设置为真实ip 在 HTTP Header的Host字段中指定域名即可绕过waf的防护  
当然这种方式如果目标服务器开启了强制域名访问会失效于


2021-4-22
EvilRecluse

******
参考：
* [SSL指纹识别和绕过](https://mp.weixin.qq.com/s?__biz=MzI3MzU5OTY0MQ==&mid=2247484620&idx=1&sn=c9966e1f3b56bb6dacae5be387efe8be&chksm=eb21993adc56102c5e02ec7a7cca3ae7057e52dd7890aaec59250d438971ad21300ff2ed64f7&mpshare=1&scene=24&srcid=0419O6DtbnG3p6YYOUgAZZ9W&sharer_sharetime=1618927179457&sharer_shareid=b41d1f175102ff83b067df5aedf83ac9&key=071adfe32268715b84e44de7888479f20eec43164fa8c8da31571e6797e5341e460587fae511353ad9507eedc308f2d83c90afa3d9930ff53f030203812a88015f306724c7164b87b7f3899335faa8218a479cb1eb6b26317d15e8f5a699c57039354640b44a1cd619c68d8ab0578b0729e53806c2a489216137a4974ac0cfe2&ascene=1&uin=OTMzNDYxNzEy&devicetype=Windows+10+x64&version=63000039&lang=zh_CN&exportkey=A6x%2FrQoSC00hqbsggyU4hMY%3D&pass_ticket=qyKDyYAHKdSmgLo%2FHFSUCOl3EsT7LzN2I2ViGbaJqATvB9zwvQhgGZn1pJvhuGJ3&wx_header=0)  