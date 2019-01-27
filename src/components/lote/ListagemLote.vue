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
                    v-model="buscaLote.id"
                  />
                </v-flex> -->
                <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                    label="Buscar pelo código"
                    v-model="buscaLote.codigo"
                  />
                </v-flex>
                 <v-flex xs12 sm3 md3 lg3>
							<v-autocomplete
								label="Pesquise a fazenda"
								:loading="selectFazenda.loading"
								:items="selectFazenda.items"
								hide-no-data
								hide-selected
								item-text="nome"
								required
								cache-items
								item-value="id"
								:search-input.sync="selectFazenda.search"
								v-model="buscaLote.fazenda_id"
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
  import LotesService from '../../services/LotesService'
  import FazendasService from '../../services/FazendasService'

  export default {
    name: 'ListagemLote',
    data() {
      return {
        items: [],
        buscaLote: {
          id: null,
          codigo: null,
          descricao: null,
          fazenda_id: null,
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
        selectFazenda: {
          items: [],
          loading: false,
          search: null
        },
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        }
      }
    },
    watch:{
      'selectFazenda.search'(val){
        val && this.getFazendaByNome(val)
      }
    },
    async mounted() {
      this.getLotes()
    },
    methods: {
      async getLotes() {
        
        let response = null
        if (this.buscaLote.codigo) {
          try{
            response = await LotesService._getByCodigo(this.buscaLote.codigo)
          }
          catch(e){
            this.alerta('error', true, 'Erro ao pesquisar lote por código')
          }
        }
        else if(this.buscaLote.fazenda_id){
          try{
           response = await LotesService._getByFazenda(this.buscaLote.fazenda_id)
          }
          catch(e){
            this.alerta('error', true, 'Erro ao pesquisar lote por fazenda')
          }
        } 
        else {
          try{
            response = await LotesService._getAll(this.buscaLote)
          }
          catch(e){
            this.alerta('error', true, 'Erro ao pesquisar todos os lotes')
          }
        }
        if(response.status !== 400 || response.status !== 500){
          this.items = response.data.lotes.data          
        }
        
      },

      async getFazendaByNome(nome){
        try{
          let response = await FazendasService._getByNome(nome)
          this.selectFazenda.items = response.data.fazendas.data
        }catch(e){
            this.alerta('error', true, 'Erro ao pesquisar fazenda')          
        }
      },

      editar(id) {
        this.$router.push({
          name: 'CadastroLote',
          params: {id: id}
        })
      },
      async deletar(item) {
        try{
          if(confirm('Deseja realmente deletar este lote?')){
              let response = await LotesService._delete(item.id)
              if(response.status !== 500){
                this.alerta('success', true, 'Lote excluído com sucesso!')
                let index = this.items.indexOf(item)
                this.items.splice(index, 1)
              }
          }
        }
        catch(e){
          this.alerta('error', true, 'Erro ao deletar lote!')
        }
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
