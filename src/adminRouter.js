
import VueRouter from 'vue-router'
import home from './components/admin/home.vue'

const routes = [{
  path: '/',
  component: home
}]

export default new VueRouter({
  routes
})
