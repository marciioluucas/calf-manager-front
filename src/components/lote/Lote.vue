<template>
  <v-container grid-list-md>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>Cadastro de lotes</h2>
          <span class='caption'>Aqui você poderá fazer o cadastro dos lotes onde estão os animais</span>
        </div>
      </v-card-title>

      <v-card-text>

        <v-form>
          <v-layout row wrap>
            <v-flex xs12>
              <span class='title'>Informações gerais</span>
            </v-flex>

            <v-flex xs12 sm6 md4 lg4>
              <v-text-field
                label='Lote'
                v-model="lote"
                :counter="10"

                v-validate="'required|max:10'"
                data-vv-name="lote"
                required
              />
            </v-flex>
            <v-flex xs12 sm6 md4 lg4>
              <v-text-field
                v-model="descrisao"
                label="Descrisão"
                :counter="25"

                v-validate="'required|max:25'"
                data-vv-name="descrisao"
                required
              />
            </v-flex>
            <v-btn color="success" >Cadastrar!</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

</script>

<style scoped>

</style>
