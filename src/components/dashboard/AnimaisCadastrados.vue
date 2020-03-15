<template>
  <v-app>
    <v-card flat color="green" class="white--text">
      <v-card-title primary-title>
        <v-layout column>
          <!-- <v-flex xs4>
            <h3 class="headline mb-0">{{quantidadeAnimais}}</h3>
          </v-flex> -->
          <v-flex xs12>
            <h1>Animais</h1>
          </v-flex>
          

        </v-layout>
      </v-card-title>
    </v-card>
    <v-flex xs12>
            <chart :options='graficoAnimais' :auto-resize="true"/>
          </v-flex>
  </v-app>
</template>

<script>
  import {AnimaisService} from '../../services/AnimaisService'
  export default {
      name: 'animais-cadastrados',
      data() {
        return{
          quantidadeAnimais: null,
          graficoAnimais: {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:[]
            },
            series: [
                {
                    name:'Animais',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[]
                }
            ]
          }

        }
      },
      mounted(){
        this.getQuantidades()
      },
      methods:{
        getQuantidades(){
          this.getQuantidadeAnimais()
          this.getQuantidadeAnimaisDoentes()
          this.getQuantidadeAnimaisMortos()
        },
      async getQuantidadeAnimais(){
        let data = {
          value: null,
          name: null
        }
        let response = await AnimaisService._getContagemAnimais()
        
        data.value = response.data.animais
        data.name = 'Sadios'
        this.graficoAnimais.series[0].data.push(data)
        this.graficoAnimais.legend.data.push(data)
      },
      async getQuantidadeAnimaisDoentes(){
        let data = {
          value: null,
          name: null
        }
        let response = await AnimaisService._getContagemDoentes()
        this.quantidadeAnimais = response.data.animais
        data.value = response.data.animais
        data.name = 'Doentes'
        this.graficoAnimais.series[0].data.push(data)
        this.graficoAnimais.legend.data.push(data)
      },
      async getQuantidadeAnimaisMortos(){
        let data = {
          value: null,
          name: null
        }
        let response = await AnimaisService._getContagemMortos()
        data.value = response.data.animais
        data.name = 'Mortos'
        this.graficoAnimais.series[0].data.push(data)
        this.graficoAnimais.legend.data.push(data)
      }
    }
  }
</script>

<style scoped>

</style>
