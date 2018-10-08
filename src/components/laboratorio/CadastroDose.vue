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

            <v-flex xs12 sm6 d-flex>
              <v-select
                :items="items.animal"
                box
                label="Selecionar Animal"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-select
                :items="items.medicamento"
                box
                label="Selecionar Medicamento"
              ></v-select>
            </v-flex>


            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="hemograma.ppt"
                label='PPT'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="hemograma.hematocrito"
                label='Hematocrito'
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn v-if="!hemograma.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="hemograma.id" @click="editar">Editar</v-btn>

            <v-btn @click="clear">Limpar formulário</v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
    export default {
      name: 'cadastro-dose',
      data() {
        return {
          dose: {
            id: null,
            quantidadeMg: ''
          },
          items: {
            medicamento: [],
            animal: []
          },
          alerter: {
            tipo: '',
            estado: true,
            mensagem: ''
          },
          nomeTitulo: 'Cadastro de Vacina'
        }
      },
      mounted() {
        this.dose.id = this.$route.params.id
        if (this.dose.id) {
          this.nomeTitulo = 'Editar Cadastro de Vacina'

        }
      },
      methods: {
        async getDose() {

        },
        async getAnimais() {

        },
        async getMedicamentos() {

        },
        async cadastrar() {

        },
        async editar() {

        }
      }
    }
</script>

<style scoped>

</style>
