<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      class="green"

    >
      <modulos></modulos>
    </v-navigation-drawer>
    <v-toolbar
      class="green"
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up white--text"/>
      <v-btn icon @click.stop="enviarMiniVariant" class="hidden-md-and-down">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" class="white--text"/>
      </v-btn>
      <v-toolbar-title v-text="title" class="white--text"/>


      <v-spacer/>
    </v-toolbar>
    <v-content class="grey lighten-2">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app class="elevation-2">
      <v-container fluid grid-list-md>
        <span>Marcin MIL GRAU &copy; 2018</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
  import Modulos from './Modulos'
  import Bus from '../../util/bus'

  export default {
    name: 'Layout',
    components: {Modulos},
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Calf Manager'
      }
    },
    methods: {
      enviarMiniVariant: function () {
        this.miniVariant = !this.miniVariant
        this.clipped = !this.clipped
        let mini = this.miniVariant
        Bus.$emit('shareMiniVariant', mini)
      }
    }
  }
</script>

<style scoped>

</style>
