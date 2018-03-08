import Service from './Service'

export const LotesService = {
  _getAll: () => {
    return Service.get('/lote')
  },
  _getById: (id) => {
    return Service.get(`/lote/${parseInt(id)}`)
  },
  _getByCodigo: (codigo) => {
    return Service.get(`/lote?codigo=${codigo}`)
  }
}
