import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/components/dashboard/Dashboard'
// Animal
import CadastroAnimal from '@/components/animal/CadastroAnimal'
import ListagemAnimal from '@/components/animal/ListagemAnimal'
import ProntuarioAnimal from '@/components/animal/ProntuarioAnimal'

import CicloVida from '@/components/ciclos/CiclosVida'
import Peso from '@/components/pesagem/Pesagem'
// Fazenda
import CadastroFazenda from '@/components/fazenda/CadastroFazenda'
import ListagemFazenda from '@/components/fazenda/ListagemFazenda'
// Lote
import CadastroLote from '@/components/lote/CadastroLote'
import ListagemLote from '@/components/lote/ListagemLote'
import Laboratorio from '@/components/laboratorio/Laboratorio'
// medicamento
import CadastroMedicamento from '@/components/laboratorio/CadastroMedicamento'
// cargo
import CadastroCargo from '@/components/cargo/CadastroCargo'
// funcionario
import CadastroFuncionario from '@/components/funcionario/CadastroFuncionario'
// Grupo
import CadastroGrupo from '@/components/grupo/CadastroGrupo'
// Permissão
import CadastroPermissao from '@/components/permissao/CadastroPermissao'
// Doencas
import CadastroDoenca from '@/components/doenca/CadastroDoenca'
import ListagemDoenca from '@/components/doenca/ListagemDoenca'

import CadastroUsuario from '@/components/usuario/CadastroUsuario'
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
          name: 'CadastroLote',
          path: 'lote/novo',
          component: CadastroLote
        },
        {
          name: 'ListagemLote',
          path: 'lote/listagem',
          component: ListagemLote
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
        //  Doenca
        {
          name: 'CadastroDoenca',
          path: 'doenca/novo',
          component: CadastroDoenca
        },
        {
          name: 'ListagemDoenca',
          path: 'doenca/listagem',
          component: ListagemDoenca
        },
        // Usuario
        {
          name: 'CadastroUsuario',
          path: 'usuario/novo',
          component: CadastroUsuario
        },
        // Medicamento
        {
          name: 'CadastroMedicamento',
          path: 'medicamento/novo',
          component: CadastroMedicamento
        },
        // Funcionario
        {
          name: 'CadastroFuncionario',
          path: 'funcionario/novo',
          component: CadastroFuncionario
        },
        {
          name: 'CadastroCargo',
          path: 'cargo/novo',
          component: CadastroCargo
        },
        {
          name: 'CadastroGrupo',
          path: 'grupo/novo',
          component: CadastroGrupo
        },
        {
          name: 'CadastroPermissao',
          path: 'permissao/novo',
          component: CadastroPermissao
        }
      ]
    }
  ]
})
