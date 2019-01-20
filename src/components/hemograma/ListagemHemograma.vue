<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <!--Cabeçalho do componente-->
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Resultados dos Exames</h2>
              <span class="caption">Pesquise pelo animal para visualizar os dados.</span>
            </div>
          </v-card-title>

          <!--Sessão de formulário de pesquisa-->
          <v-card-text>
            <v-form>
              <v-layout row wrap>

              <v-flex xs12>
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
                  v-model="selectAnimal.selected"
                  return-object
                />
              </v-flex>
              <v-layout v-if="view">
                <v-flex xs12 sm6 md6 lg6>
                  <span class="caption">Proteína Plasmática Total (PPT)</span>
                  <chart :options='graficoHematocrito' :auto-resize="true"/>
                </v-flex>
              
                <v-flex xs12 sm6 md6 lg6>
                  <span class="caption">Hematócrito</span>
                  <chart :options='graficoPPT' :auto-resize="true"/>
                </v-flex>
                
              </v-layout>
              <v-flex xs12 v-if="view">
                <span class='caption'>Dados do Animal</span>
                <v-layout>
                 
                 <v-flex xs12 sm6 md6 lg6>
                  <v-text-field
                  :value="selectAnimal.selected.nome"
                  label="Nome"
                  disabled
                ></v-text-field> 
                  </v-flex>
                <v-flex xs12 sm6 md6 lg6>
                  <v-text-field 
                  :value="selectAnimal.selected.lote.codigo"
                  label="Código do Lote"
                  disabled
                ></v-text-field> 
                  </v-flex>
                <v-flex xs12 sm6 md6 lg6>
                  <v-text-field 
                  :value="selectAnimal.selected.codigo_brinco"
                  label="Código do Brinco"
                  disabled
                ></v-text-field>
                  </v-flex>
                <v-flex xs12 sm6 md6 lg6>
                  <v-text-field 
                  :value="selectAnimal.selected.codigo_raca"
                  label="Código da Raça"
                  disabled
                ></v-text-field>
                   </v-flex>
                <v-flex xs12 sm6 md6 lg6>
                   <v-text-field 
                  :value="selectAnimal.selected.fase_vida"
                  label="Fase de vida"
                  disabled
                ></v-text-field>
                  </v-flex>
              </v-layout>
                
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
                hematocrito: null, 
                data: ''
              }
            },
            selectAnimal: {
              items: [],
              loading: false,
              search: '',
              selectedAnimal: {}
            },
            graficoHematocrito: {
              tooltip : {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      label: {
                          backgroundColor: '#6a7985'
                      }
                  }
              },
              
             grid: {
                  width: '300',
                  heigth: '200',
                  containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                name: 'Hematócrito',
                type: 'line',
              }]
            },
            graficoPPT: {
              tooltip : {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      label: {
                          backgroundColor: '#6a7985'
                      }
                  }
              },
             
               grid: {
                  width: '300',
                  heigth: '200',
                  containLabel: true

              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                name: 'PPT',
                type: 'line',
              }]
            },
            view: false
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
            if(val !== null){
            let busca = {
              nome: val
            }
            this.selectAnimal.loading = true
            let response = await AnimaisService._getByNome(val)

            this.selectAnimal.items = response.data.animais.data
            this.selectAnimal.loading = false
            if(this.selectAnimal.selected){
              this.getGraficoHemograma(this.selectAnimal.selected.id)
              if(this.selectAnimal.selected.id){
                this.view = true
              }
            }
            }
          },
          async getGraficoHemograma(val){
            let response = await HemogramasService._getGraficoMonitorDeSaude(val)
            let ppt = []
            let hematocrito = []
            let data = []
            for (let i = 0; i < response.data[0].length; i++) {
              let a = response.data[0][i].ppt.split(' ')

              let b = response.data[0][i].hematocrito.split(' ')
              ppt.push(a[0])
              hematocrito.push(b[0])
              data.push(response.data[0][i].data)
            }
            this.graficoHematocrito.xAxis.data = data
            this.graficoHematocrito.series[0].data = hematocrito
            this.graficoPPT.xAxis.data = data
            this.graficoPPT.series[0].data = ppt
          }
        }
    }
</script>

<style scoped>

</style>
