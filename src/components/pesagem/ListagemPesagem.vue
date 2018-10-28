
<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <!--Cabeçalho do componente-->
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Pesquisa</h2>
              <span class="caption">Faça uma pesquisa utilizando os filtros abaixo para um melhor resultado.</span>
            </div>
          </v-card-title>

          <!--Sessão de formulário de pesquisa-->
          <v-card-text>
            <v-form>
              <!-- <v-layout row wrap> -->

                <!-- <v-flex xs12 md2 lg2>
                  <v-text-field
                    label="Buscar pelo Id"
                    v-model="buscaFuncionario.id"
                  />
                </v-flex>
                 <v-flex xs12 md4 lg4>
                   <v-text-field xs12 md3
                     label="Buscar pelo nome"
                     v-model="buscaFuncionario.pessoa.nome"
                   />
                 </v-flex>
              </v-layout>
             <v-btn color="success" v-on:click="getFuncionarios">Buscar!</v-btn>
              <v-btn color="secondary" v-on:click="clear">Redefinir busca</v-btn> -->
            </v-form>
          </v-card-text>

          <!--Tabela de apresentação de dados-->

          <v-flex xs12>
            <v-card>
              <chart :options='graficoGanhoPeso' :auto-resize="true"/>

              <!-- <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="items.data"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <tr>
                      <td class="text-xs-center">{{ props.item.id }}</td>
                      <td class="text-xs-center">{{ props.item.pessoa.nome }}</td>
                      <td class="text-xs-center">{{ props.item.usuario.login }}</td>
                      <td class="text-xs-center">{{ props.item.cargo.nome }}</td>
                      <td class="text-xs-center">{{ props.item.endereco.logradouro }}</td>
                      <td class="justify-center layout px-0">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editar(props.item.id)"
                        >
                          edit
                        </v-icon>
                        <v-icon
                          small
                          @click="deletar(props.item.id)"
                        >
                          delete
                        </v-icon>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card-text>
              <v-card-actions v-if="items.length !== 0" class="text-xs-center">
                <v-layout>
                  <v-flex xs12>
                    <v-pagination :length="items.last_page" v-model="buscaFuncionario.params.pagina" @input="getFuncionarios"/>
                  </v-flex>
                </v-layout>

              </v-card-actions> -->
            </v-card>
          </v-flex>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
        name: "listagem-pesagem",
        data(){
          return {
            
            graficoGanhoPeso: {
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                  areaStyle: {}
              }]
            }
          }
        }

    }
</script>

<style scoped>

</style>
