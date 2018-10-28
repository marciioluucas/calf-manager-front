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
                    v-model="buscaGrupo.id"
                  />
                </v-flex>
                <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                    label="Buscar pelo nome"
                    v-model="buscaGrupo.nome"
                  />
                </v-flex>
              </v-layout>
              <v-btn color="success" v-on:click="getGrupos">Buscar!</v-btn>
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
                      <td class="text-xs-center">{{ props.item.nome }}</td>
                      <td class="text-xs-center">{{ props.item.permissao.nome_modulo }}</td>
                      <td class="justify-center layout px-0">

                        <!--Icone de editar-->
                        <v-icon
                          small
                          class="mr-2"
                          @click="editar(props.item.id)"
                        >
                          edit
                        </v-icon>

                        <!--Icone de deletar-->
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
                    <v-pagination :length="items.last_page" v-model="buscaGrupo.params.pagina" @input="getGrupos"/>
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
  import GruposService from '../../services/GruposService'
  export default {
    name: "listagem-grupo",
    data(){
      return{
        items: [],
        buscaGrupo: {
          id: null,
          nome: '',
          params: {
            pagina: 1
          }
        },
        search: false,
        headers: [
          {text:'ID', value: 'id'},
          {text:'Nome', value: 'nome'},
          {text:'Permissão', value: 'permissao'},
          {text:'Ações', value: 'acoes'}
        ]
      }
    },
    mounted() {
      this.getGrupos()
    },
    methods: {
      async getGrupos(){
        let response = await GruposService._getAll(this.buscaGrupo)
        this.items = response.data.grupos
      },
      async editar(id){
        this.$router.push({
          name: 'CadastroGrupo',
          params: {id: id}
        })
      },
      async deletar(id){
        if(confirm('Deseja deletar este item?')){
          await GruposService._delete(id)
        }
        this.atualizarTabela()
      },
      clear(){
        this.buscaGrupo.id = null
        this.buscaGrupo.nome = ''
      },
      atualizarTabela(){
        this.items = []
        this.getGrupos()
      }
    }
  }
</script>

<style scoped>

</style>
