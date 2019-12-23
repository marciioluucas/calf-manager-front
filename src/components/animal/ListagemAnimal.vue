<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Pesquisa</h2>
              <span class="caption">Faça uma pesquisa utilizando os filtros abaixo para um melhor resultado.</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row wrap>
                <v-expansion-panel>
                  <v-expansion-panel-content>
                    <div slot="header">Pesquisas avançadas</div>
                    <v-card>
                      <v-flex xs12>
                        <v-layout>
                          <v-flex xs1/>
                        
                          <!-- <v-flex xs4>
                            <v-text-field
                              label="Buscar pelo Id"
                              v-model="buscaAnimal.id"
                            />
                          </v-flex> -->
                          <v-flex xs4>
                            <v-text-field xs12 md3
                              label="Buscar pelo nome"
                              v-model="buscaAnimal.nome"
                            />
                          </v-flex>
                          <v-flex xs4>
                            <v-autocomplete
                              label="Buscar pelo lote"
                              autocomplete
                              :loading="selectLote.loading"
                              :items="selectLote.items"
                              item-text="codigo"
                              item-value="id"
                              cache-items
                              :search-input.sync="selectLote.search"
                              v-model="buscaAnimal.lotes_id"
                            />
                          </v-flex>
                          <v-flex xs4>
                            <v-autocomplete
                              label="Buscar pelo sexo"
                              :loading="loading"
                              :items="sexo"
                              item-text="text"
                              item-value="value"
                              cache-items
                              v-model="buscaAnimal.params.sexo"
                            />
                          </v-flex>
                          <v-flex xs1/>
                         </v-layout>
                        </v-flex>

                        <v-flex xs12>
                          <v-layout>
                            <v-flex xs1 />
                            <v-flex xs6 class="mx-auto">
                              <v-switch
                                :label="`Buscar pelos vivos`"
                                v-model="buscaAnimal.params.vivo"
                              />
                            </v-flex>
                            <v-flex xs6>
                              <v-switch
                                :label="`Buscar pelos doentes`"
                                v-model="buscaAnimal.params.doente"
                              />
                            </v-flex>
                            <v-flex xs6>
                              <v-switch
                                :label="`Buscar pelos mortos ao nascer`"
                                v-model="buscaAnimal.params.mortosAoNascer"
                              />
                            </v-flex>
                          </v-layout>
                        </v-flex>
                     
                      
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                        <v-btn color="success" v-on:click="getAnimais">Buscar!</v-btn>
                        <v-btn color="secondary" v-on:click="clearFilters">Redefinir busca</v-btn>
              </v-layout>
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
                  <td class="text-xs-center">{{ props.item.id }}</td>
                  <td class="text-xs-center">{{ props.item.nome }}</td>
                  <td class="text-xs-center">{{ props.item.fase_vida }}</td>
                  <td class="text-xs-center">{{ props.item.lote.codigo }}</td>
                  <td class="text-xs-center">{{ props.item.codigo_brinco }}</td>
                    <td class="text-xs-center">{{ props.item.codigo_raca }}</td>
                  <td class="justify-center layout px-0">
                    <v-icon
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
                    </v-icon>
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
  import LotesService from '../../services/LotesService'

  export default {
    name: 'listagem-animal',
    data() {
      return {
        items: [],
        isLoaded: false,
        loading: false,
        buscaAnimal: {
          id: undefined,
          nome: undefined,
          lotes_id: null,
          params: {
            mortosAoNascer: false,
            sexo: null,
            vivo: true,
            doente: false,
            pagina: 1,
          }

        },
        sexo: [
          {text: 'Macho', value: 'm'},
          {text: 'Femea', value: 'f'}
        ],
        selectLote: {
          items: [],
          loading: false,
          search: null
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
    watch: {
      'selectLote.search'(codigo){
        codigo && this.getLotesByCodigo(codigo)
      },
      'buscaAnimal.params.mortosAoNascer'(val){
        if(val == true){
          this.buscaAnimal.params.vivo = false;
        }else{
          this.buscaAnimal.params.vivo = true;
        }
      }
    },
    async mounted() {
      this.getAnimais()
    },
    methods: {
      show(){
        this.$nextTick(() => {this.showMenu = true})
      }, 
      async getAnimais() {
        this.$Progress.start()
        let response = null
         if (this.buscaAnimal.nome) {
          response = await AnimaisService._getByNome(this.buscaAnimal.nome)
          this.items = response.data.animais
          await this.$Progress.finish()
          this.clearFilters()
        } else 
        if (this.buscaAnimal.lotes_id) {
           response = await AnimaisService._getByIdLote(this.buscaAnimal)
          this.items = response.data.animais
          await this.$Progress.finish()
          this.clearFilters()
        } 
        else if(this.buscaAnimal.params.doente){
            response = await AnimaisService._getByAnimalDoente(this.buscaAnimal)
            this.items = response.data.animais
            this.$Progress.finish()
            this.clearFilters()
        }
        else {
          this.$Progress.start()
          response = await AnimaisService._getAll(this.buscaAnimal)
          this.items = response.data.animais
          await this.$Progress.finish()
        }
      },
      async getLotesByCodigo(codigo) {
        try{
          this.selectLote.loading = true
          let response = await LotesService._getByCodigo(codigo)
          this.selectLote.items = response.data.lotes.data
          
          this.selectLote.loading = false
        }
        catch(e){

        }
      },
      selecionaAnimal(id) {
        this.$router.push({
          name: 'ProntuarioAnimal',
          params: {id: id}
        })
      },
      editarAnimal(id) {
        this.$router.push({
          name: 'CadastroAnimal',
          params: {id: id}
        })
      },
      async deletarAnimal (item) {
          if(confirm('Deseja realmente deletar este animal?') && item){
            let response = await AnimaisService._delete(item.id).catch(exception => {
              this.alerta('error', true, 'Erro ao excluir animal!')
            })
            if(response.status === 202){
              this.alerta('success', true, 'Animal excluido com sucesso')
              let index = this.items.data.indexOf(item)
              this.items.data.splice(index, 1)
            }

          }
      },
      clearFilters(){
        this.buscaAnimal.id = null
        this.buscaAnimal.nome= null
        this.buscaAnimal.lotes_id = null
        this.buscaAnimal.params.sexo = null
        this.buscaAnimal.params.doente = null
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
