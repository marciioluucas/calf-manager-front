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

               <v-flex xs12 md4 lg4>
                 <v-text-field xs12 md3
                   label="Buscar pelo nome"
                   v-model="buscaFuncionario.pessoa.nome"
                 />
               </v-flex>
            </v-layout>
            <v-btn color="success" v-on:click="getFuncionarios">Buscar!</v-btn>
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
                    <td class="text-xs-center">{{ props.item.pessoa.nome }}</td>
                    <td class="text-xs-center">{{ props.item.fazenda.nome }}</td>
                    <td class="text-xs-center">{{ props.item.cargo.nome }}</td>
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
                  <v-pagination :length="items.last_page" v-model="buscaFuncionario.params.pagina" @input="getFuncionarios"/>
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
  import FuncionariosService from '../../services/FuncionariosService'
  import PessoasService from '../../services/PessoasService'
  import UsuariosService from '../../services/UsuariosService'
  import CargosService from '../../services/CargosService'
  import EnderecosService from '../../services/EnderecosService'
  export default {
    name: 'listagem-funcionario',
    data() {
      return {
        items: [],
        loading: false,
        isLoading: false,
        buscaFuncionario: {
          id: null,
          pessoa: {
            id: null,
            nome: ''
          },
          usuario: {
            id: null,
            login: ''
          },
          cargo: {
            id: null,
            nome: ''
          },
          endereco: {
            id: null,
            logradouro: ''
          },
          params: {
            pagina: 1
          },


        },
        search: null,
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Pessoa', value: 'id'},
          {text: 'Fazenda', value: 'fazenda'},
          {text: 'Cargo', value: 'cargo'},
          {text: 'Ações', value: 'acoes'}
        ],
         snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        }
      }
    },
    mounted() {
      this.getFuncionarios()
    },
    methods: {
      async getFuncionarios() {
        let response = null
        if (this.buscaFuncionario.pessoa.nome){
          try{
            response = await FuncionariosService._getByNome(this.buscaFuncionario.pessoa.nome)
          }
          catch(e){
            this.alerta('error', true, 'Erro ao pesquisar funcionário por nome!') 
          }
        }
        else {
          try{
            response = await FuncionariosService._getAll(this.buscaFuncionario)
          }
          catch(e){
            this.alerta('error', true, 'Erro pesquisar todos os funcionários!') 
          }
        }
        if(response.status === 200){
          this.items = response.data.funcionarios
        }
      },
      async deletar(item){
        try{
          if(confirm('Deseja realmente deletar este Funcionário?')){
            let response = await FuncionariosService._delete(item.id)
            if(response.status === 202){
              this.alerta('success', true, 'Funcionário excluído com sucesso!')
              let index = this.items.data.indexOf(item)
              this.items.data.splice(index, 1)
            }
          }
        }
        catch(e){
          this.alerta('error', true, 'Erro ao deletar grupo!') 
        }
      },
      async editar(id) {
        this.$router.push({
          name: 'CadastroFuncionario',
          params: {id: id}
        })
      },
      clear(){
        this.buscaFuncionario.id = null
        this.buscaFuncionario.pessoa.nome = ''
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
