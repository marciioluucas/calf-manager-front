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
                    v-model="buscaHemograma.id"
                  />
                </v-flex> -->
                <v-flex xs12 sm4 md4 lg4>
                    <v-autocomplete
                        label="Selecione o animal"
                        :loading="selectAnimal.loading"
                        required
                        hide-no-data
                        hide-selected
                        item-value="id"
                        cache-items
                        :items="selectAnimal.items"
                        item-text="nome"
                        :search-input.sync="selectAnimal.search"
                        v-model="buscaHemograma.animal_id"
                    />
                </v-flex>
                <v-flex xs12 sm4 md4 lg4>
                    <v-autocomplete
                        label="Selecione o funcionario"
                        :loading="selectFuncionario.loading"
                        required
                        hide-no-data
                        hide-selected
                        item-value="id"
                        cache-items
                        :items="selectFuncionario.items"
                        item-text="pessoa.nome"
                        :search-input.sync="selectFuncionario.search"
                        v-model="buscaHemograma.funcionario_id"
                    />
                </v-flex>
                <v-flex xs12 md4 lg4>
                  
                </v-flex>
              </v-layout>
              <v-btn color="success" v-on:click="getHemogramas">Buscar!</v-btn>
              <v-btn color="secondary" v-on:click="clear">Redefinir busca</v-btn>
            </v-form>
          </v-card-text>

          <!--Tabela de apresentação de dados-->
          <v-flex xs12>
            <v-card>
              <v-card-text>
              </v-card-text>

              <v-data-table
                :headers="headers"
                :items="items"
                hide-actions
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-center">{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.ppt }}</td>
                    <td class="text-xs-center">{{ props.item.hematocrito }}</td>

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

              <v-card-actions v-if="items.length !== 0" class="text-xs-center">
                <v-layout>
                  <v-flex xs12>
                    <v-pagination :length="items.last_page" v-model="buscaHemograma.params.pagina" @input="getHemogramas"/>
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
import HemogramasService from '../../services/HemogramasService'
import {AnimaisService} from '../../services/AnimaisService'
import FuncionariosService from '../../services/FuncionariosService'

export default {
  name: 'Listagem-hemograma',
  data() {
    return {
        items: [],
        isLoaded: false,
        loading: false,
        buscaHemograma: {
            id: null,
            ppt: null,
            hematocrito: null,
            animal_id: null,
            funcionario_id: null,
            params: {
                pagina: 1
            }
        },
        search: null,
        headers: [
            {text: 'ID', value: 'id'},
            {text: 'PPT', value: 'nome'},
            {text: 'Hemograma', value: 'hemograma'},
            { text: 'Actions', value: 'name', sortable: false }
        ],
        selectAnimal: {
            items: [],
            loading: false,
            search: null
        },
        selectFuncionario: {
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
  mounted() {
    this.getHemogramas()
  },
  watch:{
        'selectAnimal.search'(val){
            val && this.getAnimais(val)
        },
        'selectFuncionario.search'(val){
            val && this.getFuncionarios(val)
        }
  },
  methods: {
    async getHemogramas() {
        if (this.buscaHemograma.id) {
            let response = await HemogramasService._getById({id: this.buscaHemograma.id})
            this.items = response.data.hemogramas
            if(response.status === 200){
                this.clear()
            }
        }
        else if(this.buscaHemograma.animal_id){       
            this.$Progress.start()
            let response = await HemogramasService._getByAnimalId({id: this.buscaHemograma.animal_id})
            await this.$Progress.finish()
            this.items = response.data.hemogramas.data
             if(response.status === 200){
                this.clear()
            }
        }
        else if(this.buscaHemograma.funcionario_id){       
            this.$Progress.start()
            let response = await HemogramasService._getByFuncionarioId({id: this.buscaHemograma.funcionario_id})
            await this.$Progress.finish()
            this.items = response.data.hemogramas.data
             if(response.status === 200){
                this.clear()
            }   
        } else{
            this.$Progress.start()
            let response = await HemogramasService._getAll(this.buscaHemograma)
            await this.$Progress.finish()
            this.items = response.data.hemogramas.data
        }
    },
    async getFuncionarios(val){
        try{
            let response = await FuncionariosService._getByNome(val)
            if(response.status !== 400 || response !== 500 ){
                this.selectFuncionario.items = response.data.funcionarios.data
            }
        }
        catch(e){
            this.alerta('error', true, 'Erro ao pesquisar funcionario pelo nome!') 
        }
    },
    async getAnimais(val){
        try{
            let response = await AnimaisService._getByNome(val)
            if(response.status !== 400 || response !== 500 ){
                this.selectAnimal.items = response.data.animais.data
            }
        }
        catch(e){
            this.alerta('error', true, 'Erro ao pesquisar animal pelo nome!') 
        }
    },
    clear() {
        this.buscaHemograma.id = '',
        this.buscaHemograma.animal_id = '',
        this.buscaHemograma.funcionario_id = ''
    },
    async deletar(item){
        try{
            if(confirm('Deseja realmente deletar esta hemograma?')){
                let response = await HemogramasService._delete(item.id)
                if(response.status !== 500){
                this.alerta('success', true, 'Hemograma excluído com sucesso!')
                let index = this.items.indexOf(item)
                this.items.splice(index, 1)
                }
            }
        }
        catch(e){
          this.alerta('error', true, 'Erro ao deletar fazenda!') 
        }
      },
    editar(id) {
        this.$router.push({
            name: 'CadastroHemograma',
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
