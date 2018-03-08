<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Pesquisa</h2>
              <span class="caption">Faça uma pesquisa utilizando os filtros abaixo para um melhor resultado.</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row wrap>

                <v-flex xs12 md2 lg2>
                  <v-text-field
                    label="Buscar pelo Id"
                    v-model="buscaAnimal.id"
                  />
                </v-flex>
                <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                                label="Buscar pelo nome"
                                v-model="buscaAnimal.nome"
                  />
                </v-flex>

                <v-flex xs12 md3 lg3>
                  <v-select
                    label="Buscar pelo lote"
                    autocomplete
                    :loading="loading"
                    :items="lotes.data"
                    item-text="codigo"
                    item-value="id"
                    cache-items
                    :search-input.sync="search"
                    v-model="buscaAnimal.lote.id"
                  />
                </v-flex>
                <v-flex xs12 md3 lg3 class="mx-auto">
                  <v-switch
                    :label="`Buscar pelos vivos`"
                    v-model="buscaAnimal.vivo"
                  />
                </v-flex>

              </v-layout>
              <v-btn color="success" v-on:click="getAnimais">Buscar!</v-btn>
              <v-btn color="secondary" v-on:click="">Redefinir busca</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items.data"
              hide-actions
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.nome }}</td>
                <td class="text-xs-center">{{ props.item.lote.codigo }}</td>
                <td class="text-xs-center">{{ props.item.codigo_brinco }}</td>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions v-if="items.length !== 0" class="text-xs-center">
            <v-layout>
              <v-flex xs12>
                <v-pagination :length="items.last_page" v-model="buscaAnimal.page" @input="getAnimais"/>
              </v-flex>
            </v-layout>

          </v-card-actions>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import {AnimaisService} from '../../services/AnimaisService'
  import {LotesService} from '../../services/LotesService'

  export default {
    name: 'listagem-animal',
    data() {
      return {
        items: [],
        isLoaded: false,
        loading: false,
        buscaAnimal: {
          id: undefined,
          nome: undefined,
          lote: {
            id: undefined
          },
          vivo: true,
          page: 1
        },
        search: null,
        lotes: [],
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nome', value: 'nome'},
          {text: 'Lote', value: 'lote'},
          {text: 'Código do brinco', value: 'codigo_brinco'}
        ]
      }
    },
    watch: {
      search(val) {
        val && this.getLotesByCodigo(val)
      }
    },
    methods: {
      async getAnimais() {
        this.$Progress.start()
        if (this.buscaAnimal.id && !this.buscaAnimal.nome && !this.buscaAnimal.lote.id) {
          let response = await AnimaisService._getById(this.buscaAnimal)
          await this.$Progress.finish()
          this.items = response.data.animais
        } else if (this.buscaAnimal.id && this.buscaAnimal.nome && this.buscaAnimal.lote.id) {
          let response = await AnimaisService._getById(this.buscaAnimal)
          await this.$Progress.finish()
          this.items = response.data.animais
        } else if (!this.buscaAnimal.id && this.buscaAnimal.nome && !this.buscaAnimal.lote.id) {
          let response = await AnimaisService._getByNome(this.buscaAnimal)
          await this.$Progress.finish()
          this.items = response.data.animais
        } else if (!this.buscaAnimal.id && !this.buscaAnimal.nome && this.buscaAnimal.lote.id) {
          let response = await AnimaisService._getByIdLote(this.buscaAnimal)
          await this.$Progress.finish()
          this.items = response.data.animais
        } else if (!this.buscaAnimal.id && this.buscaAnimal.nome && this.buscaAnimal.lote.id) {
          let response = await AnimaisService._getByIdLoteAndName(this.buscaAnimal)
          await this.$Progress.finish()
          this.items = response.data.animais
        } else {
          this.$Progress.start()
          let response = await AnimaisService._getAll(this.buscaAnimal)
          await this.$Progress.finish()
          this.items = response.data.animais
        }
      },
      getLotesByCodigo(codigo) {
        this.loading = true
        LotesService._getByCodigo(codigo)
          .then(res => {
            this.lotes = res.data.lotes
          })
        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>
