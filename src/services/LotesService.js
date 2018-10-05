import Service from './Service'

export default {
  _getAll: () => {
    return Service.get('/lote')
  },
  _getById: (id) => {
    return Service.get(`/lote/${parseInt(id)}`)
  },
  _getByCodigo: (codigo) => {
    return Service.get(`/lote?codigo=${codigo}`)
  },
  _create: (form) => {
    return Service.post(`/lote`, form)
  },
  _update: (form) => {
    return Service.put(`/lote/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/lote/${id}`)
  }
}
