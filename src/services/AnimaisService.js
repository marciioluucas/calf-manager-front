import Service from './Service'

export const AnimaisService = {
  _getAll: (busca) => {
    return Service.get(`/animal?vivo=${busca.vivo}&pagina=${busca.page}`)
  },
  _getById: (busca) => {
    return Service.get(`/animal/${parseInt(busca.id)}?vivo=${busca.vivo}`)
  },
  _getByNome: (busca) => {
    return Service.get(`/animal/${busca.nome}?vivo=${busca.vivo}&pagina=${busca.page}`)
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
  }
}
