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

            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="permissao.nome_modulo"
                label="Nome"
                required
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm2 md2>
              <v-switch
                v-model="permissao.create"
                label="Create"
                color="primary"
                value='1'
                hide-details
              ></v-switch>
            </v-flex>

            <v-flex xs12 sm2 md2>
              <v-switch
                v-model="permissao.read"
                label="Read"
                color="primary"
                value='1'
                hide-details
              ></v-switch>
            </v-flex>
            <v-flex xs12 sm2 md2>
              <v-switch
                v-model="permissao.update"
                label="Update"
                color="primary"
                value='1'
                hide-details
              ></v-switch>
            </v-flex>
            <v-flex xs12 sm2 md2>
              <v-switch
                v-model="permissao.delete"
                label="Delete"
                color="primary"
                value='1'
                hide-details
              ></v-switch>
            </v-flex>

          </v-layout>
          <v-flex>
            <v-btn v-if="!permissao.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="permissao.id" @click="editar">Editar</v-btn>

            <v-btn @click="clear">Limpar formulário</v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "cadastro-permissao",
    data(){
      return {
        permissao: {
          id: null,
          nome_modulo: '',
          create: 0,
          read: 0,
          update: 0,
          delete: 0
        },
        alerter: {
          tipo: 'success',
          estado: false,
          mensagem: ''
        },
        nomeTitulo: 'Cadastro de Permissão'
      }
    },
    mounted() {
      if(this.permissao.id = this.$route.params.id){
        this.nomeTitulo = 'Editar Permissão'
        this.getPermissao()
      }
    },
    methods: {
      async getPermissao(){
        let response = await PermissoesService._getById(this.permissao)
        this.permissao = response.data.permissoes
      },
      async cadastrar(){
        if (this.validarForm()){
          let response = await PermissaoService._create(this.permissao)
          if (response.status === 201){
            this.alerta(response.data.message.type, true, response.data.message.description)
          }
        }
      },
      async editar(){
        if (this.validarForm()){
          let response = await PermissaoService._update(this.permissao)
          if (response.status === 201){
            this.alerta(response.data.message.type, true, response.data.message.description)
          }
        }      },
      validarForm(){
      if(this.permissao.nome_modulo !== '' && this.permissao.nome_modulo !== null && this.permissao.create !== null &&
         this.permissao.read !== null && this.permissao.update !== null&& this.permissao.delete !== null) {
            return true
          } else {
            return false
          }
      },
      alerta(tipo, estado, mensagem){
        this.alerter.tipo = tipo
        this.alerter.estado = estado
        this.alerter.mensagem = mensagem
      },
      clear(){

      }
    }
  }
</script>

<style scoped>

</style>
