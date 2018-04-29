import Service from './Service'
import Params from '../util/mapParams'

export const AnimaisService = {
  _getAll: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/animal${params}`)
  },

  _getById: (busca) => {
    const params = Params.map(busca.params)
    return Service.get(`/animal/${parseInt(busca.id)}${params}`)
  },

  _getByNome: async (busca) => {
    if (typeof busca === 'string') {
      return Service.get(`/animal/${busca.split(' ').join('-')}`)
    }
    const params = Params.map(busca.params)
    return Service.get(`/animal/${busca.nome.split(' ').join('-')}${params}`)
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
  },

  _create: (form) => {
    return Service.post(`/animal`, {
      nome_animal: form.nome_animal,
      codigo_brinco: form.codigo_brinco,
      codigo_raca: form.codigo_raca,
      data_nascimento: form.data_nascimento,
      sexo: form.sexo,
      is_vivo: form.is_vivo,
      fase_vida: form.fase_vida,
      usuario_cadastro: form.usuario_cadastro,
      id_lote: form.id_lote,
      id_fazenda: form.id_fazenda,
      id_mae: form.mae,
      id_pai: form.pai,
      peso: form.peso
    })
  }
}
