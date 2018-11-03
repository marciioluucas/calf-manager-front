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

            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="doenca.nome"
                label='Nome da Doenca'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="doenca.descricao"
                label='Descrição da Doenca'
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn v-if="!doenca.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="doenca.id" @click="editar">Editar</v-btn>

            <v-btn @click="clear">Limpar formulário</v-btn>
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
  import DoencasService from '../../services/DoencasService'

  export default {
    name: 'cadastro-doenca',
    data() {
      return {
        doenca: {
          id: null,
          nome: '',
          descricao: ''
        },
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        },
        nomeTitulo: 'Cadastro de Doenca'
      }
    },
    async mounted() {
      this.doenca.id = this.$route.params.id
      if (this.doenca.id) {
        this.nomeTitulo = 'Editar Doenca'
        this.getDoenca()
      }
    },
    methods: {
      async cadastrar() {
        if(this.validarFormDoenca()){
          let res = await DoencasService._create(this.doenca).catch(e => {
            if(exception){
              this.alerta('error', true, 'Erro ao cadastrar doença!')
            }
          })
          if(response.status === 201){
            this.alerta(response.data.message.type ,true, response.data.message.description)
            this.clearFormAnimal()
          }
        }
        else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
        }
      },
      async editar() {
        if(this.validarFormDoenca()){
          let res = await DoencasService._update(this.doenca).catch(e => {
            if(exception){
              this.alerta('error', true, 'Erro ao cadastrar doença!')
            }
          })
          if(response.status === 201){
            this.alerta(response.data.message.type ,true, response.data.message.description)
            this.clearFormAnimal()
          }
        }
        else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
        }
      },
      clear() {
        this.doenca.nome = ''
        this.doenca.descricao = ''
      },
      alerta(color, estado, mensagem) {
        this.snackbar.color = color
        this.snackbar.estado = estado
        this.snackbar.mensagem = mensagem
      },
      async getDoenca() {
        let response = await DoencasService._getById({id: this.doenca.id})
        this.doenca = response.data.doencas[0]
      },
      validarFormDoenca() {
        if (this.doenca.nome !== '' && this.doenca.nome !== null &&
            this.doenca.descricao !== '' && this.doenca.descricao !== null) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped>

</style>
