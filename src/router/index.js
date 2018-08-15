import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/components/dashboard/Dashboard'
import ListagemAnimal from '@/components/animal/ListagemAnimal'
import ProntuarioAnimal from '@/components/animal/ProntuarioAnimal'
import CadastroAnimal from '@/components/animal/CadastroAnimal'

import CicloVida from '@/components/ciclos/CiclosVida'
import Peso from '@/components/pesagem/Pesagem'
import CadastroFazenda from '@/components/fazenda/CadastroFazenda'
import Lote from '@/components/lote/Lote'
import Laboratorio from '@/components/laboratorio/Laboratorio'
import ListagemFazenda from '@/components/fazenda/ListagemFazenda'

// Doencas
import CadastroDoenca from '@/components/doenca/CadastroDoenca'
import ListagemDoenca from '@/components/doenca/ListagemDoenca'

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
        },
        {
          name: 'CicloVida',
          path: 'ciclo/novo',
          component: CicloVida
        },
        {
          name: 'Lote',
          path: 'lote/novo',
          component: Lote
        },
        {
          name: 'CadastroFazenda',
          path: 'fazenda/novo',
          component: CadastroFazenda
        },
        {
          name: 'ListagemFazenda',
          path: 'fazenda/listagem',
          component: ListagemFazenda
        },
        {
          name: 'Pesagem',
          path: 'pesagem/novo',
          component: Peso
        },
        {
          name: 'Laboratorio',
          path: 'laboratorio/novo',
          component: Laboratorio
        },
        { //  Doencas
          name: 'CadastroDoenca',
          path: 'doenca/novo',
          component: CadastroDoenca
        },
        {
          name: 'ListagemDoenca',
          path: 'doenca/listagem',
          component: ListagemDoenca
        }
      ]
    }
  ]
})
