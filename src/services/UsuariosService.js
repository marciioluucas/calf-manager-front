import Service from './Service'
import Params from '../util/mapParams'

export default {
	_login: (params) => {
		return Service.post('/login', params);
	},
	_getAuth: (params) => {
		return Service.get(`/login?auth=${params}`);
	},
	_getAll: (busca) => {
		const params = Params.map(busca.params)
		return Service.get(`/usuario${params}`)
	},
	_getById: (busca) => {
		Service.defaults.headers.common['Authorization'] = localStorage.getItem('token')
		return Service.get(`/usuario/${parseInt(busca.id)}`)
	},
	_getByLogin: async (busca) => {
		if (typeof busca === 'string') {
			return Service.get(`/usuario?login=${busca}`)
		}
		const params = Params.map(busca.params)
		return Service.get(`/usuario${params}`)
	},
	_getByIdGrupo: (busca) => {
		return Service.get(`/usuario?grupo_id=${busca.grupo_id}`)
	},
	_getByIdFuncionario: (busca) => {
		return Service.get(`/usuario?funcionario_id=${busca.funcionario_id}`)
	},
	_create: (form) => {
		return Service.post(`/usuario`, form)
	},
	_update: (form) => {
		return Service.put(`/usuario/${form.id}`, form)
	},
	_delete: (id) => {
		return Service.delete(`/usuario/${id}`)
	}
}
