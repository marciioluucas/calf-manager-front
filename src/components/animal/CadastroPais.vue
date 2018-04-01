<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Cadastro de Pais </h2>
              <span class="caption">Busque pelo codigo para cadastrar novos pais</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row wrap>

                <v-flex xs12 md2 lg4>
                  <v-text-field
                    label=""
                    v-model="buscaAnimal.codigo_brinco"

                  />
                </v-flex>
                <v-flex xs12 md2 lg4>

                </v-flex>

                  <v-dialog v-model="dialog" persistent max-width="50%">
                    <v-btn color="primary" dark slot="activator">Selecionar filhos</v-btn>
                    <v-card>
                      <v-card-title class="headline"> Selecione os filhos deste animal</v-card-title>
                      <v-flex xs12 sm6 md4 lg4>
                        <v-text-field
                          v-model="buscaFilho.codigo_brinco"
                          label='Código do Brinco'
                        />
                      </v-flex>
                      <v-btn color="blue darken-1" flat @click.native="dialog = true">salvar</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    </v-card>
                  </v-dialog>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 v-if="buscaAnimal.status != undefined">
        <v-card>
          <v-card-text>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="items"
              select-all
              :pagination.sync="pagination"
              item-key="name"
              class="elevation-1"
            >
              <template slot="headers" slot-scope="props">
                <tr>
                  <th>
                    <v-checkbox
                      primary
                      hide-details
                      @click.native="toggleAll"
                      :input-value="props.all"
                      :indeterminate="props.indeterminate"
                    ></v-checkbox>
                  </th>
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                    :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                    @click="changeSort(header.value)"
                  >
                    <v-icon small>arrow_upward</v-icon>
                    {{ header.text }}
                  </th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected">
                  <td>
                    <v-checkbox
                      primary
                      hide-details
                      :input-value="props.selected"
                    ></v-checkbox>
                  </td>
                  <td>{{ props.item.name }}</td>
                  <td class="text-xs-right">{{ props.item.codigo_brinco}}</td>
                  <td class="text-xs-right">{{ props.item.codigo_raca}}</td>
                  <td class="text-xs-right">{{ props.item.carbs }}</td>
                  <td class="text-xs-right">{{ props.item.protein }}</td>
                  <td class="text-xs-right">{{ props.item.iron }}</td>
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
        <v-btn color="success" v-on:click="">Cadastrar!</v-btn>
      </v-flex>

    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'cadastro-pais',
    data() {
      return {
        dialog: false,
        pagination: {
          sortBy: 'name'
        },
        selected: [],
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Codigo do brinco', value: 'codigo_brinco' },
          { text: 'Codigo da Raça', value: 'codigo_raca' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }

        ],
        items: [
          {

          }

        ],
        buscaFilho: {
          status: undefined,
          codigo_brinco: undefined,
          codigo_raca: undefined
        },
        buscaAnimal: {
          status: undefined,
          codigo_brinco: undefined,
          codigo_raca: undefined
        }

      }
    },
    methods: {
      adicionarFilho() {
        this.buscaFilho.status = true
      },
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.items.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
