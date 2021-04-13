# vue create
创建一个由 `vue-cli-service` 提供支持的新项目
~~~bash
vue create hello-world
~~~
选项：  
  -p, --preset <presetName>       忽略提示符并使用已保存的或远程的预设选项
  -d, --default                   忽略提示符并使用默认预设选项
  -i, --inlinePreset <json>       忽略提示符并使用内联的 JSON 字符串预设选项
  -m, --packageManager <command>  在安装依赖时使用指定的 npm 客户端
  -r, --registry <url>            在安装依赖时使用指定的 npm registry
  -g, --git [message]             强制 / 跳过 git 初始化，并可选的指定初始化提交信息
  -n, --no-git                    跳过 git 初始化
  -f, --force                     覆写目标目录可能存在的配置
  -c, --clone                     使用 git clone 获取远程预设选项
  -x, --proxy                     使用指定的代理创建项目
  -b, --bare                      创建项目时省略默认组件中的新手指导信息
  -h, --help                      输出使用帮助信息

在项目创建完毕后，会提示可以这样运行项目
~~~bash
cd first_vue_cli_project
npm run serve
~~~


>警告
>如果你在 Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作。你必须通过 winpty vue.cmd create hello-world 启动这个命令。不过，如果你仍想使用 vue create hello-world，则可以通过在 ~/.bashrc 文件中添加以下行来为命令添加别名。 alias vue='winpty vue.cmd' 你需要重新启动 Git Bash 终端会话以使更新后的 bashrc 文件生效。

会提示选取一个 preset  
你可以选默认的包含了基本的 Babel + ESLint 设置的 preset，也可以选“手动选择特性”来选取需要的特性。
这个默认的设置非常适合快速创建一个新项目的原型，而手动设置则提供了更多的选项，它们是面向生产的项目更加需要的。

如果你决定手动选择特性，在操作提示的最后你可以选择将已选项保存为一个将来可复用的 preset。

>~/.vuerc
被保存的 preset 将会存在用户的 home 目录下一个名为 .vuerc 的 JSON 文件里。如果你想要修改被保存的 preset / 选项，可以编辑这个文件
在项目创建的过程中，你也会被提示选择喜欢的包管理器或使用淘宝 npm 镜像源以更快地安装依赖。这些选择也将会存入 ~/.vuerc

