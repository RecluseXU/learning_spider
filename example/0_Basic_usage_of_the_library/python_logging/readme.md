日志模块，在工程项目中应该很广泛  

logging 是 python 的标准库  
logging 实现了灵活的事件日志系统的函数与类  

官方文档：https://docs.python.org/zh-cn/3/library/logging.html#module-logging  


## logging 四组件  

###  记录器 `Logger`  
  提供能直接使用的接口, 相当于记录所用的笔一般  
  可以设置多个 `Logger` 区分处理不同的日志  
  可以对两个 `Logger` 设置父子级关系, 实现日志上抛(子机处理完父级再处理)  

### 处理器 `Handlers`  
  将 `Logger` 创建的日志记录发送到目的地  
  处理器有很多种类: 输出到控制台, 输出到文件, 发送邮件等等......  
  一个 `Logger` 可以有多个处理器  

### 过滤器 `Filters`  
  提供更好的粒度控制，决定哪些日志会被输出  

### 格式器 `Formatter`  
  日志内容的组成结构, 决定最终输出中日志记录的样式  
