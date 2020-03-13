import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import routes from './route';

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.use(ViewUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

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

Vue.filter('humanFileSize', function (size) {
  let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
});

new Vue({
  render: h => h(App),
  router: routers
}).$mount('#app');
