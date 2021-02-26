用于在windows中，自动下载 Selenium Chrome webdriver  

1. 读取系统注册表中 Chrome 的版本信息  
2. 根据版本信息， 去 http://chromedriver.storage.googleapis.com/index.html 下载对应的webdriver 压缩包  
3. 解压压缩包，得到webdriver，删除压缩包  
4. 尝试用刚下载的 webdriver 启动selenium  

尽管留存了一些Selenium的配置在代码中，但目的只是为了测试  
不建议直接使用脚本的启动函数作为selenium的入口  
建议在脚本执行完毕后，在对应的文件夹获取webdriver.exe，以供自身代码使用  
