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
                    v-model="buscaPermissao.id"
                  />
                </v-flex>
                <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                    label="Buscar pelo nome"
                    v-model="buscaPermissao.nome"
                  />
                </v-flex>
              </v-layout>
              <v-btn color="success" v-on:click="getPermissoes">Buscar!</v-btn>
              <v-btn color="secondary" v-on:click="clear">Redefinir busca</v-btn>
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
                      <td class="text-xs-center">{{ props.item.nome_modulo }}</td>
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
                    <v-pagination :length="items.last_page" v-model="buscaPermissao.params.pagina" @input="getPermissoes"/>
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
  import PermissoesService from '../../services/PermissoesService'
  export default {
    name: 'listagem-permissao',
    data() {
      return {
        items: [],
        buscaPermissao: {
          id: null,
          nome_modulo: '',
          params: {
            pagina: 1
          }
        },
        search: false,
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nome do módulo', value: 'nome_modulo'},
          // {text: 'Create', value: 'create'},
          // {text: 'Read', value: 'read'},
          // {text: 'Update', value: 'update'},
          // {text: 'Delete', value: 'delete'},
          {text: 'Ações', value: 'acoes'}
        ]
      }
    },
    mounted(){
      this.getPermissoes()
    },
    methods: {
      async getPermissoes(){
        let response = await PermissoesService._getAll(this.buscaPermissao)
        this.items = response.data.permissoes
      },
      async editar(id){
        this.$router.push({
          name: 'CadastroPermissao',
          params: {id: id}
        })
      },
      async deletar(id){
        if(confirm('Deseja deletar este item?')){
          await PermissoesService._delete(id)
        }
        this.atualizarTabela()
      },
      clear(){
        this.buscaPermissao.id = null,
        this.buscaPermissao.nome_modulo = ''
      },
      atualizarTabela(){
        this.items = []
        this.getPermissoes()
      }
    }
  }
</script>

<style scoped>

</style>
