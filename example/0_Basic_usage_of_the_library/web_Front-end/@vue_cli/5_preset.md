# Preset
一个 Vue CLI preset 是一个包含创建新项目所需预定义选项和插件的 JSON 对象，让用户无需在命令提示中选择它们。

在 vue create 过程中保存的 preset 会被放在你的 home 目录下的一个配置文件中 (~/.vuerc)。你可以通过直接编辑这个文件来调整、添加、删除保存好的 preset。

~~~json
{
  "useConfigFiles": true,
  "cssPreprocessor": "sass",
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-eslint": {
      "config": "airbnb",
      "lintOn": ["save", "commit"]
    },
    "@vue/cli-plugin-router": {},
    "@vue/cli-plugin-vuex": {}
  }
}
~~~
Preset 的数据会被插件生成器用来生成相应的项目文件。除了上述这些字段，你也可以为集成工具添加配置：

~~~json
{
  "useConfigFiles": true,
  "plugins": {...},
  "configs": {
    "vue": {...},
    "postcss": {...},
    "eslintConfig": {...},
    "jest": {...}
  }
}
~~~

这些额外的配置将会根据 useConfigFiles 的值被合并到 package.json 或相应的配置文件中。例如，当 "useConfigFiles": true 的时候，configs 的值将会被合并到 vue.config.js 中。

# Preset 插件的版本管理
你可以显式地指定用到的插件的版本：
~~~json
{
  "plugins": {
    "@vue/cli-plugin-eslint": {
      "version": "^3.0.0",
      // ... 该插件的其它选项
    }
  }
}
~~~
注意对于官方插件来说这不是必须的——当被忽略时，CLI 会自动使用 registry 中最新的版本。不过我们推荐为 preset 列出的所有第三方插件提供显式的版本范围



# 远程 Preset
你可以通过发布 git repo 将一个 preset 分享给其他开发者。这个 repo 应该包含以下文件：

preset.json: 包含 preset 数据的主要文件（必需）。
generator.js: 一个可以注入或是修改项目中文件的 Generator。
prompts.js 一个可以通过命令行对话为 generator 收集选项的 prompts 文件。
发布 repo 后，你就可以在创建项目的时候通过 --preset 选项使用这个远程的 preset 了：

~~~bash
# 从 GitHub repo 使用 preset
vue create --preset username/repo my-project
~~~
GitLab 和 BitBucket 也是支持的。如果要从私有 repo 获取，请确保使用 --clone 选项：

~~~bash
vue create --preset gitlab:username/repo --clone my-project
vue create --preset bitbucket:username/repo --clone my-project

# 私有服务器
vue create --preset gitlab:my-gitlab-server.com:group/projectname --clone my-project
vue create --preset direct:ssh://git@my-gitlab-server.com/group/projectname.git --clone my-project
~~~


# 加载文件系统中的 Preset
当开发一个远程 preset 的时候，你必须不厌其烦的向远程 repo 发出 push 进行反复测试。为了简化这个流程，你也可以直接在本地测试 preset。如果 --preset 选项的值是一个相对或绝对文件路径，或是以 .json 结尾，则 Vue CLI 会加载本地的 preset：
~~~bash
# ./my-preset 应当是一个包含 preset.json 的文件夹
vue create --preset ./my-preset my-project

# 或者，直接使用当前工作目录下的 json 文件：
vue create --preset my-preset.json my-project
~~~