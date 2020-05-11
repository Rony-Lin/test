import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import toast from "./components/common/toast"
// 图片懒加载（用到时在加载）
import Vuelazyload from "vue-lazyload"
import FastClick from "fastclick"

// 默认情况下，$bus为undefined，因此利用vue原型赋值
Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

// 安装Toast插件
Vue.use(toast)

// 安装并使用
Vue.use(Vuelazyload,{
  loading:require("./assets/img/common/placeholder.png")
});

// 解决移动端300ms延迟
FastClick.attach(document.body);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
