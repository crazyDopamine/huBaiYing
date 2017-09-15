
import VueRouter from 'vue-router'
import main from './components/main/main.vue'
import adviserMain from './components/main/adviser.main.vue'
import adviserDetail from './components/main/adviser.detail.vue'
import problemMain from './components/main/problem.main.vue'
import problemDetail from './components/main/problem.detail.vue'
import projectList from './components/main/project.list.vue'
import projectForm from './components/main/project.form.vue'
import projectDetail from './components/main/project.detail.vue'
import serviceMain from './components/main/service.main.vue'
import serviceDetail from './components/main/service.detail.vue'

const routes = [{
  path: '/',component: main,
  path: '/adviserMain',component: adviserMain,
  path: '/adviserDetail',component: adviserDetail,
  path: '/problemMain',component: problemMain,
  path: '/problemDetail',component: problemDetail,
  path: '/projectList',component: projectList,
  path: '/projectForm',component: projectForm,
  path: '/projectDetail',component: projectDetail,
  path: '/serviceMain',component: serviceMain,
  path: '/serviceDetail',component: serviceDetail
}]

export default new VueRouter({
  routes
})
