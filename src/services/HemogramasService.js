import Service from './Service'
import Params from '../util/mapParams'

export default {
    _getAll: (busca) => {
      const params = Params.map(busca.params)
      return Service.get(`/hemograma${params}`)
    },
    _getById: (busca) => {
      const params = Params.map(busca.params)
      return Service.get(`/hemograma/${parseInt(busca.id)}${params}`)
    },
    _getByAnimalId: (busca) => {
      const params = Params.map(busca.params)
      return Service.get(`/hemograma?animal_id=${busca.id}${params}`)
    }, 
    _getByFuncionarioId: (busca) => {
      const params = Params.map(busca.params)
      return Service.get(`/hemograma?funcionario_id=${busca.id}${params}`)
    },
    _getGraficoMonitorDeSaude: (id) => {
      return Service.get(`/graph?module=hemograma&chart=monitor-de-saude&animal=${id}`)
    },
    _create: (form) => {
      return Service.post(`/hemograma`, form)
    },
    _update: (form) => {
      return Service.put(`/hemograma/${form.id}`, form)
    },
    _delete: (id) => {
      return Service.delete(`/hemograma/${id}`)
    }
}
