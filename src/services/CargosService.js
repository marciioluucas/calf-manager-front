import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/cargo${params}`)
  },
  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/cargo/${parseInt(busca.id)}${params}`)
  },
  _getByNome: async (busca) => {
    if (typeof busca === 'string') {
      return Service.get(`/cargo?nome=${busca}`)
    }
    const params = Params.map(busca.params)
    return Service.get(`/cargo${params}`)
  },
  _create: (form) => {
    return Service.post(`/cargo`, form)
  },
  _update: (form) => {
    return Service.put(`/cargo/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/cargo/${id}`)
  }
}
