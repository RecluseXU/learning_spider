python3  
设置了一些启动的参数与更换代理用的浏览器插件  

## 使用
1. Chrome Webdriver 获取  
   下载一个对应 Chrome 版本的 Webdriver, 放置于 **sloth/static/chromedriver**   

2. 引入后導入 **sloth.webdriver/\*\*.py** 中的 `webdriver`函数使用使用即可  

## 模式  
* Stealth.js 模式  
  Selenium 启动 Chrome, [stealth.min.js](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) 掩盖指纹的启动模式   
  仍然存在一些可以被识别到的浏览器指纹  

* Takeover 模式  
  调用系统启动 Chrome, Selenium 接管的启动模式  
  系统启动的 Chrome 不存在 Selenium 指纹  
  但相应的也没有了一些 Selenium 启动能够设置的内容, 只能使用 Chrome 启动参数进行一些设置  
