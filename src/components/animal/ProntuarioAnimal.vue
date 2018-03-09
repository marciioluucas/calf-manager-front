<template>
  <v-container grid-list-md>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h2 class="title mb-0">Prontuário animal</h2>
          <span class="caption">Aqui você poderá ver todas as informações pertencentes a este animal.</span>
        </div>
      </v-card-title>

      <v-card-text>

        <v-form>
          <v-layout row wrap>
            <v-flex xs12>
              <span class="title">Informações gerais</span>
            </v-flex>

            <v-flex xs12 sm8 md8 lg8>
              <v-text-field
                label="Nome"
                v-model="animal.nome"
                disabled
              />
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-text-field
                label="Código do Brinco"
                v-model="animal.codigo_brinco"
                disabled
              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="Código da raça"
                v-model="animal.codigo_raca"
                disabled
              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="Sexo"
                v-model="animal.sexo"
                disabled
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                label="Fase da vida"
                v-model="animal.fase_vida"
                disabled
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                label="Vivo?"
                v-model="animal.is_vivo ? 'SIM' : 'NÃO'"
                disabled
              />
            </v-flex>

            <v-flex xs12 sm12 md6 lg6>
              <span class="title">Histórico clínico</span>
              <v-data-table
                :headers="headers"
                :items="animal.doencas"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="">{{ props.item.nome }}</td>
                  <td class="">{{ props.item.data_cadastro }}</td>
                </template>
              </v-data-table>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6>
              <span class="title">Ultimas pesagens</span>
              <v-data-table
                :headers="[{text: 'Peso', value: 'peso'}, {text: 'Data da pesagem', value: 'data_pesagem'}]"
                :items="animal.pesagens"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="">{{ props.item.peso }}</td>
                  <td class="">{{ props.item.data_pesagem }}</td>
                </template>
              </v-data-table>
            </v-flex>
            <v-flex xs12>
              <br/>
              <v-divider/>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class="title">Fazenda de locação do animal</span>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                label="Nome"
                v-model="animal.fazenda.nome"
                disabled
              />
            </v-flex>
            <v-flex xs6 sm3 md3 lg3>
              <v-text-field
                label="Limite"
                v-model="animal.fazenda.limite"
                disabled
              />
            </v-flex>
            <v-flex xs6 sm3 md3 lg3>
              <v-text-field
                label="Quantidade de animais"
                v-model="animal.fazenda.quantidade_animais"
                disabled
              />
            </v-flex>
            <v-flex xs12>
              <br/>
              <v-divider/>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class="title">Gráficos estatísticos</span>
            </v-flex>
            <v-flex xs12 v-if="hasValueToGraphDeGanhoDePeso">
              <span class="subheading">Ganho de peso</span>
              <chart :options="graficoGanhoPeso"/>
            </v-flex>

          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import {AnimaisService} from '../../services/AnimaisService'

  export default {
    name: 'prontuario-animal',
    data() {
      return {
        hasValueToGraphDeGanhoDePeso: false,
        animal: {
          nome: 'Jhon Doe',
          codigo_raca: 56561,
          codigo_brinco: 12351,
          sexo: 'Macho',
          fazenda: {
            nome: 'Nossa senhora aparecida',
            limite: '100 Alqueres',
            quantidade_animais: 158
          },
          is_vivo: true,
          fase_vida: 'Bezerro'
        },
        headers: [
          {text: 'Nome', value: 'nome'},
          {text: 'Data', value: 'data'}
        ],
        items: [
          {
            value: false,
            nome: 'Pneumonia',
            data: '11/02/2018'
          }
        ],
        pesagens: [
          {
            peso: 150,
            data: '08/03/2018'
          }
        ],
        graficoGanhoPeso: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        }
      }
    },
    methods: {
      async getGraficoPesagem() {
        let response = await AnimaisService._getGraficoGanhoDePeso(this.animal.id)
        let pesos = []
        let data = []
        for (let i = 0; i < response.data[0].length; i++) {
          pesos.push(response.data[0][i].peso)
          data.push(response.data[0][i].data)
        }
        this.graficoGanhoPeso.xAxis.data = data
        this.graficoGanhoPeso.series[0].data = pesos
        if (data.length > 0 && pesos.length > 0) {
          this.hasValueToGraphDeGanhoDePeso = true
        }
      },
      async getAnimal() {
        let res = await AnimaisService._getById({id: this.animal.id, vivo: true})
        if (res.data.animais.data.length > 0) {
          this.animal = await res.data.animais.data[0]
        } else {
          res = await AnimaisService._getById({id: this.animal.id, vivo: false})
          this.animal = await res.data.animais.data[0]
        }
      }
    },
    mounted() {
      this.animal.id = this.$route.params.id
      this.getGraficoPesagem()
      this.getAnimal()
    }
  }
</script>

<style scoped>
</style>
