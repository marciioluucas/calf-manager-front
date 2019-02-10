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
        <v-form
          ref="form"
          lazy-validation
        >
 
          <v-layout row wrap>
            <v-flex xs12>
              <span class='title'>Informações gerais</span>
            </v-flex>

            <!--Adicionar Animal-->
            <v-flex xs12 sm4 md4 lg4>
              <v-autocomplete
                v-model="dose.animal_id"
                :items="selectAnimal.items"
                :search-input.sync="selectAnimal.search"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Animais"
                placeholder="Pesquisar pelo Animal"
              />
            </v-flex>

            <!--Adicionar Medicamento-->
            <v-flex xs12 sm3 md3 lg3>
              <v-autocomplete
                v-model="dose.medicamento_id"
                :items="selectMedicamento.items"
                :search-input.sync="selectMedicamento.search"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Medicamentos/Vacinas"
                placeholder="Pesquisar pelo Medicamento"
              />
            </v-flex>

            <!--Cadastrar Medicamento-->
            <v-flex xs1>
              <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="500px">
                  <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                  <v-card>
                    <v-card-title>
                      <v-flex xs12>
                        <span class='title'>Cadastrar Medicamento/Vacina</span>
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

            <v-flex xs12 sm4 md4 lg4>
              <v-text-field
                v-model="dose.quantidade_mg"
                label='Dose'
                placeholder="Miligramas/mililitros"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn v-if="!dose.id"  @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="dose.id"  @click="editar">Editar</v-btn>

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
  import UsuariosService from '../../services/UsuariosService'
  import jwtDecode from 'jwt-decode'

  export default {
    name: 'cadastro-dose',
    data() {
      return {
        dose: {
          id: null,
          quantidade_mg: '',
          animal_id: null,
          medicamento_id: null,
          funcionario_id: null,
          medicamento: {
            id: null,
            nome: '',
            prescricao: '',
            usuario_cadastro: null
          },
          usuario_cadastro: null
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
        nomeTitulo: 'Sanidade Animal',
        dialog: false,
      }
    },
    mounted() {
      this.getIdUsuarioLogado()
      if (this.$route.params.id) {
        this.dose.id = this.$route.params.id
        this.nomeTitulo = 'Editar Vacina'
        this.getDoseById(this.dose.id)
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
     
      // Pesquisar Dose por id
      async getDoseById(id) {
        let response = await DosesService._getById({id: id})
        if(response.status == 200){
          this.dose = response.data.doses
          this.getAnimalById(this.dose.animal_id)
          this.getMedicamentoById(this.dose.medicamento_id)
        }
      },

      // Pesquisar Animais por nome
      async getAnimais(val) {
        let busca = {
          nome: val
        }
        let response = await AnimaisService._getAll(busca)
        if(val){
          response = await AnimaisService._getByNome(val)
        }
        this.selectAnimal.items = response.data.animais.data
      },

      // Pesquisar medicamentos por nome
      async getMedicamentos(val) {
        let busca = {
          nome: val
        }
        let response = await MedicamentosService._getAll(this.dose.medicamento)
        if(val){
          response = await MedicamentosService._getByNome(val)
        }
        this.selectMedicamento.items = response.data.medicamentos.data
      },

      // Cadastrar medicamentos
      async cadastrarMedicamento() {
        if (this.validarFormMedicamento()) {
          let response = await MedicamentosService._create(this.dose.medicamento).catch(exception => {
            if(exception){
              this.alerta('error', true, 'Erro ao cadastrar medicamento!')
            }
          })
          if(response.status === 201){
            this.alerta(response.data.message.type, true, response.data.message.description)
            this.dialog = false
            this.clearFormMedicamento()
          }
          
        } else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
        }
      },

      // Pesquisar Animal por id
      async getAnimalById(id){
        try{
          let response = await AnimaisService._getById({id: id})
          if(response.status === 200){
            this.selectAnimal.items = response.data.animais
          }
        }catch(e){
          this.alerta('error', true, 'Erro ao pesquisar animal por id!')

        }
      }, 

      async getMedicamentoById(id){
        try{
          let response = await MedicamentosService._getById({id: id})
          if(response.status === 200){
            this.selectMedicamento.items = response.data.medicamentos
          }
        }catch(e){
          this.alerta('error', true, 'Erro ao pesquisar medicamento por id!')

        }
      }, 


      async cadastrar() {
        
        if (this.validarFormDose()) {
          this.dose.funcionario_id = localStorage.getItem('func_id')
          let response = await DosesService._create(this.dose)
          if(response.status === 201){
            this.alerta(response.data.message.type, true, response.data.message.description)
            this.clearFormDose()
          }
          
        } else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
        }
      },
      async editar() {
        try{
          if (this.validarFormDose()) {
            let response = await DosesService._update(this.dose)
            if(response.status !== 400 || response.status !== 500){
              this.alerta(response.data.message.type, true, response.data.message.description)
              this.clearFormDose()
            }
          }
        }catch(e){
          this.alerta('error', true, 'Erro ao alterar vacina!')
        }
      },

      getIdUsuarioLogado(){
        try{
          let res = jwtDecode(localStorage.getItem('token'))
          this.dose.usuario_cadastro = res.id
          this.dose.medicamento.usuario_cadastro = res.id

        }
        catch(e){
          this.alerta('error', true, 'Erro ao carregar id de usuario logado')
        }
      },

      validarFormDose() {
        if (this.dose.animal_id !== null && this.dose.medicamento_id !== null && this.dose.quantidade_mg !== null) {
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
        this.dose.animal_id = null
        this.dose.medicamento_id = null
        this.dose.quantidade_mg = null
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
