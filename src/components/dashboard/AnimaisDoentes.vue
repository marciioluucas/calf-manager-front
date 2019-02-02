<template>
  <v-app>
    <v-card flat color="red" class="white--text">
      <v-card-title primary-title>
        <v-layout column>
          <v-flex xs4>
            <h3 class="headline mb-0">{{quantidadeAnimais}}</h3>
          </v-flex>
          <v-flex xs8>
            <h1>Animais doentes</h1>
          </v-flex>

        </v-layout>
      </v-card-title>
    </v-card>
    <v-card flat color="black" class="white--text">
      <v-card-title primary-title>
        <v-layout column>
          <v-flex xs4>
            <h3 class="headline mb-0">{{qtdAnimaisMortos}}</h3>
          </v-flex>
          <v-flex xs8>
            <h1>Animais mortos</h1>
          </v-flex>

        </v-layout>
      </v-card-title>
    </v-card>
  </v-app>
</template>

<script>
  import {AnimaisService} from '../../services/AnimaisService'
  export default {
      name: 'animais-cadastrados',
      data() {
        return{
          quantidadeAnimais: null,
          qtdAnimaisMortos: null,
        }
      },
      mounted(){
        this.getQuantidadeAnimais()
        this.getQuantidadeAnimaisMortos()
      },
      methods:{
      async getQuantidadeAnimais(){
        let response = await AnimaisService._getContagemDoentes()
        this.quantidadeAnimais = response.data.animais
      },
      async getQuantidadeAnimaisMortos(){
        let response = await AnimaisService._getContagemMortos()
        this.qtdAnimaisMortos = response.data.animais
      }
    }
  }
</script>

<style scoped>

</style>
