<template>
  <v-container grid-list-md>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>Cadastro de animal</h2>
          <span class='caption'>Aqui você poderá fazer o cadastro dos animais.</span>
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
                label='Nome'
              />
            </v-flex>
            <v-flex xs12 sm6 md4 lg4>
              <v-text-field
                label='Código do Brinco'
              />
            </v-flex>
            <v-flex xs12 sm6 md2 lg2>
              <v-text-field
                label='Nascimento'
              />
            </v-flex>
            <v-flex xs8>
              <v-text-field
                label='Código da raça'

              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label='Sexo'

              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label='Fase da vida'

              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label='Vivo?'
              />
            </v-flex>
            <v-flex xs12>
              <br/>
              <v-divider/>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Fazenda de locação do animal</span>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                label='Nome'
              />
            </v-flex>
            <v-flex xs6 sm3 md3 lg3>
              <v-text-field
                label='Limite'
              />
            </v-flex>
            <v-flex xs6 sm3 md3 lg3>
              <v-text-field
                label='Quantidade de animais'
              />
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'cadastro-animal'
  }
</script>

<style scoped>

</style>
