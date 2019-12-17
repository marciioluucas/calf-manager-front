<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12
                    style="height: 45vh; padding-top: 7vh; background-image: linear-gradient(#2ecc71, #27ae60); text-align: center">
                <img src="static/logo-calf.jpg" style="width: 280px"/>
            </v-flex>
            <v-flex style="height: 55vh; background-color:#F5F5F5"/>
            <v-flex style="margin-top: -25vh"
                    xs12>
                <v-container fill-height>
                    <v-layout align-center row wrap>
                        <v-flex xs12 sm4 md4 lg4 xl2 offset-sm4 offset-md4 offset-lg4 offset-xl5>
                            <v-card class="elevation-5">
                                <v-card-title primary-title>
                                    <div style="text-align: center; width: 100%;">
                                        <h3 class="mb-0">Calf manager</h3>
                                    </div>
                                </v-card-title>
                                <v-card-text>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-form v-model="valid" @keyup.enter.native="signin">
                                                <v-text-field
                                                        v-model="login"
                                                        :rules="[v => !!v || 'Login é requirido']"
                                                        label="Login"
                                                        required
                                                ></v-text-field>
                                                <v-text-field
                                                        v-model="senha"
                                                        :rules="[v => !!v || 'A senha é requirida']"
                                                        label="Senha"
                                                        type="password"
                                                        required
                                                ></v-text-field>
                                            </v-form>
                                        </v-flex>
                                        <v-flex xs12 class="text-xs-right">
                                            <a href="#">Esqueci minha senha</a>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-btn depressed
                                                   large
                                                   color="primary"
                                                   block
                                                   :disabled="!valid"
                                                   @click="signin">
                                                Entrar
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-snackbar
                        v-model="snackbar.visible"
                        top
                >
                    {{ snackbar.text}}
                    <v-btn color="primary"
                           flat
                           @click="snackbar.visible = false"
                    >
                        fechar
                    </v-btn>
                </v-snackbar>
            </v-flex>
            <v-footer fixed app>
                <v-container fluid class="pt-2 text-xs-center">
                    <span>IFGoiano &copy; {{new Date().getFullYear()}}</span>
                </v-container>
            </v-footer>
        </v-layout>
    </div>
</template>

<script>

import UsuariosService from '../../services/UsuariosService';

export default {
  name: 'login',
  data() {
    return {
      snackbar: {
        visible: false,
        text: ''
      },
      valid: false,
      login: '',
      senha: ''
    }
  },
  created() {
    this.handleMessageByQuery()
  },
  methods: {
    handleMessageByQuery() {
      this.snackbar.visible = true
      switch (this.$route.query.q) {
        case 'logout':
          this.snackbar.text = 'Você saiu com sucesso!'
          break
        case 'unauthenticated':
          this.snackbar.text = 'Você não está autenticado(a)'
          break
        default:
          this.snackbar.text = this.$route.query.q
      }
    },

    async signin() {
      
      await UsuariosService._login({login: this.login, senha: this.senha})
      .catch(e => {
        this.notify('Erro ao realizar a autenticação')
      }).then( response => {
        if (response != null && response.status === 200) 
        {
          localStorage.setItem('token', JSON.stringify(response.data.token))
          this.$router.push('Dashboard')
        }
      });
    },

    notify(message)
    {
      this.snackbar.visible = true,
      this.snackbar.text = message
    }
  }
}
</script>

<style scoped>
    .login-container {
        position: absolute;
        width: 150px;
        left: 50%;
        top: 50%;
        margin-left: -120px;
        margin-top: -170px;
        text-align: center;
        border: 1px solid #d8dce5 !important;
        padding: 20px;
        background-color: white !important;
    }
</style>
