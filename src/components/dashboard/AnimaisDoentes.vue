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
  </v-app>
</template>

<script>
  import {AnimaisService} from '../../services/AnimaisService'
  export default {
      name: 'animais-cadastrados',
      data() {
        return{
          quantidadeAnimais: null
        }
      },
      mounted(){
        this.getQuantidadeAnimais()
      },
      methods:{
      async getQuantidadeAnimais(){
        let response = await AnimaisService._getContagemDoentes()
        this.quantidadeAnimais = response.data.animais
      }
    }
  }
</script>

<style scoped>

</style>
