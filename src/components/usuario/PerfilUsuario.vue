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
          <h2 class='title mb-0'>Perfil</h2>
          <span class='caption'>Aqui você poderá todos os seus dados</span>
        </div>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-layout row wrap> 
            <v-flex xs12 sm6>
              <v-text-field
                :value="usuario.funcionario.pessoa.nome"
                label="Nome"
                disabled
              ></v-text-field>
            </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  :value="usuario.funcionario.pessoa.cpf"
                  label="CPF"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  :value="usuario.funcionario.pessoa.rg"
                  label="RG"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  :value="usuario.funcionario.pessoa.numero_telefone"
                  label="Telefone"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
              <!-- <span class='title'>Grupos e permissões</span> -->
              <v-flex xs12 sm6>
              <!-- <v-text-field
              :value="grupo.nome"
              label="Grupo"
              disabled
              ></v-text-field> -->
              </v-flex>
              <v-flex xs12 sm6>
              <!-- <v-text-field
              :value="grupo.permissao.nome_modulo"
              label="Permissao"
              disabled
              ></v-text-field> -->
              </v-flex>
              </v-flex>
            </v-layout>
          <v-btn @click="">Salvar</v-btn>
        </v-form>

        
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
  import UsuariosService from '../../services/UsuariosService'
  import GruposService from '../../services/GruposService'
  export default {
    name: 'cadastro-usuario',
    data() {
      return {
        usuario: {
          funcionario: {
            pessoa: {
              nome: '',
              cpf: '',
              rg: '',
              numero_telefone: ''
            }
          }
        },
        grupo: {},
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
      if(this.usuario.id){
        this.getUsuario()
        this.getGrupo()
      
      }
     
    },
    methods: {
       
      alerta(tipo, estado, message) {
        this.alerter.tipo = tipo,
        this.alerter.estado = estado,
        this.alerter.message = message
      },
     
      async getUsuario () {
        let response = await UsuariosService._getById({id: this.usuario.id})
        this.usuario = response.data.usuarios
      },
      async getGrupo(){
        console.log(this.usuario.grupo_id);
        // let response = await GruposService._getById({id: this.usuario.grupo_id})
        // this.grupo = responde.data.grupos
        
        // console.log("id grupo: "+this.usuario.grupo_id)

      }
    }
  }
</script>

<style scoped>

</style>
