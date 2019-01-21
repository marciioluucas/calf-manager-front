<template>
  <v-app>
    <v-card flat color="orange" class="white--text">
      <v-card-title primary-title>
        <v-layout column wrap>
          <v-flex xs4>
            <h3 class="headline mb-0">{{quantidadeLotes}}</h3>
          </v-flex>
          <v-flex xs8>
            <h1>Lotes</h1>
          </v-flex>

        </v-layout>
      </v-card-title>
    </v-card>
  </v-app>
</template>

<script>
import LotesService from '../../services/LotesService'
  export default {
    name: 'lotes-cadastrados',
    data() {
      return {
        quantidadeLotes: null
      }
    },
    mounted(){
      this.getQuantidadeLotes()
    },
    methods: {
      async getQuantidadeLotes() {
        let response = await LotesService._getQuantidadeLotes()
        this.quantidadeLotes = response.data.lotes
      }
    }
  }
</script>

<style scoped>

</style>
