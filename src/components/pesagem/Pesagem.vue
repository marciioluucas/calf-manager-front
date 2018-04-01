<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Pesagem</h2>
              <span class="caption">Busque pelo codigo para cadastrar os pesos dos animais</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row wrap>

                <v-flex xs12 md2 lg6>
                  <v-text-field
                    label="codigo do animal"
                    v-model="codigo"
                    :counter="10"

                    v-validate="'required|max:10'"
                    data-vv-name="codigo"
                    required

                  />
                </v-flex>
                <v-flex xs12 md2 lg6>
                  <v-text-field
                    label="Peso"
                    v-model="peso"
                    :counter="10"

                    v-validate="'required|max:10'"
                    data-vv-name="peso"
                    required
                  />
                </v-flex>



              </v-layout>
              <v-btn color="success" >Cadastrar!</v-btn>

            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-data-table>
              <template  slot-scope="props">
                <tr >
                  <td class="text-xs-center"></td>
                  <td class="text-xs-center"></td>
                  <td class="text-xs-center"></td>
                  <td class="text-xs-center"></td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions  class="text-xs-center">
            <v-layout>
              <v-flex xs12>
                <v-pagination  />
              </v-flex>
            </v-layout>

          </v-card-actions>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>

</script>

<style scoped>

</style>
