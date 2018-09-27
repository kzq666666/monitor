import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router"
import { routes } from "./router"
// import 'lib-flexible'
// 全局使用axios
import axios from 'axios'
// 导入全局变量
import global_ from './components/Global'
Vue.prototype.GLOBAL = global_
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,    //导入router
})

window.addEventListener("unload", function (e) {
  if (!this.sessionStorage.token) {
    let logout_time = new Date()
    this.localStorage.setItem('logout_time', logout_time.toLocaleString());
  }

});