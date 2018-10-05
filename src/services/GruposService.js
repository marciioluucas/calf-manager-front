import Service from './Service'
import Params from '../util/mapParams'

export const GruposService = {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/grupo${params}`)
  },

  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/grupo/${parseInt(busca.id)}${params}`)
  },

  _getByNome: async (busca) => {
    if (typeof busca === 'string') {
      return Service.get(`/grupo?nome=${busca}`)
    }
    const params = Params.map(busca.params)
    return Service.get(`/grupo${params}`)
  },

  _getByIdPermissao: (busca) => {
    return Service.get(`/grupo?id-permissao=${busca.grupo.id}&pagina=${busca.page}`)
  },

  _create: (form) => {
    return Service.post(`/grupo`, form)
  },
  _update: (form) => {
    return Service.put(`/grupo/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/grupo/${id}`)
  }
}
