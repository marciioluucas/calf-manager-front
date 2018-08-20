import Service from './Service'

export default {
  _getAll: (busca) => {
    return Service.get(`/usuario?pagina=${busca.page}`)
  },
  _getById: (busca) => {
    return Service.get(`/usuario/${parseInt(busca.id)}`)
  },
  _getByNome: (busca) => {
    let continuacaoUrl = ''
    if (busca.page) {
      continuacaoUrl = `&pagina=${busca.page}`
    }
    return Service.get(`/usuario?nome=${busca.nome}${continuacaoUrl}`)
  },
  _create: (form) => {
    return Service.post(`/usuario`, form)
  }
}
