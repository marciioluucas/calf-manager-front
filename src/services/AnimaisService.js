import Service from './Service'
import Params from '../util/mapParams'

export const AnimaisService = {
  _getAll: (busca) => {
    return Service.get(`/animal?vivo=${busca.vivo}&pagina=${busca.page}`)
  },

  _getById: (busca) => {
    return Service.get(`/animal/${parseInt(busca.id)}?vivo=${busca.vivo}`)
  },

  _getByNome: async (busca) => {
    if (typeof busca === 'string') {
      return Service.get(`/animal/${busca.split(' ').join('-')}`)
    }
    const paramsArray = Params.map(busca.params)
    return Service.get(`/animal/${busca.nome.split(' ').join('-')}?${paramsArray.join('&')}`)
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
      id_pesagem: form.id_pesagem,
      id_lote: form.id_lote,
      id_fazenda: form.id_fazenda
    })
  }
}
