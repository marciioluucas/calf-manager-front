import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/endereco${params}`)
  },
  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/endereco/${parseInt(busca.id)}${params}`)
  },
  _getBylogradouro: async (busca) => {
    if (typeof busca === 'string') {
      return Service.get(`/endereco?logradouro=${busca}`)
    }
    const params = Params.map(busca.params)
    return Service.get(`/endereco${params}`)
  },
  _getCep: (busca) => {
    return Service.get(`viacep.com.br/ws/${busca}/json`)
  },
  _create: (form) => {
    return Service.post(`/endereco`, form)
  },
  _update: (form) => {
    return Service.put(`/endereco/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/endereco/${id}`)
  }
}
