import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    return Service.get(`/usuario?pagina=${busca.page}`)
  },
  _getById: (busca) => {
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
    return Service.get(`/usuario?id-grupo=${busca.usuario.id}&pagina=${busca.page}`)
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
