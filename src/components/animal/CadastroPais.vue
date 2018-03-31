<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Cadastro de Pais </h2>
              <span class="caption">Busque pelo codigo para cadastrar novas maes</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row wrap>

                <v-flex xs12 md2 lg4>
                  <v-text-field
                    label="Buscar pelo código do brinco"
                    v-model="buscaAnimal.codigoBrinco"

                  />
                </v-flex>
                <v-flex xs12 md2 lg4>>
                  {{buscaAnimal.codigoBrinco}}
                </v-flex>

                  <v-dialog v-model="dialog" persistent max-width="50%">
                    <v-btn color="primary" dark slot="activator">Selecionar filhos</v-btn>
                    <v-card>
                      <v-card-title class="headline"> Selecione os filhos deste animal</v-card-title>

                      <v-flex>
                        <v-text-field
                          label="Buscar pelo codigo"
                          v-model="buscaFilho.codigoBrinco"
                        />
                        <v-text-field/>
                      </v-flex>

                      <v-btn color="success"  @click.native="dialog = false" >Selecionar</v-btn>
                      <v-flex xs12 v-if="buscaFilho.status != undefined">
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
                        </v-card>
                      </v-flex>
                    </v-card>
                  </v-dialog>
              </v-layout>
              <v-btn color="success" v-on:click="">Cadastrar!</v-btn>
              <v-btn color="secondary" v-on:click="">Redefinir busca</v-btn>

            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 v-if="buscaAnimal.status != undefined">
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
  export default {
    name: 'cadastro-pais',
    data() {
      return {
        items: [],
        buscaFilho: {
          status: undefined,
          codigoBrinco: undefined,
          codigoRaca: undefined
        },
        buscaAnimal: {
          status: undefined,
          codigoBrinco: undefined,
          codigoRaca: undefined
        },
        headers: {
          text: 'Código do brinco', value: 'codigo-brinco'

        }
      }
    }
  }
</script>

<style scoped>

</style>
