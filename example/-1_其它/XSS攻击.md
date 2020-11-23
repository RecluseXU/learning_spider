# 信息  
![](https://i.loli.net/2020/11/20/CYOZ1qmeNGXusnk.png)  
练习平台的一个练习  


# XSS攻击  
目前 XSS 攻擊的種類大致可以分成以下幾種類型：  

* `Stored XSS` (儲存型)  
保存在服务器数据库中的`JavaScript` 代碼引起的攻擊即為 `Stored XSS`  
最常見的就是论坛文章、留言板、评论等等，因為使用者可以輸入任意內容，若沒有確實檢查，那使用者輸入如 `<script>` 等關鍵字就會被當成正常的 `HTML` 執行，添加`<script>`写入`JavaScript` 代碼就能做坏事了  
    >例如：练习的答案  
    ~~~
    必须复读<script>$("#_all_the_message").html($("#_all_the_message").html().replace('禁止','必须').replace('严禁','必须'))</script>
    ~~~


* `Reflected XSS` (反射型)  
Reflected 是指不會被儲存在資料庫中，而是由網頁後端直接嵌入由前端使用者所傳送過來的內容造成的  
最常見的就是以 `GET` 方法发送内容給服务器器時，服务器没檢查就將內容返回到网页上所產生的漏洞  
    >例如:你的网页需要 将一个`url`参数的内容写到`HTML`中  
    >攻击者在研究好你正常的`HTML`后，整了个钓鱼url  
    >在参数里写`<script>`添加`JavaScript`来做坏事(比如说往登录按钮里写一个发账户密码到自己服务器的脚本)  

    由于这种类型的`url`长得离谱，细心点一般都会发现  

* `DOM-Based XSS` (基於 `DOM` 的類型)  
攻击者通过一定手段（比如黑进你服务器，比如在你服务器前面设置一个攻击服务器）篡改`HTML`  
给`HTML`写`<script>`添加`JavaScript`来做坏事  

    实际上能做到这种类型的攻击的话，其实就能做有破坏性的攻击，没必要搞这种方法了  


## 防御XSS攻击  
**前两种攻击只能由后端来进行防范**  
除了必要的 HTML 代碼，任何允許使用者輸入的內容都需要檢查，刪除/转义所有`<script>`,`onerror=`等任何可能執行代碼的字串  


|原始字符|	HTML 编码字符|
|--|--|
|<	|`&lt;`|
|>	|`&gt;`|
|"	|`&quot;`|
|'	|`&#x27;`|
|/	|`&#x2F;`|
|&	|`&amp;`|

当浏览器遇到编码后的字符，不会当作元素来处理，只会当作普通的而字符串来处理  

**`DOM-Based` 則必須由前端來防範**  

但基本上還是跟前面的原則相同 

应该用正确的的方法、屬性來操作 DOM  
譬如`innerHTML`属性。此屬性代表插入的內容是合法的 `HTML` 字串，所以字串會解析成 `DOM` 物件  
~~~javascript
document.getElementById('show_name').innerHTML = name;
~~~
如果这里使用`innerText`属性，插入字串時，字符串會被保證作为纯粹的文字，也就不可能被插入恶意代码執行了  
~~~javascript
document.getElementById('show_name').innerText = name;
~~~
