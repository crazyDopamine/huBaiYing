
import VueRouter from 'vue-router'
import home from './components/main/home.vue'

const routes = [{
  path: '/',
  component: home
}]

export default new VueRouter({
  routes
})
