<template>
  <v-container grid-list-md>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
          <span class='caption'>Aqui você poderá fazer o cadastro dos animais.</span>
        </div>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-flex xs12>
              <span class='title'>Informações gerais</span>
            </v-flex>
<!-- text Nome             -->
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="animal.nome"
                label='Primeiro nome'
                mask='Aaaaaaaaaaaaaaaa'
                autofocus
              ></v-text-field>
            </v-flex>
<!-- text Codigo_brinco             -->
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="animal.codigo_brinco"
                label='Código do Brinco'
                mask='############'
              ></v-text-field>
            </v-flex>
<!-- text Codigo_raca             -->
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="animal.codigo_raca"
                label='Código da raça'
                mask='NNNNNNNNNNNN'
              ></v-text-field>
            </v-flex>
<!-- text Data_nascimento -->
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="animal.data_nascimento"
                mask="##/##/####"
                label='Nascimento'
                :return-masked-value='true'
              ></v-text-field>
            </v-flex>
<!-- Select Sexo -->
            <v-flex xs12 sm6 md6 lg6>
              <v-select
                :items="selectSexo"
                v-model="animal.sexo"
                item-text="text"
                item-value="value"
                label="Sexo"
                required
              ></v-select>
            </v-flex>
<!-- Select Fase Vida -->
            <v-flex xs12 sm6 md6 lg6>
              <v-select
                :items="selectFaseVida"
                v-model="animal.fase_vida"
                item-text="text"
                item-value="value"
                label="Fase da vida"
                required
              ></v-select>
            </v-flex>

            <v-flex xs12>
              <br/>
              <v-divider/>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Família</span>
            </v-flex>
<!-- Switch is_primogenito -->
            <v-flex xs12 sm2 md2 lg2 >
              <v-container px-0>
                <v-tooltip bottom>
                  <v-switch label="É primogênito?"
                            slot="activator"
                            v-model="animal.is_primogenito"/>
                  <span>
                    Marque como verdadeiro se o animal
                    <br/>
                    não possui registros de pai e mãe
                  </span>
                </v-tooltip>

              </v-container>
            </v-flex>
<!-- autocomplete Mae -->
            <v-flex xs12 sm4 md4 lg4 v-if="!animal.is_primogenito">
              <v-autocomplete
                label="Pesquise a mãe"
                :loading="selectMae.loading"
                :items="selectMae.items"
                hide-no-data
                hide-selected
                item-text="nome"
                required
                cache-items
                item-value="id"
                :search-input.sync="selectMae.search"
                v-model="animal.mae"
              />
            </v-flex>
<!-- autocomplete Pai -->
            <v-flex xs12 sm4 md4 lg4 v-if="!animal.is_primogenito">
              <v-autocomplete
                label="Selecione o pai"
                :loading="selectPai.loading"
                required
                hide-no-data
                hide-selected
                item-value="id"
                cache-items
                :items="selectPai.items"
                item-text="nome"
                :search-input.sync="selectPai.search"
                v-model="animal.pai"
              />
            </v-flex>
            <v-flex xs12>
              <br/>
              <v-divider></v-divider>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Fazenda de locação do animal</span>
            </v-flex>
<!-- autocomplete Fazenda -->
            <v-flex xs12 sm6 md6 lg6>
              <v-autocomplete
                v-model="selectedFazenda"
                :items="selectFazenda.items"
                :search-input.sync="selectFazenda.search"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Fazendas"
                placeholder="Digite o nome da fazenda"
                return-object
              />
            </v-flex>
<!-- Select Lote -->
            <v-flex xs12 sm6 md6 lg6>
              <v-select
                :items="selectedFazenda.lote"
                v-model="animal.lote"
                item-text="codigo"
                label="Lote"
                return-object
              ></v-select>
            </v-flex>
