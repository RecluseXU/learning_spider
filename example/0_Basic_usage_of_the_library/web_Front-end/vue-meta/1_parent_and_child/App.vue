<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// 插件加载进Vue并使用
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import VueRouter from 'vue-router'


Vue.use(Router)
Vue.use(Meta)

import ChildChangeParent from './pages/childChangeParent'
import ChildPropertyCondition from './pages/childPropertyCondition'

const router = new VueRouter({
  routes: [
    { path: '/', component: ChildPropertyCondition },
    { path: '/cp', component: ChildChangeParent },
  ]
})

export default {
  name: "App",
  metaInfo: {
    title: "Default Title",
    titleTemplate: "%s | My Awesome Webapp",
  },
  router: router
};
</script>
