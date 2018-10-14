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
                    v-model="buscaCargo.id"
                  />
                </v-flex>
                <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                    label="Buscar pelo nome"
                    v-model="buscaCargo.nome"
                  />
                </v-flex>
              </v-layout>
              <v-btn color="success" v-on:click="getCargos">Buscar!</v-btn>
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
                      <td class="text-xs-center">{{ props.item.descricao }}</td>
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
  import CargosService from '../../services/CargosService'

  export default {
    name: 'listagem-cargo',
    data() {
      return {
        items: [],
        buscaCargo: {
          id: null,
          nome: '',
          descricao: '',
          params: {
            pagina: 1
          },
        },
        search: null,
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nome', value: 'nome'},
          {text: 'Descrição', value: 'descricao'}
        ],
        loading: false,
        isLoading: false
      }
    },
    mounted() {
      this.getCargos()
    },
    methods: {
      async getCargos() {
        let n = this
        if (this.buscaCargo.id && !this.buscaCargo.nome) {
          let response = await CargosService._getById(this.buscaCargo)
          this.items = response.data.cargos

          // console.log(response.data.cargos)
        }
        else if (!this.buscaCargo.id && this.buscaCargo.nome) {
          let response = await CargosService._getByNome(this.buscaCargo)
          this.items = response.data.cargos
          // console.log(response.data.cargos.data)
        } else {
          let response = await CargosService._getAll(this.buscaCargo)
          this.items = response.data.cargos
          // console.log(response.data.cargos)
        }
      },
      async editar(id) {
        console.log("Editar id:"+id);
        this.$router.push({
          name: 'CadastroCargo',
          params: {id: id}
        })
      },
      async deletar(id) {
        if(confirm('Deseja deletar este item?')){
          let response = await CargosService._delete(id)
          this.getCargos()
        }
      },
      clear() {
        this.buscaCargo.id = ''
        this.buscaCargo.nome = ''
        this.buscaCargo.descricao = ''
      }
    }
  }
</script>

<style scoped>

</style>