<!-- text quantidade_animais -->
            <v-flex xs6 sm3 md3 lg3>
              <v-text-field
                :value="animal.lote.quantidade_animais"
                disabled
                label='Quantidade de animais'
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <br/>
              <v-divider/>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Saúde</span>
            </v-flex>
            <v-flex xs12>
              <v-switch
                label="Está vivo?"
                v-model="animal.is_vivo"
                slot="activator"
              />
            </v-flex>
            <v-flex v-if="animal.is_vivo == true" xs12 sm6 md6 lg6>
              <v-layout wrap>
                <v-flex xs12>
                  <span class='caption'>Primeira Pesagem.</span>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="animal.pesagem.peso"
                    label='Peso em @ da primeira pesagem'
                    mask="###,#"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    mask="##/##/####"
                    v-model="animal.pesagem.data_pesagem"
                    label='Data da pesagem'
                    :return-masked-value='true'
                  ></v-text-field>
                </v-flex>
              </v-layout>

            </v-flex>
            <v-flex v-if="animal.is_vivo == true" xs12 sm6 md6 lg6>
              <v-layout wrap>
                <v-flex xs12>
                  <span class='caption'>Primeiro Hemograma.</span>
                </v-flex>
                <v-flex xs12 sm6 md6 lg6>
                  <v-text-field
                    v-model="animal.hemograma.ppt"
                    label='Primeiro teste de proteína plasmática'
                    mask="##,#"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6 lg6>
                  <v-text-field
                    v-model="animal.hemograma.hematocrito"
                    label='Primeiro teste de hematocrito'
                    mask="##,#"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    mask="##/##/####"
                    v-model="animal.hemograma.data"
                    label='Data do exame'
                    :return-masked-value='true'
                  ></v-text-field>
                </v-flex>
              </v-layout>

            </v-flex>
            <v-flex  xs12 sm6 md6 lg6>
              <v-layout wrap>
                <v-flex xs12 sm7 md7 lg7>
                  <v-autocomplete
                    v-model="selectDoenca.selected"
                    :items="selectDoenca.items"
                    :search-input.sync="selectDoenca.search"
                    hide-no-data
                    hide-selected
                    item-text="nome"
                    item-value="id"
                    label="Doenças"
                    placeholder="Pesquisar por doença"
                    return-object
                  />
                </v-flex>
                <v-flex xs12 sm3 md3 lg3>
                  <v-select
                    v-model="selectDoencaStatus.selected"
                    :items="selectDoencaStatus.items"
                    label="Status"></v-select>
                </v-flex>
                <v-flex xs12 sm1 md1 lg1>
                  <v-btn color="primary" fab small dark @click="addDoenca">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-flex xs12>
                <v-list two-line>
                  <template v-for="(item, index) in animal.doencas">
                    <v-list-tile
                      :key="index"
                      avatar
                      ripple>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">{{ item.descricao }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action-text>Excluir</v-list-tile-action-text>
                        <v-icon color="grey lighten-1" @click="removeDoenca(index)">
                          close
                        </v-icon>
                      </v-list-tile-action>

                    </v-list-tile>
                    <v-divider
                      v-if="index + 1 < animal.doencas.length"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list>
              </v-flex>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn v-if="!animal.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="animal.id" @click="editar">Enviar</v-btn>

            <v-btn @click="clearFormAnimal">Limpar Formulário</v-btn>

          </v-flex>
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
  import FazendasService from '../../services/FazendasService'
  import LotesService from '../../services/LotesService'
  import {AnimaisService} from '../../services/AnimaisService'
  import DoencasService from '../../services/DoencasService'

  export default {
    name: 'cadastro-animal',
    data() {
      return {
        animal: {
          id: null,
          nome: '',
          fase_vida: '',
          is_vivo: true,
          is_primogenito: false,
          sexo: '',
          lote: {
            id: null,
            codigo: '',
            quantidade_animais: 0
          },
          doencas: [],
          pesagem: {
            peso: '',
            data_pesagem: ''
          },
          mae: null,
          pai: null,
          hemograma:{
            ppt: '',
            hematocrito: '',
            data: ''
          }
        },
        selectSexo: [
          {text: 'Macho', value: 'm'},
          {text: 'Fêmea', value: 'f'}
        ],
        selectDoenca: {
          loading: false,
          items: [],
          search: null,
          selected: {}
        },
        selectFazenda: {
          loading: false,
          items: [],
          search: null
        },
        selectedFazenda: {},
        selectFaseVida: [
          {text: 'Recém-nascido', value: 'RECEM_NASCIDO'},
          {text: 'Bezerro', value: 'BEZERRO'},
          {text: 'Novilho', value: 'NOVILHO'},
          {text: 'Adulto', value: 'ADULTO'}
        ],
        selectPai: {
          loading: false,
          items: [],
          search: null
        },
        selectMae: {
          loading: false,
          items: []
        },
        selectDoencaStatus: {
          items: [{text: 'CURADO', value: 'CURADO'}, {text: 'DOENTE', value: 'DOENTE'}],
          selected: {}
        },
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        },
        switchJaTeveDoenca: false,
        switchJaFoiPesado: false,
        nomeTitulo: 'Cadastro de Animal',
        error: {
          nome: false,
          codigo_brinco: false,
          data_nascimento: false,
          sexo: false,
          fase_vida: false,
          pai: false,
          mae: false,
          fazenda: false,
          lote: false,
          peso: false,
          data_pesagem: false,
          ppt: false,
          hematocrito: false,
          data_exame: false
        },
        focus: {
          nome: false,
          codigo_brinco: false,
          data_nascimento: false,
          pai: false,
          mae: false,
          peso: false,
          data_pesagem: false,
          ppt: false,
          hematocrito: false,
          data_exame: false
        }
      }
    },
    watch: {
      'selectFazenda.search'(val) {
        val && this.getFazendas(val)
      },
      'selectDoenca.search'(val) {
        val && this.getDoencas(val)
      },
      'selectMae.search': function (val) {
        val && this.getMaes(val)
      },
      'selectPai.search'(val) {
        val && this.getPais(val)
      }
    },
    mounted() {
      this.getFazendas()
      this.getDoencas()
      this.animal.id = this.$route.params.id
      if(this.animal.id){
        this.nomeTitulo = 'Editar Animal'
        this.getAnimal()
      }
    },
    methods: {
      removeDoenca(index) {
        this.animal.doencas.splice(index, 1);
      },

      addDoenca() {
        const doenca = {
          id: this.selectDoenca.selected.id,
          nome: this.selectDoenca.selected.nome,
          descricao: this.selectDoenca.selected.descricao,
          situacao: this.selectDoencaStatus.selected,
        }
        this.animal.doencas.push(doenca);
      },
      async getAnimal(){
        let response = await AnimaisService._getById(this.animal).catch(exception => {
          if(exception){
            this.alerta('error', true, 'Erro ao buscar dados do animal')
          }
        })
        this.animal = response.data.animais
        console.log(this.animal);
      },
      async getDoencas(val) {
        let busca = {
          nome: val
        }
        this.selectDoenca.loading = true
        let response = await DoencasService._getByNome(busca)
        this.selectDoenca.items = response.data.doencas.data
        this.selectDoenca.loading = false
      },
      async getFazendas(val){
        let busca = {
          nome: val
        }
        this.selectFazenda.loading = true
        let response = await FazendasService._getByNome(busca)
        this.selectFazenda.items = response.data.fazendas.data
        this.selectFazenda.loading = false
      },
      async getMaes(val) {
        const busca = {
          nome: val,
          params: {sexo: 'F'}
        }
        this.selectMae.loading = true
        let res = await AnimaisService._getByNome(busca)
        this.selectMae.items = res.data.animais.data
        this.selectMae.loading = false
      },
      async getPais(val) {
        const busca = {
          nome: val,
          params: {sexo: 'M'}
        }
        this.selectPai.loading = true
        let res = await AnimaisService._getByNome(busca)
        this.selectPai.items = res.data.animais.data
        this.selectPai.loading = false
      },
      async cadastrar() {
        if(this.validaFormAnimal()){
          let response = await AnimaisService._create(this.animal).catch(exception => {
            if(exception){
              this.alerta('error', true, 'Erro ao cadastrar animal!')
            }
          })
          if(response){
            this.alerta('success',true, 'Animal cadastrado com sucesso!')
            this.clearFormAnimal()
          }
        }
      },
      async editar() {
        if(this.validaFormAnimal()){
          let res = await AnimaisService._update(this.animal).catch(e => {
            if(exception){
              this.alerta('error', true, 'Erro ao cadastrar animal!')
            }
          })
          if(response){
            this.alerta('success',true, 'Animal alterado com sucesso!')
            this.clearFormAnimal()
          }
        }
        else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
        }
      },
      validaFormAnimal(){
        if(this.animal.nome &&
          this.animal.codigo_brinco &&
          this.animal.data_nascimento  &&
          this.animal.sexo &&
          this.animal.fase_vida &&
          this.animal.lote.id &&
          this.animal.pesagem.peso &&
          this.animal.pesagem.data &&
          this.animal.hemograma.ppt &&
          this.animal.hemograma.hematocrito &&
          this.animal.hemograma.data){
            if(this.animal.is_primogenito == false){
              if(this.animal.mae && this.animal.pai){
                return true
              }
              else {
                return false
              }
            }else {
              return true
            }
            return true
          }
          else {
            if(!this.animal.nome){
                this.alerta('warning', true, 'Preencha o nome do animal!')
                return false
            } else if (!this.animal.codigo_brinco){
              this.alerta('warning', true, 'Preencha o código do brinco do animal!')
              return false
            }
            else if(!this.animal.codigo_raca){
              this.alerta('warning', true, 'Preencha o código do registro da raça')
            }
            else if(!this.animal.data_nascimento){
              this.alerta('warning', true, 'Preencha a data de nascimento do animal!')
              return false
            }
            else if(!this.animal.sexo){
              this.alerta('warning', true, 'Selecione o sexo do animal!')
              return false
            }
            else if(!this.animal.fase_vida){
              this.alerta('warning', true, 'Selecione a fase de vida do animal!')
              return false
            }
            else if(!this.animal.lote.id){
              console.log('aqui 02')
              this.alerta('warning', true, 'Selecione a fazenda e o lote de alocação do animal!')
              return false
            } else if (!this.animal.pesagem.peso){
              this.alerta('warning', true, 'Preencha o peso do animal!')
              return false
            }
            else if (!this.animal.pesagem.data){
              this.alerta('warning', true, 'Preencha data da pesagem do animal!')
              return false
            }
            if(!this.animal.hemograma.ppt){
              this.alerta('warning', true, 'Preencha o PPT do animal!')
              return false
            } else if(!this.animal.hemograma.hematocrito){
              this.alerta('warning', true, 'Preencha o Hematócrico do animal!')
              return false
            } else if(!this.animal.hemograma.data){
              this.alerta('warning', true, 'Preencha a data do exame!')
              return false
            }
            else if(this.animal.is_primogenito == false){
              if(!this.animal.mae){
                this.alerta('warning', true, 'Selecione o animal mãe!')
                return false
              }
               if(!this.animal.pai){
                this.alerta('warning', true, 'Selecione o animal pai!')
                return false
              }
              return false
            }

           else {
            this.alerta('warning', true, 'Preencha todos os campos corretamente!')
            return false
          }
        }
      },
      clearFormAnimal(){
        this.animal.nome = ''
        this.animal.sexo = ''
        this.animal.codigo_brinco = ''
        this.animal.codigo_raca = ''
        this.animal.data_nascimento = ''
        this.animal.fase_vida = ''
        this.animal.lote.codigo = ''
        this.animal.doencas = []
        this.animal.pesagem.peso = ''
        this.animal.pesagem.data = ''
        this.animal.hemograma.ppt = ''
        this.animal.hemograma.hematocrito = ''
        this.animal.hemograma.data = ''
        this.animal.pai = {}
        this.animal.mae = {}
        this.selectedFazenda = {}
      },
      alerta(color, estado, mensagem) {
        this.snackbar.color = color
        this.snackbar.estado = estado
        this.snackbar.mensagem = mensagem
      }
    }
  }
</script>

<style scoped>

</style>
