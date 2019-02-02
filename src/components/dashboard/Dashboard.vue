<template>
  <v-container grid-list-md>
    <v-layout row wrap >
      <v-flex xs12 md6 lg6 >
        <animais-cadastrados></animais-cadastrados>
      </v-flex>
      <v-flex xs12 md6 lg6>
        <lotes-cadastrados></lotes-cadastrados>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  import AnimaisCadastrados from './AnimaisCadastrados'
  import LotesCadastrados from './LotesCadastrados'
  import AnimaisDoentes from './AnimaisDoentes'
  export default {
    name: 'dashboard',
    components: {AnimaisCadastrados, LotesCadastrados, AnimaisDoentes}
  }
</script>

<style scoped>

</style>
