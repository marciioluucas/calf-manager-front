<template>
  <v-navigation-drawer
    persistent
    :mini-variant="miniVariant"
    :clipped="clipped"
    v-model="drawer"
    enable-resize-watcher
    fixed
    app

  >
    <v-layout row wrap>


      <v-flex lg12>
        <v-container class="text-xs-center">
          <img src="static/logo-calf.jpg" alt="logo" style="width: 200px">
        </v-container>
        <modulos/>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
  import Bus from '../../util/bus'
  import Modulos from './Modulos'

  export default {
    name: 'left-navigation',
    components: {
      Modulos
    },
    data() {
      return {
        miniVariant: false,
        clipped: false,
        drawer: true,
        fixed: false,
        right: true,
        rightDrawer: false
      }
    },
    mounted() {
      Bus.$on('shareMiniVariant', (mini) => {
        this.miniVariant = mini
        this.clipped = !this.clipped
      })
      Bus.$on('shareDrawer', (drawer) => {
        this.drawer = drawer
      })
    }
  }
</script>

<style scoped>

</style>
