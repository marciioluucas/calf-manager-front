<template>
  <v-container grid-list-md>
    <v-card>
      <!--Cabeçalho da pagina-->
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>Cadastro de animal</h2>
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
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import DoencasService from "../../services/DoencasService"
  export default {
    name: "cadastro-doenca",
    data() {
      return {
        doenca: {
          nome: undefined,
          descricao: undefined
        }
      }
    },
    methods: {
      async cadastrar() {
        await DoencasService._create(this.doenca)
      }
    }
  }
</script>

<style scoped>

</style>
