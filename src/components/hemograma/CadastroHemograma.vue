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
              <v-combobox
                v-model="hemograma.animal"
                :items="selectAnimais.items"
                item-text="nome"
                item-value="id"
                label="Animal"
                placeholder=""
              ></v-combobox>
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
            animal:[]
          },
          selectAnimais: {
            items: []
          },
          alerter: {
            tipo: '',
            estado: false,
            mensagem: ''
          },
          nomeTitulo: 'Cadastrar Exame'
        }
      },
      mounted() {
        this.getAnimais()
        this.hemograma.id = this.$route.params.id
        if (this.hemograma.id) {
          this.nomeTitulo = 'Editar Exame'
          this.getHemograma()
        }
      },
      methods: {
        async cadastrar() {

        },
        async editar() {

        },
        async getHemograma() {

        },
        async getAnimais() {
          let response = await AnimaisService._getAll(this.selectAnimais)
          // console.log(response.data.animais);
          this.selectAnimais.items = response.data.animais.data
        },
        clear(){

        },
        validarForm(){
          if(this.animal !== null && this.hemograma.ppt !== null && this.hemograma.ppt !== '' &&
             this.hemograma.hematocrito !== null && this.hemograma.hematocrito !== ''){
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
