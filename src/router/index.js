import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/components/dashboard/Dashboard'
import ListagemAnimal from '@/components/animal/ListagemAnimal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: Dashboard
        },
        {
          path: 'animal/listar',
          component: ListagemAnimal
        }
      ]
    }
  ]
})
