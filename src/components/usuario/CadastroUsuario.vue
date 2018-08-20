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
          <h2 class='title mb-0'>Cadastro de Usuários</h2>
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
          <v-btn @click="cadastrar">Cadastrar</v-btn>
          <v-btn @click="clear">Limpar formulário</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
  // import UsuarioService from '../../services/CadastroUsuario'
  export default {
    name: 'cadastro-usuario',
    data() {
      return {
        usuario: {
          username: '',
          password: '',
          rePassword: ''
        },
        alerter: {
          tipo: 'success',
          estado: false,
          message: 'message'
        }
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
      }
    }
  }
</script>

<style scoped>

</style>
