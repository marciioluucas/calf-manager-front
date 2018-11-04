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
                v-model="funcionario.pessoa"
                :items="selectPessoa.items"
                :search-input.sync="selectPessoa.search"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Selecionar Pessoa"
                placeholder="Pesquisar por pessoa"
                return-object
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
                        <span class="caption">Preencha o formulário para cadastrar novos usuários</span>
                      </v-flex>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>

                          <v-flex xs12 sm6 md6 lg6>
                            <v-text-field
                              v-model="funcionario.pessoa.nome"
                              label='Nome'
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6 lg6>
                            <v-text-field
                              v-model="funcionario.pessoa.rg"
                              mask='#######'
                              label='RG'
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6 lg6>
                            <v-text-field
                              v-model="funcionario.pessoa.cpf"
                              mask="###.###.###-##"
                              label='CPF'
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 sm6 md6 lg6>
                            <v-select
                              :items="selectSexo"
                              v-model="funcionario.pessoa.sexo"
                              item-text="text"
                              item-value="value"
                              label="Sexo"

                            ></v-select>
                          </v-flex>

                          <v-flex xs12 sm6 md6 lg6>
                            <v-text-field
                              v-model="funcionario.pessoa.numero_telefone"
                              mask="(##) #####-####"
                              label='Telefone'
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6 lg6>
                            <v-text-field
                              v-model="funcionario.pessoa.data_nascimento"
                              mask="####-##-##"
                              label='Nascimento'
                              placeholder="YYYY-MM-DD"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm10 md10 lg10>


                            <v-autocomplete
                              v-model="funcionario.pessoa.endereco"
                              :items="selectEndereco.items"
                              :search-input.sync="selectEndereco.search"
                              hide-no-data
                              hide-selected
                              item-text="logradouro"
                              item-value="id"
                              label="Selecionar Endereço"
                              placeholder="Pesquisar por endereço"
                              return-object
                            >
                            <template
                              slot="item"
                              slot-scope="data">
                              <template v-if="typeof data.item !== 'object'">
                                <v-list-tile-content v-text="data.item"></v-list-tile-content>
                              </template>
                              <template v-else>
                                <v-list-tile-content>
                                  <v-list-tile-title v-html="data.item.logradouro"></v-list-tile-title>
                                  <v-list-tile-sub-title v-html="data.item.bairro"></v-list-tile-sub-title>
                                </v-list-tile-content>
                              </template>
                            </template>
                          </v-autocomplete>
                          </v-flex>
              <!-- Cadastrar Endereco -->
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
                                      <span class="caption">Preencha o formulário para cadastrar novos usuários</span>
                                    </v-flex>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container grid-list-md>
                                      <v-layout wrap>
                                        <v-flex xs12 sm6 md6 lg6>
                                          <!-- <v-autocomplete
                                            v-model="funcionario.endereco.cep"
                                            mask="#####-###"
                                            :items="selectCep.items"
                                            :search-input.sync="selectCep.search"
                                            hide-no-data
                                            hide-selected
                                            item-text="cep"
                                            item-value="id"
                                            label="CEP"
                                            placeholder="Digite o CEP"
                                            return-object
                                          /> -->
                                          <v-text-field
                                            v-model="funcionario.pessoa.endereco.cep"
                                            label='CEP'
                                            mask="#####-###"
                                          ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6 lg6>
                                          <v-text-field
                                            v-model="funcionario.pessoa.endereco.logradouro"
                                            label='Logradouro'
                                          ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6 lg6>
                                          <v-text-field
                                            v-model="funcionario.pessoa.endereco.numero"
                                            label='Número'
                                          ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6 lg6>
                                          <v-text-field
                                            v-model="funcionario.pessoa.endereco.bairro"
                                            label='Bairro'
                                          ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6 lg6>
                                          <v-text-field
                                            v-model="funcionario.pessoa.endereco.cidade"
                                            label='Cidade'
                                          ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6 lg6>
                                          <v-autocomplete
                                            v-model="funcionario.pessoa.endereco.estado"
                                            :items="selectEstado.items"
                                            hide-no-data
                                            hide-selected
                                            item-text="text"
                                            item-value="value"
                                            label="Selecionar Estado"
                                          />
                                        </v-flex>
                                        <v-flex xs12 sm6 md6 lg6>
                                          <v-text-field
                                            v-model="funcionario.pessoa.endereco.pais"
                                            label='País'
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
                      <small>*Preencha todos os campos corretamente</small>
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



            <v-flex xs12>
              <br/>
              <v-divider></v-divider>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Alocação e Função</span>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-autocomplete
                v-model="funcionario.fazenda"
                :items="selectFazenda.items"
                :search-input.sync="selectFazenda.search"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Selecionar Fazenda"
                placeholder="Pesquisar por fazenda"
                return-object
              />
            </v-flex>
