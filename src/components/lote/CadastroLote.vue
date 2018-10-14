<template>
  <v-container grid-list-md>
    <v-card>
      <!--Componente de alertas-->
      <v-alert
        v-if="alerter.estado"
        :value="true"
        :type="alerter.tipo"
      >
        {{alerter.message}}
      </v-alert>
      <!--Cabeçalho da pagina-->
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
          <span class='caption'>Aqui você poderá fazer o cadastro dos lotes onde estão os animais</span>
        </div>
      </v-card-title>

      <v-card-text>

        <v-form>
          <v-layout row wrap>
            <v-flex xs12>
              <span class='title'>Informações gerais</span>
            </v-flex>

            <v-flex xs12 sm6 md4 lg4>
              <v-text-field
                label='Código do Lote'
                v-model="lote.codigo"
              />
            </v-flex>
          </v-layout>
          <v-btn v-if="!this.lote.id" @click="cadastrar" >Enviar</v-btn>
          <v-btn v-if="this.lote.id" @click="editar" >Editar</v-btn>
          <v-btn @click="clear" >Limpar Formulário</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import LotesService from '../../services/LotesService'
  export default {
    name: '',
    data() {
      return {
        lote: {
          id: null,
          codigo: null
        },
        alerter: {
          tipo: '',
          estado: false,
          message: ''
        },
        nomeTitulo: 'Cadastro de Lotes'
      }
    },
    async mounted() {
      this.lote.id = this.$route.params.id
      if (this.lote.id) {
        this.nomeTitulo = 'Editar Lote'
        this.getLote()
      }
    },
    methods: {
      async cadastrar() {
        if (this.validarFormulario()) {
          let response = await LotesService._create(this.lote)
          console.log(response);
          if(response.status === 200){
            this.alerta('success', true, response.data.message.description)
            this.clear()
          }
          else if(response.status === 400){
            this.alerta('error', true, 'Erro ao validar formulário')
          }
          else if(response.status === 500) {
            this.alerta('error', true, 'Erro ao cadastrar lote. Entre em contato com o suporte técnico!')
          }
        } else {
          this.alerta('warning', true, 'Preencha os campos corretamente!')
        }
      },
      async editar() {
        if (this.validarFormulario()) {
          let response = await LotesService._update(this.lote)
          if(response.status === 200){
            this.alerta('success', true, response.data.message.description)
            this.clear()
          }
          else if(response.status === 400){
            this.alerta('error', true, 'Erro ao validar formulário')
          }
          else if(response.status === 500) {
            this.alerta('error', true, 'Erro ao cadastrar lote. Entre em contato com o suporte técnico!')
          }
        } else {
          this.alerta('warning', true, 'Preencha os campos corretamente!')
        }
      },
      async getLote() {
        let response = await LotesService._getById(this.lote.id)
        this.lote = response.data.lotes[0]
        console.log(this.lote);
      },
      clear() {
        this.lote.codigo = null
      },
      alerta(tipo, estado, message) {
        this.alerter.tipo = tipo
        this.alerter.estado = estado
        this.alerter.message = message
      },
      validarFormulario() {
        if (this.lote.codigo !== '' && this.lote.codigo !== null) {
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
