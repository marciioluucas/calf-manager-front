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
            {{alerter.message}}
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
                    v-model="medicamento.prescicao"
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
    export default {
      name: 'cadastro-medicamento',
      data () {
        return {
          medicamento: {
            id: null,
            nome: null,
            prescicao: null
          },
          alerter: {
            tipo: '',
            estado: '',
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

        },
        async getMedicamento() {

        },
        async editar() {

        },
        clear() {
          this.medicamento.nome = ''
          this.medicamento.prescicao = ''
        }

      }
    }
</script>

<style scoped>

</style>
