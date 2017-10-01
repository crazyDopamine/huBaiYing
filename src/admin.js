// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {loadedMixins, common} from './common/mixins'
import app from './components/admin/main.vue'
import filters from './common/filters'
import {httpInterceptor} from './common/interceptors'
import iView from 'iview'
import imgInput from './components/admin/widget/imgInput.widget.vue'
import editor from './components/admin/widget/editor.widget.vue'
import 'iview/dist/styles/iview.css'
import 'vueg/css/transition-min.css'
import './sass/admin/style.scss'


Vue.use(VueRouter)
Vue.use(iView)
Vue.component('img-input',imgInput)
Vue.component('editor',editor)
Vue.mixin(loadedMixins)
Vue.mixin(common)
Vue.use(filters)
Vue.use(VueResource)
Vue.http.interceptors.push(httpInterceptor)

//widget
// import VueQuillEditor from 'vue-quill-editor'
// Vue.use(VueQuillEditor)

let config = {
  render: h => h(app)
}

/* eslint-disable no-new */
window.vm = new Vue(config).$mount('#app-box')
