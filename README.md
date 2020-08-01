## 简介  
此项目主要分为三个部分  
* 爬虫案例  
对一些网站的数据进行爬取，标记出 难度和要点  
* 辅助工具/脚本制造  
尝试制作各种爬虫工具/脚本  
* web网站  
尝试去接入各种不同的验证码，尝试自行通过  
根据反反爬经验设置各种难点，研究前端知识  


## 已完成的内容 - 目前进度估计 1%

## 爬虫案例  
<table>
    <tr><th colspan="5">案例列表</th></tr>
    <tr>
        <th>难度</th>
        <th>内容</th>
        <th>信息</th>
        <th>方式</th>
        <th>难点</th>
    </tr>
    <tr>
        <td>基础</td>
        <td>各类库的简单用法</td>
        <td>基本使用方法</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td rowspan="5">简单</td>
        <td>猫眼电影排行榜top100</td>
        <td>静态网页</td>
        <td>模拟http</td>
        <td></td>
    </tr>
    <tr>
        <td>今日头条搜索结果</td>
        <td>动态网页</td>
        <td>模拟http</td>
        <td></td>
    </tr>
    <tr>
        <td>微博移动端用户动态信息</td>
        <td>动态网页</td>
        <td>模拟http</td>
        <td>since_id参数的所在地</td>
    </tr>
    <tr>
        <td>Bilibili观察者 见齐指数</td>
        <td>动态网页</td>
        <td>模拟http</td>
        <td>被逻辑加密/压缩的 指数数据 的还原</td>
    </tr>
    <tr>
        <td>最简单的滑块验证码</td>
        <td>动态网页</td>
        <td>模拟浏览器</td>
        <td>滑块移动</td>
    </tr>
</table>

## 工具/脚本制造  
<table>
    <tr><th colspan="4">工具/脚本制造</th></tr>
    <tr>
        <th>附属于</th>
        <th>内容</th>
        <th>信息</th>
    </tr>
    <tr>
        <td>Selenium</td>
        <td>Auto DL ChromeWebDriver</td>
        <td>获知已安装的Chrome版本信息，去<a href="http://chromedriver.storage.googleapis.com/index.html">google</a>下载最符合版本的Selenium Chrome Web Driver，使得Selenium能正常运行<br>(虽然实际上最好的解决方法不是这样做，而是在服务器上找一个docker Image，然后部署上)</td>
    </tr>
</table>

## 基础练习网站  
<table>
    <th colspan="4">案例</th>
    <tr>
        <th>类型</th>
        <th>难度</th>
        <th>名称</th>
        <th>信息</th>
    </tr>
    <tr>
        <td>滑块验证</d>
        <td>简单</td>
        <td>最简单的滑块验证</td>
        <td>只要拖动滑块，滑到尽头就可以通过，不存在任何检测</td>
    </tr>
</table>

<table>
    <tr><th colspan="4">技术应用</th></tr>
    <tr>
        <th></th>
        <th>使用</th>
        <th>信息</th>
    </tr>
    <tr>
        <td>规范</td>
        <td>RESTful</td>
        <td>规范的API，规范的响应</td>
    </tr>
    <tr>
        <td rowspan="4">前端</td>
        <td>JQuery 2.2.4</td>
        <td>一个快速、简洁的JavaScript框架</td>
    </tr>
    <tr>
        <td>twitter-bootstrap 3.4.1</td>
        <td>Twitter推出的一个用于前端开发的开源工具包</td>
    </tr>
    <tr>
        <td>font-awesome 4.7.0</td>
        <td>一套图标字体库和CSS框架</td>
    </tr>
    <tr>
        <td>metisMenu 3.0.6</td>
        <td>Vanilla-JS 折叠菜单插件</td>
    </tr>
    <tr>
        <td>CDN</td>
        <td>bootcdn.cn</td>
        <td>免费的前端开源项目 CDN 加速服务</td>
    </tr>
    <tr>
        <td rowspan="4">后端</td>
        <td>Flask 1.1.2</td>
        <td>Python轻量级web框架</td>
    </tr>

</table>


2020年7月26日09:56:23