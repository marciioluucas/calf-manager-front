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
              <v-combobox
                v-model="grupo.permissao"
                :items="selectPermissao.items"
                item-text="nome_modulo"
                item-value="id"
                label="Permissão"
                placeholder=""
              ></v-combobox>
            </v-flex>

            <!--Cadastrar Permissao-->
            <v-flex xs12 sm2 md2 lg2>
              <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="500px">
                  <v-btn fab slot="activator" color="indigo" dark><v-icon dark>add</v-icon></v-btn>
                  <v-card>
                    <v-card-title>
                      <v-flex xs12>
                        <v-alert
                          v-if="alerterPermissao.estado"
                          :value="true"
                          :type="alerterPermissao.tipo"
                        >
                          {{alerterPermissao.mensagem}}
                        </v-alert>
                        <span class='title'>Cadastrar Permissão</span>
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
                      <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                      <v-btn color="blue darken-1" flat @click="cadastrarPermissao">Salvar</v-btn>
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

            <v-btn @click="clear">Limpar formulário</v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
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
          items: []
        },
        alerter: {
          tipo: '',
          estado: false,
          mensagem: ''
        },
        alerterPermissao: {
          tipo: '',
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
    methods: {
      async getGrupo() {
        let response = await GrupoService._getById(this.grupo.id)
        this.grupo = response.data.grupos[0]
      },
      async getPermissoes() {
        let response = await PermissaoService._getAll(this.grupo.permissao)
        this.selectPermissao.items = response.data.permissoes.data
      },
      async cadastrarPermissao() {
        if (this.validarFormPermissao()) {
          let response = await PermissaoService._create(this.grupo.permissao)
          if (response.status === 200) {
            this.alertaPermissao('success', true, response.data.message.description)
          }
          if (response.status === 400) {
            this.alertaPermissao('error', true, 'Erro ao Cadastrar Grupo: Dados inválidos!')
          }
          if (response.status === 500) {
            this.alertaPermissao('error', true, 'Erro ao Cadastrar Grupo: Erro interno, Solicite suporte!')
          }
          this.dialog = false
          this.getPermissoes()
        } else {
          this.alertaPermissao('warning', true, 'Preencha os campos corretamente!')
        }
      },
      async cadastrar() {
        if (this.validarForm()) {
          let response = await GrupoService._create(this.grupo)
          if (response.status === 200) {
            this.alerta('success', true, response.data.message.description)
          }
          if (response.status === 400) {
            this.alerta('error', true, 'Erro ao Cadastrar Grupo: Dados inválidos!')
          }
          if (response.status === 500) {
            this.alerta('error', true, 'Erro ao Cadastrar Grupo: Erro interno, Solicite suporte!')
          }
          this.clear()
          this.getPermissoes()
        } else {
          this.alerta('warning', true, 'Preencha os campos corretamente!')
        }
      },
      async editar() {
        if (this.validarForm()) {
          let response = await GrupoService._update(this.grupo)
          if (response.status === 200) {
            this.alerta('success', true, response.data.message.description)
          }
          if (response.status === 400) {
            this.alerta('error', true, 'Erro ao Cadastrar Grupo: Dados inválidos!')
          }
          if (response.status === 500) {
            this.alerta('error', true, 'Erro ao Cadastrar Grupo: Erro interno, Solicite suporte!')
          }
          this.clear()
          this.getPermissoes()
        } else {
          this.alerta('warning', true, 'Preencha os campos corretamente!')
        }
      },
      alerta(tipo, estado, mensagem) {
        this.alerter.tipo = tipo
        this.alerter.estado = estado
        this.alerter.mensagem = mensagem
      },
      alertaPermissao(tipo, estado, mensagem) {
        this.alerterPermissao.tipo = tipo
        this.alerterPermissao.estado = estado
        this.alerterPermissao.mensagem = mensagem
      },
      validarForm() {
        if (this.grupo.nome !== '' && this.grupo.nome !== null &&
            this.grupo.descricao !== '' && this.grupo.descricao !== null &&
            this.grupo.permissao.id !== '' && this.grupo.permissao.id !== null) {
          return true
        } else {
          return false
        }
      },
      validarFormPermissao() {
        if (this.grupo.permissao.create !== '' && this.grupo.permissao.create !== null &&
          this.grupo.permissao.read !== '' && this.grupo.permissao.read !== null &&
          this.grupo.permissao.update !== '' && this.grupo.permissao.update !== null &&
          this.grupo.permissao.delete !== '' && this.grupo.permissao.delete !== null) {
          return true
        } else {
          return false
        }
      },
      clear() {
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
