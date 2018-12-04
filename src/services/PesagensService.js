import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/pesagem${params}`)
  },
  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/pesagem/${parseInt(busca.id)}${params}`)
  },
  _create: (form) => {
    return Service.post(`/pesagem`, form)
  },
  _update: (form) => {
    return Service.put(`/pesagem/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/pesagem/${id}`)
  }
}
