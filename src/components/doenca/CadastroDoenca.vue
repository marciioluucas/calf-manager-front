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

      <!--Cabeçalho da pagina-->
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>Cadastro de doença</h2>
          <span class='caption'>Aqui você poderá fazer o cadastro dos animais.</span>
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
                v-model="doenca.nome"
                label='Nome da Doença'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="doenca.descricao"
                label='Descrição da Doença'
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn @click="cadastrar">Enviar</v-btn>
            <v-btn @click="clear">Limpar formulário</v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import DoencasService from '../../services/DoencasService'
  export default {
    name: 'cadastro-doenca',
    data() {
      return {
        doenca: {
          nome: '',
          descricao: ''
        },
        alerter: {
          tipo: 'success',
          estado: false,
          message: 'message'
        }
      }
    },
    methods: {
      async cadastrar() {
        let n = this
        if (this.doenca.nome !== '' && this.doenca.nome !== undefined && this.doenca.descricao !== '' && this.doenca.descricao !== undefined) {
          await DoencasService._create(this.doenca).catch(e => {
            console.log(e.response.data)
            n.alerta('error', true, 'Erro ao cadastrar doença!')
          }).finally(function () {
            n.alerta('success', true, 'Cadastro realizado com sucesso!')
            n.doenca.nome = ''
            n.doenca.descricao = ''
          })
        } else {
          n.alerta('warning', true, 'Preencha os campos corretamente')
        }
      },
      clear() {
        this.doenca.nome = ''
        this.doenca.descricao = ''
        this.alerta('success', false, 'message')
      },
      alerta (tipo, estado, message) {
        this.alerter.tipo = tipo
        this.alerter.estado = estado
        this.alerter.message = message
      }

    }
  }
</script>

<style scoped>

</style>
