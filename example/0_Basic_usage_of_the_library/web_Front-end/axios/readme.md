## 信息  
Axios 是基于promise可以用于浏览器和node.js的网络请求库  
在服务端它使用原生 node.js http 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests  

官网: https://axios-http.com/zh/  

## 特性  
* 从浏览器创建 XMLHttpRequests  
* 从 node.js 创建 http 请求  
* 支持 Promise API  
* 拦截请求和响应  
* 转换请求和响应数据  
* 取消请求  
* 自动转换JSON数据  
* 客户端支持防御XSRF  


## 可用请求方式  
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])