import VueRouter from 'vue-router'
import adviserManage from './components/admin/adviser.vue'
import problemManage from './components/admin/problem.vue'
import projectManage from './components/admin/project.vue'
import serviceManage from './components/admin/service.vue'
import businessTypeDetail from './components/admin/businessTypeDetail.vue'
import businessType from './components/admin/businessType.vue'
import dictionary from './components/admin/dictionary.vue'
import userManage from './components/admin/user.vue'
import cityManage from './components/admin/city.vue'

const routes = [
  {path: '/',redirect: '/userManage'},
  {path: '/projectManage', component: projectManage},
  {path: '/serviceManage', component: serviceManage},
  {path: '/userManage', component: userManage},
  {path: '/problemManage', component: problemManage},
  {path: '/adviserManage', component: adviserManage},
  {path: '/businessTypeDetail', component: businessTypeDetail},
  {path: '/businessTypeManage', component: businessType},
  {path: '/dictionaryManage', component: dictionary},
  {path: '/cityManage', component: cityManage},
]

export default new VueRouter({
  routes
})
