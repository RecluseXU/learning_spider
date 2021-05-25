当一个导航触发时，全局前置守卫按照创建顺序调用。
守卫是异步解析执行，此时导航在所有守卫 `resolve` 完之前一直处于 等待中。

每个守卫方法接收三个参数：
* to: Route: 即将要进入的目标 路由对象
* from: Route: 当前导航正要离开的路由
* next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  * next(): 进行管道中的下一个钩子。
    如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  * next(false): 中断当前的导航。
    如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
  * next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。
    当前的导航被中断，然后进行一个新的导航。
    你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
  * next(error): 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

>建议
>确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。
>它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。




## 完整的导航解析流程
1. 导航被触发  
1. 在失活的组件里调用 beforeRouteLeave 守卫  
1. 调用全局的 beforeEach 守卫  
2. 在重用的组件里调用 beforeRouteUpdate 守卫  
3. 在路由配置里调用 beforeEnter  
4. 解析异步路由组件  
5. 在被激活的组件里调用 beforeRouteEnter  
6. 调用全局的 beforeResolve 守卫  
7. 导航被确认  
8. 调用全局的 afterEach 钩子  
9. 触发 DOM 更新  
10. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入  
