<template>
  <v-container grid-list-md>
    <v-card>

      <!--Cabeçalho da pagina-->
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
          <span class="caption">Preencha o formulário para cadastrar novas fazendas</span>

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
                v-model="cargo.nome"
                label='Nome'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="cargo.descricao"
                label='Descrição'
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn color="success" v-if="!cargo.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="cargo.id" @click="editar">Editar</v-btn>

            <v-btn @click="clearFormCargo">Limpar formulário</v-btn>
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
  import CargosService from '../../services/CargosService'
  import jwtDecode from 'jwt-decode'

    export default {
      name: 'cadastro-cargo',
      data() {
        return {
          cargo: {
            id: null,
            nome: '',
            descricao: '',
            usuario_cadastro: null
          },
          snackbar: {
            color: 'success',
            estado: false,
            mensagem: ''
          },
          nomeTitulo: 'Cadastrar Cargo'
        }
      },
      mounted() {
        this.getIdUsuarioLogado()
        if (this.$route.params.id) {
          this.cargo.id = this.$route.params.id
          this.nomeTitulo = 'Editar cargo'
          this.getCargo()
        }
      },
      methods: {
        async getCargo() {
          let response = await CargosService._getById(this.cargo)
          this.cargo = response.data.cargos
        },
        async cadastrar() {
          if (this.validarForm()) {
            let response = await CargosService._create(this.cargo).catch(exception => {
              if(exception){
                this.alerta('error', true, 'Erro ao cadastrar Fazenda!')
              }
            })
            if(response.status !== 400 || response.status || 500){
              this.alerta(response.data.message.type, true, response.data.message.description)
            this.clearFormCargo()

            }
          }
          else {
            this.alerta('warning', true, 'Preencha os campos corretamente!')
          }
        },
        async editar() {
          if (this.validarForm()) {
            let response = await CargosService._update(this.cargo).catch(exception => {
              if(exception){
                this.alerta('error', true, 'Erro ao cadastrar Fazenda!')
              }
            })
            if(response.status !== 400 || response.status || 500){
              this.alerta(response.data.message.type, true, response.data.message.description)
              this.clearFormCargo()
            }
            
          } else {
            this.alerta('warning', true, 'Preencha os campos corretamente!')
          }
        },
        alerta(color, estado, mensagem) {
          this.snackbar.color = color
          this.snackbar.estado = estado
          this.snackbar.mensagem = mensagem
        },
        validarForm() {
          if (this.cargo.nome !== '' && this.cargo.nome !== null &&
              this.cargo.descricao !== '' && this.cargo.descricao !== null) {
            return true
          } else {
            return false
          }
        },
        getIdUsuarioLogado(){
          try{
            let res = jwtDecode(localStorage.getItem('token'))
            this.cargo.usuario_cadastro = res.id
          }
          catch(e){
            this.alerta('error', true, 'Erro ao carregar id de usuario logado')
          }
        },
        clearFormCargo() {
          this.cargo.nome = ''
          this.cargo.descricao = ''
        }
      }
    }
</script>

<style scoped>

</style>
