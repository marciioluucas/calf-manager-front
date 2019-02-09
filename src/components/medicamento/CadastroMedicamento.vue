<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <!--Cabeçalho da pagina-->
          <v-card-title primary-title>
            <div>
              <h2 class='title mb-0'>{{nomeTitulo}}</h2>
              <span class="caption">Preencha o formulário para cadastrar novos medicamentos</span>
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
                    v-model="medicamento.nome"
                    label='Nome do Medicamento'
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6 lg6>
                  <v-text-field
                    v-model="medicamento.prescricao"
                    label='Prescrição do Medicamento'
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-flex>
                <v-btn v-if="!medicamento.id" @click="cadastrar">Enviar</v-btn>
                <v-btn v-if="medicamento.id" @click="editar">Editar</v-btn>

                <v-btn @click="clearFormMedicamento">Limpar formulário</v-btn>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import MedicamentosService from '../../services/MedicamentosService'
  import jwtDecode from 'jwt-decode'

    export default {
      name: 'cadastro-medicamento',
      data () {
        return {
          medicamento: {
            id: null,
            nome: null,
            prescricao: null,
            usuario_cadastro: null
          },
          snackbar: {
            color: 'success',
            estado: false,
            mensagem: ''
          },
          nomeTitulo: 'Cadastro Medicamento'
        }
      },
      mounted() {
        this.getIdUsuarioLogado()
        this.medicamento.id = this.$route.params.id
        if (this.medicamento.id) {
          this.nomeTitulo = 'Editar Medicamento'
          this.getMedicamento()
        }
      },
      methods: {
        async cadastrar() {
          if(this.validarForm()){
            let response = await MedicamentosService._create(this.medicamento).catch(exception => {
              if(exception) {
                this.alerta('error', true, 'Erro ao cadastrar medicamento!')
              }
            })
            if(response.status ===201){
              this.alerta(response.data.message.type, true, response.data.message.description)
              this.clearFormMedicamento()
            }
          }
          else{
            this.alerta('warning', true, 'Preencha todos os campos corretamente!')
          }
        },
        async getMedicamento() {
          let response = await MedicamentosService._getById(this.medicamento)
          this.medicamento = response.data.medicamentos
        },
        async editar() {
          if(this.validarForm()){
            let response = await MedicamentosService._update(this.medicamento).catch(exception => {
              if(exception) {
                this.alerta('error', true, 'Erro ao alterar medicamento!')
              }
            })
            if(response.status ===201){
              this.alerta(response.data.message.type, true, response.data.message.description)
              this.clearFormMedicamento()
            }
          }
          else{
            this.alerta('warning', true, 'Preencha todos os campos corretamente!')
          }
        },

        getIdUsuarioLogado(){
            try{
                let res = jwtDecode(localStorage.getItem('token'))
                this.medicamento.usuario_cadastro = res.id
            }
            catch(e){
                this.alerta('error', true, 'Erro ao carregar id de usuario logado')
            }
        },
        alerta(color, estado, mensagem) {
          this.snackbar.color = color
          this.snackbar.estado = estado
          this.snackbar.mensagem = mensagem
        },
        validarForm(){
          if(this.medicamento.nome !== '' && this.medicamento.nome !== null && this.medicamento.prescicao !== '' && this.medicamento.prescicao !== null){
            return true
          }
          else {
            return false
          }
        },
        clearFormMedicamento() {
          this.medicamento.nome = ''
          this.medicamento.prescricao = ''
        }

      }
    }
</script>

<style scoped>

</style>
