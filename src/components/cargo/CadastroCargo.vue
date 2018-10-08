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

            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="cargo.nome"
                label='Nome'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="cargo.descricao"
                label='Descrição'
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn v-if="!cargo.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="cargo.id" @click="editar">Editar</v-btn>

            <v-btn @click="clear">Limpar formulário</v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import CargosService from '../../services/CargosService'
    export default {
      name: 'cadastro-cargo',
      data() {
        return {
          cargo: {
            id: null,
            nome: '',
            descricao: ''
          },
          alerter: {
            tipo: '',
            estado: '',
            mensagem: ''
          },
          nomeTitulo: 'Cadastrar Cargo'
        }
      },
      mounted() {
        this.cargo.id = this.$route.params.id
        if (this.cargo.id) {
          this.nomeTitulo = 'Editar cargo'
          this.getCargo()
        }
      },
      methods: {
        async getCargo() {
          let response = await CargosService._getById(this.cargo.id)
          this.cargo = response.data.cargos[0]
        },
        async cadastrar() {
          if (this.validarForm()) {
            let response = await CargosService._create(this.cargo)
            this.alerta(response.status === 200 ? 'error' : 'success', true, response.data.message.description)
            this.clearFomr()
            console.log(response.data)
          }
          else {
            this.alerta('warning', true, 'Preencha os campos corretamente!')
          }
        },
        async editar() {
          if (this.validarForm()) {
            let response = await CargosService._update(this.cargo)
            this.alerta(response.status === 200 ? 'error' : 'success', true, response.data.message.description)
            this.clearFomr()
          } else {
            this.alerta('warning', true, 'Preencha os campos corretamente!')
          }
        },
        alerta(tipo, estado, mensagem) {
          this.alerter.tipo = tipo
          this.alerter.estado = estado
          this.alerter.mensagem = mensagem
        },
        validarForm() {
          if (this.cargo.nome !== '' && this.cargo.nome !== null && this.cargo.descricao !== '' && this.cargo.descricao !== null) {
            return true
          } else {
            return false
          }
        },
        clearFomr() {
          this.cargo.nome = ''
          this.cargo.descricao = ''
        }
      }
    }
</script>

<style scoped>

</style>
