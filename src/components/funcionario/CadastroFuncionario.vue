<template>
  <v-container grid-list-md>
    <v-card>

      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
          <span class="caption">Preencha o formulário para cadastrar novos funcionários</span>
          <span class='caption'></span>
        </div>
      </v-card-title>
      <v-card-text>
         <v-form>
           <v-layout row wrap>
             <v-flex xs12>
               <span class='title'>Informações Gerais</span>
             </v-flex>
 <!-- autocomplete Pessoa -->
             <v-flex xs12 sm4 md4 lg4>
               <v-autocomplete
                 v-model="funcionario.pessoa_id"
                 :items="selectPessoa.items"
                 :search-input.sync="selectPessoa.search"
                 hide-no-data
                 hide-selected
                 item-text="nome"
                 item-value="id"
                 label="Selecionar Pessoa"
                 placeholder="Pesquisar por pessoa"
               />
            </v-flex>
<!-- Cadastrar Pessoas -->
            <v-flex xs12 sm2 md2 lg2>
              <v-layout row justify-center>
                <v-dialog v-model="dialog.pessoa" persistent max-width="500px">
                  <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                  <v-card>
                     <v-card-title>
                      <v-flex xs12>
                        <span class='title'>Cadastrar Pessoa</span>
                      </v-flex>
                      <v-flex xs12>
                        <span class="caption">Preencha o formulário para cadastrar novas pessoas</span>
                      </v-flex>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>

                          <v-flex xs12 >
                            <v-text-field
                              v-model="pessoa.nome"
                              label='Nome'
                              autofocus
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 >
                            <v-text-field
                              v-model="pessoa.rg"
                              label='RG'
                              mask='########'
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 >
                            <v-text-field
                              v-model="pessoa.cpf"
                              label='CPF'
                              mask="###.###.###-##"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 >
                            <v-select
                              :items="selectSexo"
                              v-model="pessoa.sexo"
                              item-text="text"
                              item-value="value"
                              label="Sexo"
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 >
                            <v-text-field
                              v-model="pessoa.numero_telefone"
                              label='Telefone'
                              mask="(##)#####-####"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 >
                            <v-text-field
                              v-model="pessoa.data_nascimento"
                              label='Data de nascimento'
                              mask="##/##/####"
                              :return-masked-value="true"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm10 md10 lg10>
                            <v-autocomplete
                              v-model="pessoa.endereco_id"
                              :items="selectEndereco.items"
                              :search-input.sync="selectEndereco.search"
                              hide-no-data
                              hide-selected
                              item-text="logradouro"
                              item-value="id"
                              label="Selecionar Endereço"
                              placeholder="Pesquisar por endereço"
                            >
                              <template
                                slot="item"
                                slot-scope="data"
                                >
                                <template>
                                    <v-list-tile-content>
                                      <v-list-tile-title v-html="data.item.logradouro"></v-list-tile-title>
                                      <v-list-tile-sub-title v-html="data.item.numero"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-content>
                                      <v-list-tile-title v-html="data.item.cidade"></v-list-tile-title>
                                      <v-list-tile-sub-title v-html="data.item.bairro"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </template>
                              </template>


                          </v-autocomplete>
                          </v-flex>
                          <!-- AutoComplete Endereco -->
                          <v-flex xs12 sm2 md2 lg2>
                            <v-layout row justify-center>
                              <v-dialog v-model="dialog.endereco" persistent max-width="500px">
                                <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                                <v-card>
                                   <v-card-title>
                                    <v-flex xs12>
                                      <span class='title'>Cadastrar Endereço</span>
                                    </v-flex>
                                    <v-flex xs12>
                                      <span class="caption">Preencha o formulário para cadastrar novo endereço</span>
                                    </v-flex>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container grid-list-md>
                                      <v-layout wrap>

                                        <v-flex xs12 >
                                          <v-text-field
                                            v-model="endereco.logradouro"
                                            label='Logradouro'
                                            autofocus
                                          ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 >
                                          <v-text-field
                                            v-model="endereco.numero"
                                            label='Número ou complemento'
                                          ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 >
                                          <v-text-field
                                            v-model="endereco.bairro"
                                            label='Bairro'
                                            mask="Nnnnnnnnnnnnnnnnnnnnn"
                                          ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 >
                                          <v-text-field
                                            v-model="endereco.cidade"
                                            label='Cidade'
                                            mask="Nnnnnnnnnnnnnnnnnnnnn"
                                          ></v-text-field>
                                        </v-flex>
                                        <v-select
                                          :items="selectEstado.items"
                                          v-model="endereco.estado"
                                          item-text="text"
                                          item-value="value"
                                          label="Estado"
                                        ></v-select>
                                        <v-flex xs12 >
                                          <v-text-field
                                            v-model="endereco.pais"
                                            label='País'
                                            mask="Nnnnnnnnnnnnnnnnnnnnn"
                                          ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                          <v-text-field
                                            v-model="endereco.cep"
                                            label='CEP'
                                            mask="#####-###"
                                          ></v-text-field>
                                        </v-flex>

                                       </v-layout>
                                    </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" flat @click="cadastrarEndereco">Salvar</v-btn>
                                    <v-btn color="blue darken-1" flat @click.native="dialog.endereco = false">Cancelar</v-btn>
                                    <v-btn color="blue darken-1" flat @click="clearFormEndereco">Limpar Formulário</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                           </v-layout>
                          </v-flex>

                         </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="cadastrarPessoa">Salvar</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="dialog.pessoa = false">Cancelar</v-btn>
                      <v-btn color="blue darken-1" flat @click="clearFormPessoa">Limpar Formulário</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
             </v-layout>
            </v-flex>

  <!-- AutoComplete usuario -->
             <v-flex xs12 sm4 md4 lg4>
               <v-autocomplete
                 v-model="funcionario.usuario_id"
                 :items="selectUsuario.items"
                 :search-input.sync="selectUsuario.search"
                 hide-no-data
                 hide-selected
                 item-text="login"
                 item-value="id"
                 label="Selecionar usuario"
                 placeholder="Pesquisar por usuario"
               />
             </v-flex>
  <!-- Cadastrar usuario -->

            <v-flex xs12 sm2 md2 lg2>
              <v-layout row justify-center>
                <v-dialog v-model="dialog.usuario" persistent max-width="500px">
                  <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                  <v-card>
                    <v-card-title>
                      <v-flex xs12>
                        <span class='title'>Cadastrar Usuário</span>
                      </v-flex>
                      <v-flex xs12>
                        <span class="caption">Preencha o formulário para cadastrar novos usuários</span>
                      </v-flex>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>

                          <v-flex xs12 >
                            <v-text-field
                              v-model="usuario.login"
                              mask="nnnnnnnnnnnnnnnnnnnn"
                              label='Login'
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 >
                            <v-text-field
                              v-model="usuario.senha"
                              mask="nnnnnnnnnnnnnnnnnnnn"
                             :append-icon="show1 ? 'visibility_off' : 'visibility'"
                             :type="show1 ? 'text' : 'password'"
                              name="senha"
                              label="Senha"
                              hint="Tamanho mínimo de 8 caracteres"
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 >
                            <v-text-field
                              v-model="usuario.re_senha"
                              mask="nnnnnnnnnnnnnnnnnnnnn"
                              :append-icon="show1 ? 'visibility_off' : 'visibility'"
                              :type="show1 ? 'text' : 'password'"
                              name="reSenha"
                              label="Confirmar Senha"
                              hint="Tamanho mínimo de 8 caracteres"
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-autocomplete
                              v-model="usuario.grupo_id"
                              :items="selectGrupo.items"
                              :search-input.sync="selectGrupo.search"
                              hide-no-data
                              hide-selected
                              item-text="nome"
                              item-value="id"
                              label="Selecionar Grupo"
                              placeholder="Pesquisar por grupo"
                            />
                          </v-flex>

                         </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="cadastrarUsuario">Salvar</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="dialog.usuario = false">Cancelar</v-btn>
                      <v-btn color="blue darken-1" flat @click="clearFormUsuario">Limpar Formulário</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-flex>

            <v-flex xs12>
                <br/>
                <v-divider></v-divider>
                <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Alocação e Função</span>
            </v-flex>

             <!-- AutoComplete Fazenda             -->
            <v-flex xs12 sm6 md6 lg6>
              <v-autocomplete
                v-model="funcionario.fazenda_id"
                :items="selectFazenda.items"
                :search-input.sync="selectFazenda.search"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Selecionar Fazenda"
                placeholder="Pesquisar por fazenda"
              />
            </v-flex>
