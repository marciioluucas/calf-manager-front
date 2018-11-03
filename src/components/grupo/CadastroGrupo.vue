<template>
  <v-container grid-list-md>
    <v-card>

      <!--Cabeçalho da pagina-->
      <v-card-title primary-title>
        <div>
          <h2 class='title mb-0'>{{nomeTitulo}}</h2>
          <span class='caption'>Preencha o formulário para cadastrar novos grupos.</span>
        </div>
      </v-card-title>

      <!--Formulário de cadastro-->
      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-flex xs12>
              <span class='title'>Informações gerais</span>
            </v-flex>

            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="grupo.nome"
                label='Nome'
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="grupo.descricao"
                label='Descrição'
              ></v-text-field>
            </v-flex>

            <!--Adicionar Permissao-->
            <v-flex xs12 sm4 md4 lg4>
              <v-autocomplete
                v-model="grupo.permissao"
                :items="selectPermissao.items"
                :search-input.sync="selectPermissao.search"
                hide-no-data
                hide-selected
                item-text="nome_modulo"
                item-value="id"
                label="Permissões"
                placeholder="Pesquisar por permissão"
                return-object
              />
            </v-flex>

            <!--Cadastrar Permissao-->
            <v-flex xs12 sm2 md2 lg2>
              <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="500px">
                  <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                  <v-card>
                    <v-card-title>
                      <v-flex xs12>
                        <span class='title'>Cadastrar Permissão</span>
                      </v-flex>
                      <v-flex xs12>
                      <span class="caption">Preencha o formulário para cadastrar novas permissões</span>
                    </v-flex>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm12 md12>
                            <v-text-field
                              v-model="grupo.permissao.nome_modulo"
                              label="Nome"
                              required
                            >
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12 sm4 md4>
                            <v-switch
                              v-model="grupo.permissao.create"
                              label="Create"
                              color="primary"
                              value='1'
                              hide-details
                            ></v-switch>
                          </v-flex>

                          <v-flex xs12 sm4 md4>
                            <v-switch
                              v-model="grupo.permissao.read"
                              label="Read"
                              color="primary"
                              value='1'
                              hide-details
                            ></v-switch>
                          </v-flex>
                          <v-flex xs12 sm4 md4>
                            <v-switch
                              v-model="grupo.permissao.update"
                              label="Update"
                              color="primary"
                              value='1'
                              hide-details
                            ></v-switch>
                          </v-flex>
                          <v-flex xs12 sm4 md4>
                            <v-switch
                              v-model="grupo.permissao.delete"
                              label="Delete"
                              color="primary"
                              value='1'
                              hide-details
                            ></v-switch>
                          </v-flex>

                        </v-layout>
                      </v-container>
                      <small>*Preencha todos os campos corretamente</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="cadastrarPermissao">Salvar</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                      <v-btn color="blue darken-1" flat @click="clearFormPermissao">Limpar Formulário</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-flex>


          </v-layout>
          <v-flex>
            <v-btn v-if="!grupo.id" @click="cadastrar">Enviar</v-btn>
            <v-btn v-if="grupo.id" @click="editar">Editar</v-btn>

            <v-btn @click="clearFormGrupo">Limpar formulário</v-btn>
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
  import GrupoService from '../../services/GruposService'
  import PermissaoService from '../../services/PermissoesService'
  export default {
    name: 'cadastro-grupo',
    data() {
      return {
        grupo: {
          id: null,
          nome: '',
          descricao: '',
          permissao: {
            id: null,
            nome_modulo: '',
            create: 0,
            read: 0,
            update: 0,
            delete: 0
          }
        },
        selectPermissao: {
          loading: false,
          items: [],
          search: null
        },
        snackbar: {
          color: 'success',
          estado: false,
          mensagem: ''
        },
        dialog: false,
        nomeTitulo: 'Cadastrar Grupos'
      }
    },
    mounted() {
      this.getPermissoes()
      this.grupo.id = this.$route.params.id
      if (this.grupo.id) {
        this.nomeTitulo = 'Editar Grupo'
        this.getGrupo()
      }
    },
    watch: {
      'selectPermissao.search'(val){
        val && this.getPermissoes(val)
      }
    },
    methods: {
      async getGrupo() {
        let response = await GrupoService._getById(this.grupo.id)
        this.grupo = response.data.grupos[0]
      },
      async getPermissoes(val) {
        let busca = {
          nome: val
        }
        let response  = await PermissaoService._getAll(this.grupo.permissao)
        if(val){
          response = await PermissaoService._getByNome(busca)
        }
        this.selectPermissao.items = response.data.permissoes.data
      },
      async cadastrarPermissao() {
        if (this.validarFormPermissao()) {
          let response = await PermissaoService._create(this.grupo.permissao).catch(exception => {
            if (exception) {
              this.alerta('error', true, 'Erro ao Cadastrar Grupo!')
            }
          })
          if (response.status === 201) {
            this.alerta(response.data.message.type, true, response.data.message.description)
            this.dialog = false
            this.clearFormPermissao()
            this.getPermissoes()
          }
        } else {
          this.alerta('warning', true, 'Preencha os campos corretamente!')
        }
      },
      async cadastrar() {
        if (this.validarFormGrupo()) {
          let response = await GrupoService._create(this.grupo).catch(exception => {
            if (exception) {
              this.alerta('error', true, 'Erro ao Cadastrar Grupo!')
            }
          })
          if (response.status === 201) {
            this.alerta(response.data.message.type, true, response.data.message.description)
            this.clearFormGrupo()
            this.getPermissoes()
          }
        } else {
          this.alerta('warning', true, 'Preencha os campos corretamente!')
        }
      },
      async editar() {
        if (this.validarFormGrupo()) {
          let response = await GrupoService._update(this.grupo).catch(exception => {
            if (exception) {
              this.alerta('error', true, 'Erro ao Cadastrar Grupo!')
            }
          })
          if (response.status === 201) {
            this.alerta(response.data.message.type, true, response.data.message.description)
            this.clearFormGrupo()
          }
        } else {
          this.alerta('warning', true, 'Preencha os campos corretamente!')
        }
      },
      alerta(color, estado, mensagem) {
        this.snackbar.color = color
        this.snackbar.estado = estado
        this.snackbar.mensagem = mensagem
      },
      validarFormGrupo() {
        if (this.grupo.nome !== '' && this.grupo.nome !== null &&
            this.grupo.descricao !== '' && this.grupo.descricao !== null &&
            this.grupo.permissao.id !== '' && this.grupo.permissao.id !== null) {
          return true
        } else {
          return false
        }
      },
      validarFormPermissao() {
        if (this.grupo.permissao.nome_modulo !== '' && this.grupo.permissao.nome_modulo !== null &&
          this.grupo.permissao.create !== '' && this.grupo.permissao.create !== null &&
          this.grupo.permissao.read !== '' && this.grupo.permissao.read !== null &&
          this.grupo.permissao.update !== '' && this.grupo.permissao.update !== null &&
          this.grupo.permissao.delete !== '' && this.grupo.permissao.delete !== null) {
          return true
        } else {
          return false
        }
      },
      clearFormGrupo() {
        this.grupo.nome = ''
        this.grupo.descricao = ''
        this.selectPermissao = []
      },
      clearFormPermissao() {
        this.grupo.permissao.nomeModulo = '',
        this.grupo.permissao.create = 0,
        this.grupo.permissao.read = 0,
        this.grupo.permissao.update = 0,
        this.grupo.permissao.delete = 0
      }
    }
  }
</script>

<style scoped>

</style>
