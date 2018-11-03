import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/doenca${params}`)
  },
  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/doenca/${parseInt(busca.id)}${params}`)
  },
  _getByNome: (busca) => {
    let continuacaoUrl = ''
    if (busca.params.pagina) {
      continuacaoUrl = `&pagina=${busca.params.pagina}`
    }
    return Service.get(`/doenca?nome=${busca.nome}${continuacaoUrl}`)
  },
  _create: (form) => {
    return Service.post(`/doenca`, form)
  },
  _update: (form) => {
    return Service.put(`/doenca/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/doenca/${id}`)
  }
}
