
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
import register from './components/main/register.vue'
import userMain from './components/main/user.main.vue'

const routes = [
  {path: '/',redirect: '/main'},
  {path: '/main',component: main},
  {path: '/main',component: main},
  {path: '/adviserMain',component: adviserMain},
  {path: '/adviserDetail/:id',component: adviserDetail},
  {path: '/problemMain',component: problemMain},
  {path: '/problemMain/:title',component: problemMain},
  {path: '/problemDetail/:id',component: problemDetail},
  {path: '/projectList',component: projectList},
  {path: '/projectForm',component: projectForm},
  {path: '/projectDetail/:id',component: projectDetail},
  {path: '/serviceMain',component: serviceMain},
  {path: '/serviceDetail/:id',component: serviceDetail},
  {path: '/register',component: register},
  {path: '/userMain',component: userMain}
]

export default new VueRouter({
  routes
})
