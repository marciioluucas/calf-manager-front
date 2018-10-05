import Service from './Service'
import Params from '../util/mapParams'

export const PessoasService = {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/pessoa${params}`)
  },

  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/pessoa/${parseInt(busca.id)}${params}`)
  },

  _getByNome: async (busca) => {
    if (typeof busca === 'string') {
      return Service.get(`/pessoa?nome=${busca}`)
    }
    const params = Params.map(busca.params)
    return Service.get(`/pessoa${params}`)
  },

  _getByIdEndereco: (busca) => {
    return Service.get(`/pessoa?id-endereco=${busca.endereco.id}&pagina=${busca.page}`)
  },

  _create: (form) => {
    return Service.post(`/pessoa`, form)
  },
  _update: (form) => {
    return Service.put(`/pessoa/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/pessoa/${id}`)
  }
}
