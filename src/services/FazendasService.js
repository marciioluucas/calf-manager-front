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
    let continuacaoUrl = ''
    if (busca.page) {
      continuacaoUrl = `&pagina=${busca.page}`
    }
    return Service.get(`/fazenda?nome=${busca.nome}${continuacaoUrl}`)
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
