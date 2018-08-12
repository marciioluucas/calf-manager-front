import Service from './Service'

export default {
    _getAll: (busca) => {
        return Service.get(`/doenca?pagina=${busca.page}`)
    },
    _getById: (busca) => {
        return Service.get(`/doenca/${parseInt(busca.id)}`)
    },
    _getByNome: (busca) => {
        let continuacaoUrl = ''
        if (busca.page) {
            continuacaoUrl = `&pagina=${busca.page}`
        }
        return Service.get(`/doenca?nome=${busca.nome}${continuacaoUrl}`)
    }
}
