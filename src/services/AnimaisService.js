import Service from './Service'

export const AnimaisService = {
  _getAll: () => {
    return Service.get('/animal')
  },
  _getById: (id) => {
    return Service.get(`/animal/${parseInt(id)}`)
  },
  _getByNome: (nome) => {
    return Service.get(`/animal/${nome}`)
  },
  _getByIdLote: (idLote) => {
    return Service.get(`/animal?lote=${idLote}`)
  }
}
