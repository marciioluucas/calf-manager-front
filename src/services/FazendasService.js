import Service from './Service'
import Params from "../util/mapParams";

export default {
  _getAll: (busca) => {
    return Service.get(`/fazenda?pagina=${busca.page}`)
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
  }
}
