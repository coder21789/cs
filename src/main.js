// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import layer from 'vue-layer'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/js/filiter'
import VueClipboards from 'vue-clipboards'
import VueCookie from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueClipboards)
Vue.use(VueCookie)
Vue.prototype.$layer = layer(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
