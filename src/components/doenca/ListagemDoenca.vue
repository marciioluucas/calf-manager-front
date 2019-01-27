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
                    v-model="buscaDoenca.id"
                  />
                </v-flex> -->
                <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                                label="Buscar pelo nome"
                                v-model="buscaDoenca.nome"
                  />
                </v-flex>
              </v-layout>
              <v-btn color="success" v-on:click="getDoencas">Buscar!</v-btn>
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
                      <td class="text-xs-center">{{ props.item.nome }}</td>
                      <td class="text-xs-center">{{ props.item.descricao }}</td>
                      <td class="justify-center layout px-0">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editarDoenca(props.item.id)"
                        >
                          edit
                        </v-icon>
                        <v-icon
                          small
                          @click="deletarDoença(props.item)"
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
                    <v-pagination :length="items.last_page" v-model="buscaDoenca.params.pagina" @input="getDoencas"/>
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
  import DoencasService from '../../services/DoencasService'
  export default {
    name: 'listagem-doenca',
    data() {
      return {
        items: [],
        isLoaded: false,
        loadind: false,
        buscaDoenca: {
          id: undefined,
          nome: undefined,
          descricao: undefined,
          params: {
            pagina: 1
          }
        },
        search: null,
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nome', value: 'nome'},
          {text: 'Descrição', value: 'descricao'},
          { text: 'Actions', value: 'name', sortable: false }
        ],
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        }
      }
    },
    mounted() {
      this.getDoencas()
    },
    methods: {
      async getDoencas() {
        let n = this
        let response = null
         if (this.buscaDoenca.nome) {
          this.$Progress.start()
          response = await DoencasService._getByNome(this.buscaDoenca.nome)
        } else {
          this.$Progress.start()
          response = await DoencasService._getAll(this.buscaDoenca)
          await this.$Progress.finish()
        }
        if(response.status !== 400 || response !== 500){
          this.items = response.data.doencas
           await this.$Progress.finish()
          n.clear()
        }
      },
      clear() {
        this.buscaDoenca.id = ''
        this.buscaDoenca.nome = ''
        this.buscaDoenca.descricao = ''
      },
      
      async deletarDoença(item){
        try{
          if(confirm('Deseja realmente deletar esta doença?')){
            let response = await DoencasService._delete(item.id)
            if(response.status !== 500){
              this.alerta('success', true, 'Doença excluído com sucesso!')
              let index = this.items.data.indexOf(item)
              this.items.data.splice(index, 1)
            }
          }
        }
        catch(e){
          this.alerta('error', true, 'Erro ao deletar doença!') 
        }
      },
      editarDoenca(id) {
        this.$router.push({
          name: 'CadastroDoenca',
          params: {id: id}
        })
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
