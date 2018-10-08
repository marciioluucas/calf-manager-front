<template>

  <v-container grid-list-md>
    <v-card>
      <!--Componente de alerta-->
      <v-alert
        v-if="alerter.estado"
        :value="true"
        :type="alerter.tipo"
      >
        {{alerter.message}}
      </v-alert>

      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
          <span class='caption'>Aqui você poderá fazer o cadastro dos usuários</span>
        </div>
      </v-card-title>

      <v-card-text>

        <v-form>
          <v-layout row wrap>
            <v-flex xs12>
              <span class='title'>Informações gerais</span>
            </v-flex>

            <v-flex xs12 >
              <v-text-field
                v-model="usuario.username"
                :rules="nameRules"
                :counter="10"
                label="User Name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="usuario.password"
                :append-icon="show1 ? 'visibility_off' : 'visibility'"
                :type="show1 ? 'text' : 'password'"
                name="password"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex xs12>
            <v-text-field
              v-model="usuario.rePassword"
              :append-icon="show1 ? 'visibility_off' : 'visibility'"
              :type="show1 ? 'text' : 'password'"
              name="re-password"
              label="Repeat Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

          </v-layout>
          <v-btn v-if="!this.usuario.id" @click="cadastrar">Cadastrar</v-btn>
          <v-btn v-if="this.usuario.id" @click="editar">Editar</v-btn>
          <v-btn @click="clear">Limpar formulário</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
  import UsuariosService from '../../services/UsuariosService'
  export default {
    name: 'cadastro-usuario',
    data() {
      return {
        usuario: {
          id: null,
          username: null,
          password: null,
          rePassword: null
        },
        alerter: {
          tipo: 'success',
          estado: false,
          message: 'message'
        },
        nomeTitulo: 'Cadastro de Usuários'
      }
    },
    async mounted() {
      this.usuario.id = this.$route.params.id
      if (this.usuario.id) {
        this.nomeTitulo = 'Editar Usuário'
        this.getUsuario()
      }
    },
    methods: {
      async cadastrar() {
        let n = this
        if (this.usuario.password === this.usuario.rePassword) {
          if (this.usuario.username !== '' && this.usuario.username !== undefined && this.usuario.password !== '' && this.usuario.password !== undefined) {
        // await UsuarioService._create(this.usuario).catch(e => {
        //   n.alerta('error', true, 'Erro ao cadastrar usuário!')
        //   console.log(e.response.data)
        // }).finally(
        //   n.alerta('success', true, 'Cadastro realizado com sucesso!')
        //   n.clear()
        // )
           n.alerta('success', true, 'Cadastro realizado com sucesso!')
          } else {
            this.alerta('warning', true, 'Preencha os campos corretamente!')
          }
        } else {
          n.alerta('error', true, 'As senhas digitadas não correspondem!')
          n.usuario.password = ''
          n.usuario.rePassword = ''
        }
      },
      clear() {
        this.usuario.username = '',
        this.usuario.password = ''
      },
      clearAlerta() {
        this.alerter.estado = false
      },
      alerta(tipo, estado, message) {
        this.alerter.tipo = tipo,
        this.alerter.estado = estado,
        this.alerter.message = message
      },
      async editar() {
        let response = await UsuariosService._update(this.usuario)
        this.alerta(response.status === 200 ? 'success' : 'error', true, response.data.message.description)
        this.clear()
      },
      async getUsuario () {
        let response = await UsuariosService._getById({id: this.usuario.id})
        this.usuario = response.data.usuarios
      }
    }
  }
</script>

<style scoped>

</style>
