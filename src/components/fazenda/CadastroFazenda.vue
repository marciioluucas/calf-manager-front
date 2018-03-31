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
                      v-model="name"
                      label="Name"
                      :counter="10"

                      v-validate="'required|max:10'"
                      data-vv-name="name"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 lg6>
                    <v-text-field
                      v-model="regiao"
                      label="Região"
                      :counter="25"

                      v-validate="'required|max:25'"
                      data-vv-name="regiao"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 lg6>
                    <v-text-field
                      v-model="cidade"
                      label="Cidade"
                      :counter="10"

                      v-validate="'required|max:10'"
                      data-vv-name="cidade"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 lg6>
                    <v-text-field
                      v-model="estado"
                      label="Estado"
                      :counter="10"

                      v-validate="'required|max:10'"
                      data-vv-name="estado"
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

</script>

<style scoped>

</style>
