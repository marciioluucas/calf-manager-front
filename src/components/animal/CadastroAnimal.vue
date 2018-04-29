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
              />
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="animal.codigo_raca"
                label='Código da raça'

              />
            </v-flex>
            <!--<v-flex xs12 sm6 md2 lg3>-->
            <!--<v-text-field-->
            <!--label='Hora do Nascimento'-->

            <!--/>-->
            <!--</v-flex>-->
            <!--<v-flex xs12 sm6 md2 lg3>-->
            <!--<v-text-field-->
            <!--label='Hora da colostragem'-->

            <!--/>-->
            <!--</v-flex>-->
            <v-flex xs12 sm6 md4 lg4>
              <v-text-field
                v-model="animal.data_nascimento"
                mask="##/##/####"
                label='Nascimento'

              />
            </v-flex>
            <v-flex xs12 sm6 md4 lg4>
              <v-select
                :items="selectSexo"
                v-model="animal.sexo"
                item-text="text"
                item-value="value"
                label="Sexo"
                required
              />
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-select
                :items="selectFaseVida"
                v-model="animal.fase_vida"
                item-text="text"
                item-value="value"
                label="Fase da vida"
                required
              />
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
              <v-select
                label="Pesquise a mãe"
                autocomplete
                :loading="selectMae.loading"
                :items="selectMae.items"
                item-text="nome"
                required
                cache-items
                item-value="id"
                :search-input.sync="selectMae.search"
                v-model="animal.mae"
              />
            </v-flex>
            <v-flex xs12 sm4 md4 lg4 v-if="!animal.is_primogenito">
              <v-select
                label="Selecione o pai"
                autocomplete
                :loading="selectPai.loading"
                required
                cache-items
                :items="selectPai.items"
                item-text="nome"
                :search-input.sync="selectPai.search"
                v-model="animal.mae"
              />
            </v-flex>
            <v-flex xs12>
              <br/>
              <v-divider/>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Fazenda de locação do animal</span>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-select
                label="Selecione a fazenda"
                autocomplete
                :loading="selectFazenda.loading"
                required
                :items="selectFazenda.items"
                item-text="nome"
                item-value="id"
                cache-items
                :search-input.sync="selectFazenda.search"
                v-model="animal.fazenda"
                return-object=""
              />
            </v-flex>
            <v-flex xs6 sm3 md3 lg3>
              <v-text-field
                label='Limite'
                disabled
                :value="animal.fazenda.limite"
              />
            </v-flex>
            <v-flex xs6 sm3 md3 lg3>
              <v-text-field
                :value="animal.fazenda.quantidade_animais"
                disabled
                label='Quantidade de animais'
              />
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
              <v-text-field
                v-model="animal.peso"
                label='Peso em @ da primeira pesagem'
              />
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

  export default {
    name: 'cadastro-animal',
    data() {
      return {
        animal: {
          is_vivo: true,
          is_primogenito: false,
          sexo: 'f',
          fazenda: {
            nome: 'Não selecionado',
            limite: 'Limite indisponível',
            quantidade_animais: 0
          },
          peso: '',
          mae: {},
          pai: {}
        },
        selectSexo: [
          {text: 'Macho', value: 'm'},
          {text: 'Fêmea', value: 'f'}
        ],
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
      'selectMae.search': function (val) {
        console.log(val)
        val && this.getMaes(val)
      },
      'selectPai.search'(val) {
        val && this.getPais(val)
      }
    },
    mounted() {
    },
    methods: {
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
        let res = await AnimaisService._create(this.animal).catch(e => {
          console.log(e.response.data)
        });
        console.log(res.data)
      }
    }
  }
</script>

<style scoped>

</style>
