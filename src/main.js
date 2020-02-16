import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import routes from './route';

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.use(ViewUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。


// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const routers = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

routers.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  next();
});

routers.afterEach(() => {
  ViewUI.LoadingBar.finish();
});


new Vue({
  render: h => h(App),
  router: routers
}).$mount('#app');
