<template>
  <div>
    <h1>Hello!</h1>
    <p>如果是cp的话, head meta title模板会改变，title 也会跟着变</p>
    <input v-model="data">
  </div>
</template>

<script>
// 插件加载进Vue并使用
import Vue from 'vue'
import Meta from 'vue-meta'
import VueRouter from 'vue-router'

Vue.use(Meta)

import Index from './pages/index'

const router = new VueRouter({
  routes: [
    { path: '/', component: Index },
  ]
})

export default {
  name: "App",
  data: function(){
    return {
      data: 'i'
    }
  },
  metaInfo(){
    // let titleTemplate = this.$router.name === 'cp'? '%s | Is cp': '%s | Is not cp'
    console.log(this)
    return {
      title: "Default Title",
      titleTemplate: this.data === 'cp'? '%s | Is cp': '%s | Is not cp',
    }
  },
  router: router,
};
</script>
