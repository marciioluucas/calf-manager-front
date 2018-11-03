<template>
  <v-container grid-list-md>
    <v-card>
      <!--Componente de alerta-->
      <v-alert
        v-if="alerter.estado"
        :value="true"
        :type="alerter.tipo"
      >
        {{alerter.mensagem}}
      </v-alert>

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

            <v-btn @click="clear">Limpar formulário</v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
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
          alerter: {
            tipo: '',
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
            console.log(this.hemograma);
            // let response = await HemogramaService._create(this.hemograma)
            // if(response.status === 201){
            //   this.alerta(response.status, true, response.data.message.description)
            // }
          }
          else {
            this.alerta('success', true, 'Preencha os campos corretamente!')
          }
        },
        async editar() {
          if(this.validarForm()){
            let response = await HemogramaService._update(this.hemograma)
            if(response.status === 201){
              this.alerta(response.status, true, response.data.message.description)
            }
          }
          else {
            this.alerta('success', true, 'Preencha os campos corretamente!')
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
        clear(){
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
        }
      }
    }
</script>

<style scoped>

</style>
