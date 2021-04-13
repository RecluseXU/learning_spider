安装一个全局扩展
~~~bash
npm install -g @vue/cli-service-global
~~~
使得`vue server`和`vue build`命令能够使用  

# vue server  
在开发环境模式下零配置为 .js 或 .vue 文件启动一个服务器
~~~bash
serve [options] [entry]
~~~
Options:
  -o, --open  打开浏览器
  -c, --copy  将本地 URL 复制到剪切板
  -h, --help  输出用法信息

运行此命令的目录需要存在一个`App.vue`文件  


vue serve 使用了和 vue create 创建的项目相同的默认设置 (webpack、Babel、PostCSS 和 ESLint)。  
它会在当前目录自动推导入口文件——入口可以是 main.js、index.js、App.vue 或 app.vue 中的一个。  

你也可以显式地指定入口文件：  
~~~bash
vue serve MyComponent.vue
~~~
