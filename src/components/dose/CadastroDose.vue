<template>
  <v-container grid-list-md>
    <v-card>

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
              <v-autocomplete
                v-model="dose.animal"
                :items="selectAnimal.items"
                :search-input.sync="selectAnimal.search"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Animais"
                placeholder="Pesquisar pelo Animal"
                return-object
              />
            </v-flex>

            <!--Adicionar Medicamento-->
            <v-flex xs12 sm4 md4 lg4>
              <v-autocomplete
                v-model="dose.medicamento"
                :items="selectMedicamento.items"
                :search-input.sync="selectMedicamento.search"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Medicamentos"
                placeholder="Pesquisar pelo Medicamento"
                return-object
              />
            </v-flex>

            <!--Cadastrar Medicamento-->
            <v-flex xs12 sm2 md2 lg2>
              <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="500px">
                  <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                  <v-card>
                    <v-card-title>
                      <v-flex xs12>
                        <span class='title'>Cadastrar Medicamento</span>
                      </v-flex>
                      <v-flex xs12>
                        <span class='caption'>Preencha o formulário para cadastrar novos medicamentos.</span>
                      </v-flex>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field
                              v-model="dose.medicamento.nome"
                              label="Nome"
                              required
                            >
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field
                              v-model="dose.medicamento.prescricao"
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
                      <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                      <v-btn color="blue darken-1" flat @click="clearFormMedicamento">Limpar Formulário</v-btn>
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

            <v-btn @click="clearFormDose">Limpar formulário</v-btn>
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
           @click="snackbar.mode = false">
           Close
         </v-btn>
       </v-snackbar>
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
          animal: {
            id: null,
            nome: ''
          },
          medicamento: {
            id: null,
            nome: '',
            prescricao: ''
          }
        },
        selectAnimal: {
          loading: false,
          items: [],
          search: null
        },
        selectMedicamento: {
          loading: false,
          items: [],
          search: null
        },
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        },
        nomeTitulo: 'Vacinar Animal',
        dialog: false
      }
    },
    mounted() {
      this.dose.id = this.$route.params.id
      if (this.dose.id) {
        this.nomeTitulo = 'Editar Vacina'
        this.getDose()
      }
    },
    watch: {
      'selectAnimal.search'(val) {
        val && this.getAnimais(val)
      },
      'selectMedicamento.search'(val){
        val && this.getMedicamentos(val)
      }
    },
    methods: {
      async getDose() {
        let response = await DosesService._getById(this.dose.id)
        this.dose = response.data.doses
      },
      async getAnimais(val) {
        let busca = {
          nome: val
        }
        let response = await AnimaisService._getAll(this.dose.animal)
        if(val){
          response = await AnimaisService._getByNome(busca)
        }
        this.selectAnimal.items = response.data.animais.data
      },
      async getMedicamentos(val) {
        let busca = {
          nome: val
        }
        let response = await MedicamentosService._getAll(this.dose.medicamento)
        if(val){
          response = await MedicamentosService._getByNome(busca)
        }
        this.selectMedicamento.items = response.data.medicamentos.data
      },
      async cadastrarMedicamento() {
        if (this.validarFormMedicamento()) {
          let response = await MedicamentosService._create(this.dose.medicamento).catch(exception => {
            if(exception){
              this.alerta('error', true, 'Erro ao cadastrar medicamento!')
            }
          })
          if(response.status === 201){
            this.alerta(response.data.message.type, true, response.data.message.description)
          }
          this.clear()
        } else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
        }
      },
      async cadastrar() {
        if (this.validarFormDose()) {
          let response = await DosesService._create(this.dose).catch(exception => {
            if(exception){
              this.alerta('error', true, 'Erro ao cadastrar Vacina!')
            }
          })
          if(response.status === 201){
            this.alerta(response.data.message.type, true, response.data.message.description)
          }
          this.clear()
        } else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
        }
      },
      async editar() {
        if (this.validarFormDose()) {
          let response = await DosesService._update(this.dose).catch(exception => {
            if(exception){
              this.alerta('error', true, 'Erro ao alterar Vacina!')
            }
          })
          if(response.status === 201){
            this.alerta(response.data.message.type, true, response.data.message.description)
          }
          this.clear()
        } else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')

        }
      },
      validarFormDose() {
        if (this.dose.animal !== [] && this.dose.medicamento.id !== '' && this.dose.medicamento.id !== null &&
            this.dose.quantidadeMg !== '' && this.dose.quantidadeMg !== null) {
          return true
        } else {
          return false
        }
      },
      validarFormMedicamento() {
        if (this.dose.medicamento.nome !== '' && this.dose.medicamento.nome !== null &&
          this.dose.medicamento.prescricao !== '' && this.dose.medicamento.prescricao !== null) {
          return true
        }
        return false
      },
      clearFormDose() {
        this.dose.animal.id = ''
        this.dose.animal.nome = ''
        this.dose.quantidadeMg = ''
        this.clearFormMedicamento()

      },
      clearFormMedicamento() {
        this.dose.medicamento.id = ''
        this.dose.medicamento.nome = ''
        this.dose.medicamento.prescricao = ''
      },
      alerta(color, estado, mensagem) {
        this.snackbar.color = color
        this.snackbar.estado = estado
        this.snackbar.mensagem = mensagem
      }
    }
  }
</script>

<style scoped>

</style>
