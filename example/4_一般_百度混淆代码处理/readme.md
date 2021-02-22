# 信息  
通过对网页Cookie设置进行hook，可以发现，设置Cookie的js代码文件主要有两份:一份是明文的，一份是混淆过的  

此处主要对混淆过的那份js文件进行还原  
![1.png](https://i.loli.net/2021/02/22/zTjqJAdKMg8ya3V.png)  


# 内容  

## 文件路径  
* `./origin.js` 未经修改的百度混淆js代码  
* `./converter.js` 还原执行流程代码(main)  
* `./plugs/*.js` 自己编写的 使用到的 babel ast 还原插件  
* `./temp/*.js` 各步骤流程生成的临时代码记录  


## 总体信息  

原文件字符数：69898  
解混后字符数：22465  
步骤数：25  