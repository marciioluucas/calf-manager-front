<template>
  <v-list>
    <v-list-group
      v-model="item.active"
      v-for="item in items"
      :key="item.title"
      :prepend-icon="item.action"
      no-action
    >
      <v-list-tile slot="activator" >
        <v-list-tile-action>
          <v-icon>{{ item.icone }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-for="subItem in item.filhos" :key="subItem.nome" @click="" :to="subItem.link">
        <v-list-tile-content>
          <v-list-tile-title>{{ subItem.nome }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>{{ subItem.icone }}</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list-group>
  </v-list>
</template>

<script>
  import ModulosService from '../../services/ModulosService'

  export default {
    name: 'modulos',
    data() {
      return {
        miniVariant: true,
        items: ModulosService.getModulos()
      }
    }
  }
</script>

<style scoped>

</style>
