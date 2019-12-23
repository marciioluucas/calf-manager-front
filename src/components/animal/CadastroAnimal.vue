<template>
  <v-container grid-list-md>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h2 class="title mb-0">{{nomeTitulo}}</h2>
          <span class="caption">Aqui você poderá fazer o cadastro dos animais.</span>
        </div>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-flex xs12>
              <span class="title">Informações gerais</span>
            </v-flex>
            <!-- text Nome             -->
            <v-flex xs12 sm3 md3 lg3>
              <v-text-field
                v-model="animal.nome"
                label="Primeiro nome"
                autofocus
              ></v-text-field>
            </v-flex>
            <!-- text Codigo_brinco             -->
            <v-flex xs12 sm3 md3 lg3>
              <v-text-field
                v-model="animal.codigo_brinco"
                label="Código do Brinco"
              ></v-text-field>
            </v-flex>
            <!-- text Codigo_raca             -->
            <v-flex xs12 sm3 md3 lg3>
              <v-text-field v-model="animal.codigo_raca" label="Código da raça" mask="NNNNNNNNNNNN"></v-text-field>
            </v-flex>

            <!-- text Data_nascimento animal.data_nascimento -->
            
            <v-flex xs12 sm3 md3 lg3>
              <v-menu ref="menu_data_nascimento"
                      v-model="menu_data_nascimento"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      full-width
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="animal.data_nascimento"
                                label="Data de Nascimento"
                                persistent-hint
                                prepend-icon="event"
                                v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="data_nascimento" 
                                no-title @input="menu_data_nascimento = false"
                ></v-date-picker> 
              </v-menu>
            </v-flex>
    
            <!-- Select Sexo -->
            <v-flex xs12 sm6 md6>
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
            <v-flex xs12 sm6 md6>
              <v-select
                :items="selectFaseVida"
                v-model="animal.fase_vida"
                item-text="text"
                item-value="value"
                label="Fase da vida"
                required
              ></v-select>
            </v-flex>
            <!-- Switch is_primogenito -->
            <v-flex xs12 sm3 md3 lg3>
              <v-tooltip bottom>
                <v-switch label="É primogênito?" slot="activator" v-model="animal.is_primogenito"/>
                <span>Marque como verdadeiro se o animal
                  <br>não possui registros de pai e mãe
                </span>
              </v-tooltip>
            </v-flex>
            <!-- autocomplete Mae -->
            <v-flex xs12 sm4 md4 lg4 >
              <v-autocomplete
                v-if="!animal.is_primogenito && !animal.id"
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
               <v-text-field
                v-if="animal.id"
                :value="pais.pai.nome"
                disabled
                label="Pai"
              ></v-text-field>  
            </v-flex>
            <!-- autocomplete Pai -->
            <v-flex xs12 sm4 md4 lg4>
              <v-autocomplete 
                v-if="!animal.is_primogenito && !animal.id"
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
              <v-text-field
                v-if="animal.id"
                :value="pais.mae.nome"
                disabled
                label="Mãe"
              ></v-text-field>  
            </v-flex>
            <v-flex xs12>
              <br>
              <v-divider></v-divider>
              <br>
            </v-flex>
            <v-flex xs12>
              <span class="title">Fazenda de locação do animal</span>
            </v-flex>
            <!-- autocomplete Fazenda -->
            <v-flex xs12 sm4 md4 lg4>
              <v-autocomplete
                v-model="selectFazenda.selected"
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
            <v-flex xs12 sm4 md4 lg4>
               <v-text-field
                v-if="animal.id"
                :value="animal.codigo_lote"
                disabled
                label="Lote"
              ></v-text-field>  
              <v-select
                v-if="!animal.id"
                :items="selectFazenda.selected.lote"
                v-model="animal.lotes_id"
                item-text="codigo"
                label="Lote"
                item-value="id"
              ></v-select>
            </v-flex>
            <!-- text quantidade_animais -->
            <v-flex xs6 sm4 md4 lg4>
              <v-text-field
                :value="animal.quantidade_animais"
                disabled
                label="Quantidade de animais"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <br>
              <v-divider/>
              <br>
            </v-flex>
            <v-flex xs12>
              <span class="title">Saúde</span>
            </v-flex>
            <v-flex xs12>
              <v-switch label="Está vivo?" v-model="animal.is_vivo" slot="activator"/>
            </v-flex>
            <!-- Pesagem -->
            <v-flex v-if="animal.is_vivo == true" xs12 sm6 md6 lg6>
              <v-layout wrap>
                <v-flex xs12>
                  <span class="caption">Primeira Pesagem.</span>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="animal.pesagens.peso"
                    label="Peso em @"
                  ></v-text-field>
                </v-flex>

                 <v-flex xs12 sm4>
                  <v-menu ref="menu_data_pesagem"
                          v-model="menu_data_pesagem"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          full-width
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="animal.pesagens.data_pesagem"
                                    label="Data da Pesagem"
                                    persistent-hint
                                    prepend-icon="event"
                                    v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="data_pesagem" 
                                   no-title @input="menu_data_pesagem = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- Hemogramas -->
            <v-flex v-if="animal.is_vivo == true" xs12 sm6 md6 lg6>
              <v-layout wrap>
                <v-flex xs12>
                  <span class="caption">Primeiro Hemograma.</span>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="animal.hemogramas.ppt"
                    label="PPT"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="animal.hemogramas.hematocrito"
                    label="Hematócrito"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-menu ref="menu_data_exame"
                          v-model="menu_data_exame"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          full-width
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="animal.hemogramas.data"
                                    label="Data do Exame"
                                    persistent-hint
                                    prepend-icon="event"
                                    v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="data_exame" 
                                   no-title @input="menu_data_exame = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
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
                    label="Status"
                  ></v-select>
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
                    <v-list-tile :key="index" avatar ripple>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">{{ item.descricao }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action-text>Excluir</v-list-tile-action-text>
                        <v-icon color="grey lighten-1" @click="removeDoenca(index)">close</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < animal.doencas.length" :key="index"></v-divider>
                  </template>
                </v-list>
              </v-flex>
            </v-flex>
          </v-layout>
          <v-flex>
            <v-btn v-if="!animal.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="animal.id" @click="editar">Editar</v-btn>

            <v-btn @click="clearForm">Limpar Formulário</v-btn>
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
        :color="snackbar.color"
      >
        {{ snackbar.mensagem }}
        <v-btn color="black" flat @click="snackbar.mode = false">Close</v-btn>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import FazendasService from "../../services/FazendasService";
