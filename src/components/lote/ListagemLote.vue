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
                  :items="items"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <tr>
                      <td class="text-xs-center">{{ props.item.id }}</td>
                      <td class="text-xs-center">{{ props.item.codigo }}</td>
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
                          @click="deletar(props.item)"
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
          <!--Componente de alerta-->
          <v-snackbar
             v-model="snackbar.estado"
             :right="true"
             :timeout="4000"
             :multi-line="true"

             :top="true"
             :color="snackbar.color">
             {{ snackbar.mensagem }}
             <v-btn
               color="black"
               flat
               @click="snackbar.mode = false"
             >
               Close
             </v-btn>
           </v-snackbar>
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
          fazenda: {
            id: null
          },
          params: {
            pagina: 1
          }
        },
        search: null,
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Código', value: 'codigo'},
          // {text: 'Fazenda', value: 'fazenda'},
          {text: 'Ações', value: 'acoes'}
        ],
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        }
      }
    },
    async mounted() {
      this.getLotes()
    },
    methods: {
      async getLotes() {
        let response = []
        if (this.buscaLote.id && !this.buscaLote.codigo) {
          response = await LotesService._getById(this.buscaLote)
          this.items = response.data.lotes.data
        } else if (!this.buscaLote.id && this.buscaLote.codigo) {
          response = await LotesService._getByCodigo(this.buscaLote)
          this.items = response.data.lotes.data
        } else {
          response = await LotesService._getAll(this.buscaLote)
          this.items = response.data.lotes.data
          console.log(this.items);
        }
        // console.log(response)
      },
      editar(id) {
        this.$router.push({
          name: 'CadastroLote',
          params: {id: id}
        })
      },
      async deletar(item) {
        if(confirm('Deseja realmente deletar este lote?')){
            let response = await LotesService._delete(item.id).catch(exception => {
              if(exception){
                this.alerta
              }
            })
        }
        this.atualizarTabela()
      },
      atualizarTabela(){
        this.items = []
        this.getLotes()
      },
      alerta(color, estado, mensagem) {
        this.snackbar.color = color
        this.snackbar.estado = estado
        this.snackbar.mensagem = mensagem
      }
    }
  }
</script>
<style scoped>

</style>
