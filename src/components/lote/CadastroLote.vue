<template>
  <v-container grid-list-md>
    <v-card>

      <!--Cabeçalho da pagina-->
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
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
                label='Código do Lote'
                v-model="lote.codigo"
                mask="##############"
              />
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-autocomplete
                label="Selecione a fazenda"
                :loading="selectFazenda.loading"
                required
                hide-no-data
                hide-selected
                item-value="id"
                cache-items
                :items="selectFazenda.items"
                item-text="nome"
                :search-input.sync="selectFazenda.search"
                v-model="this.lote.fazenda_id"
              />
            </v-flex>
          </v-layout>
          <v-btn v-if="!this.lote.id" @click="cadastrar" >Enviar</v-btn>
          <v-btn v-if="this.lote.id" @click="editar" >Editar</v-btn>
          <v-btn @click="clearFormLote" >Limpar Formulário</v-btn>
        </v-form>
      </v-card-text>
      <!--Componente de alerta-->
      <v-snackbar
         v-model="snackbar.estado"
         :right="true"
         :timeout="4000"
         :multi-line="true"

         :top="true"
         :color="snackbar.color">
         {{ snackbar.mensagem }}
         <v-btn
           color="black"
           flat
           @click="snackbar.mode = false"
         >
           Close
         </v-btn>
       </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
  import LotesService from '../../services/LotesService'
  import FazendasService from '../../services/FazendasService'
  export default {
    name: '',
    data() {
      return {
        lote: {
          id: null,
          codigo: '',
          fazenda_id: null
        },
        selectFazenda: {
          items: [],
          loading: false,
          search: ''
        },
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        },
        nomeTitulo: 'Cadastro de Lotes'
      }
    },
    async mounted() {
      this.lote.id = this.$route.params.id
      if (this.lote.id) {
        this.nomeTitulo = 'Editar Lote'
        this.getLote()
      }
    },
    watch:{
      'selectFazenda.search'(val){
        val && this.getFazendas(val)
      }
    },
    methods: {
      async getFazendas(val){
        let busca = {
          nome: val
        }
        this.selectFazenda.loading = true
        let response = await FazendasService._getByNome(val)
        this.selectFazenda.items = response.data.fazendas.data
        this.selectFazenda.loading = false

      },
      async getFazendaById(id){
        try{
          let response = await FazendasService._getById({id: id})
          this.selectFazenda.items = response.data.fazendas
        }catch(e){
            this.alerta('error', true, 'Erro ao listar todas fazendas')

        }
      },
      async cadastrar() {
        if (this.validarFormulario()) {
          try{
            let response = await LotesService._create(this.lote).catch(exception => {
              if(exception){
                this.alerta('error', true, 'Erro ao validar formulário')
              }
            })
            if(response.status === 201){
              this.alerta('success', true, response.data.message.description)
              this.clearFormLote()
            }
          }
          catch(e){
              this.alerta('error', true, 'Erro ao cadastrar lote!')
          }
        }
      },
      async editar() {
        if (this.validarFormulario()) {
          try{
            let response = await LotesService._update(this.lote)
            if(response.status !== 400 || response.status !== 500){
              this.alerta('success', true, response.data.message.description)
              this.clearFormLote()
            }
          }
          catch(e){
              this.alerta('error', true, 'Erro ao alterar lote!')

          }
        }
      },
      async getLote() {
        let response = await LotesService._getById(this.lote)
        this.lote = response.data.lotes[0]
        this.getFazendaById(this.lote.fazenda_id)
      },
      clearFormLote() {
        this.lote.codigo = null
        this.lote.fazenda_id = null
      },
      alerta(color, estado, mensagem){
        this.snackbar.color = color
        this.snackbar.estado = estado
        this.snackbar.mensagem = mensagem
      },
      validarFormulario() {
        if (this.lote.codigo && this.lote.fazenda_id ) {
          return true
        } else {
          if(!this.lote.codigo){
            this.alerta('warning', true, 'Preecha o código!')
            return false
          }
          else if(!this.lote.fazenda_id){
            this.alerta('warning', true, 'Selecione a fazenda!')
            return false
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
