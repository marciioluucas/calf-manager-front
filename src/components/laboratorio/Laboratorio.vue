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

                <v-flex xs12 md2 lg6>
                  <v-text-field
                    label="Buscar pelo codigo"

                  />
                </v-flex>
                <v-btn color="success" >Buscar</v-btn>
              </v-layout>
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
