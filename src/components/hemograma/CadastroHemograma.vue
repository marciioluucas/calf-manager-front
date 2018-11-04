<template>
  <v-container grid-list-md>
    <v-card>

      <!--Cabeçalho da pagina-->
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
          <span class='caption'></span>
        </div>
      </v-card-title>

      <!--Formulário de cadastro-->
      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-flex xs12>
              <span class='title'>Informações gerais</span>
            </v-flex>

            <v-flex xs12 sm4 md4 lg4>
              <v-autocomplete
                label="Pesquise o Animal"
                :loading="selectAnimais.loading"
                :items="selectAnimais.items"
                hide-no-data
                hide-selected
                item-text="nome"
                required
                cache-items
                item-value="id"
                :search-input.sync="selectAnimais.search"
                v-model="hemograma.animal"
              />
            </v-flex>


            <v-flex xs12 sm4 md4 lg4>
              <v-text-field
                v-model="hemograma.ppt"
                label='PPT'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-text-field
                v-model="hemograma.hematocrito"
                label='Hematocrito'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-text-field
                v-model="hemograma.data"
                label='Data do exame'
                mask="##/##/####"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn v-if="!hemograma.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="hemograma.id" @click="editar">Editar</v-btn>

            <v-btn @click="clearFormHemograma">Limpar formulário</v-btn>
          </v-flex>
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
  </v-container>
</template>

<script>
  import {AnimaisService} from '../../services/AnimaisService'
  import HemogramaService from '../../services/HemogramasService'

    export default {
      name: 'cadastro-hemograma',
      data() {
        return {
          items: [],
          hemograma: {
            id: null,
            ppt: null,
            hematocrito: null,
            data: '',
            animal: {}
          },
          selectAnimais: {
            loading: false,
            items: [],
            search: null
          },
          snackbar: {
            color: 'success',
            estado: false,
            mensagem: ''
          },
          nomeTitulo: 'Cadastrar Exame'
        }
      },
      watch: {
        'selectAnimais.search'(val){
          val && this.getAnimais(val)
        }
      },
      mounted() {
        this.hemograma.id = this.$route.params.id
        if (this.hemograma.id) {
          this.nomeTitulo = 'Editar Exame'
          this.getHemograma()
        }
      },
      methods: {
        async cadastrar() {
          if(this.validarForm()){
            let response = await HemogramaService._create(this.hemograma).catch(exception => {
              if(exception){
                this.alerta('error', true, 'Erro ao cadastrar exame!')
              }
            })
            if(response.status === 201){
              this.alerta(response.data.message.type, true, response.data.message.description)
              this.clearFormHemograma()
            }
          }
          else {
            this.alerta('success', true, 'Preencha todos os campos corretamente!')
          }
        },
        async editar() {
          if(this.validarForm()){
            let response = await HemogramaService._update(this.hemograma).catch(exception => {
              if(exception){
                this.alerta('error', true, 'Erro ao alterar exame!')
              }
            })
            if(response.status === 201){
              this.alerta(response.data.message.type, true, response.data.message.description)
              this.clearFormHemograma()
            }
          }
          else {
            this.alerta('success', true, 'Preencha todos os campos corretamente!')
          }
        },
        async getHemograma() {
          let response = await HemogramaService._getById(this.hemograma.id)
          this.hemograma = response.data.hemogramas.data
        },
        async getAnimais(val) {
          let busca = {
            nome: val
          }
          this.selectAnimais.loading = true
           let response = await AnimaisService._getAll({pagina: 1})
          if(val){
            response = await AnimaisService._getByNome(busca)
          }
          this.selectAnimais.items = response.data.animais.data
          this.selectAnimais.loading = false
        },
        clearFormHemograma(){
          this.animal = {}
          this.hemograma.ppt = ''
          this.hemograma.hematocrito = ''
          this.hemograma.data = ''
        },
        validarForm(){
          if(this.animal !== null && this.hemograma.ppt !== null && this.hemograma.ppt !== '' &&
             this.hemograma.hematocrito !== null && this.hemograma.hematocrito !== '' &&
              this.hemograma.data !== '' && this.hemograma.data !== null){
            return true
          }
          else{
            return false
          }
        },
        alerta(color, estado, mensagem) {
          this.snackbar.color = color
          this.snackbar.estado = estado
          this.snackbar.mensagem = mensagem
        },
      }
    }
</script>

<style scoped>

</style>
