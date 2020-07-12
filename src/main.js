// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL="https://www.liulongbin.top:8888/api/private/v1/"

// 请求拦截
axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem("token")
  console.log(config)
  // 在最后必须 return config
  return config
})

// httpbin.org/
// http://119.23.53.78:8888/api/private/v1/
Vue.use(Element)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
