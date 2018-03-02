<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-container grid-list-md text-center>
        <v-form>
          <v-layout row wrap>

            <v-flex xs12 md2 lg2>
              <v-text-field
                label="Buscar pelo Id"
                v-model="animal.id"
              />
            </v-flex>
            <v-flex xs12 md4 lg4>
              <v-text-field xs12 md3
                            label="Buscar pelo nome"
                            v-model="animal.nome"
              />
            </v-flex>

            <v-flex xs12 md3 lg3>
              <v-select
                label="Buscar pelo lote"
                autocomplete
              />
            </v-flex>
            <v-flex xs12 md3 lg3>
              <v-switch
                :label="`Buscar pelos vivos`"
              />
            </v-flex>

          </v-layout>
        </v-form>

      </v-container>
      <v-btn color="success" v-on:click="getAnimais">Buscar!</v-btn>
    </v-flex>

    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="items"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.id }}</td>
          <td class="text-xs-center">{{ props.item.nome }}</td>
          <td class="text-xs-center">{{ props.item.data_nascimento }}</td>
          <td class="text-xs-center">{{ props.item.codigo_brinco }}</td>

        </template>
      </v-data-table>
    </v-flex>

  </v-layout>
</template>

<script>
  import {AnimaisService} from '../../services/AnimaisService'

  export default {
    name: 'listagem-animal',
    data() {
      return {
        items: [],
        isLoaded: false,
        animal: {},
        retreavePercentageLoaded: 0,
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nome', value: 'nome'},
          {text: 'Data de nascimento', value: 'data_nascimento'},
          {text: 'Código do brinco', value: 'codigo_brinco'}
        ]
      }
    },
    methods: {
      getAnimais() {
        if (this.animal.id === undefined && this.animal.nome === undefined) {
          AnimaisService._getAll()
            .then((response) => {
              this.items = response.data.animais.data
              this.isLoaded = true
            })
            .then(() => {
              this.isLoaded = false
            })
            .catch(function (error) {
              console.log(error)
            })
        } else if (this.animal.id !== undefined && this.animal.nome === undefined) {
          AnimaisService._getById(this.animal.id)
            .then((response) => {
              this.items = response.data.animais
              this.isLoaded = true
            })
            .then(() => {
              this.isLoaded = false
            })
            .catch(function (error) {
              console.log(error)
            })
        } else if (this.animal.id === '' && this.animal.nome !== '') {
          AnimaisService._getByNome(this.animal.nome)
            .then((response) => {
              this.items = response.data.animais.data
              this.isLoaded = true
            })
            .then(() => {
              this.isLoaded = false
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      alertIsLoaded() {
        console.log(this.headers)
      }
    }
  }
</script>

<style scoped>

</style>
