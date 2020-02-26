<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <!--Cabeçalho do componente-->
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Movimentação de medicamentos/vacinas</h2>
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
                    v-model="buscaDose.id"
                  />
                </v-flex> -->
                <!-- <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                    label="Buscar pelo nome"
                    v-model="buscaCargo.nome"
                  />
                </v-flex> -->
              </v-layout>
              <v-btn color="success" v-on:click="getDoses">Buscar!</v-btn>
              <v-btn color="secondary" v-on:click="clearFilters">Redefinir busca</v-btn>
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
                    <td class="text-xs-center">{{ props.item.medicamento.nome }}</td>
                    <td class="text-xs-center">{{ props.item.quantidade_mg }}</td>
                    <td class="text-xs-center">{{ props.item.quantidade_unidade }}</td> 
                    <td class="text-xs-center">{{ props.item.tipo_movimentacao }}</td> 
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
                  <v-pagination :length="items.last_page" v-model="buscaDose.params.pagina" @input="getDoses"/>
                </v-flex>
              </v-layout>

            </v-card-actions>
          </v-card>
        </v-flex>
<!--Componente de alerta-->
          <v-snackbar
             v-model="snackbar.show"
             :right="true"
             :timeout="4000"
             :multi-line="true"

             :top="true"
             :color="snackbar.color">
             {{ snackbar.message }}
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
  import DosesService from '../../services/DosesService'
  export default {
    name: 'listagem-dose',
    data() {
      return {
        items: [],  
        loading: false,
        isLoading: false,
        buscaDose: {
          params: {
            medicamento: {
              id: null
            },
            pagina: 1
          }
        },
        search: null,
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Medicamento', value: 'medicamento'},
          {text: 'Quantidade de doses (Mg/Ml)', value: 'quantidade_mg'},
          {text: 'Quantidade de Unidades (UN/PCT)', value: 'quantidade_unidade'},
          {text: '', value: ''},
          
        ],
        snackbar: {
          color: 'success',
          show: false,
          message: ''
        }
      }
    },
    mounted() {
      this.getDoses()
    },
    methods: {
      async getDoses() {
        let response = await DosesService._getAll(this.buscaDose)
        if(response.status === 200){
          this.items = response.data.doses
        }
      },
      clearFilters(){

      },
     
     async deletar(item){
         if(confirm('Deseja estornar este item?')){
            let response = await DosesService._delete(item.id)
            if(response.status !== 500){
              let index = this.items.data.indexOf(item)
              this.items.data.splice(index, 1)
              this.notify("success","Movimentação estornada com sucesso") 
            }
          }
      },

      async editar(id) {
        this.$router.push({
        name: 'CadastroEntradaDose',
        params: {id: id}
      })
      },
      notify(color, message) {
          this.snackbar.color = color
          this.snackbar.show = true
          this.snackbar.message = message
        }
    }
  }
</script>

<style scoped>

</style>
