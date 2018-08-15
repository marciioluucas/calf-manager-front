<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <!--Componente de alerta-->
          <v-alert
            v-if="alerter.estado"
            :value="true"
            :type="alerter.tipo"
          >
            {{alerter.message}}
          </v-alert>

          <!--Cabecalho da pagina-->
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
                  <v-flex xs12 md4 lg8>
                    <v-text-field
                      v-model="fazenda.nome"
                      label="Nome"
                      data-vv-name="name"
                      required
                    ></v-text-field>
                  </v-flex>

                </v-layout>
                <v-btn @click="cadastrar">Cadastrar</v-btn>
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
  import FazendasService from '../../services/FazendasService'
  export default {
    data() {
      return {
        fazenda: {
          nome: ''
        },
        alerter: {
          tipo: 'success',
          estado: false,
          message: 'message'
        }
      }
    },

    methods: {
      async cadastrar() {
        let n = this
        if (this.fazenda.nome !== '' && this.fazenda.nome !== undefined) {
          await FazendasService._create(this.fazenda).catch(e => {
            console.log(e.response.data)
          }).finally(function () {
            n.alerta('success', true, 'Cadastro realizado com sucesso!')
            n.fazenda.nome = ''
          })
        } else {
          n.alerta('warning', true, 'Preencha os campos corretamente')
        }
      },
      clear() {
        this.fazenda.nome = ''
        this.alerta('success', false, 'message')
      },
      alerta (tipo, estado, message) {
        this.alerter.tipo = tipo
        this.alerter.estado = estado
        this.alerter.message = message
      }

    }
  }
</script>


<style scoped>

</style>
