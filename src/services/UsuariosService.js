import Service from './Service'

export default {
  _getAll: (busca) => {
    return Service.get(`/usuario?pagina=${busca.page}`)
  },
  _getById: (busca) => {
    return Service.get(`/usuario/${parseInt(busca.id)}`)
  },
  _getByIdGrupo: (busca) => {
    return Service.get(`/usuario?id-grupo=${busca.usuario.id}&pagina=${busca.page}`)
  },
  _create: (form) => {
    return Service.post(`/usuario`, form)
  },
  _update: (form) => {
    return Service.put(`/usuario/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/usuario/${id}`)
  }
}
