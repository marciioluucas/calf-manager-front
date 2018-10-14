import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    return Service.get(`/medicamento?pagina=${busca.page}`)
  },

  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/medicamento/${parseInt(busca.id)}${params}`)
  },

  _getByNome: async (busca) => {
    if (typeof busca === 'string') {
      return Service.get(`/medicamento?nome=${busca}`)
    }
    const params = Params.map(busca.params)
    return Service.get(`/medicamento${params}`)
  },
  _create: (form) => {
    return Service.post(`/medicamento`, form)
  },
  _update: (form) => {
    return Service.put(`/medicamento/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/medicamento/${id}`)
  }
}
