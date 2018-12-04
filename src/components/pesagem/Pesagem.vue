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
                  <v-text-field
                    label="Data de pesagem"
                    v-model="pesagem.data_pesagem"
                    :return-masked-value="true"
                    mask="##/##/####"
                  />
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

export default {
  data() {
    return {
      pesagem: {
        id: null,
        peso: '',
        data_pesagem: '',
        animais_id: null
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
    this.pesagem.id = this.$route.params.id
  },
  watch: {
    'selectAnimal.search'(val) {
      val && this.getAnimais(val)
    }
  },
  methods: {
    async getAnimais(val) {
      const busca = {
        nome: val,
        params: {vivo: true}
      }
      this.selectAnimal.loading = true
      let response = await AnimaisService._getByNome(busca)
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
    validarForm(){
      if(this.pesagem.animal.id !== null && this.pesagem.animal.id !== '' &&
        this.pesagem.data !== null && this.pesagem.data !== '' &&
        this.pesagem.peso !== null && this.pesagem.peso !== ''){
          return true
        } else {
          return false
        }
    },
    clearFormPesagem(){
      this.pesagem.animal.id = null
      this.pesagem.peso = '',
      this.pesagem.data = ''
    },
    alerta(color, estado, mensagem){
      this.snackbar.color = color
      this.snackbar.estado = estado
      this.snackbar.mensagem = mensagem
    }
  }
}
</script>

<style scoped>

</style>
