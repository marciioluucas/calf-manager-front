<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <!--Componente de alerta-->
          <v-alert
            v-if="alerter.estado"
            :value="true"
            :type="alerter.tipo"
          >
            {{alerter.mensagem}}
          </v-alert>

          <!--Cabeçalho da pagina-->
          <v-card-title primary-title>
            <div>
              <h2 class='title mb-0'>{{nomeTitulo}}</h2>
              <span class='caption'></span>
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

                <v-btn @click="clear">Limpar formulário</v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import MedicamentosService from '../../services/MedicamentosService'
    export default {
      name: 'cadastro-medicamento',
      data () {
        return {
          medicamento: {
            id: null,
            nome: null,
            prescricao: null
          },
          alerter: {
            tipo: 'success',
            estado: false,
            message: ''
          },
          nomeTitulo: 'Cadastro Medicamento'
        }
      },
      mounted() {
        this.medicamento.id = this.$route.params.id
        if (this.medicamento.id) {
          this.nomeTitulo = 'Editar Medicamento'
          this.getMedicamento()
        }
      },
      methods: {
        async cadastrar() {
          if(this.validarForm()){
            let response = await MedicamentosService._create(this.medicamento)
            // console.log(response)
            if(response.status ===201){
              this.alerta(response.data.message.type, true, response.data.message.description)
            }
            this.clear()
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
            let response = await MedicamentosService._update(this.medicamento)
            // console.log(response)
            if(response.status ===201){
              this.alerta(response.data.message.type, true, response.data.message.description)
            }
            this.clear()
          }
          else{
            this.alerta('warning', true, 'Preencha todos os campos corretamente!')
          }        },
        alerta(tipo, estado, mensagem){
          this.alerter.tipo = tipo
          this.alerter.estado = estado
          this.alerter.mensagem = mensagem
        },
        validarForm(){
          if(this.medicamento.nome !== '' && this.medicamento.nome !== null && this.medicamento.prescicao !== '' && this.medicamento.prescicao !== null){
            return true
          }
          else {
            return false
          }
        },
        clear() {
          this.medicamento.nome = ''
          this.medicamento.prescricao = ''
        }

      }
    }
</script>

<style scoped>

</style>
