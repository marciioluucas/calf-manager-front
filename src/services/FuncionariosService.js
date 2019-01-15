import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/funcionario${params}`)
  },
  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/funcionario/${parseInt(busca.id)}${params}`)
  },
  _getByNome: (busca) =>{
    if(typeof busca === 'string'){
      return Service.get(`/funcionario?nome=${busca}`)
    }
  },
  _getByIdCargo: (busca) => {
    return Service.get(`/funcionario?cargo_id=${busca.cargo.id}&pagina=${busca.page}`)
  },
  _getByIdUsuario: (busca) => {
    return Service.get(`/funcionario?usuario_id=${busca.usuario.id}&pagina=${busca.page}`)
  },
  _getByIdFazenda: (busca) => {
    return Service.get(`/funcionario?fazenda_id=${busca.fazenda.id}&pagina=${busca.page}`)
  },
  _getByIdPessoa: (busca) => {
    return Service.get(`/funcionario?pessoa_id=${busca.pessoa.id}&pagina=${busca.page}`)
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
