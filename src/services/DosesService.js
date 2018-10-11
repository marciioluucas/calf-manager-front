import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    return Service.get(`/dose?pagina=${busca.page}`)
  },
  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/dose/${parseInt(busca.id)}${params}`)
  },
  _create: (form) => {
    return Service.post(`/dose`, form)
  },
  _update: (form) => {
    return Service.put(`/dose/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/dose/${id}`)
  }
}
