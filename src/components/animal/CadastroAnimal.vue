<template>
  <v-container grid-list-md>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>Cadastro de animal</h2>
          <span class='caption'>Aqui você poderá fazer o cadastro dos animais.</span>
        </div>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-flex xs12>
              <span class='title'>Informações gerais</span>
            </v-flex>

            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="animal.codigo_brinco"
                label='Código do Brinco'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="animal.codigo_raca"
                label='Código da raça'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4>
              <v-text-field
                v-model="animal.data_nascimento"
                mask="##/##/####"
                :return-masked-value="true"
                label='Nascimento'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 lg4>
              <v-select
                :items="selectSexo"
                v-model="animal.sexo"
                item-text="text"
                item-value="value"
                label="Sexo"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-select
                :items="selectFaseVida"
                v-model="animal.fase_vida"
                item-text="text"
                item-value="value"
                label="Fase da vida"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-container px-0>
                <v-tooltip bottom>
                  <v-switch label="É primogênito?"
                            slot="activator"
                            v-model="animal.is_primogenito"/>
                  <span>
                    Marque como verdadeiro se o animal
                    <br/>
                    não possui registros de pai e mãe
                  </span>
                </v-tooltip>

              </v-container>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4 v-if="!animal.is_primogenito">
              <v-autocomplete
                label="Pesquise a mãe"
                :loading="selectMae.loading"
                :items="selectMae.items"
                hide-no-data
                hide-selected
                item-text="nome"
                required
                cache-items
                item-value="id"
                :search-input.sync="selectMae.search"
                v-model="animal.mae"
              />
            </v-flex>
            <v-flex xs12 sm4 md4 lg4 v-if="!animal.is_primogenito">
              <v-autocomplete
                label="Selecione o pai"
                :loading="selectPai.loading"
                required
                hide-no-data
                hide-selected
                item-value="id"
                cache-items
                :items="selectPai.items"
                item-text="nome"
                :search-input.sync="selectPai.search"
                v-model="animal.pai"
              />
            </v-flex>
            <v-flex xs12>
              <br/>
              <v-divider></v-divider>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Fazenda de locação do animal</span>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-autocomplete
                v-model="animal.fazenda"
                :items="selectFazenda.items"
                :search-input.sync="selectFazenda.search"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Fazendas"
                placeholder="Comece digitando o nome da fazenda"
                return-object
              />
            </v-flex>
            <v-flex xs6 sm3 md3 lg3>
              <v-text-field
                :value="animal.fazenda.quantidade_animais"
                disabled
                label='Quantidade de animais'
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <br/>
              <v-divider/>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Saúde</span>
            </v-flex>
            <v-flex xs6>
              <v-switch
                label="Está vivo?"
                v-model="animal.is_vivo"
              />
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-layout wrap>
                <v-flex xs12 sm8 md8 lg8>
                  <v-text-field
                    v-model="animal.pesagem.peso"
                    label='Peso em @ da primeira pesagem'
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md4 lg4>
                  <v-text-field
                    mask="##/##/####"
                    :return-masked-value="true"
                    v-model="animal.pesagem.data"
                    label='Data'
                  ></v-text-field>
                </v-flex>
              </v-layout>

            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-layout wrap>
                <v-flex xs12 sm7 md7 lg7>
                  <v-autocomplete v-model="selectDoenca.selected"
                                  :items="selectDoenca.items"
                                  :search-input.sync="selectDoenca.search"
                                  hide-no-data
                                  hide-selected
                                  item-text="nome"
                                  item-value="id"
                                  label="Doenças"
                                  placeholder="Pesquisar por doença"
                                  return-object
                  />
                </v-flex>
                <v-flex xs12 sm3 md3 lg3>
                  <v-select
                    v-model="selectDoencaStatus.selected"
                    :items="selectDoencaStatus.items"
                    label="Status"></v-select>
                </v-flex>
                <v-flex xs12 sm1 md1 lg1>
                  <v-btn color="primary" fab small dark @click="addDoenca">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-flex xs12>
                <v-list two-line>
                  <template v-for="(item, index) in animal.doencas">
                    <v-list-tile
                      :key="index"
                      avatar
                      ripple>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">{{ item.descricao }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action-text>Excluir</v-list-tile-action-text>
                        <v-icon color="grey lighten-1" @click="removeDoenca(index)">
                          close
                        </v-icon>
                      </v-list-tile-action>

                    </v-list-tile>
                    <v-divider
                      v-if="index + 1 < animal.doencas.length"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list>
              </v-flex>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn @click="cadastrar">Enviar</v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import FazendasService from '../../services/FazendasService'
  import {AnimaisService} from '../../services/AnimaisService'
  import DoencasService from "../../services/DoencasService";

  export default {
    name: 'cadastro-animal',
    data() {
      return {
        animal: {
          nome: '',
          is_vivo: true,
          is_primogenito: false,
          sexo: 'F',
          fazenda: {
            id: 0,
            nome: 'Não selecionado',
            limite: 'Limite indisponível',
            quantidade_animais: 0
          },
          doencas: [],
          pesagem: {
            peso: 0,
            data: '',
          },
          mae: {},
          pai: {}
        },
        selectSexo: [
          {text: 'Macho', value: 'm'},
          {text: 'Fêmea', value: 'f'}
        ],
        selectDoenca: {
          loading: false,
          items: [],
          search: null,
          selected: {}
        },
        selectFazenda: {
          loading: false,
          items: [],
          search: null
        },
        selectFaseVida: [
          {text: 'Recém-nascido', value: 'RECEM_NASCIDO'},
          {text: 'Bezerro', value: 'BEZERRO'},
          {text: 'Novilho', value: 'NOVILHO'},
          {text: 'Adulto', value: 'ADULTO'}
        ],
        selectPai: {
          loading: false,
          items: [],
          search: null
        },
        selectMae: {
          loading: false,
          items: []
        },
        selectDoencaStatus: {
          items: [{text: 'CURADO', value: 'CURADO'}, {text: 'DOENTE', value: 'DOENTE'}],
          selected: {}
        },
        switchJaTeveDoenca: false,
        switchJaFoiPesado: false
      }
    },
    watch: {
      'animal.mae': function () {
        console.log(this.animal.mae)
      },
      'selectFazenda.search'(val) {
        val && this.getFazendas(val)
      },
      'selectDoenca.search'(val) {
        val && this.getDoencas(val)
      },
      'selectMae.search': function (val) {
        val && this.getMaes(val)
      },
      'selectPai.search'(val) {
        val && this.getPais(val)
      }
    },
    mounted() {
    },
    methods: {
      removeDoenca(index) {
        this.animal.doencas.splice(index, 1);
      },

      addDoenca() {
        const doenca = {
          id: this.selectDoenca.selected.id,
          nome: this.selectDoenca.selected.nome,
          descricao: this.selectDoenca.selected.descricao,
          situacao: this.selectDoencaStatus.selected,
        }
        this.animal.doencas.push(doenca);
      },

      async getDoencas(val) {
        let busca = {
          nome: val
        }
        this.selectDoenca.loading = true
        let res = await DoencasService._getAll({pagina: 1})
        if (val) {
          res = await DoencasService._getByNome(busca)
        }
        this.selectDoenca.items = res.data.doencas.data
        this.selectDoenca.loading = false
      },
      async getFazendas(val) {
        let busca = {
          nome: val
        }
        this.selectFazenda.loading = true
        let res = await FazendasService._getAll({pagina: 1})
        if (val) {
          res = await FazendasService._getByNome(busca)
        }
        this.selectFazenda.items = res.data.fazendas.data
        this.selectFazenda.loading = false
      },
      async getMaes(val) {
        const busca = {
          nome: val,
          params: {sexo: 'F'}
        }
        this.selectMae.loading = true
        let res = await AnimaisService._getByNome(busca)
        this.selectMae.items = res.data.animais.data
        this.selectMae.loading = false
      },

      async getPais(val) {
        const busca = {
          nome: val,
          params: {sexo: 'M'}
        }
        this.selectPai.loading = true
        let res = await AnimaisService._getByNome(busca)
        this.selectPai.items = res.data.animais.data
        this.selectPai.loading = false
      },
      async cadastrar() {
        console.log(this.animal)
        let res = await AnimaisService._create(this.animal).catch(e => {
          console.log(e.response.data)
        })
        console.log(res.data)
      }
    }
  }
</script>

<style scoped>

</style>