<!-- Cadastrar Fazenda -->
            <v-flex xs12 sm2 md2 lg2>
              <v-layout row justify-center>
                <v-dialog v-model="dialog.fazenda" persistent max-width="500px">
                <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                <v-card>
                  <v-card-title>
                    <v-flex xs12>
                      <span class='title'>Cadastrar Fazenda</span>
                    </v-flex>
                    <v-flex xs12>
                      <span class="caption">Preencha o formulário para cadastrar novos usuários</span>
                    </v-flex>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field
                            v-model="funcionario.fazenda.nome"
                            label="Nome"
                            required
                          >
                          </v-text-field>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="cadastrarFazenda">Salvar</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog.fazenda = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" flat @click="clearFormFazenda">Limpar Formulário</v-btn>
                  </v-card-actions>
                </v-card>
                </v-dialog>
              </v-layout>
            </v-flex>

            <v-flex xs12 sm4 md4 lg4>
              <v-autocomplete
                v-model="funcionario.cargo"
                :items="selectCargo.items"
                :search-input.sync="selectCargo.search"
                hide-no-data
                hide-selected
                item-text="nome"
                item-value="id"
                label="Selecionar Cargo"
                placeholder="Pesquisar por cargo"
                return-object
              />
            </v-flex>
<!-- Cadastrar Cargo-->

            <v-flex xs12 sm2 md2 lg2>
              <v-layout row justify-center>
                <v-dialog v-model="dialog.cargo" persistent max-width="500px">
                  <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                  <v-card>
                    <v-card-title>
                      <v-flex xs12>
                        <span class='title'>Cadastrar Cargo</span>
                      </v-flex>
                      <v-flex xs12>
                        <span class="caption">Preencha o formulário para cadastrar novos usuários</span>
                      </v-flex>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field
                              v-model="funcionario.cargo.nome"
                              label="Nome"
                              required
                            >
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field
                              v-model="funcionario.cargo.descricao"
                              label="descrição"
                            >
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>

                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="cadastrarCargo">Salvar</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="dialog.cargo = false">Cancelar</v-btn>
                      <v-btn color="blue darken-1" flat @click="clearFormCargo">Limpar Formulário</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-flex>

            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="funcionario.salario"
                mask="#.###,##"
                label='Salário'
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <br/>
              <v-divider></v-divider>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Autenticação e Permissão</span>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-autocomplete
                v-model="funcionario.usuario"
                :items="selectUsuario.items"
                :search-input.sync="selectUsuario.search"
                hide-no-data
                hide-selected
                item-text="login"
                item-value="id"
                label="Selecionar usuario"
                placeholder="Pesquisar por usuario"
                return-object
              />
            </v-flex>
