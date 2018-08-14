import Service from './Service'

export default {
  _getAll: (busca) => {
    return Service.get(`/fazenda?pagina=${busca.page}`)
  },
  _getById: (busca) => {
    return Service.get(`/fazenda/${parseInt(busca.id)}`)
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
