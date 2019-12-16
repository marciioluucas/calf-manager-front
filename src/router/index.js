import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/components/dashboard/Dashboard'
import Login from '@/components/login/Login'
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
import CadastroFuncionario from '@/components/funcionario/CadastroFuncionario02'
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
// Usuario
import PerfilUsuario from '@/components/usuario/PerfilUsuario'
import CadastroUsuario from '@/components/usuario/CadastroUsuario'
import ListagemUsuario from '@/components/usuario/ListagemUsuario'

// Dose
import CadastroDose from '@/components/dose/CadastroDose'
import CadastroEntradaDose from '@/components/dose/CadastroDose'
import ListagemDose from '@/components/dose/ListagemDose'
// Hemograma
import CadastroHemograma from '@/components/hemograma/CadastroHemograma'
import ListagemHemograma from '@/components/hemograma/ListagemHemograma'
import ListaHemograma from '@/components/hemograma/ListaHemograma'
import UsuariosService from '../services/UsuariosService';

Vue.use(Router)


const router = new Router({
	routes: [
		{
			path: '/',
			redirect: 'auth/dashboard',
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/auth',
			name: 'Layout',
			component: Layout,
			meta: {
				requireAuth: true,
			},
			children: [
				{
					path: 'dashboard',
					name: 'Dashboard',
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
					name: 'PerfilUsuario',
					path: 'usuario/perfil',
					component: PerfilUsuario
				},
				{
					name: 'CadastroUsuario',
					path: 'usuario/novo',
					component: CadastroUsuario
				},
				{
					name: 'ListagemUsuario',
					path: 'usuario/listagem',
					component: ListagemUsuario
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
				{
					name: 'ListagemDose',
					path: 'dose/listagem',
					component: ListagemDose
				},
				// Hemograma
				{
					name: 'CadastroHemograma',
					path: 'hemograma/novo',
					component: CadastroHemograma
				},
				{
					name: 'ListagemHemograma',
					path: 'hemograma/listagem',
					component: ListagemHemograma
				},
				{
					name: 'ListaHemograma',
					path: 'hemograma/lista',
					component: ListaHemograma
				}
			],
		},
		{
			path: '*',
			redirect: 'auth/dashboard',
		}
	]
});

router.beforeEach((to, from, next) => {
	let isDelegated = false;

	for (let matched = (to.matched || []), i = matched.length; i--;) {
		const route = matched[i];

		if (route.beforeEnter) {
			isDelegated = true;
			route.beforeEnter(to, from, next);
		}
	}

	!isDelegated && next();

	
	
	const lsToken = localStorage.getItem('token');
	
	if (lsToken && to.fullPath === '/login') {
		next('/auth/dashboard');
	}
	if (to.matched.some(record => record.meta.requireAuth)) {
		if (!lsToken && to.fullPath !== '/login') {
			next('/login?q=unauthenticated');
		} else {
			next();
		}
	} else {
		next();
	}
});



export default router;