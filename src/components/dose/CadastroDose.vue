<template>
  <v-container grid-list-md>
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

            <!--Adicionar Animal-->
            <v-flex xs12 sm6 md6 lg6>
              <v-combobox
                v-model="dose.animal"
                :items="selectAnimal.items"
                item-text="nome"
                item-value="id"
                label="Animal"
                placeholder=""
              ></v-combobox>
            </v-flex>

            <!--Adicionar Medicamento-->
            <v-flex xs12 sm4 md4 lg4>
              <v-combobox
                v-model="dose.medicamento"
                :items="selectMedicamento.items"
                item-text="nome"
                item-value="id"
                label="Medicamento"
                placeholder=""
              ></v-combobox>
            </v-flex>

            <!--Cadastrar Medicamento-->
            <v-flex xs12 sm2 md2 lg2>
              <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="500px">
                  <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                  <v-card>
                      <v-flex xs12>
                        <v-alert
                          v-if="alerterForm.estado"
                          :type="alerterForm.tipo"
                        >
                          {{alerterForm.mensagem}}
                        </v-alert>
                        <span class='title'>Cadastrar Medicamento</span>
                      </v-flex>
                      <v-card-title>

                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md6>
                            <v-text-field
                              v-model="formMedicamento.nome"
                              label="Nome"
                              required
                            >
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-text-field
                              v-model="formMedicamento.prescricao"
                              label="Prescricao"
                            >
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <small>*Preencha todos os campos corretamente</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="blue darken-1" flat @click="cadastrarMedicamento">Salvar</v-btn>
                      <v-btn color="blue darken-1" flat @click="clearFormMedicamento">Limpar Formulário</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-flex>

            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="dose.quantidadeMg"
                label='Dose'
                placeholder="Medida em miligramas"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn v-if="!dose.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="dose.id" @click="editar">Editar</v-btn>

            <v-btn @click="clearForm">Limpar formulário</v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import DosesService from '../../services/DosesService'
  import {AnimaisService} from '../../services/AnimaisService'
  import MedicamentosService from '../../services/MedicamentosService'
  export default {
    name: 'cadastro-dose',
    data() {
      return {
        dose: {
          id: null,
          quantidadeMg: '',
          animal: [],
          medicamento:[]
        },
        formMedicamento: {
          id: null,
          nome: '',
          prescricao: ''
        },
        selectAnimal: {
          items: []
        },
        selectMedicamento: {
          items: []
        },
        alerter: {
          tipo: '',
          estado: false,
          mensagem: ''
        },
        alerterForm: {
          tipo: '',
          estado: false,
          mensagem: ''
        },
        nomeTitulo: 'Vacinar Animal',
        dialog: false
      }
    },
    mounted() {
      this.getAnimais()
      this.getMedicamentos()
      this.dose.id = this.$route.params.id
      if (this.dose.id) {
        this.nomeTitulo = 'Editar Vacina'
        this.getDose()
      }
    },
    methods: {
      async getDose() {
        let response = await DosesService._getById(this.dose.id)
        this.dose = response.data.doses
      },
      async getAnimais() {
        let response = await AnimaisService._getAll(this.dose.animal)
        this.selectAnimal.items = response.data.animais.data
      },
      async getMedicamentos() {
        let response = await MedicamentosService._getAll(this.dose.medicamento)
        this.selectMedicamento.items = response.data.medicamentos.data
      },
      async cadastrarMedicamento() {

        if (this.validarFormMedicamento()) {
          console.log('aqui');
          // let response = await MedicamentosService._create(this.formMedicamento)
          // if (response.status === 200) {
          //   this.alerta(response.data.message.type, true, response.data.message.description)
          //
          // }
          // if (response.status === 400) {
          //   this.alerta(response.data.message.type, true, response.data.message)
          // }
          // if (response.status === 500) {
          //   this.alerta(response.data.message.type, true, response.data.message)
          // }
          // this.dialog = false
        } else {
          this.alertaForm('warning', true, 'Preencha os campos corretamente!')
        }
      },
      async cadastrar() {
        console.log(this.dose)
        // let response = await DosesService._create(this.dose)
        // if(response.status === 200) {
        //
        // }
        // if(response.status === 200) {
        //
        // }
        // if(response.status === 200) {
        //
        // }
      },
      async editar() {
        let response = await DosesService._create(this.dose)
        if(response.status === 200) {

        }
        if(response.status === 200) {

        }
        if(response.status === 200) {

        }
      },
      validarFormDose() {
        if (this.dose.animal.id !== '' && this.dose.animal.id !== null &&
            this.dose.medicamento.id !== '' && this.dose.medicamento.id !== null &&
            this.dose.quantidadeMg !== '' && this.dose.quantidadeMg !== null) {
          return true
        } else {
          return false
        }
      },
      validarFormMedicamento() {
        console.log('aqui');
        if (this.formMedicamento.nome !== '' && this.formMedicamento.nome !== null &&
          this.formMedicamento.prescricao !== '' && this.formMedicamento.prescricao !== null) {
          return true
        }
        return false
      },
      clearForm() {

      },
      clearFormMedicamento() {
        this.formMedicamento.nome = ''
        this.formMedicamento.prescricao = ''
      },
      alerta(tipo, estado, mensagem){
        this.alerter.tipo = tipo
        this.alerter.estado = estado
        this.alerter.mensagem = mensagem
      },
      alertaForm(tipo, estado, mensagem){
        this.alerterForm.tipo = tipo
        this.alerterForm.estado = estado
        this.alerterForm.mensagem = mensagem
      }
    }
  }
</script>

<style scoped>

</style>
