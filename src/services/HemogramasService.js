import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/hemograma${params}`)
  },
  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/hemograma/${parseInt(busca.id)}${params}`)
  },
  _update: (form) => {
    return Service.put(`/hemograma/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/hemograma/${id}`)
  }
}
