// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import iView from 'iview'
import 'iview/dist/styles/iview.css';
Vue.use(iView)

import filters from './common/filters'
Vue.use(filters)

import {loadedMixins, common} from './common/mixins'
Vue.mixin(loadedMixins)
Vue.mixin(common)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import app from './components/main/app.vue'
import  './sass/main/style.scss'

/* eslint-disable no-new */
let config = {
  render: h => h(app)
}

new Vue(config).$mount('#app-box')
