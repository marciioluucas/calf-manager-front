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
                  v-model="buscaMedicamento.id"
                />
              </v-flex> -->
              <v-flex xs12 md4 lg4>
                <v-text-field xs12 md3
                  label="Buscar pelo nome"
                  v-model="buscaMedicamento.nome"
                />
              </v-flex>
            </v-layout>
            <v-btn color="success" v-on:click="getMedicamentos">Buscar!</v-btn>
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
                    <td class="text-xs-center">{{ props.item.prescricao }}</td>
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
                  <v-pagination :length="items.last_page" v-model="buscaMedicamento.params.pagina" @input="getMedicamentos"/>
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
  import MedicamentosService from '../../services/MedicamentosService'

  export default {
    name: "listagem-medicamento",
    data(){
      return {
        items: [],
        buscaMedicamento: {
          id: null,
          nome: '',
          prescricao: '',
          params: {
            pagina: 1
          }
        },
        search: false,
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nome', value: 'nome'},
          {text: 'Prescrição', value: 'prescricao'},
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
      this.getMedicamentos()
    },
    methods: {
      async getMedicamentos(){
        let response = null
        if(this.buscaMedicamento.nome){
          response = await MedicamentosService._getByNome(this.buscaMedicamento.nome)
          console.log(response)
        }else{
          response = await MedicamentosService._getAll(this.buscaMedicamento)
        }
        if(response.status == 200){
          this.items = response.data.medicamentos
        }
      },
      async editar(id){
        this.$router.push({
          name: 'CadastroMedicamento',
          params: {id: id}
        })
      },
      async deletar(item){
        try{
          if(confirm('Deseja realmente deletar este medicamento?')){
            let response = await MedicamentosService._delete(item.id)
            if(response.status !== 500){
              this.alerta('success', true, 'Medicamento excluído com sucesso!')
              let index = this.items.data.indexOf(item)
              this.items.data.splice(index, 1)
            }
          }
        }
        catch(e){
          this.alerta('error', true, 'Erro ao deletar medicamento!') 
        }
      },
      clear(){
        this.buscaMedicamento.id = null
        this.buscaMedicamento.nome = ''
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
