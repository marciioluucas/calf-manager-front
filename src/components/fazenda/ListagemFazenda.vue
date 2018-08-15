<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <!--Cabeçalho do componente-->
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Pesquisa</h2>
              <span class="caption">Faça uma pesquisa utilizando os filtros abaixo para um melhor resultado.</span>
            </div>
          </v-card-title>

          <!--Sessão de formulário de pesquisa-->
          <v-card-text>
            <v-form>
              <v-layout row wrap>

                <v-flex xs12 md2 lg2>
                  <v-text-field
                    label="Buscar pelo Id"
                    v-model="buscaFazenda.id"
                  />
                </v-flex>
                <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                                label="Buscar pelo nome"
                                v-model="buscaFazenda.nome"
                  />
                </v-flex>
              </v-layout>
              <v-btn color="success" v-on:click="getFazendas">Buscar!</v-btn>
              <v-btn color="secondary" v-on:click="clear">Redefinir busca</v-btn>
            </v-form>
          </v-card-text>

          <!--Tabela de apresentação de dados-->
          <v-flex xs12>
            <v-card>
              <v-card-text>
              </v-card-text>

              <v-data-table
                :headers="headers"
                :items="items.data"
                hide-actions
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-center">{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.nome }}</td>
                  </tr>
                </template>
              </v-data-table>

              <v-card-actions v-if="items.length !== 0" class="text-xs-center">
                <v-layout>
                  <v-flex xs12>
                    <v-pagination :length="items.last_page" v-model="buscaFazenda.params.pagina" @input="getFazendas"/>
                  </v-flex>
                </v-layout>

              </v-card-actions>


            </v-card>
          </v-flex>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FazendasService from '../../services/FazendasService'

export default {
  name: 'Listagem-fazenda',
  data() {
    return {
      items: [],
      isLoaded: false,
      loading: false,
      buscaFazenda: {
        id: undefined,
        nome: undefined,
        params: {
          pagina: 1
        }
      },
      search: null,
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Nome', value: 'nome'}
      ]
    }
  },
  methods: {
    async getFazendas() {
      if (this.buscaFazenda.id && !this.buscaFazenda.nome) {
        this.$Progress.start()
        console.log(this.buscaFazenda.id)
        let response = await FazendasService._getById(this.buscaFazenda)
        await this.$Progress.finish()
        this.items = response.data.fazendas
        this.clear()
      } else if (!this.buscaFazenda.id && this.buscaFazenda.nome) {
        this.$Progress.start()
        let response = await FazendasService._getByNome(this.buscaFazenda)
        await this.$Progress.finish()
        this.items = response.data.fazendas
        this.clear()
      } else {
        this.$Progress.start()
        let response = await FazendasService._getAll(this.buscaFazenda)
        await this.$Progress.finish()
        this.items = response.data.fazendas
        this.clear()
      }
    },
    clear() {
      this.buscaFazenda.id = '',
      this.buscaFazenda.nome = ''
    }
  }
}
</script>

<style scoped>

</style>
