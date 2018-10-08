<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Laboratório</h2>
              <span class="caption">Busque pelo animal para cadastrar novos dados clínicos</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row wrap>
                <v-flex xs12>
                  <span class='title'>Informações gerais</span>
                </v-flex>

                <v-flex xs12 sm6 md6 lg6>
                  <v-text-field
                    v-model="animal.codigo_brinco"
                    label='Código do Brinco'
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style scoped>

</style>
