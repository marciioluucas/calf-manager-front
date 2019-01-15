import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/fazenda${params}`)
  },
  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/fazenda/${parseInt(busca.id)}${params}`)
  },
  _getByNome: (busca) => {
    if (typeof busca === 'string') {
      return Service.get(`/fazenda?nome=${busca}`)
    }
  },
  _create: (form) => {
    return Service.post('/fazenda', form)
  },
  _update: (form) => {
    return Service.put(`/fazenda/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/fazenda/${id}`)
  }
}
