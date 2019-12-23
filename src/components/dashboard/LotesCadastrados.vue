<template>
  <v-app>
    <v-card flat color="orange" class="white--text">
      <v-card-title primary-title>
        <v-layout column wrap>
        
          <v-flex xs4>
            <h1>Lotes </h1>
          </v-flex>
          <v-flex xs4>
            <p class="headline mb-0">{{quantidadeLotes}}</p>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
      <v-flex xs12>
            <v-card>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="lotes"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <tr>                      
                      <td class="text-xs-center">{{ props.item.codigo }}</td>
                      <td class="text-xs-center">{{ props.item.quantidade_animais }}</td>

                    </tr>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-flex>
  </v-app>
</template>

<script>
import LotesService from '../../services/LotesService'
  export default {
    name: 'lotes-cadastrados',
    data() {
      return {
        quantidadeLotes: null,
        buscaLote: {
          params: {
            lotesQtdAnimais: true
          }
        },
        lotes: [],
        headers: [
          {text: 'Código', value: 'codigo'},
          {text: 'Quantidade de animais', value: 'quantidades'}
        ]
      }
    },
    mounted(){
      this.getQuantidadeLotes(),
      this.getLotesQuantidadesAnimais()
    },
    methods: {
      async getQuantidadeLotes() {
        let response = await LotesService._getQuantidadeLotes()
        this.quantidadeLotes = response.data.lotes
      },
      async getLotesQuantidadesAnimais(){
        let response = await LotesService._getAll(this.buscaLote)
        this.lotes = response.data.lotes
      }
    }
  }
</script>

<style scoped>

</style>
