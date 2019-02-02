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
              tooltip : {
                  trigger: 'item',
                  formatter: "{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  x: 'left',
                  data:['Animais Sadíos','Animais Mortos','Animais Doentes']
              },
              series : [
                  {
                      type: 'pie',
                      radius : '65%',
                      center: ['58%', '42%'],
                      selectedMode: 'single',
                      data:[
                      ],
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
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
        data.name = 'Animais Sadíos'
        this.graficoAnimais.series[0].data.push(data)
      },
      async getQuantidadeAnimaisDoentes(){
        let data = {
          value: null,
          name: null
        }
        let response = await AnimaisService._getContagemDoentes()
        this.quantidadeAnimais = response.data.animais
        data.value = response.data.animais
        data.name = 'Animais Doentes'
        this.graficoAnimais.series[0].data.push(data)
      },
      async getQuantidadeAnimaisMortos(){
        let data = {
          value: null,
          name: null
        }
        let response = await AnimaisService._getContagemMortos()
        data.value = response.data.animais
        data.name = 'Animais Mortos'
        this.graficoAnimais.series[0].data.push(data)
      }
    }
  }
</script>

<style scoped>

</style>
