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
                v-model="doenca.nome"
                label='Nome da Doenca'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="doenca.descricao"
                label='Descrição da Doenca'
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn v-if="!doenca.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="doenca.id" @click="editar">Editar</v-btn>

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
          id: null,
          nome: '',
          descricao: ''
        },
        alerter: {
          tipo: 'success',
          estado: false,
          mensagem: 'message'
        },
        nomeTitulo: 'Cadastro de Doenca'
      }
    },
    async mounted() {
      this.doenca.id = this.$route.params.id
      if (this.doenca.id) {
        this.nomeTitulo = 'Editar Doenca'
        this.getDoenca()
      }
    },
    methods: {
      async cadastrar() {
        let n = this
        if (this.validarFormulario()) {
          let response = await DoencasService._create(this.doenca)
          this.clear()
          this.alerta(response.status === 200 ? 'error' : 'success', true, response.data.message.description)

          // let response = await DoencasService._create(this.doenca).catch(e => {
          //   console.log(e.response.data)
          //   n.alerta('error', true, 'Erro ao cadastrar Doenca!')
          // }).finally(function (r) {
          //   n.alerta('success', true, 'Cadastro realizado com sucesso!')
          //   n.doenca.nome = ''
          //   n.doenca.descricao = ''
          // })
        } else {
          n.alerta('warning', true, 'Preencha os campos corretamente')
        }
      },
      async editar() {
        if (this.validarFormulario()) {
          const response = await DoencasService._update(this.doenca)
          this.alerta(response.status === 200 ? 'success' : 'error', true, response.data.message.description)
          this.clear()
          // Adicionar a funcionalidade de voltar a pagina alterior para voltar a tabela de doenças
        } else {
          this.alerta('warning', true, 'Preencha os campos corretamente!')
        }
      },
      clear() {
        this.doenca.nome = ''
        this.doenca.descricao = ''
      },
      alerta(tipo, estado, mensagem) {
        this.alerter.tipo = tipo
        this.alerter.estado = estado
        this.alerter.mensagem = mensagem
      },
      async getDoenca() {
        let response = await DoencasService._getById({id: this.doenca.id})
        this.doenca = response.data.doencas[0]
      },
      validarFormulario() {
        if (this.doenca.nome !== '' && this.doenca.nome !== undefined && this.doenca.descricao !== '' && this.doenca.descricao !== undefined) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped>

</style>
