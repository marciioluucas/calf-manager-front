<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Pesagem</h2>
              <span class="caption">Busque pelo codigo para cadastrar os pesos dos animais</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row wrap>

                <v-flex xs12 md2 lg6>
                  <v-autocomplete
                    label="Digite o nome do animal"
                    :loading="selectAnimal.loading"
                    :items="selectAnimal.items"
                    hide-no-data
                    hide-selected
                    item-text="nome"
                    required
                    cache-items
                    item-value="id"
                    :search-input.sync="selectAnimal.search"
                    v-model="pesagem.animais_id"
                  />
                </v-flex>
                <v-flex xs6 md3 lg3>
                  <v-text-field
                    label="Peso"
                    v-model="pesagem.peso"
                    mask="####"
                    required
                  />
                </v-flex>
                <v-flex xs6 md3 lg3>
                  <v-menu ref="menu_data_pesagem"
                          v-model="menu_data_pesagem"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          full-width
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="pesagem.data_pesagem"
                                    label="Data de Pesagem"
                                    persistent-hint
                                    prepend-icon="event"
                                    v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="data_pesagem" 
                                   no-title @input="menu_data_pesagem = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-btn color="success" v-if="!pesagem.id" @click="cadastrar">Enviar</v-btn>
              <v-btn v-if="pesagem.id" @click="editar">Editar</v-btn>

              <v-btn @click="clearFormPesagem">Limpar formulário</v-btn>

            </v-form>
          </v-card-text>
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
import {AnimaisService} from '../../services/AnimaisService'
import PesagensService from '../../services/PesagensService'
  import jwtDecode from 'jwt-decode'


export default {
  data() {
    return {
      menu_data_pesagem: null,
      data_pesagem: null,
      pesagem: {
        id: null,
        peso: '',
        data_pesagem: '',
        animais_id: null,
        usuario_cadastro: null
      },
      selectAnimal: {
        loading: false,
        items: [],
        search: null
      },
      snackbar: {
        color: 'success',
        estado: false,
        mensagem: ''
      }
    }
  },
  mounted(){
    this.getIdUsuarioLogado()
    this.pesagem.id = this.$route.params.id
  },
  watch: {
    'selectAnimal.search'(val) {
      val && this.getAnimais(val)
    },
    data_pesagem (val) {
      this.pesagem.data_pesagem = this.formatDate(val)
    }
  },
  methods: {
    async getAnimais(val) {
      const busca = {
        nome: val,
        params: {vivo: true}
      }
      this.selectAnimal.loading = true
      let response = await AnimaisService._getByNome(val)
      this.selectAnimal.items = response.data.animais.data
      this.selectAnimal.loading = false
    },
    async cadastrar() {
      if(this.validarForm()){
        let response = await PesagensService._create(this.pesagem).catch(exception => {
          if(exception){
            this.alerta('error', true, 'Erro ao cadastrar pesagem!')
          }
        })
        if(response.status === 201){
          this.alerta(response.data.message.type, true, response.data.message.description)
          this.clearFormPesagem()
        }

      } else {
        this.alerta('warning', true, 'Preencha todos os campos corretamente!')
      }
    },
    async editar(){
      if(this.validarForm()){
        let response = await PesagensService._update(this.pesagem).catch(exception => {
          if(exception){
            this.alerta('error', true, 'Erro ao cadastrar pesagem!')
          }
        })
        if(response.status === 201){
          this.alerta(response.data.message.type, true, response.data.message.description)
          this.clearFormPesagem()
        }

      } else {
        this.alerta('warning', true, 'Preencha todos os campos corretamente!')
      }
    },

getIdUsuarioLogado(){
                try{
                    let res = jwtDecode(localStorage.getItem('token'))
                    this.pesagem.usuario_cadastro = res.id
                }
                catch(e){
                    this.alerta('error', true, 'Erro ao carregar id de usuario logado')
                }
            },

    validarForm(){
      if(this.pesagem.animais_id !== null && this.pesagem.animais_id !== '' &&
        this.pesagem.data_pesagem !== null && this.pesagem.data_pesagem !== '' &&
        this.pesagem.peso !== null && this.pesagem.peso !== ''){
          return true
        } else {
          return false
        }
    },
    clearFormPesagem(){
      this.pesagem.animais_id = null
      this.pesagem.peso = '',
      this.pesagem.data_pesagem = ''
    },
    alerta(color, estado, mensagem){
      this.snackbar.color = color
      this.snackbar.estado = estado
      this.snackbar.mensagem = mensagem
    },
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day,month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  }
}
</script>

<style scoped>

</style>
