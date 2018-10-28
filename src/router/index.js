import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/components/dashboard/Dashboard'
// Animal
import CadastroAnimal from '@/components/animal/CadastroAnimal'
import ListagemAnimal from '@/components/animal/ListagemAnimal'
import ProntuarioAnimal from '@/components/animal/ProntuarioAnimal'

import CicloVida from '@/components/ciclos/CiclosVida'
// Peso
import Peso from '@/components/pesagem/Pesagem'
import ListagemPesagem from '@/components/pesagem/ListagemPesagem'

// Fazenda
import CadastroFazenda from '@/components/fazenda/CadastroFazenda'
import ListagemFazenda from '@/components/fazenda/ListagemFazenda'
// Lote
import CadastroLote from '@/components/lote/CadastroLote'
import ListagemLote from '@/components/lote/ListagemLote'
import Laboratorio from '@/components/laboratorio/Laboratorio'
// medicamento
import CadastroMedicamento from '@/components/medicamento/CadastroMedicamento'
import ListagemMedicamento from '@/components/medicamento/ListagemMedicamento'
// cargo
import CadastroCargo from '@/components/cargo/CadastroCargo'
import ListagemCargo from '@/components/cargo/ListagemCargo'
// funcionario
import CadastroFuncionario from '@/components/funcionario/CadastroFuncionario'
import ListagemFuncionario from '@/components/funcionario/ListagemFuncionario'
// Grupo
import CadastroGrupo from '@/components/grupo/CadastroGrupo'
import ListagemGrupo from '@/components/grupo/ListagemGrupo'
// Permissão
import CadastroPermissao from '@/components/permissao/CadastroPermissao'
import ListagemPermissao from '@/components/permissao/ListagemPermissao'
// Doencas
import CadastroDoenca from '@/components/doenca/CadastroDoenca'
import ListagemDoenca from '@/components/doenca/ListagemDoenca'

import CadastroUsuario from '@/components/usuario/CadastroUsuario'
// Dose
import CadastroDose from '@/components/dose/CadastroDose'
import CadastroHemograma from '@/components/hemograma/CadastroHemograma'
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
          name: 'ListagemPesagem',
          path: 'pesagem/listagem',
          component: ListagemPesagem
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
        {
          name: 'ListagemMedicamento',
          path: 'medicamento/listagem',
          component: ListagemMedicamento
        },
        // Funcionario
        {
          name: 'CadastroFuncionario',
          path: 'funcionario/novo',
          component: CadastroFuncionario
        },
        {
          name: 'ListagemFuncionario',
          path: 'funcionario/listagem',
          component: ListagemFuncionario
        },
        // Cargo
        {
          name: 'CadastroCargo',
          path: 'cargo/novo',
          component: CadastroCargo
        },
        {
          name: 'ListagemCargo',
          path: 'cargo/listagem',
          component: ListagemCargo
        },
        // Grupo
        {
          name: 'CadastroGrupo',
          path: 'grupo/novo',
          component: CadastroGrupo
        },
        {
          name: 'ListagemGrupo',
          path: 'grupo/listagem',
          component: ListagemGrupo
        },
        // Permissão
        {
          name: 'CadastroPermissao',
          path: 'permissao/novo',
          component: CadastroPermissao
        },
        {
          name: 'ListagemPermissao',
          path: 'permissao/listagem',
          component: ListagemPermissao
        },
        // Dose
        {
          name: 'CadastroDose',
          path: 'dose/novo',
          component: CadastroDose
        },
        // Hemograma
        {
          name: 'CadastroHemograma',
          path: 'hemograma/novo',
          component: CadastroHemograma
        }

      ]
    }
  ]
})
