// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './components/main/app.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import  './sass/main/style.scss'
import VueRouter from 'vue-router'
import filters from './common/filters'
import {loadedMixins, common} from './common/mixins'

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(filters)
Vue.mixin(loadedMixins)
Vue.mixin(common)

/* eslint-disable no-new */
let config = {
  render: h => h(app)
}

new Vue(config).$mount('#app-box')
