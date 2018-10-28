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
            {{alerter.mensagem}}
          </v-alert>
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
                  <v-autocomplete
                    label="Digite o nome do animal"
                    :loading="selectAnimal.loading"
                    :items="selectAnimal.items"
                    hide-no-data
                    hide-selected
                    item-text="nome"
                    required
                    cache-items
                    item-value="id"
                    :search-input.sync="selectAnimal.search"
                    v-model="pesagem.animal_id"
                  />
                </v-flex>
                <v-flex xs6 md3 lg3>
                  <v-text-field
                    label="Peso"
                    v-model="pesagem.peso"
                    required
                  />
                </v-flex>
                <v-flex xs6 md3 lg3>
                  <v-text-field
                    label="Data de pesagem"
                    v-model="pesagem.data_pesagem"
                    :return-masked-value="true"
                    mask="##/##/####"
                  />
                </v-flex>
              </v-layout>
              <v-btn color="success" @click="cadastrar" >Cadastrar!</v-btn>

            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {AnimaisService} from '../../services/AnimaisService'

export default {
  data() {
    return {
      pesagem: {
        animal_id: '',
        peso: 0,
        data_pesagem: ''
      },
      selectAnimal: {
        loading: false,
        items: [],
        search: null
      },
      alerter: {
        tipo: 'success',
        estado: false,
        mensagem: ''
      }
    }
  },
  watch: {
    'selectAnimal.search'(val) {
      val && this.getAnimais(val)
    }
  },
  methods: {
    async getAnimais(val) {
      const busca = {
        nome: val,
        params: {vivo: true}
      }
      this.selectAnimal.loading = true
      let res = await AnimaisService._getByNome(busca)
      this.selectAnimal.items = res.data.animais.data
      this.selectAnimal.loading = false
    },
    async cadastrar() {
      if(this.validarForm()){
        let response = await AnimaisService._createPesagem(this.pesagem)
        console.log(response.data)
      } else {
        this.alerta('warning', true, 'Preencha os campos corretamente!')
      }
    },
    validarForm(){
      if(this.pesagem.animal_id !== null && this.pesagem.animal_id !== '' &&
        this.pesagem.data_pesagem !== null && this.pesagem.data_pesagem !== '' &&
        this.pesagem.peso !== null && this.pesagem.peso !== ''){
          return true
        } else {
          return false
        }
    },
    alerta(tipo, estado, mensagem){
      this.alerter.tipo = tipo
      this.alerter.estado = estado
      this.alerter.mensagem = mensagem

    }
  }
}
</script>

<style scoped>

</style>
