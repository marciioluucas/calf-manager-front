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
                    v-model="buscaLote.id"
                  />
                </v-flex>
                <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                    label="Buscar pelo nome"
                    v-model="buscaLote.nome"
                  />
                </v-flex>
              </v-layout>
              <v-btn color="success" v-on:click="getLotes">Buscar!</v-btn>
              <v-btn color="secondary" v-on:click="">Redefinir busca</v-btn>
            </v-form>
          </v-card-text>

          <!--Tabela de apresentação de dados-->

          <v-flex xs12>
            <v-card>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="items.data"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <tr>
                      <td class="text-xs-center">{{ props.item.id }}</td>
                      <td class="text-xs-center">{{ props.item.codigo }}</td>
                      <td class="text-xs-center">{{ props.item.descricao }}</td>
                      <td class="justify-center layout px-0">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editar(props.item.id)"
                        >
                          edit
                        </v-icon>
                        <v-icon
                          small
                          @click="deletar(props.item.id)"
                        >
                          delete
                        </v-icon>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card-text>
              <v-card-actions v-if="items.length !== 0" class="text-xs-center">
                <v-layout>
                  <v-flex xs12>
                    <v-pagination :length="items.last_page" v-model="buscaLote.params.pagina" @input="getLotes"/>
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
  import LotesService from "../../services/LotesService";

  export default {
    name: 'ListagemLote',
    data() {
      return {
        items: [],
        buscaLote: {
          id: null,
          codigo: null,
          descricao: null,
          params: {pagina: 1}
        },
        search: null,
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Código', value: 'codigo'},
          {text: 'Ações', value: 'acoes'}
        ]
      }
    },
    async mounted() {
      this.getLotes()
    },
    methods: {
      async getLotes() {
        if (this.buscaLote.id && !this.buscaLote.codigo) {
          let response = await LotesService._getById(this.buscaLote)
          this.items = response.data.lotes
        } else if (!this.buscaLote.id && this.buscaLote.codigo) {
          let response = await LotesService._getByCodigo(this.buscaLote)
          this.items = response.data.lotes
        } else {
          let response = await LotesService._getAll()
          this.items = response.data.lotes
        }
      },
      editar(id) {
        this.$router.push({
          name: 'CadastroLote',
          params: {id: id}
        })
      },
      deletar(id) {
        if(confirm('Deseja deletar este item?')){
          LotesService._delete(id)
        }
        this.getLotes()
      }
    }
  }
</script>
<style scoped>

</style>
