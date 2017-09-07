// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './components/main/app.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import  './sass/main/style.scss'
import VueRouter from 'vue-router'
import filters from './common/filters'

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(filters)

/* eslint-disable no-new */
let config = {
  render: h => h(app)
}

window.vm = new Vue(config).$mount('#app-box')
