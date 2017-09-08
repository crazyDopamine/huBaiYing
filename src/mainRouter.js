
import VueRouter from 'vue-router'
import main from './components/main/main.vue'

const routes = [{
  path: '/',component: main,
  path: '/main',component: main
}]

export default new VueRouter({
  routes
})
