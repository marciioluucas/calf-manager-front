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

                <!-- <v-flex xs12 md2 lg2>
                  <v-text-field
                    label="Buscar pelo Id"
                    v-model="buscaPermissao.id"
                  />
                </v-flex> -->
                <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                    label="Buscar pelo nome"
                    v-model="buscaPermissao.nome_modulo"
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
                    <v-pagination :length="items.last_page" v-model="buscaPermissao.params.pagina" @input="getPermissoes"/>
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
        ],
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        }
      }
    },
    mounted(){
      this.getPermissoes()
    },
    methods: {
      async getPermissoes(){
        let response = null
        if(this.buscaPermissao.nome_modulo){
          response = await PermissoesService._getByNome(this.buscaPermissao.nome_modulo)
        }else{
          response = await PermissoesService._getAll(this.buscaPermissao)
        }
        if(response.status !== 400 || response !== 500){
          this.items = response.data.permissoes
        }
      },
      async editar(id){
        this.$router.push({
          name: 'CadastroPermissao',
          params: {id: id}
        })
      },
      async deletar(item){
        if(confirm('Deseja realmente deletar esta permissão?')){
          let response = await PermissoesService._delete(item.id).catch(exception => {
            if(exception){
              this.alerta('error', true, 'Erro ao deletar permissão!')
            }
          })
          if(response.status === 202){
            this.alerta('success', true, 'Permissão excluido com sucesso!')
            let index = this.items.data.indexOf(item)
            this.items.data.splice(index, 1)
          }
        }
      },
      clear(){
        this.buscaPermissao.id = null,
        this.buscaPermissao.nome_modulo = ''
      },
      atualizarTabela(){
        this.items = []
        this.getPermissoes()
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
