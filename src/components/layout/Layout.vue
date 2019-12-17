<template>
  <v-app>
    <left-navigation/>
    <v-toolbar
      class="green"
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="enviarDrawer" class="hidden-lg-and-up white--text"/>
      <v-btn icon @click.stop="voltarPagina" class="hidden-md-and-down">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" class="white--text"/>
      </v-btn>
      <v-toolbar-title v-text="title" class="white--text"/>
        <v-spacer/>
        <v-menu
        transition="slide-y-transition"
        bottom
        >
          <v-btn
            slot="activator"
            class="purple"
            color="primary"
            dark
          >
            {{user.funcionario.pessoa.nome}}
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title @click="perfilUsuario">Perfil</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title @click="logout">Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        
    </v-toolbar>
    <v-content class="grey lighten-2">
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app class="elevation-2">
      <v-container fluid grid-list-md>
        <span>Calf Manager Corporation &copy; 2018</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
  import LeftNavigation from './LeftNavigation'
  import Bus from '../../util/bus'
  import UsuarioService from '../../services/UsuariosService'
  import jwtDecode from 'jwt-decode'

  export default {
    name: 'Layout',
    components: {LeftNavigation},
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Calf Manager',
        user: {
          funcionario: {
            pessoa: {
              nome: ''
            }
          }
        }
      }
    },
    mounted(){
      this.buscarUsuarioLogado()
    },
    methods: {
      voltarPagina: function () {
        this.$router.go(-1)
      },
      enviarDrawer: function () {
        this.drawer = !this.drawer
        Bus.$emit('shareDrawer', this.drawer)
      },
      
      async buscarUsuarioLogado(){

        let token = jwtDecode(localStorage.getItem('token'))
        let response = await UsuarioService._getById({id: token.id}) 
        .catch((exception) => {
          if(exception){
            this.logout()
          }
        })
        if(response.status === 200){
          this.user = response.data.usuarios
          if(this.user != null){
            localStorage.setItem('func_id', JSON.stringify(this.user.funcionario_id))
          }
          else
          {
            this.logout();
          }
        }
        
      },
      logout: function (){
        localStorage.clear('token')
        localStorage.clear('func_id')
        this.$router.push('/login?q=unauthenticated')
      },
      perfilUsuario(){
        this.$router.push({
          name: 'PerfilUsuario',
          params: {id: this.user.id}
        })
      }
    }
  }
</script>

<style scoped>

</style>
