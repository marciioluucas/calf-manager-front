import Service from './Service'
import Params from '../util/mapParams'

export const FuncionariosService = {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/funcionario${params}`)
  },

  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/funcionario/${parseInt(busca.id)}${params}`)
  },

  _getByIdCargo: (busca) => {
    return Service.get(`/funcionario?id-cargo=${busca.cargo.id}&pagina=${busca.page}`)
  },
  _getByIdUsuario: (busca) => {
    return Service.get(`/funcionario?id-usuariolote=${busca.usuario.id}&pagina=${busca.page}`)
  },
  _getByIdFazenda: (busca) => {
    return Service.get(`/funcionario?id-fazenda=${busca.fazenda.id}&pagina=${busca.page}`)
  },
  _getByIdPessoa: (busca) => {
    return Service.get(`/funcionario?id-pessoa=${busca.pessoa.id}&pagina=${busca.page}`)
  },

  _create: (form) => {
    return Service.post(`/funcionario`, form)
  },
  _update: (form) => {
    return Service.put(`/funcionario/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/funcionario/${id}`)
  }
}
