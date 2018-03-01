<template>
  <v-app >
    <v-layout column>

      <v-flex color="secondary">
        <v-container class="text-xs-center">
        <img src="/static/logo-calf.jpg" alt="logo" style="width: 200px">
        </v-container>
        <v-list>
          <v-subheader key="Menu">Menu de módulos</v-subheader>
          <template v-for="item in items" >

            <v-list-tile :key="item.titulo" @click=""  color="primary">
              <v-list-tile-action>
                <v-icon v-html="item.icone"  color="primary"/>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.nome"/>
                <v-list-tile-sub-title v-html="item.breve_descricao"/>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>

  </v-app>
</template>

<script>
  import Bus from '../../util/bus'
  import ModulosService from '../../services/ModulosService'
  export default {
    name: 'modulos',
    data () {
      return {
        miniVariant: true,
        items: ModulosService.getModulos()
      }
    },
    mounted () {
      Bus.$on('shareMiniVariant', function (mini) {
        this.miniVariant = mini === true
      })
    }
  }
</script>

<style scoped>

</style>