<!-- Cadastrar Usuario -->
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
                              v-model="funcionario.usuario.login"
                              label='Login'
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 >
                            <v-text-field
                              v-model="funcionario.usuario.senha"
                             :append-icon="show1 ? 'visibility_off' : 'visibility'"
                             :type="show1 ? 'text' : 'password'"
                              name="senha"
                              label="Senha"
                              hint="At least 8 characters"
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 >
                            <v-text-field
                              v-model="funcionario.usuario.reSenha"
                              :append-icon="show1 ? 'visibility_off' : 'visibility'"
                              :type="show1 ? 'text' : 'password'"
                              name="reSenha"
                              label="Repetir Senha"
                              hint="At least 8 characters"
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-autocomplete
                              v-model="funcionario.usuario.grupo"
                              :items="selectGrupo.items"
                              :search-input.sync="selectGrupo.search"
                              hide-no-data
                              hide-selected
                              item-text="nome"
                              item-value="id"
                              label="Selecionar Grupo"
                              placeholder="Pesquisar por grupo"
                              return-object
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
    data() {
      return {
        funcionario: {
          id: null,
          salario: null,
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
            reSenha: '',
            grupo: {
              id: null,
              nome: '',
              descricao: ''
            },
          },
          pessoa: {
            id: null,
            nome: '',
            rg: '',
            cpf: '',
            sexo: 'm',
            numero_telefone: '',
            data_nascimento: '',
            endereco: {
              id: null,
              logradouro: '',
              numero: '',
              bairro: '',
              cidade: '',
              estado: '',
              pais: '',
              cep: ''
            }
          }
        },
        selectPessoa: {
          items: [],
          search: null,
          loading: false
        },
        selectEndereco: {
          items: [],
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
        alerter: {
          tipo: '',
          estado: false,
          mensagem: ''
        },
        dialog: {
          pessoa: false,
          endereco: false,
          usuario: false,
          cargo: false,
          grupo: false,
          fazenda: false,
          mensagem: {
            pessoa: null,
            endereco: null,
            usuario: null,
            cargo: null,
            grupo: null,
            fazenda: null
          }
        },
        show1: false,
        nomeTitulo: 'Cadastrar Funcionário',
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        }
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
    mounted() {
      this.getPessoas()
      this.getEnderecos()
      this.getFazendas()
      this.getCargos()
      this.getUsuarios()
      this.funcionario.id = this.$route.params.id
      if (this.funcionario.id) {
        this.nomeTitulo = 'Editar Funcionário'
        this.getFuncionario()
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
        let response = await UsuariosService._getAll({pagina: 1})
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
      },
      async getFuncionario() {

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
          let response = await PessoasService._create(this.funcionario.pessoa).catch(exception => {
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
        else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
        }
      },
      async cadastrarEndereco() {
        if(this.validarFormEndereco()){
          let response = await EnderecosService._create(this.funcionario.pessoa.endereco).catch(exception => {
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
        else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
        }
      },
      async cadastrarUsuario(){
        if (this.validarFormUsuario()){
          if(this.validarSenha()){
            let response = await UsuariosService._create(this.funcionario.usuario).catch(exception => {
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
        }
        else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
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
        else {
          this.alerta('warning', true, 'Preencha todos os campos corretamente!')
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
          this.funcionario.pessoa.nome !== '' && this.funcionario.pessoa.nome !== null &&
          this.funcionario.pessoa.rg !== '' && this.funcionario.pessoa.rg !== null &&
          this.funcionario.pessoa.cpf !== '' && this.funcionario.pessoa.cpf !== null &&
          this.funcionario.pessoa.sexo !== '' && this.funcionario.pessoa.sexo !== null &&
          this.funcionario.pessoa.telefone !== '' && this.funcionario.pessoa.telefone !== null &&
          this.funcionario.pessoa.data_nascimento !== '' && this.funcionario.pessoa.data_nascimento !== null
        ) {
          return true
        } else {
          return false
        }
      },
      validarFormEndereco() {
        if (this.funcionario.pessoa.endereco.logradouro !== '' && this.funcionario.pessoa.endereco.logradouro !== null &&
          this.funcionario.pessoa.endereco.numero !== '' && this.funcionario.pessoa.endereco.numero !== null &&
          this.funcionario.pessoa.endereco.bairro !== '' && this.funcionario.pessoa.endereco.bairro !== null &&
          this.funcionario.pessoa.endereco.cidade !== '' && this.funcionario.pessoa.endereco.cidade !== null &&
          this.funcionario.pessoa.endereco.estado !== '' && this.funcionario.pessoa.endereco.estado !== null &&
          this.funcionario.pessoa.endereco.pais !== '' && this.funcionario.pessoa.endereco.pais !== null &&
          this.funcionario.pessoa.endereco.cep !== '' && this.funcionario.pessoa.endereco.cep !== null) {
          return true
        } else {
          return false
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
        if (this.funcionario.usuario.login !== '' && this.funcionario.usuario.login !== null &&
          this.funcionario.usuario.senha !== '' && this.funcionario.usuario.senha !== null &&
          this.funcionario.usuario.reSenha !== '' && this.funcionario.usuario.reSenha !== null) {
          return true
        } else {
          return false
        }
      },
      validarSenha() {
        if (this.funcionario.usuario.senha === this.funcionario.usuario.reSenha) {
          return true
        } else {
          return false
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
        if(this.funcionario.pessoa.id !== '' && this.funcionario.pessoa.id!== null &&
          this.funcionario.fazenda.id !== '' && this.funcionario.fazenda.id !== null &&
          this.funcionario.cargo.id !== '' && this.funcionario.cargo.id !== null &&
          this.funcionario.usuario.id !== '' && this.funcionario.usuario.id !== null &&
          this.funcionario.salario !== '' && this.funcionario.salario !== null){
            return true
          } else {
            return false
          }
      },
      clearFormPessoa(){
        this.funcionario.pessoa.nome = ''
        this.funcionario.pessoa.rg = ''
        this.funcionario.pessoa.cpf = ''
        this.funcionario.pessoa.sexo = ''
        this.funcionario.pessoa.telefone = ''
        this.funcionario.pessoa.data_nascimento = ''
      },
      clearFormEndereco(){
        this.funcionario.endereco.logradouro = ''
        this.funcionario.endereco.bairro = ''
        this.funcionario.endereco.numero = ''
        this.funcionario.endereco.cidade = ''
        this.funcionario.endereco.estado = ''
        this.funcionario.endereco.pais = ''
        this.funcionario.endereco.cep = ''
      },
      clearFormCargo() {
        this.funcionario.cargo.nome = ''
        this.funcionario.cargo.descricao = ''
      },
      clearFormFazenda(){
        this.funcionario.fazenda.nome = ''
      },
      clearFormUsuario(){
        this.funcionario.usuario.login = ''
        this.funcionario.usuario.senha = ''
        this.funcionario.usuario.reSenha = ''
      },
      clearFormGrupo() {
        this.funcionario.grupo.nome = ''
        this.funcionario.grupo.descricao = ''
      },

      clearformFuncionario(){
        this.selectPessoa.items = []
        this.selectCargo.items = []
        this.selectEndereco.items = []
        this.selectFazenda.items = []
        this.selectUsuario.items = []
        this.selectGrupo.items = []
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
