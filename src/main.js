import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router';
import api from './api/index';
import store from './store';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)  
Vue.use(VXETable)

Vue.prototype.$api = api;
// Vue.prototype.$url = 'http://192.168.1.128:8094/admin'
// Vue.prototype.$url = 'http://192.168.50.142:9013'
Vue.prototype.$url = 'https://pifa.5laoye.com'

Vue.use(ElementUI);
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

router.beforeEach((to, from, next) => {
  console.log(to)
  // 如果有token 说明该用户已登陆
  if (sessionStorage.getItem("isLogin")=='true') {
    // 在已登陆的情况下访问登陆页会重定向到首页
    next()
  } else {
    // 没有登陆则访问任何页面都重定向到登陆页
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
