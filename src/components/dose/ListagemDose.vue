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
                    v-model="buscaDose.id"
                  />
                </v-flex>
                <!-- <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                    label="Buscar pelo nome"
                    v-model="buscaCargo.nome"
                  />
                </v-flex> -->
              </v-layout>
              <v-btn color="success" v-on:click="getDoses">Buscar!</v-btn>
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
                      <td class="text-xs-center">{{ props.item.animal.nome }}</td>
                      <td class="text-xs-center">{{ props.item.medicamento.nome }}</td>
                      <td class="text-xs-center">{{ props.item.quantidadeMg }}</td>

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
                    <v-pagination :length="items.last_page" v-model="buscaCargo.params.pagina" @input="getCargos"/>
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
  import DosesService from '../../services/DosesService'
  export default {
    name: 'listagem-dose',
    data() {
      return {
        items: [],
        loading: false,
        isLoading: false,
        buscaDose: {
          id: null,
          medicamento: {
            id: null,
            nome: ''
          },
          animal: {
            id: null,
            nome: null
          },
          params: {
            pagina: 1
          }
        },
        search: null,
        readers: [
          {text: 'ID', value: 'id'},
          {text: 'Medicamento', value: 'medicamento'},
          {text: 'Animal', value: 'animal'},
          {text: 'Actions', value: 'name', sortable: false}
        ]
      }
    },
    mounted() {
      this.getDoses()
    },
    methods: {
      async getDoses() {
        let response = await DosesService._getAll(this.buscaDose)
        this.items = response.data.doses
      },
      async deletar(id) {
        if(confirm('Deseja deletar este item?')){
          DosesService._delete(id)
        }
      },
      async editar() {

      }
    }
  }
</script>

<style scoped>

</style>
