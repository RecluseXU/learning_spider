<template>
  <div>
    <h1>Hello!</h1>
  </div>
</template>

<script>
// 插件加载进Vue并使用
import Vue from 'vue'
import Meta from 'vue-meta'

Vue.use(Meta)

export default {
  name: "App",
  metaInfo: {
    // 如果子组件没有声明 metaInfo.title , 那么这个键会被使用
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Default Title",
    // 所有的 title 都会使用这个模板进行插入
    // all titles will be injected into this template
    titleTemplate: "%s | My Awesome Webapp",
  },
};
</script>
