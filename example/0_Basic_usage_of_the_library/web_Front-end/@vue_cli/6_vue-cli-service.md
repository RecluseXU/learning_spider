在一个 Vue CLI 项目中，@vue/cli-service 安装了一个名为 vue-cli-service 的命令。你可以在 npm scripts 中以 vue-cli-service、或者从终端中以 ./node_modules/.bin/vue-cli-service 访问这个命令。

这是你使用默认 preset 的项目的 package.json：
~~~json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  }
}
~~~
可以通过npm调用这些script
~~~bash
npm run serve
~~~
如果可以使用npx (最新版的 npm 应该已经自带)，那么可以直接用npx命令  
~~~bash
npx vue-cli-service serve
~~~


>可以通过 vue ui 命令使用 GUI 运行更多的特性脚本。  



# vue-cli-service serve  
vue-cli-service serve 命令会启动一个开发服务器 (基于 webpack-dev-server) 并附带开箱即用的模块热重载 (Hot-Module-Replacement)。
~~~bash
vue-cli-service serve [options] [entry]
~~~

选项：
  --open    在服务器启动时打开浏览器
  --copy    在服务器启动时将 URL 复制到剪切版
  --mode    指定环境模式 (默认值：development)
  --host    指定 host (默认值：0.0.0.0)
  --port    指定 port (默认值：8080)
  --https   使用 https (默认值：false)


除了通过命令行参数，你也可以使用 `vue.config.js` 里的 `devServer` 字段配置开发服务器  

命令行参数 `[entry]` 将被指定为唯一入口，而非额外的追加入口。尝试使用 `[entry]` 覆盖 `config.pages` 中的 `entry` 将可能引发错误。


# vue-cli-service build  
vue-cli-service build 会在 dist/ 目录产生一个可用于生产环境的包，带有 JS/CSS/HTML 的压缩，和为更好的缓存而做的自动的 vendor chunk splitting。它的 chunk manifest 会内联在 HTML 里。

~~~bash
vue-cli-service build [options] [entry|pattern]
~~~

选项：
  --mode        指定环境模式 (默认值：production)
  --dest        指定输出目录 (默认值：dist)
  --modern      面向现代浏览器带自动回退地构建应用,使用现代模式构建应用，为现代浏览器交付原生支持的 ES2015 代码，并生成一个兼容老浏览器的包用来自动回退。
  --target      app | lib | wc | wc-async (默认值：app),允许你将项目中的任何组件以一个库或 Web Components 组件的方式进行构建。更多细节请查阅构建目标。
  --name        库或 Web Components 模式下的名字 (默认值：package.json 中的 "name" 字段或入口文件名)
  --no-clean    在构建项目之前不清除目标目录
  --report      生成 report.html 以帮助分析包内容
  --report-json 生成 report.json 以帮助分析包内容
  --watch       监听文件变化

# vue-cli-service inspect  
可以使用 vue-cli-service inspect 来审查一个 Vue CLI 项目的 webpack config  

~~~bash
vue-cli-service inspect [options] [...paths]
~~~

选项：
  --mode    指定环境模式 (默认值：development)


# 查看所有命令  

有些 CLI 插件会向 vue-cli-service 注入额外的命令。例如 @vue/cli-plugin-eslint 会注入 vue-cli-service lint 命令。你可以运行以下命令查看所有注入的命令：

~~~bash
npx vue-cli-service help
~~~

你也可以这样学习每个命令可用的选项：
~~~bash
npx vue-cli-service help [command]
~~~


# 缓存和并行处理  
cache-loader 会默认为 Vue/Babel/TypeScript 编译开启。
文件会缓存在 node_modules/.cache 中——如果你遇到了编译方面的问题，记得先删掉缓存目录之后再试试看。

thread-loader 会在多核 CPU 的机器上为 Babel/TypeScript 转译开启  

# git hook  
在安装之后，@vue/cli-service 也会安装 yorkie，它会让你在 package.json 的 gitHooks 字段中方便地指定 Git hook：
~~~json
{
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
   "lint-staged": {
    "*.{js,vue}": [
      "vue-cli-service lint",
      "git add"
    ]
  }
}
~~~