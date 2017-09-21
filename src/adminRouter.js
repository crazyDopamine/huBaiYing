import VueRouter from 'vue-router'
import adviserManage from './components/admin/adviser.vue'
import problemManage from './components/admin/problem.vue'
import projectManage from './components/admin/project.vue'
import serviceManage from './components/admin/service.vue'
import userManage from './components/admin/user.vue'

const routes = [
  {path: '/',redirect: '/userManage'},
  {path: '/projectManage', component: projectManage},
  {path: '/serviceManage', component: serviceManage},
  {path: '/userManage', component: userManage},
  {path: '/problemManage', component: problemManage},
  {path: '/adviserManage', component: adviserManage},
  ]

export default new VueRouter({
  routes
})
