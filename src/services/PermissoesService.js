import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/permissao${params}`)
  },
  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/permissao/${parseInt(busca.id)}${params}`)
  },
  _getByNome: async (busca) => {
    if (typeof busca === 'string') {
      return Service.get(`/permissao?nome_modulo=${busca}`)
    }
    const params = Params.map(busca.params)
    return Service.get(`/permissao${params}`)
  },
  _create: (form) => {
    return Service.post(`/permissao`, form)
  },
  _update: (form) => {
    return Service.put(`/permissao/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/permissao/${id}`)
  }
}
