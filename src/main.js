// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/main/main.vue'

import  './sass/main/style.scss'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import widgetHeader from './components/main/widget/header.widget.vue'
Vue.component('hby-header',widgetHeader)
/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app-box')
