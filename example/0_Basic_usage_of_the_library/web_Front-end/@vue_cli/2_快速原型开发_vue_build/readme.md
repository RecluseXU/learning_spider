# vue build  
在生产环境模式下零配置构建一个 .js 或 .vue 文件  
语法：  
~~~bash
build [options] [entry]
~~~

Options:
  -t, --target <target>  构建目标 (app | lib | wc | wc-async, 默认值：app)
  -n, --name <name>      库的名字或 Web Components 组件的名字 (默认值：入口文件名)
  -d, --dest <dir>       输出目录 (默认值：dist)
  -h, --help             输出用法信息


你也可以使用 vue build 将目标文件构建成一个生产环境的包并用来部署：
~~~bash
vue build MyComponent.vue
~~~
vue build 也提供了将组件构建成为一个库或一个 Web Components 组件的能力。查阅构建目标了解更多。
