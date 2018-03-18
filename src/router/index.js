import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/components/dashboard/Dashboard'
import ListagemAnimal from '@/components/animal/ListagemAnimal'
import ProntuarioAnimal from '@/components/animal/ProntuarioAnimal'
import CadastroAnimal from '@/components/animal/CadastroAnimal'

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
          name: 'ListagemAnimal',
          path: 'animal/listar',
          component: ListagemAnimal
        },
        {
          name: 'CadastroAnimal',
          path: 'animal/novo',
          component: CadastroAnimal
        },
        {
          name: 'ProntuarioAnimal',
          path: 'animal/:id',
          component: ProntuarioAnimal
        }
      ]
    }
  ]
})
