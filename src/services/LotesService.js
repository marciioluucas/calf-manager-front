import Service from './Service'
import Params from '../util/mapParams'

export default {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/lote${params}`)
  },
  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/lote/${parseInt(busca.id)}${params}`)
  },
  _getByCodigo: async (busca) => {
    if(typeof busca === 'string'){
      return Service.get(`/lote?codigo=${busca}`)
    }
    const params = Params.map(busca.params)
    return Service.get(`/lote${params}`)
  },
  _getByFazenda: async (busca) =>{
    return Service.get(`/lote?fazenda_id=${busca}`)
  },
  _getQuantidadeLotes: async () => {
    Service.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    return Service.get(`/lote?contagem=true`)
  },
  _create: (form) => {
    return Service.post(`/lote`, form)
  },
  _update: (form) => {
    return Service.put(`/lote/${form.id}`, form)
  },
  _delete: (id) => {
    return Service.delete(`/lote/${id}`)
  }
}
