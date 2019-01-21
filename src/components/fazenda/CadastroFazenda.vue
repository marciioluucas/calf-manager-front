<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <!--Cabecalho da pagina-->
          <v-card-title primary-title>

            <div>
              <h2 class="title mb-0">{{nomeTitulo}}</h2>
              <span class="caption">Preencha o formulário para cadastrar novas fazendas</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <form>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="fazenda.nome"
                      label="Nome"
                      data-vv-name="name"
                      required
                    ></v-text-field>
                  </v-flex>

                </v-layout>
                <v-btn v-if="!this.fazenda.id" @click="cadastrar">Enviar</v-btn>
                <v-btn v-if="this.fazenda.id" @click="editar">Editar</v-btn>

                <v-btn @click="clearFormFazenda">Limpar formulário</v-btn>

              </form>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import FazendasService from '../../services/FazendasService'
  export default {
    data() {
      return {
        fazenda: {
          id: null,
          nome: ''
        },
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        },
        nomeTitulo: 'Cadastro de Fazenda'
      }
    },
    async mounted() {
      this.fazenda.id = this.$route.params.id
      if (this.fazenda.id) {
        this.nomeTitulo = 'Editar Fazenda'
        this.getFazenda()
      }
    },
    methods: {
      async cadastrar() {
        try{
          if (this.validarFormulario()) {
            let response = await FazendasService._create(this.fazenda)
            if(response.status === 201){
              this.alerta(response.data.message.type, true, response.data.message.description)
              this.clearFormFazenda()
            }
          }
        }
        catch(e){
            this.alerta('error', true, 'Erro ao cadastrar fazenda')
        }
      },
      clearFormFazenda(){
        this.fazenda.nome = ''
      },
      alerta(color, estado, mensagem) {
        this.snackbar.color = color
        this.snackbar.estado = estado
        this.snackbar.mensagem = mensagem
      },
      async getFazenda() {
        let response = await FazendasService._getById({id: this.fazenda.id})
        this.fazenda = response.data.fazendas
      },
      async editar() {
        if (this.validarFormulario()) {
          let response = await FazendasService._update(this.fazenda)
          if(response.status === 202){
            this.alerta(response.data.message.type, true, response.data.message.description)
            this.clearFormFazenda()
          }
        }
      },
      validarFormulario() {
        if (this.fazenda.nome !== '' && this.fazenda.nome !== undefined) {
          return true
        } else {
          if(!this.fazenda.nome){
            this.alerta('warning', true, 'Preencha o nome da fazenda!')
            return false
          }
        }
      },
    }
  }
</script>


<style scoped>

</style>
