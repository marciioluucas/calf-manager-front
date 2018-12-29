
<template>
  <v-container grid-list-md>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>Pesagens dos animais</h2>
          <span class='caption'>Pesquise pelo nome do animal para obter os resultados das pesagens.</span>
        </div>
      </v-card-title>

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
            <v-layout>
              <v-flex xs12 sm6 md6 lg6 v-if="view">
                 <span class='caption'>Gráfico de pesagens</span>
                <chart width="100%" height="100%" :options='graficoGanhoPeso' />
              </v-flex>
              <v-flex xs12 sm6 md6 lg6 v-if="view">
                 <span class='caption'>Dados do Animal</span>
                
                
                  <v-text-field
                  :value="selectAnimal.selected.nome"
                  label="Nome"
                  disabled
                ></v-text-field> 
               
                  <v-text-field 
                  :value="selectAnimal.selected.lote.codigo"
                  label="Código do Lote"
                  disabled
                ></v-text-field> 
                
                  <v-text-field 
                  :value="selectAnimal.selected.codigo_brinco"
                  label="Código do Brinco"
                  disabled
                ></v-text-field>
                
                 <v-text-field 
                  :value="selectAnimal.selected.codigo_raca"
                  label="Código da Raça"
                  disabled
                ></v-text-field>
               
                 <v-text-field 
                  :value="selectAnimal.selected.fase_vida"
                  label="Fase de vida"
                  disabled
                ></v-text-field>
                


                
                 
                 
              </v-flex>
            </v-layout>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import {AnimaisService} from '../../services/AnimaisService'
  export default {
    name: "listagem-pesagem",
    data(){
      return {
        selectAnimal: {
          loading: false,
          items: [],
          search: null,
          selected: {}
        },
        headers: [
          {text: 'Peso', value: 'peso'},
          {text: 'Data da Pesagem', value: 'data_pesagem'}
        ],
        graficoGanhoPeso: {
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: ''
                  }
              }
          },
          grid: {
            width: 300,
            heigth: 100
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
            data: [],
            type: 'line',
              areaStyle: {}
          }]
        }, 
        view: false,
        tableAnimal: {
          data: [],
          peso: []
        }
      }
    },
    watch: {
      'selectAnimal.search'(val) {
        val && this.getAnimal(val)
      }
    },
    methods: {
      async getAnimal(val){
        let busca = {
          nome: val,
          pagina: 1
        }
        this.selectAnimal.loading = true
        if (val){
          let response = await AnimaisService._getByNome(busca)
          this.selectAnimal.items = response.data.animais.data
        }
        this.selectAnimal.loading = false

        if(this.selectAnimal.selected){
          this.getGraficoPesagem(this.selectAnimal.selected.id)
          if(this.selectAnimal.selected.id){
          this.view = true  
          }
          
        }
      },
      async getGraficoPesagem(val) {

        let response = await AnimaisService._getGraficoGanhoDePeso(val)
        let pesos = []
        let data = []
        for (let i = 0; i < response.data[0].length; i++) {
          let a = response.data[0][i].peso.split(' ')
          pesos.push(a[0])
          data.push(response.data[0][i].data_pesagem)
        }
        this.graficoGanhoPeso.xAxis.data = data
        this.graficoGanhoPeso.series[0].data = pesos
        this.tableAnimal.data = data
        this.tableAnimal.peso = pesos

        // if (data.length > 0 && pesos.length > 0) {
        //   this.hasValueToGraphDeGanhoDePeso = true
        // }
      }
    }
  }
</script>

<style scoped>

</style>
