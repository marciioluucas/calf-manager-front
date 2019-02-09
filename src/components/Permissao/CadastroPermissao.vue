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

            <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="permissao.nome_modulo"
                label="Nome"
                required
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-autocomplete
                  label="Pesquise o Grupo"
                  :loading="selectGrupo.loading"
                  :items="selectGrupo.items"
                  hide-no-data
                  hide-selected
                  item-text="nome"
                  required
                  cache-items
                  item-value="id"
                  :search-input.sync="selectGrupo.search"
                  v-model="permissao.grupo_id"
                  />
            </v-flex>
            <v-flex xs12 sm2 md2>
                  <v-checkbox label="Create" v-model="permissao.create"></v-checkbox>
            </v-flex>

            <v-flex xs12 sm2 md2>
                  <v-checkbox label="Read" v-model="permissao.read"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm2 md2>
                  <v-checkbox label='Update' v-model="permissao.update"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm2 md2>
                  <v-checkbox label="Delete" v-model="permissao.deletee"></v-checkbox>
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
  import GruposService from '../../services/GruposService'
  import jwtDecode from 'jwt-decode'

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
          delete: 0,
          grupo_id: null,
          usuario_cadastro: null
        },
        selectGrupo: {
          item: [],
          search: null,
          loading: false
        },
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        },
        nomeTitulo: 'Cadastro de Permissão'
      }
    },
    watch: {
        'selectGrupo.search'(val) {
        val && this.getGrupos(val)
        },
    },
    mounted() {
      this.getIdUsuarioLogado()
      if(this.permissao.id = this.$route.params.id){
        this.nomeTitulo = 'Editar Permissão'
        this.getPermissao()
      }
    },
    methods: {
      // Pesquisar fazenda por nome
      async getGrupos(val) {
          try{
              this.selectGrupo.loading = true
              if (val !== null){
                  let response = await GruposService._getByNome(val)
                  if(response.status !== 400 || response.status !== 500){
                    console.log(response)
                      this.selectGrupo.items = response.data.grupos.data
                  }
                  this.selectGrupo.loading = false
              }
          }
          catch (exception){
            this.alerta('error', true, 'Erro ao pesquisar grupo!')
          }
      },
      async getPermissao(){
        try{
        let response = await PermissoesService._getById(this.permissao)
        this.permissao = response.data.permissoes
        console.log(this.permissao);
        }
        catch(e){
          this.alerta('error', true, 'Erro ao pesquisar permissao por id!')
          return false
        }
      },
      async cadastrar(){
        try{
          if (this.validarForm()){
            let response = await PermissoesService._create(this.permissao)
            if (response.status !== 400 || response.status !== 500){
              this.alerta(response.data.message.type, true, response.data.message.description)
              this.clearFormPermissao()
            }

            else {
              console.log(response);
            }
            
          }
        }
        catch(e){
            this.alerta('error', true, 'Erro ao cadastrar permissão!')
            return false
        }
      },
      async editar(){
        try{
          if (this.validarForm()){
            let response = await PermissoesService._update(this.permissao)
            if (response.status !== 400 || response.status !== 500){
              this.alerta(response.data.message.type, true, response.data.message.description)
              this.clearFormPermissao()
            }
          }   
        }
        catch(e){
            this.alerta('error', true, 'Erro ao alterar permissão!')
            return false
        }
      },

      getIdUsuarioLogado(){
          try{
              let res = jwtDecode(localStorage.getItem('token'))
              this.permissao.usuario_cadastro = res.id
          }
          catch(e){
              this.alerta('error', true, 'Erro ao carregar id de usuario logado')
          }
      },

      validarForm(){
      if(this.permissao.nome_modulo !== '' && this.permissao.nome_modulo) {
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
        this.selectGrupo.items = null
        this.permissao.grupo_id = null
      }
    }
  }
</script>

<style scoped>

</style>
