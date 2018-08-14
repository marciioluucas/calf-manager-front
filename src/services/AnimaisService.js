import Service from './Service'
import Params from '../util/mapParams'

export const AnimaisService = {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/animal${params}`)
  },

  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/animal/${parseInt(busca.id)}${params}`)
  },

  _getByNome: async (busca) => {
    if (typeof busca === 'string') {
      return Service.get(`/animal?nome=${busca}`)
    }
    const params = Params.map(busca.params)
    return Service.get(`/animal${params}`)
  },

  _getByIdLote: (busca) => {
    return Service.get(`/animal?id-lote=${busca.lote.id}&vivo=${busca.vivo}&pagina=${busca.page}`)
  },

  _getByIdLoteAndName: (busca) => {
    return Service.get(`/animal/${busca.nome}?id-lote=${busca.lote.id}&vivo=${busca.vivo}&pagina=${busca.page}`)
  },

  _getGraficoGanhoDePeso: (id) => {
    return Service.get(`/graph?module=pesagem&chart=ganho-de-peso&animal=${id}`)
  },

  _getGraficoHereditariedade: (id) => {
    return Service.get(`graph?module=familia&chart=arvore-genealogica&id-filho=${id}`)
  },

  _create: (form) => {
    return Service.post(`/animal`, form)
  },
  _createPesagem: (form) => {
    return Service.post('/pesagem', form)
  }
}
