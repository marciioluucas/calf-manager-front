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
            <!-- text Data_nascimento -->
            <v-flex xs12 sm3 md3 lg3>
              <v-text-field
                v-model="animal.data_nascimento"
                mask="##/##/####"
                label="Nascimento"
                :return-masked-value="true"
              ></v-text-field>
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
              <v-select
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

                <v-flex xs12 sm6>
                  <v-text-field
                    mask="##/##/####"
                    v-model="animal.pesagens.data_pesagem"
                    label="Data da pesagem"
                    :return-masked-value="true"
                  ></v-text-field>
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
                  <v-text-field
                    mask="##/##/####"
                    v-model="animal.hemogramas.data"
                    label="Data do exame"
                    :return-masked-value="true"
                  ></v-text-field>
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
      animal: {
        id: null,
        nome: null,
        fase_vida: null,
        is_vivo: true,
        is_primogenito: false,
        sexo: null,
        quantidade_animais: 0,
        fazendas_id: null,
        lotes_id: null,
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
        items: []
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
    }
  },
  mounted() {
    this.getIdUsuarioLogado()
    if (this.$route.params.id) {
      this.animal.id = this.$route.params.id;
      this.nomeTitulo = "Editar Animal";
      this.getAnimalId(this.animal.id);
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
        situacao: this.selectDoencaStatus.selected
      };
      this.animal.doencas.push(doenca);
    },

    async getAnimalId(id) {
      try{
        let response = await AnimaisService._getById({id: id})
        this.animal = response.data.animais
        this.animal.pesagens = response.data.animais.pesagens[0]
        this.animal.hemogramas= response.data.animais.hemogramas[0]
        this.selectFazenda.items = response.data.animais.fazenda
        this.selectFazenda.selected = response.data.animais.fazenda

        // this.selectFazenda.selected.lote = response.data.animais.fazenda.lote
      }
      catch(e){
        this.alerta("error", true, "Erro ao buscar animal pelo id");
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
         this.alerta('error', true, 'Erro ao cadastrar animal!')
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
         this.alerta('error', true, 'Erro ao pesquisar fazenda!')
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
         this.alerta('error', true, 'Erro ao pesquisar animal mãe!')
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
          this.alerta('error', true, 'Erro ao pesquisar animal pai!')
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
          let response = await AnimaisService._create(this.animal);
          if (response.status !== 400 || response.status !== 500) {
            this.alerta("success", true, "Animal cadastrado com sucesso!");
            this.clearForm();
          }
        }
      }
      catch(e){
          this.alerta('error', true, 'Erro ao cadastrar animal!')
          return false
      }
    },

    async editar() {
      try{
        if (this.validaFormAnimal()) {
          let response = await AnimaisService._update(this.animal)
          if (response.status !== 400 || response.status !== 500) {
            this.alerta("success", true, "Animal alterado com sucesso!");
            this.clearForm();
          }
        }
      }
      catch(e){
        this.alerta("error", true, "Erro ao alterar animal!");
        return false
      }
    },

    validaFormAnimal() {
      if (!this.animal.nome) {
        this.alerta("warning", true, "Preencha o nome do animal!");
        return false;
      }
  
      if (!this.animal.data_nascimento) {
        this.alerta(
          "warning",
          true,
          "Preencha a data de nascimento do animal!"
        );
        return false;
      }
      if (!this.animal.sexo) {
        this.alerta("warning", true, "Selecione o sexo do animal!");
        return false;
      }
      if (!this.animal.fase_vida) {
        this.alerta("warning", true, "Selecione a fase de vida do animal!");
        return false;
      }
      if (this.animal.is_primogenito == false) {
        if (!this.animal.mae) {
          this.alerta("warning", true, "Selecione o animal mãe!");
          return false;
        }
        if (!this.animal.pai) {
          this.alerta("warning", true, "Selecione o animal pai!");
          return false;
        }
      }

      if (!this.animal.lotes_id) {
        this.alerta("warning",true,"Selecione a fazenda e o lote de alocação do animal!" );
        return false;
      }
      if (!this.animal.pesagens.peso) {
        this.alerta("warning", true, "Preencha o peso do animal!");
        return false;
      }
      if (!this.animal.pesagens.data_pesagem) {
        this.alerta("warning", true, "Preencha data da pesagem do animal!");
        return false;
      }
      if (!this.animal.hemogramas.ppt) {
        this.alerta("warning", true, "Preencha o PPT do animal!");
        return false;
      }
      if (!this.animal.hemogramas.hematocrito) {
        this.alerta("warning", true, "Preencha o Hematócrico do animal!");
        return false;
      }
      if (!this.animal.hemogramas.data) {
        this.alerta("warning", true, "Preencha a data do exame!");
        return false;
      }

      return true;
    },

    getIdUsuarioLogado(){
      try{
        let res = jwtDecode(localStorage.getItem('token'))
        this.animal.usuario_cadastro = res.id
       
      }
      catch(e){
        this.alerta('error', true, 'Erro ao carregar id de usuario logado')
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

    alerta(color, estado, mensagem) {
      this.snackbar.color = color;
      this.snackbar.estado = estado;
      this.snackbar.mensagem = mensagem;
    }
  }
}
</script>

<style scoped>
</style>
