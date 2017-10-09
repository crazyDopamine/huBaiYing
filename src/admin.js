// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import 'vueg/css/transition-min.css'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

import {loadedMixins, common} from './common/mixins'
Vue.mixin(loadedMixins)
Vue.mixin(common)

import filters from './common/filters'
Vue.use(filters)

import {httpInterceptor} from './components/admin/interceptors'
Vue.http.interceptors.push(httpInterceptor)

import imgInput from './components/admin/widget/imgInput.widget.vue'
Vue.component('img-input',imgInput)

import editor from './components/admin/widget/editor.widget.vue'
Vue.component('editor',editor)

import './sass/admin/style.scss'
import app from './components/admin/main.vue'

//widget
// import VueQuillEditor from 'vue-quill-editor'
// Vue.use(VueQuillEditor)

let config = {
  render: h => h(app)
}

/* eslint-disable no-new */
window.vm = new Vue(config).$mount('#app-box')