<!-- AutoComplete Cargo             -->
            <v-flex xs12 sm6 md6 lg6>
             <v-autocomplete
               v-model="funcionario.cargo_id"
               :items="selectCargo.items"
               :search-input.sync="selectCargo.search"
               hide-no-data
               hide-selected
               item-text="nome"
               item-value="id"
               label="Selecionar Cargo"
               placeholder="Pesquisar por cargo"
             />
           </v-flex>
<!-- Text field Salario            -->
           <v-flex xs12 sm6 md6 lg6>
             <v-text-field
               v-model="funcionario.salario"
               mask="####,##"
               label='Salário'
             ></v-text-field>
           </v-flex>


         </v-layout>
              <v-flex>
                <v-btn v-if="!funcionario.id" @click="cadastrar">Enviar</v-btn>
                <v-btn v-if="funcionario.id" @click="editar">Editar</v-btn>

                <v-btn @click="clearformFuncionario">Limpar formulário</v-btn>
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
  import PessoasService from '../../services/PessoasService'
  import EnderecosService from '../../services/EnderecosService'
  import GruposService from '../../services/GruposService'
  import CargosService from '../../services/CargosService'
  import UsuariosService from '../../services/UsuariosService'
  import FuncionariosService from '../../services/FuncionariosService'
  import FazendasService from '../../services/FazendasService'

  export default {
    name: 'cadastro-funcionario',
    data(){
      return {
        nomeTitulo: 'Cadastrar Funcionário',
        funcionario: {
          id: null,
          pessoa_id: null,
          fazenda_id: null,
          cargo_id: null,
          usuario_id: null,
          salario: ''
        },
        pessoa: {
          id: null,
          nome: '',
          rg: '',
          cpf: '',
          sexo: 'm',
          numero_telefone: '',
          data_nascimento: '',
          endereco_id: null
        },
        endereco: {
          id: null,
          logradouro: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
          pais: '',
          cep: ''
        },
        cargo: {
          id: null,
          nome: '',
          descricao: ''
        },
        fazenda: {
          id: null,
          nome: ''
        },
        usuario: {
          id: null,
          login: '',
          senha: '',
          re_senha: '',
          grupo_id: null
        },
        grupo: {
          id: null,
          nome: '',
          descricao: ''
        },
        selectPessoa: {
          items: [],
          search: null,
          loading: false
        },
        selectEndereco: {
          items: [],
          search: null,
          loading: false
        },
        selectUsuario: {
           items: [],
           search: null,
           loading: false
        },
        selectFazenda: {
           item: [],
           search: null,
           loading: false

        },
        selectCargo: {
           items: [],
           search: null,
           loading: false
        },
        selectGrupo: {
           items: [],
           search: null,
           loading: false
        },
        selectCep: {
           items: [],
           search: null,
           loading: false
        },
        selectEstado: {
           items: [
             {text: 'Acre', value: 'AC'},
             {text: 'Alagoas', value: 'AL'},
             {text: 'Amapá', value: 'AP'},
             {text: 'Amazonas', value: 'AM'},
             {text: 'Bahia',value: 'BA'},
             {text: 'Ceará',value: 'CE'},
             {text: 'Distrito Federal', value: 'DF'},
             {text: 'Espírito Santo', value: 'ES'},
             {text: 'Goiás',value:'GO'},
             {text: 'Maranhão',value: 'MA'},
             {text: 'Mato Grosso',value: 'MT'},
             {text: 'Mato Grosso do Sul ',value: 'MS'},
             {text: 'Minas Gerais ',value: 'MG'},
             {text: 'Pará ',value:'PA'},
             {text: 'Paraíba ',value:' PB'},
             {text: 'Paraná ',value:'PR'},
             {text: 'Pernambuco',value: 'PE'},
             {text: 'Piauí',value: 'PI'}, {text: 'Roraima',value: 'RR'},
             {text: 'Rondônia',value: 'RO'},
             {text: 'Rio de Janeiro',value: 'RJ'},
             {text: 'Rio Grande do Norte',value: 'RN'},
             {text: 'Rio Grande do Sul',value: 'RS'},
             {text: 'Santa Catarina',value: 'SC'},
             {text: 'São Paulo',value: 'SP'},
             {text: 'Sergipe',value: 'SE'},
             {text: 'Tocantins',value: 'TO'}
           ]
         },
        selectSexo: [
           {text: 'Masculino', value: 'm'},
           {text: 'Feminino', value: 'f'}
         ],
        dialog: {
          pessoa: false,
          endereco: false,
          usuario: false,
          cargo: false,
          grupo: false,
          fazenda: false,
        },
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        },
        show1: false,
      }
    },
    watch: {
     'selectPessoa.search'(val) {
       val && this.getPessoas(val)
     },
     'selectEndereco.search'(val) {
       val && this.getEnderecos(val)
     },
     'selectFazenda.search'(val) {
       val && this.getFazendas(val)
     },
     'selectUsuario.search'(val) {
       val && this.getUsuarios(val)
     },
     'selectGrupo.search'(val) {
       val && this.getGrupos(val)
     },
     'selectCargo.search'(val) {
       val && this.getCargos(val)
     }
    },
    mounted(){
      this.getCargos()
      this.getFazendas()
      this.getGrupos()
      this.getPessoas()
      this.getEnderecos()
      this.funcionario.id = this.$route.params.id
      if(this.funcionario.id){
        this.nomeTitulo = 'Editar funcionário'
        this.getFuncionario()
        this.getUsuarios()

      }
    },
    methods: {
      async getCargos(val) {
        let busca = {
           nome: val
         }
         this.selectCargo.loading = true
         let response = await CargosService._getAll({pagina: 1})
         if(val){
           let response = await CargosService._getByNome(busca)
         }
         this.selectCargo.items = response.data.cargos.data
         this.selectCargo.loading = false
      },
      async getFazendas(val) {
         let busca = {
           nome: val
         }
         this.selectFazenda.loading = true

         let response = await FazendasService._getAll({pagina: 1})
         if (val){
           let response = await FazendasService._getByNome(busca)
         }
         this.selectFazenda.items = response.data.fazendas.data
         this.selectFazenda.loading = false
       },
      async getUsuarios(val) {
         let busca = {
           nome: val
         }
         this.selectUsuario.loading = true
         if (val){
           let response = await UsuariosService._getByLogin(busca)
         }
         this.selectUsuario.items = response.data.usuarios.data
         this.selectUsuario.loading = false
       },
      async getGrupos(val) {
         let busca = {nome: val}
         this.selectGrupo.loading = true
         let response = await GruposService._getAll({pagina: 1})
         if(val) {
           let response = await  GruposService._getByNome(busca)
         }
         this.selectGrupo.items = response.data.grupos.data
         this.selectGrupo.loading = false
       },
      async getPessoas(val) {
         let busca = {
           nome: val
         }
         this.selectPessoa.loading = true
         let response = await PessoasService._getAll({pagina: 1})
         if(val) {
           let response = await  PessoasService._getByNome(busca)
         }
         this.selectPessoa.items = response.data.pessoas.data
         this.selectPessoa.loading = false
       },
      async getEnderecos(val) {
         let busca = {
           nome: val
         }
         this.selectEndereco.loading = true
         let response = await EnderecosService._getAll({pagina: 1})
         if(val){
           let response = await EnderecosService._getBylogradouro(busca)
         }
         this.selectEndereco.items = response.data.enderecos.data
         this.selectEndereco.loading = false
       },
      async getFuncionario() {
         let response = await FuncionariosService._getById(this.funcionario)
         this.funcionario = response.data.funcionarios

       },
      async getCep() {
       let busca = {
         cep: val
       }
       let response = await EnderecosService._getCep(busca)
       this.selectCep.items = response
       console.log(response);
      },
      async cadastrarCargo() {
       if (this.validarFormCargo()) {
         let response = await CargosService._create(this.cargo).catch(exception => {
           if(exception){
             this.alerta('error', true, 'Erro ao cadastrar cargo!')
           }
         })
         if(response.status === 201){
           this.alerta(response.data.message.type, true, response.data.message.description)
           this.getCargos()
           this.dialog.cargo = false
         }
       } else {
         this.alerta('warning', true, 'Preencha todos os campos corretamente!')
       }
      },
      async cadastrarFazenda() {
       if (this.validarFormFazenda()){
         let response = await FazendasService._create(this.funcionario.fazenda).catch(exception => {
           if (exception){
             this.alerta('error', true, 'Erro ao cadastrar fazenda!')
           }
         })
         if(response.status === 201){
           this.alerta(response.data.message.type, true, response.data.message.description)
           this.clearFormFazenda()
           this.getFazendas()
           this.dialog.fazenda = false
         }
       }
       else {
         this.alerta('warning', true, 'Preencha todos os campos corretamente!')
       }
      },
      async cadastrarPessoa() {
       if (this.validarFormPessoa()) {

         let response = await PessoasService._create(this.pessoa).catch(exception => {
           if(exception){
             this.alerta('error',true, 'Erro ao cadastrar pessoa!')
           }
         })
         if (response.status === 201){
           this.alerta(response.data.message.type, true, response.data.message.description)
           this.dialog.pessoa = false
           this.clearFormPessoa()
           this.getPessoas()
         }
       }
      },
      async cadastrarEndereco() {
       if(this.validarFormEndereco()){
         let response = await EnderecosService._create(this.endereco).catch(exception => {
           if(exception) {
             this.alerta('error', true, 'Erro ao cadastrar endereço!')
           }
         })
         if(response.status === 201){
           this.alerta(response.data.message.type, true, response.data.message.description)
           this.dialog.endereco = false
           this.clearFormEndereco()
           this.getEnderecos()
         }
       }
      },

      async cadastrarUsuario(){
       if (this.validarFormUsuario()){
           let response = await UsuariosService._create(this.usuario).catch(exception => {
             if(exception){
               this.alerta('error', true, 'Erro ao cadastrar usuário!')
             }
           })
           if(response.status === 201){
             this.alerta(response.data.message.type, true, response.data.message.description)
             this.dialog.usuario = false
             this.clearFormUsuario()
           }
       }
     },

      async cadastrar() {
       if(this.validarFormFuncionario()){
        let response = await FuncionariosService._create(this.funcionario).catch(exception => {
          if(exception){
            this.alerta('error', true, 'Erro ao cadastrar funcionário!')
          }
        })
        if(response.status === 201){
          this.alerta(response.data.message.type, true, response.data.message.description)
          this.dialog.funcionario = false
          this.clearformFuncionario()
        }
       }

      },
      async editar() {
       if(this.validarFormFuncionario()){
        let response = await FuncionariosService._update(this.funcionario).catch(exception => {
          if(exception){
            this.alerta('error', true, 'Erro ao cadastrar funcionário!')
          }
        })
        if(response.status === 201){
          this.alerta(response.data.message.type, true, response.data.message.description)
          this.dialog.funcionario = false
          this.clearformFuncionario()
        }
       }
       else {
         this.alerta('warning', true, 'Preencha todos os campos corretamente!')
       }
      },
      validarFormPessoa() {
       if (
         this.pessoa.nome && this.pessoa.rg  && this.pessoa.cpf && this.pessoa.sexo &&
         this.pessoa.numero_telefone && this.pessoa.data_nascimento && this.pessoa.endereco_id) {
         return true
       } else {
         if(!this.pessoa.nome){
           this.alerta('warning', true, 'Preencha o nome da pessoa!')
           return false
         }
         else if(!this.pessoa.rg){
           this.alerta('warning', true, 'Preencha o RG da pessoa!')
           return false
         }
         else if(!this.pessoa.cpf){
           this.alerta('warning', true, 'Preencha o CPF da pessoa!')
           return false
         }
         else if(!this.pessoa.sexo){
           this.alerta('warning', true, 'Selecione o sexo da pessoa!')
           return false
         }
         else if(!this.pessoa.numero_telefone){
           this.alerta('warning', true, 'Preencha o telefone da pessoa!')
           return false
         }
         else if(!this.pessoa.data_nascimento){
           this.alerta('warning', true, 'Preencha a data de nascimento da pessoa!')
           return false
         }
         else if(!this.pessoa.endereco_id){
           this.alerta('warning', true, 'Selecione o endereço da pessoa!')
           return false
         }
       }
      },
      validarFormEndereco() {
       if (this.endereco.logradouro && this.endereco.numero && this.endereco.bairro &&
         this.endereco.cidade && this.endereco.estado && this.endereco.pais && this.endereco.cep) {
         return true
       } else {
         if(!this.endereco.logradouro){
           this.alerta('warning', true, 'Preencha o logradouro!')
           return false
         }
         else if(!this.endereco.numero){
           this.alerta('warning', true, 'Preencha o número ou complemento!')
           return false
         }
         else if(!this.endereco.bairro){
           this.alerta('warning', true, 'Preencha o bairro!')
           return false
         }
         else if(!this.endereco.cidade){
           this.alerta('warning', true, 'Preencha o cidade!')
           return false
         }
         else if(!this.endereco.estado){
           this.alerta('warning', true, 'Selecione o estado!')
           return false
         }
         else if(!this.endereco.pais){
           this.alerta('warning', true, 'Preencha o país!')
           return false
         }
         else if(!this.endereco.cep){
           this.alerta('warning', true, 'Preencha o CEP!')
           return false
         }
       }
      },
      validarFormCargo() {
       if (this.funcionario.cargo.nome !== '' && this.funcionario.cargo.nome !== null &&
         this.funcionario.cargo.descricao !== '' && this.funcionario.cargo.descricao !== null) {
         return true
       } else {
         return false
       }
      },
      validarFormGrupo() {
       if (this.funcionario.grupo.nome !== '' && this.funcionario.grupo.nome !== null &&
         this.funcionario.grupo.descricao !== '' && this.funcionario.grupo.descricao !== null) {
         return true
       } else {
         return false
       }
      },
      validarFormUsuario() {
       if (this.usuario.login && this.usuario.senha  && this.usuario.re_senha && this.usuario.grupo_id) {
         return true
       } else {
         if(!this.usuario.login){
           this.alerta('warning', true, 'Preencha o login do usuário!')
           return false
         }
         else if ((this.usuario.login.length) < 5){
           this.alerta('warning', true, 'O login deve ter pelo menos 5 caracteres!')
           return false
         }
         else if (!this.usuario.senha){
           this.alerta('warning', true, 'Preencha a senha do usuário!')
           return false
         }
         else if((this.usuario.senha.length) < 8){
           this.alerta('warning', true, 'A senha deve ter pelo menos 8 caracteres!')
           this.usuario.senha = ''
           return false
         }
         else if(this.usuario.senha === this.usuario.login){
           this.alerta('warning', true, 'A senha não pode ser igual ao login!')
           this.usuario.senha = ''
           this.usuario.re_senha = ''
           return false
         }
         else if(!this.usuario.re_senha){
           this.alerta('warning', true, 'Confirme a senha do usuário!')
           this.usuario.re_senha = ''
           return false
         }
         else if((this.usuario.senha.length) < 8){
           this.alerta('warning', true, 'A confirmação de senha deve ter pelo menos 8 caracteres!')
           return false
         }
         else if(this.usuario.senha !== this.usuario.re_senha){
           this.alerta('warning', true, 'As senhas digitadas não conferem!')
           this.usuario.senha = ''
           this.usuario.re_senha = ''
           return false
         }
         else if(!this.usuario.grupo_id){
           this.alerta('warning', true, 'Selecione o grupo que este usuário pertencerá!')
           return false
         }

       }
      },
      validarFormFazenda() {
       if(this.funcionario.fazenda.nome !== '' && this.funcionario.fazenda.nome !== null){
         return true
       } else{
         return false
       }
      },
      validarFormFuncionario() {
        if(this.funcionario.pessoa_id && this.funcionario.fazenda_id && this.funcionario.cargo_id && this.funcionario.usuario_id && this.funcionario.salario){
           return true
        } else {
           if(!this.funcionario.pessoa_id){
             this.alerta('warning', true, 'Selecione a pessoa!')
             return false
           }
           else if(!this.funcionario.usuario_id){
             this.alerta('warning', true, 'Selecione o usuário!')
             return false
           }
           else if(!this.funcionario.fazenda_id){
             this.alerta('warning', true, 'Selecione a fazenda!')
             return false
            }
           else if(!this.funcionario.cargo_id){
             this.alerta('warning', true, 'Selecione o cargo!')
             return false
           }
           else if(!this.funcionario.salario){
             this.alerta('warning', true, 'Preencha o salário!')
             return false
           }


        }
      },
      clearFormPessoa(){
       this.pessoa.nome = ''
       this.pessoa.rg = ''
       this.pessoa.cpf = ''
       this.pessoa.sexo = ''
       this.pessoa.telefone = ''
       this.pessoa.data_nascimento = ''
       this.pessoa.endereco_id = ''
     },
      clearFormEndereco(){
       this.endereco.logradouro = ''
       this.endereco.bairro = ''
       this.endereco.numero = ''
       this.endereco.cidade = ''
       this.endereco.estado = ''
       this.endereco.pais = ''
       this.endereco.cep = ''
     },
     //  clearFormCargo() {
     //   this.funcionario.cargo.nome = ''
     //   this.funcionario.cargo.descricao = ''
     // },
     //  clearFormFazenda(){
     //   this.funcionario.fazenda.nome = ''
     // },
      clearFormUsuario(){
         this.usuario.login = ''
         this.usuario.senha = ''
         this.usuario.re_senha = ''
      },
     //  clearFormGrupo() {
     //   this.funcionario.grupo.nome = ''
     //   this.funcionario.grupo.descricao = ''
     // },

      clearformFuncionario(){
       this.funcionario.pessoa_id = null
       this.funcionario.cargo_id = null
       this.funcionario.fazenda_id = null
       this.funcionario.usuario_id = null
       this.funcionario.salario = ''
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
