<template>
  <v-container grid-list-md>
    <v-card>


      <!--Cabeçalho da pagina-->
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
          <span class='caption'> Preencha o formulário para cadastrar novas permissões</span>
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

            <v-btn @click="clearFormPermissao">Limpar formulário</v-btn>
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
  import PermissoesService from '../../services/PermissoesService'
  export default {
    name: "cadastro-permissao",
    data(){
      return {
        permissao: {
          id: null,
          nome_modulo: '',
          create: 1,
          read: 1,
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
        console.log(this.permissao);
      },
      async cadastrar(){
        if (this.validarForm()){
          let response = await PermissoesService._create(this.permissao)
          if (response.status === 201){
            this.alerta(response.data.message.type, true, response.data.message.description)
          }

          else {
            console.log(response);
          }
          this.clearFormPermissao()
        }
      },
      async editar(){
        if (this.validarForm()){
          let response = await PermissoesService._update(this.permissao)
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
      alerta(color, estado, mensagem){
        this.snackbar.color = color
        this.snackbar.estado = estado
        this.snackbar.mensagem = mensagem
      },
      clearFormPermissao(){
        this.permissao.nome_modulo = ''
        this.permissao.create = 0
        this.permissao.read = 0
        this.permissao.update = 0
        this.permissao.delete = 0

      }
    }
  }
</script>

<style scoped>

</style>
