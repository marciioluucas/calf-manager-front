<template>
  <v-container grid-list-md>
    <v-card>
      <!--Componente de alerta-->
      <v-alert
        v-if="alerter.estado"
        :value="true"
        :type="alerter.tipo"
      >
        {{alerter.mensagem}}
      </v-alert>

      <!--Cabeçalho da pagina-->
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
          <span class='caption'></span>
        </div>
      </v-card-title>

      <!--Formulário de cadastro-->
      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-flex xs12>
              <span class='title'>Informações Gerais</span>
            </v-flex>

            <!--Cadastrar Pessoa-->
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="pessoa.nome"
                label='Nome'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="pessoa.rg"
                label='RG'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="pessoa.cpf"
                label='CPF'
              ></v-text-field>
            </v-flex>
            <!-- TODO: Select sexo-->
            <v-flex xs12>
              <v-combobox
                v-model="pessoa.sexo"
                label="Sexo da pessoa"
              ></v-combobox>
            </v-flex>

            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="pessoa.telefone"
                label='Telefone'
              ></v-text-field>
            </v-flex>
            <!--TODO: input data nascimento-->

            <v-flex xs12>
              <br/>
              <v-divider></v-divider>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Endereço</span>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-autocomplete
                v-model="endereco"
                :items="selectCep.items"
                :search-input.sync="selectCep.search"
                hide-no-data
                hide-selected
                item-text="cep"
                item-value="id"
                label="CEP"
                placeholder=""
                return-object
              />
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="endereco.logradouro"
                label='Logradouro'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="endereco.numero"
                label='Número'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="endereco.bairro"
                label='Bairro'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="endereco.cidade"
                label='Cidade'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-flex xs12>
                <v-combobox
                  v-model="endereco.estado"
                  :items="endereco.listaEstado"
                  label="Estado"
                ></v-combobox>
              </v-flex>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="endereco.pais"
                label='País'
              ></v-text-field>
            </v-flex>

            <!--Cadastrar funcionario-->
            <v-flex xs12>
              <br/>
              <v-divider></v-divider>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Função</span>
            </v-flex>

            <!--Adicionar cargo-->
            <v-flex xs12 sm4 md4 lg4>
              <v-combobox
                v-model="cargo"
                :items="selectCargo.items"
                item-text="nome"
                item-value="id"
                label="Cargos"
                placeholder=""
              ></v-combobox>
            </v-flex>

            <!--Cadastrar cargo-->
            <v-flex xs12 sm2 md2 lg2>
            <v-layout row justify-center>
              <v-dialog v-model="dialog" persistent max-width="500px">
                <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                <v-card>
                  <v-card-title>
                    <v-flex xs12>
                      <span class='title'>Cadastrar Cargo</span>
                    </v-flex>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md6>
                          <v-text-field
                            v-model="cargo.nome"
                            label="Nome"
                            required
                          >
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field
                            v-model="cargo.descricao"
                            label="descrição"
                          >
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*Preencha todos os campos corretamente</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" flat @click="cadastrarCargo">Salvar</v-btn>
                    <v-btn color="blue darken-1" flat @click="clearFormCargo">Limpar Formulário</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
            </v-flex>

            <!--Adicionar Fazenda-->
            <v-flex xs12 sm4 md4 lg4>
              <v-combobox
                v-model="fazenda"
                :items="selectFazenda.items"
                item-text="nome"
                item-value="id"
                label="Fazendas"
                placeholder=""
              ></v-combobox>
            </v-flex>

            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="funcionario.salario"
                label='Salário'
              ></v-text-field>
            </v-flex>

            <!--Cadastrar Usuario-->
            <v-flex xs12>
              <br/>
              <v-divider></v-divider>
              <br/>
            </v-flex>
            <v-flex xs12>
              <span class='title'>Autenticação</span>
            </v-flex>

            <v-flex xs12 sm4 md4 lg4>
              <v-text-field
                v-model="usuario.login"
                label='Login'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-text-field
                v-model="usuario.senha"
               :append-icon="show1 ? 'visibility_off' : 'visibility'"
               :type="show1 ? 'text' : 'password'"
                name="senha"
                label="Senha"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4 lg4>
              <v-text-field
                v-model="usuario.reSenha"
                :append-icon="show1 ? 'visibility_off' : 'visibility'"
                :type="show1 ? 'text' : 'password'"
                name="reSenha"
                label="Repetir Senha"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>

            <!--Adicionar grupo-->
            <v-flex xs12 sm4 md4 lg4>
              <v-combobox
                v-model="grupo"
                :items="selectGrupo.items"
                item-text="nome"
                item-value="id"
                label="Grupos"
                placeholder=""
              ></v-combobox>
            </v-flex>

            <v-flex xs12 sm2 md2 lg2>
              <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="500px">
                  <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                  <v-card>
                    <v-card-title>
                      <v-flex xs12>
                        <span class='title'>Cadastrar Grupo</span>
                      </v-flex>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md6>
                            <v-text-field
                              v-model="grupo.nome"
                              label="Nome"
                              required
                            >
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-text-field
                              v-model="grupo.descricao"
                              label="descrição"
                            >
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <small>*Preencha todos os campos corretamente</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                      <v-btn color="blue darken-1" flat @click="cadastrarGrupo">Salvar</v-btn>
                      <v-btn color="blue darken-1" flat @click="clearFormGrupo">Limpar Formulário</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-flex>

          </v-layout>
          <v-flex>
            <v-btn v-if="!funcionario.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="funcionario.id" @click="editar">Editar</v-btn>

            <!--<v-btn @click="clear">Limpar formulário</v-btn>-->
          </v-flex>
        </v-form>

      </v-card-text>

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
          cargo_id: null,
          usuario_id: null,
          fazenda_id: null,
          pessoa_id: null,
          salario: null
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
          reSenha: ''
        },
        grupo: {
          id: null,
          nome: '',
          descricao: ''
        },
        pessoa: {
          nome: '',
          rg: '',
          cpf: '',
          sexo: '',
          telefone: '',
          data_nascimento: ''
        },
        selectCep: {
          items: []
        },
        endereco: {
          logradouro: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
          listaEstado: [],
          pais: '',
          cep: ''
        },
        selectFazenda: {
          item: []
        },
        selectCargo: {
          items: []
        },
        selectGrupo: {
          items: []
        },
        alerter: {
          tipo: '',
          estado: false,
          mensagem: ''
        },
        dialog: false,
        show1: false,
        nomeTitulo: 'Cadastrar Funcionário'
      }
    },
    watch: {
      'endereco.cep' () {
        this.getCep()
      }
    },
    mounted() {
      this.getCargos()
      this.getFazendas()
      this.getGrupos()
      this.funcionario.id = this.$route.params.id
      if (this.funcionario.id) {
        this.nomeTitulo = 'Editar Funcionário'
        this.getFuncionario()
      }
    },
    methods: {
      async getCargos() {
        let response = await CargosService._getAll(this.cargo)
        this.selectCargo.items = response.data.cargos.data
      },
      async getFazendas() {
        let response = await FazendasService._getAll(this.cargo)
        this.selectFazenda.items = response.data.fazendas.data
      },
      async getUsuario() {
        let response = await UsuariosService._getById(this.usuario.id)
        this.usuario = response.data.usuarios
      },
      async getGrupos() {
        let response = await GruposService._getAll(this.grupo)
        this.selectGrupo.items = response.data.grupos.data
        // console.log('-----Cargo: Estou aqui ----- ')
        // console.log(response.data.grupos.data)
      },
      async getPessoa() {
        let response = await PessoasService._getById(this.pessoa.id)
        this.pessoa = response.data.pessoas[0]
      },
      async getEndereco() {
        let response = await EnderecosService._getById(this.endereco.id)
        this.endereco = response.data.enderecos[0]
      },
      async getFuncionario() {

      },
      async getCep() {
        let response = await EnderecosService._getCep(this.endereco.cep)
        console.log(response)
      },
      async cadastrarCargo() {
        if (this.validarFormCargo()) {
          let response = await CargosService._create(this.cargo)
          console.log(response.data)
          this.dialog = false
        } else {
          this.dialog = true
        }
      },
      async cadastrarGrupo() {
        this.dialog = false
      },
      async cadastrarPessoa() {
        if (this.validarFormPessoa()) {
          await PessoasService._create(this.pessoa)
        } else {
          this.alerta('warning', true, 'Preencha os campos corretamente')
        }
      },
      async cadastrar() {

      },
      async editar() {

      },
      validarFormPessoa() {
        if (
          this.pessoa.nome !== '' && this.pessoa.nome !== null &&
          this.pessoa.rg !== '' && this.pessoa.rg !== null &&
          this.pessoa.cpf !== '' && this.pessoa.cpf !== null &&
          this.pessoa.sexo !== '' && this.pessoa.sexo !== null &&
          this.pessoa.telefone !== '' && this.pessoa.telefone !== null &&
          this.pessoa.data_nascimento !== '' && this.pessoa.data_nascimento !== null
        ) {
          return true
        } else {
          return false
        }
      },
      validarFormEndereco() {
        if (this.endereco.logradouro !== '' && this.endereco.logradouro !== null &&
          this.endereco.numero !== '' && this.endereco.numero !== null &&
          this.endereco.bairro !== '' && this.endereco.bairro !== null &&
          this.endereco.cidade !== '' && this.endereco.cidade !== null &&
          this.endereco.estado !== '' && this.endereco.estado !== null &&
          this.endereco.pais !== '' && this.endereco.pais !== null &&
          this.endereco.cep !== '' && this.endereco.cep !== null) {
          return true
        } else {
          return false
        }
      },
      validarFormCargo() {
        if (this.cargo.nome !== '' && this.cargo.nome !== null &&
          this.cargo.descricao !== '' && this.cargo.descricao !== null) {
          return true
        } else {
          return false
        }
      },
      validarFormGrupo() {
        if (this.grupo.nome !== '' && this.grupo.nome !== null &&
          this.grupo.descricao !== '' && this.grupo.descricao !== null) {
          return true
        } else {
          return false
        }
      },
      validarFormUsuario() {
        if (this.usuario.login !== '' && this.usuario.login !== null &&
          this.usuario.senha !== '' && this.usuario.senha !== null &&
          this.usuario.reSenha !== '' && this.usuario.reSenha !== null) {
          return true
        } else {
          return false
        }
      },
      validarSenha() {
        if (this.usuario.senha === this.usuario.reSenha) {
          return true
        } else {
          return false
        }
      },
      clearFormCargo() {
        this.cargo.nome = ''
        this.cargo.descricao = ''
      },
      clearFormGrupo() {
        this.grupo.nome = ''
        this.grupo.descricao = ''
      }
    }
  }
</script>

<style scoped>

</style>
