<template>
  <v-app>
    <vue-progress-bar/>
    <router-view/>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        e1: false
      }
    }
  }
</script>
