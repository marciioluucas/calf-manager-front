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
                v-model="grupo.permissao_id"
                :items="selectPermissao.items"
                :search-input.sync="selectPermissao.search"
                hide-no-data
                hide-selected
                item-text="nome_modulo"
                item-value="id"
                label="Permissões"
                placeholder="Pesquisar por permissão"
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
                              v-model="permissao.nome_modulo"
                              label="Nome"
                              required
                            >
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12 sm4 md4>
                            <v-switch
                              v-model="permissao.create"
                              label="Create"
                              color="primary"
                              value='1'
                              hide-details
                            ></v-switch>
                          </v-flex>

                          <v-flex xs12 sm4 md4>
                            <v-switch
                              v-model="permissao.read"
                              label="Read"
                              color="primary"
                              value='1'
                              hide-details
                            ></v-switch>
                          </v-flex>
                          <v-flex xs12 sm4 md4>
                            <v-switch
                              v-model="permissao.update"
                              label="Update"
                              color="primary"
                              value='1'
                              hide-details
                            ></v-switch>
                          </v-flex>
                          <v-flex xs12 sm4 md4>
                            <v-switch
                              v-model="permissao.delete"
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
          permissao_id: null
        },
        permissao: {
          id: null,
          nome_modulo: '',
          create: 0,
          read: 0,
          update: 0,
          delete: 0
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
        let response = await GrupoService._getById(this.grupo)
        this.grupo = response.data.grupos
      },
      async getPermissoes(val) {
        let busca = {
          nome: val
        }
        this.selectPermissao.loading = true
        let response = await PermissaoService._getByNome(busca)
        this.selectPermissao.items = response.data.permissoes.data
        this.selectPermissao.loading = false
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
        }
      },
      alerta(color, estado, mensagem) {
        this.snackbar.color = color
        this.snackbar.estado = estado
        this.snackbar.mensagem = mensagem
      },
      validarFormGrupo() {
        if (this.grupo.nome && this.grupo.descricao && this.grupo.permissao_id) {
          return true
        } else {
          if(!this.grupo.nome){
            this.alerta('warning', true, 'Preencha o nome do grupo!')
            return false
          }
          else if(!this.grupo.descricao){
            this.alerta('warning', true, 'Preencha a descrição do grupo!')
            return false
          }
          else if(!this.grupo.descricao){
            this.alerta('warning', true, 'Selecione a permissão do grupo!')
            return false
          }
        }
      },
      validarFormPermissao() {
        if (this.permissao.nome_modulo !== '' && this.permissao.nome_modulo !== null &&
          this.permissao.create !== '' && this.permissao.create !== null &&
          this.permissao.read !== '' && this.permissao.read !== null &&
          this.permissao.update !== '' && this.permissao.update !== null &&
          this.permissao.delete !== '' && this.permissao.delete !== null) {
          return true
        } else {
          if(!this.permissao.nome_modulo){
            this.alerta('warning', true, 'Preencha do nome do módulo')
            return false
          }
        }
      },
      clearFormGrupo() {
        this.grupo.nome = ''
        this.grupo.descricao = ''
        this.grupo.permissao_id = null
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
