<template>
  <v-app>
    <left-navigation></left-navigation>
    <v-toolbar
      class="green"
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="enviarDrawer" class="hidden-lg-and-up white--text"/>
      <v-btn icon @click.stop="voltarPagina" class="hidden-md-and-down">
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
  import LeftNavigation from './LeftNavigation'
  import Bus from '../../util/bus'

  export default {
    name: 'Layout',
    components: {LeftNavigation},
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
      voltarPagina: function () {
        this.$router.go(-1)
      },
      enviarDrawer: function () {
        this.drawer = !this.drawer
        Bus.$emit('shareDrawer', this.drawer)
      }
    }
  }
</script>

<style scoped>

</style>
