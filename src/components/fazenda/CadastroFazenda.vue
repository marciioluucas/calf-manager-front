<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Cadastro de Fazenda</h2>
              <span class="caption">Busque pelo codigo para cadastrar novas fazendas</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <form>
                <v-layout row wrap>
                  <v-flex xs12 md2 lg6>
                    <v-text-field
                      v-model="nome"
                      label="Nome"
                      data-vv-name="name"
                      required
                    ></v-text-field>
                  </v-flex>

                </v-layout>
                <v-btn @click="submit">Cadastrar</v-btn>
                <v-btn @click="clear">Limpar formulário</v-btn>

              </form>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import FazendasService from "../../services/FazendasService";

  export default {
    data() {
      return {
        nome: '',
        regiao: '',
        cidade: '',
        estado: ''
      }
    },
    methods: {
      async submit() {
        const res = await
          FazendasService._create({nome: this.nome})
        console.log(res.data)
      },
      clear() {
        this.nome = ''
        this.$validator.reset()
      }
    }
  }
</script>


<style scoped>

</style>
