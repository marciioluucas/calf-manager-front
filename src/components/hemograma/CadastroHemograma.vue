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

            <v-flex xs12 sm4 md4 lg4>
              <v-combobox
                v-model="cargo"
                :items="selectCargo.items"
                item-text="nome"
                item-value="id"
                label="Cargos"
                placeholder=""
              ></v-combobox>
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
  import AnimaisService from '../../services/AnimaisServeice'
  import HemogramaService from '../../services/HemogramasService'

    export default {
      name: 'CadastroHemograma',
      data() {
        return {
          items: [],
          hemograma: {
            id: null,
            data: '',
            ppt: null,
            hematocrito: null
          },
          alerter: {
            tipo: '',
            estado: false
            mensagem: ''
          },
          nomeTitulo: 'Cadastrar Exame'
        }
      },
      mounted() {
        this.hemograma.id = this.$route.params.id
        if (this.hemograma.id) {
          this.nomeTitulo = 'Editar Exame'
          this.getHemograma()
        }
      },
      methods: {
        async cadastrar() {

        },
        async editar() {

        },
        async getHemograma() {

        },
        async getAnimais() {

        }
      }
    }
</script>

<style scoped>

</style>