import LotesService from "../../services/LotesService";
import { AnimaisService } from "../../services/AnimaisService";
import DoencasService from "../../services/DoencasService";
import jwtDecode from 'jwt-decode'


export default {
  name: "cadastro-animal",
  data() {
    return {
      date: null,
      dateFormatted: null,
      menu1: false,
      menu2: false,
      on: null,
      data_exame: null,
      data_pesagem: null,
      data_nascimento: null, 
      menu_data_nascimento: false,
      menu_data_exame: false,
      menu_data_pesagem: false,
      animal: {
        id: null,
        nome: null,
        fase_vida: null,
        is_vivo: true,
        nascido_morto: false,
        is_primogenito: false,
        sexo: null,
        quantidade_animais: 0,
        fazendas_id: null,
        lotes_id: null,
        data_nascimento: null,
        codigo_lote: null,
        doencas: [],
        pesagens: {
          peso: null,
          data_pesagem: null
        },
        mae: null,
        pai: null,
        hemogramas: {
          funcionario_id: null,
          ppt: "",
          hematocrito: "",
          data: ""
        },
        usuario_cadastro: null,
      },
      pais: {
        pai: null, 
        mae: null
      },
      selectSexo: [
        { text: "Macho", value: "m" },
        { text: "Fêmea", value: "f" }
      ],
      selectDoenca: {
        loading: false,
        items: [],
        search: null,
        selected: {}
      },
      selectLote: {
        items: [],
        search: null,
        selected: {}
      },
      selectFazenda: {
        loading: false,
        items: [],
        search: null,
        selected: {}
      },
      selectFaseVida: [
        { text: "Recém-nascido", value: "RECEM_NASCIDO" },
        { text: "Bezerro", value: "BEZERRO" },
        { text: "Novilho", value: "NOVILHO" },
        { text: "Adulto", value: "ADULTO" }
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
        items: [
          { text: "CURADO", value: "CURADO" },
          { text: "DOENTE", value: "DOENTE" }
        ],
        selected: []
      },
      snackbar: {
        color: "success",
        estado: false,
        mensagem: ""
      },
      switchJaTeveDoenca: false,
      switchJaFoiPesado: false,
      nomeTitulo: "Cadastro de Animal"
    }
  },
 
  watch: {
    "selectFazenda.search"(val) {
      val && this.getFazendas(val);
    },
    "selectDoenca.search"(val) {
      val && this.getDoencas(val);
    },
    "selectMae.search": function(val) {
      val && this.getMaes(val);
    },
    "selectPai.search"(val) {
      val && this.getPais(val);
    },
    "selectLote.search"(val) {
      val && this.getLotes(val);
    },
    data_exame (val) {
      this.animal.hemogramas.data = this.formatDate(val)
    },
    data_pesagem (val) {
      this.animal.pesagens.data_pesagem = this.formatDate(val)
    },
    data_nascimento (val) {
      this.animal.data_nascimento = this.formatDate(val)
    },
    "selectFazenda.selected" (val){
      this.selectLote.items = val.lote
    },
  },
  mounted() {
    this.getIdUsuarioLogado()
    if (this.$route.params.id) {
      this.animal.id = this.$route.params.id;
      this.nomeTitulo = "Editar Animal";
      this.getAnimalId(this.animal.id);
    }
  },

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
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
        situacao: this.selectDoencaStatus.selected
      };
      this.animal.doencas.push(doenca);
    },

    async getAnimalId(id) {
      try{
        let response = await AnimaisService._getById({id: id})
        
        this.animal = response.data.animais
        this.animal.fase_vida = this.animal.fase_vida.toUpperCase()
        
        if(response.data.animais.primogenito == 0){
          this.animal.is_primogenito = false;

          let busca = {
            params: {
              'id-filho': this.animal.id
            }
          }
          let familia = await AnimaisService._getFamilia(busca);
          
          this.pais.pai = familia.data.familias.pai
          this.pais.mae = familia.data.familias.mae
          
        }
        else{
          this.animal.is_primogenito = true;
        }
        if(response.data.animais.pesagens[0] != null){
          this.animal.pesagens = response.data.animais.pesagens[0]
        }
        if(response.data.animais.hemogramas[0] != null){
          this.animal.hemogramas= response.data.animais.hemogramas[0]
        }
        if(response.data.animais.fazenda != null){
          this.selectFazenda.items = response.data.animais.fazenda
          this.selectFazenda.selected = response.data.animais.fazenda
        }
        let lote = await this.getLoteById(this.animal.lotes_id);
        this.animal.codigo_lote = lote.codigo
        
      }
      catch(e){
        this.notify("error", "Erro ao buscar animal pelo id");
      }
    },

    async getLoteById(id){
      try{
        let response = await LotesService._getById({id: id});
        return response.data.lotes[0]
      }
      catch(e){
        this.notify("error", "Erro ao consultar lote")
      }
    },

    async getDoencas(val) {
      try{
        let busca = {
          nome: val
        };
        this.selectDoenca.loading = true;
        let response = await DoencasService._getByNome(busca);
        this.selectDoenca.items = response.data.doencas.data;
        this.selectDoenca.loading = false;
      }
      catch(e){
         this.notify('error', 'Erro ao consultar doença!')
          return false
      }
    },
    
    async getFazendas(val) {
      try{
        let busca = {
          nome: val
        };
        this.selectFazenda.loading = true;
        let response = await FazendasService._getByNome(val);
        this.selectFazenda.items = response.data.fazendas.data;
        this.selectFazenda.loading = false;
      }
      catch(e){
         this.notify('error', 'Erro ao pesquisar fazenda!')
          return false
      }
    },

    async getMaes(val) {
      try{
        const busca = {
          nome: val,
          params: { sexo: "F" }
        };
        this.selectMae.loading = true;
        let res = await AnimaisService._getByNome(busca);
        this.selectMae.items = res.data.animais.data;
        this.selectMae.loading = false;
      }
      catch(e){
         this.notify('error', 'Erro ao pesquisar animal mãe!')
          return false
      }
    },
    async getPais(val) {
      try{
        const busca = {
          nome: val,
          params: { sexo: "M" }
        };
        this.selectPai.loading = true;
        let res = await AnimaisService._getByNome(busca);
        this.selectPai.items = res.data.animais.data;
        this.selectPai.loading = false;
      }
      catch(e){
          this.notify('error', 'Erro ao pesquisar animal pai!')
          return false
      }
    },

    async cadastrar() {
      try{
        if (this.validaFormAnimal()) {
          this.animal.fazendas_id = this.selectFazenda.selected.id;
          if(this.animal.hemogramas.funcionario_id == null){
            this.animal.hemogramas.funcionario_id = localStorage.getItem('func_id')
          }
         
          if(!this.animal.id && this.animal.is_vivo == false){
            this.animal.nascido_morto = true
          }
          console.log('Objeto antes de salvar')
          console.log(this.animal)
          let response = await AnimaisService._create(this.animal);
          console.log('Objeto depois de salvar')
          console.log(response)
          if (response.status !== 400 || response.status !== 500) {
            this.notify(response.data.message.type, response.data.message.description);
            this.clearForm();
          }
        }
      }
      catch(e){
          console.log(e.resposnse)
          this.notify(e.response.data.message.type, e.response.data.message.description);
          return false
      }
    },

    async editar() {
      try{
        if (this.validaFormAnimal()) {
          console.log(this.animal)
          let response = await AnimaisService._update(this.animal)
          if (response.status !== 400 || response.status !== 500) {
            this.notify(response.data.message.type, response.data.message.description);
            this.clearForm();
          }
        }
      }
      catch(e){
        this.notify(e.response.data.message.type, e.response.data.message.description);
        return false
      }
    },

    validaFormAnimal() {
      if (!this.animal.nome) {
        this.notify("warning", "Preencha o nome do animal!");
        return false;
      }
  
      if (!this.animal.data_nascimento) {
        this.notify("warning", "Preencha a data de nascimento do animal!");
        return false;
      }
      if (!this.animal.sexo) {
        this.notify("warning", "Selecione o sexo do animal!");
        return false;
      }
      if (!this.animal.fase_vida) {
        this.notify("warning", "Selecione a fase de vida do animal!");
        return false;
      }
      if (this.animal.is_primogenito == false) {
        if (!this.animal.mae) {
          this.notify("warning", "Selecione o animal mãe!");
          return false;
        }
        if (!this.animal.pai) {
          this.notify("warning", "Selecione o animal pai!");
          return false;
        }
      }

      if (!this.animal.lotes_id) {
        this.notify("warning", "Selecione a fazenda e o lote de alocação do animal!" );
        return false;
      }
      if(this.animal.is_vivo){
        if (!this.animal.pesagens.peso) {
          this.notify("warning", "Preencha o peso do animal!");
          return false;
        }
        if (!this.animal.pesagens.data_pesagem) {
          this.notify("warning", "Preencha data da pesagem do animal!");
          return false;
        }
        if (!this.animal.hemogramas.ppt) {
          this.notify("warning", "Preencha o PPT do animal!");
          return false;
        }
        if (!this.animal.hemogramas.hematocrito) {
          this.notify("warning", "Preencha o Hematócrico do animal!");
          return false;
        }
        if (!this.animal.hemogramas.data) {
          this.notify("warning", "Preencha a data do exame!");
          return false;
        }
      }

      return true;
    },

    getIdUsuarioLogado(){
      try{
        let res = jwtDecode(localStorage.getItem('token'))
        this.animal.usuario_cadastro = res.id
      }
      catch(e){
        this.notify('error', 'Erro ao carregar id de usuario logado')
      }
    },

    clearForm() {
      this.animal.nome = ""
      this.animal.sexo = ""
      this.animal.codigo_brinco = ""
      this.animal.codigo_raca = ""
      this.animal.data_nascimento = ""
      this.animal.fase_vida = ""
      this.animal.lotes_id = ""
      this.selectFazenda.selected = ""
      this.animal.fazendas_id = ""
      this.animal.doencas = ""
      this.animal.pesagens.peso = ""
      this.animal.pesagens.data_pesagem = ""
      this.animal.hemogramas.ppt = ""
      this.animal.hemogramas.hematocrito = ""
      this.animal.hemogramas.data = ""
      this.animal.pai = ""
      this.animal.mae = ""
      this.selectedFazenda = ""
    },

    notify(color, mensagem) {
      this.snackbar.color = color;
      this.snackbar.estado = true;
      this.snackbar.mensagem = mensagem;
    },

    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day,month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  }
}
</script>

<style scoped>
</style>
