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
              </v-layout>
             <!-- <v-btn color="success" v-on:click="getFuncionarios">Buscar!</v-btn> -->
              <!-- <v-btn color="secondary" v-on:click="clear">Redefinir busca</v-btn> -->
            </v-form>
          </v-card-text>

          <!--Tabela de apresentação de dados-->

          <v-flex xs12 sm12 md12 lg12>
            <v-layout wrap>
              <chart :options='graficoHemograma' :auto-resize="true"/>
            </v-layout>
          </v-flex>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {AnimaisService} from '../../services/AnimaisService'
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
            mesesAno: [
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro'
            ],
            selectAnimal: {
              items: [],
              loading: false,
              search: ''
            },
            graficoHemograma: {
              title: {
                text: 'Animais'
              },
              tooltip : {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
                }
              },
              legend: {
                data:['PPT', 'Hematocrito']
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis :
                {
                  type : 'category',
                  boundaryGap : false,
                  data : []
                }
              ,
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series : [
                {
                  name: 'PPT',
                  data: [45, 46, 49, 42, 37, 55, 60],
                  type: 'line',
                  areaStyle: {}
                },
                {
                  name: 'Hematocrito',
                  data: [44, 40, 32, 46, 32, 43, 59],
                  type: 'line',
                  areaStyle: {}
                }
              ]
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
