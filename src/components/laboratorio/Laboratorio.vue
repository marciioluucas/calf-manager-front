<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Enfermaria</h2>
              <span class="caption">Pesquisa.</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row wrap>

                <!-- <v-flex xs12 md2 lg2>
                  <v-text-field
                    label="Buscar pelo Id"
                    v-model="buscaAnimal.id"
                  />
                </v-flex>
                <v-flex xs12 md4 lg4>
                  <v-text-field xs12 md3
                    label="Buscar pelo nome"
                    v-model="buscaAnimal.nome"
                  />
                </v-flex>

                <v-flex xs12 md3 lg3 class="mx-auto">
                  <v-switch
                    :label="`Buscar pelos vivos`"
                    v-model="buscaAnimal.params.vivo"
                  />
                </v-flex> -->

              </v-layout>
              <v-btn color="success" v-on:click="getAnimaisDoentes">Buscar!</v-btn>
              <v-btn color="secondary" v-on:click="">Redefinir busca</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items.data"
              hide-actions
              @input="selecionaAnimal(props.item.id)"
            >
              <template slot="items" slot-scope="props">
                <tr @click.stop="selecionaAnimal(props.item.id)">
                  <td class="text-xs-center">{{ props.item.id }}</td>
                  <td class="text-xs-center">{{ props.item.nome }}</td>
                  <td class="text-xs-center">{{ props.item.fase_vida }}</td>
                  <td class="text-xs-center">{{ props.item.lote.codigo }}</td>
                  <td class="text-xs-center">{{ props.item.codigo_brinco }}</td>
                    <td class="text-xs-center">{{ props.item.codigo_raca }}</td>
                  <td class="justify-center layout px-0">
                    <!-- <v-icon
                      small
                      class="mr-2"
                      @click="editarAnimal(props.item.id)"
                    >
                      edit
                    </v-icon>
                    <v-icon
                      small
                      @click="deletarAnimal(props.item)"
                    >
                      delete
                    </v-icon> -->
                  </td>
                  <v-menu
                    v-model="showMenu"
                    absolute
                    offset-y
                     @contextmenu="show"
                  >
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-title >Prontuário</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions v-if="items.length !== 0" class="text-xs-center">
            <v-layout>
              <v-flex xs12>
                <v-pagination :length="items.last_page" v-model="buscaAnimal.params.pagina" @input="getAnimais"/>
              </v-flex>
            </v-layout>

          </v-card-actions>
         <!-- Componente de alerta -->
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
import {AnimaisService} from '../../services/AnimaisService'
  export default {
    name: "laboratorio",
    data(){
      return{
        items: [],
        isLoaded: false,
        loading: false,
        buscaAnimal: {
          id: undefined,
          nome: undefined,
          lote: {
            id: undefined
          },
          params: {
            vivo: true,
            pagina: 1,
          }

        },
        search: null,
        lotes: [],
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Nome', value: 'nome'},
          {text: 'Fase de vida', value: 'fase_vida'},
          {text: 'Lote', value: 'lote'},
          {text: 'Código do brinco', value: 'codigo_brinco'},
          {text: 'Código da Raça', value: 'codigo_raca'},
          { text: 'Actions', value: 'name', sortable: false }
        ],
        dialog:{
          janela: false,
          confirm: false,
          cancel: false
        },
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        },
        showMenu: false
      }
    }, 
    mounted(){
      this.getAnimaisDoentes()
    }, 
    watch: {

    },
    methods:{
      async getAnimaisDoentes(){
        let response = await AnimaisService._getAll(this.buscaAnimal)
        this.items = response.data.animais
        console.log(response.data.animais)
      }
    }
  }
</script>

<style scoped>

</style>
