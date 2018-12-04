<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <!--Cabeçalho do componente-->
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Pesquisa</h2>
              <span class="caption">Faça uma pesquisa utilizando os filtros abaixo para um melhor resultado.</span>
            </div>
          </v-card-title>

          <!--Sessão de formulário de pesquisa-->
          <v-card-text>
            <v-form>
              <v-layout row wrap>

              <v-flex xs12 sm4 md4 lg4>
                <v-autocomplete
                  label="Selecione o animal"
                  :loading="selectAnimal.loading"
                  required
                  hide-no-data
                  hide-selected
                  item-value="id"
                  cache-items
                  :items="selectAnimal.items"
                  item-text="nome"
                  :search-input.sync="selectAnimal.search"
                  v-model="animal"
                />
              </v-flex>
              <v-flex xs12>
                <chart :options='graficoHematocrito' :auto-resize="true"/>
              </v-flex>
              <v-flex xs12>
                <chart :options='graficoPPT' :auto-resize="true"/>
              </v-flex>
              </v-layout>
             <!-- <v-btn color="success" v-on:click="getFuncionarios">Buscar!</v-btn> -->
              <!-- <v-btn color="secondary" v-on:click="clear">Redefinir busca</v-btn> -->
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {AnimaisService} from '../../services/AnimaisService'
import HemogramasService from '../../services/HemogramasService'
    export default {
        name: "listagem-hemograma",
        data(){
          return{
            animal: {
              id: null,
              nome: '',
              hemogramas: {
                id: null,
                ppt: null,
                hematocrito: null
              }
            },
            selectAnimal: {
              items: [],
              loading: false,
              search: ''
            },
            graficoHematocrito: {
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [],
                type: 'line',
                  areaStyle: {}
              }]
            },
            graficoPPT: {
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [],
                type: 'line',
                  areaStyle: {}
              }]
            }
          }
        },
        mounted(){
          this.graficoHemograma.xAxis.data = this.mesesAno
        },
        watch: {
          'selectAnimal.search'(val){
            val && this.getAnimais(val)
          }
        },
        methods: {
          async getAnimais(val){
            let busca = {
              nome: val
            }
            this.selectAnimal.loading = true
            let response = await AnimaisService._getByNome(busca)

            this.selectAnimal.items = response.data.animais.data
            this.selectAnimal.loading = false
          },
        }
    }
</script>

<style scoped>

</style>
