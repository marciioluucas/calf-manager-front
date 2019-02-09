<template>
  <v-container grid-list-md>
    <v-card>

      <!--Cabeçalho da pagina-->
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
          <span class='caption'>Preencha o formulário para cadastrar novos grupos.</span>
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
                v-model="grupo.nome"
                label='Nome'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="grupo.descricao"
                label='Descrição'
              ></v-text-field>
            </v-flex>

          </v-layout>
          <v-flex>
            <v-btn v-if="!grupo.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="grupo.id" @click="editar">Editar</v-btn>

            <v-btn @click="clearFormGrupo">Limpar formulário</v-btn>
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
  import GrupoService from '../../services/GruposService'
  import PermissaoService from '../../services/PermissoesService'
  import jwtDecode from 'jwt-decode'
  export default {
    name: 'cadastro-grupo',
    data() {
      return {
        grupo: {
          id: null,
          nome: null,
          descricao: null,
          usuario_cadastro: null
        },       
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        },
        dialog: false,
        nomeTitulo: 'Cadastrar Grupos'
      }
    },
    mounted() {
      this.getIdUsuarioLogado()
      if (this.$route.params.id) {
        this.grupo.id = this.$route.params.id
        this.nomeTitulo = 'Editar Grupo'
        this.getGrupoId(this.grupo.id)
      }
    },
   
    methods: {
      async getGrupoId(id) {
        let response = await GrupoService._getById({id: id})
        this.grupo = response.data.grupos
      },

      getIdUsuarioLogado(){
                try{
                    let res = jwtDecode(localStorage.getItem('token'))
                    this.grupo.usuario_cadastro = res.id
                }
                catch(e){
                    this.alerta('error', true, 'Erro ao carregar id de usuario logado')
                }
            },
      
      async cadastrar() {
        if (this.validarFormGrupo()) {
          try{
            let response = await GrupoService._create(this.grupo)
          if (response.status !== 400 || response.status !== 500) {
            this.alerta(response.data.message.type, true, response.data.message.description)
            this.clearFormGrupo()
          }
          }
          catch(e){
              this.alerta('error', true, 'Erro ao Cadastrar Grupo!')
              return false            
          }
        }
      },
      async editar() {
        if (this.validarFormGrupo()) {
          try{
            let response = await GrupoService._update(this.grupo)
            if (response.status !== 400 || response.status !== 500) {
              this.alerta(response.data.message.type, true, response.data.message.description)
              this.clearFormGrupo()
            }
          }
          catch(e){
              this.alerta('error', true, 'Erro ao Cadastrar Grupo!')
              return false            
          }
        }
      },

      alerta(color, estado, mensagem) {
        this.snackbar.color = color
        this.snackbar.estado = estado
        this.snackbar.mensagem = mensagem
      },
      validarFormGrupo() {
          if(this.grupo.nome === null){
            this.alerta('warning', true, 'Preencha o nome do grupo!')
            return false
          }
          if(this.grupo.descricao === null){
            this.alerta('warning', true, 'Preencha a descrição do grupo!')
            return false
          }
          return true
      },
      clearFormGrupo() {
        this.grupo.nome = ''
        this.grupo.descricao = ''
        this.grupo.permissao_id = null
      }
    }
  }
</script>

<style scoped>

</style>
