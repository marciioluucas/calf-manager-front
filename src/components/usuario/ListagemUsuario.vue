<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <!--Cabeçalho do componente-->
          <v-card-title primary-title>
            <div>
              <h2 class="title mb-0">Pesquisa</h2>
              <span
                class="caption"
              >Faça uma pesquisa utilizando os filtros abaixo para um melhor resultado.</span>
            </div>
          </v-card-title>


        <!--Sessão de formulário de pesquisa-->
        <v-card-text>
          <v-form>
            <v-layout row wrap>

              <v-flex xs12 md2 lg2>
                <v-text-field
                  label="Buscar pelo login"
                  v-model="buscaUsuario.login"
                />
              </v-flex>
              <v-flex xs12 md4 lg4>
                <v-autocomplete
												label="Pesquise o Grupo"
												:loading="selectGrupo.loading"
												:items="selectGrupo.items"
												hide-no-data
												hide-selected
												item-text="nome"
												required
												cache-items
												item-value="id"
												:search-input.sync="selectGrupo.search"
												v-model="buscaUsuario.grupo_id"
											/>
              </v-flex>

              <v-flex xs12 md4 lg4>
                <v-autocomplete
												label="Pesquise o funcionário"
												:loading="selectFuncionario.loading"
												:items="selectFuncionario.items"
												hide-no-data
												hide-selected
												item-text="pessoa.nome"
												required
												cache-items
												item-value="id"
												:search-input.sync="selectFuncionario.search"
												v-model="buscaUsuario.funcionario_id"
											/>
              </v-flex>
              
            </v-layout>
            <v-btn color="success" v-on:click="getUsuarios">Buscar!</v-btn>
            <v-btn color="secondary" v-on:click="clear">Redefinir busca</v-btn>
          </v-form>
        </v-card-text>


          <!--Tabela de apresentação de dados-->
          <v-flex xs12>
            <v-card>
              <v-card-text>
                <v-data-table :headers="headers" :items="items.data" hide-actions>
                  <template slot="items" slot-scope="props">
                    <tr>
                      <td class="text-xs-center">{{ props.item.id }}</td>
                      <td class="text-xs-center">{{ props.item.login }}</td>
                      <td class="text-xs-center">{{ props.item.grupo.nome }}</td>

                      <td class="justify-center layout px-0">
                        <!--Icone de editar-->
                        <v-icon small class="mr-2" @click="editar(props.item.id)">edit</v-icon>

                        <!--Icone de deletar-->
                        <v-icon small @click="deletar(props.item)">delete</v-icon>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card-text>
              <v-card-actions v-if="items.length !== 0" class="text-xs-center">
                <v-layout>
                  <v-flex xs12>
                    <v-pagination
                      :length="items.last_page"
                      v-model="buscaUsuario.params.pagina"
                      @input="getUsuarios"
                    />
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import PessoasService from "../../services/PessoasService";
import UsuariosService from "../../services/UsuariosService";
import FuncionariosService from '../../services/FuncionariosService';
import GruposService from '../../services/GruposService';

export default {
  data() {
    return {
      items: [],
      buscaUsuario: {
        id: null,
        login: null,
        grupo_id: null,
        funcionario_id: null,
        params: {
            pagina: 1
        }
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "Login", value: "login" },
        { text: "Grupo", value: "grupo" },
        { text: "Ações", value: "acoes" }
      ],
      selectGrupo: {
        items: [],
        loading: false,
        search: null
      },
      selectFuncionario:{
        items: [],
        loading: false,
        search: null
      },
      pessoa: {},
      snackbar: {
        color: "success",
        estado: false,
        mensagem: ""
      }
    };
  },
  watch: {
    'selectGrupo.search'(val){
      val && this.getGruposByNome(val)
    },
    'selectFuncionario.search'(val){
      val && this.getFuncionariosByNome(val)
    }
  },
  mounted() {
    this.getUsuarios();
  },
  methods: {

    // Listar todos
    async getUsuarios() {
      let response = null;
        if(this.buscaUsuario.login){
           try{
             response = await UsuariosService._getByLogin(this.buscaUsuario.login)
            
            if(response.status !== 400 || response.status !== 500){
              this.items = response.data.usuarios
            } 
          }
          catch(e){
            this.alerta("error", true, "Erro ao listar usuários por login!");
            return false;
          } 
        }
        else if(this.buscaUsuario.grupo_id){
          try{
            response = await UsuariosService._getByIdGrupo(this.buscaUsuario)
            if(response.status !== 400 || response.status !== 500){
              this.items = response.data.usuarios
            }
          }
          catch(e){
              this.alerta("error", true, "Erro ao listar usuários por grupo!");
              return false;
          }
        }
        else if(this.buscaUsuario.funcionario_id){
          try{
            response = await UsuariosService._getByIdFuncionario(this.buscaUsuario)
            if(response.status !== 400 || response.status !== 500){
              this.items = response.data.usuarios

            }
          }
          catch(e){
              this.alerta("error", true, "Erro ao listar usuários por funcionário!");
              return false;
          }
        }
        else {
          try {
              response = await UsuariosService._getAll(this.buscaUsuario);
              if (response.status !== 400 || response.status !== 500) {
                this.items = response.data.usuarios;
              }
            } catch (e) {
              this.alerta("error", true, "Erro ao listar todos usuários!");
              return false;
          }
        }
    },

    async getGruposByNome(busca){
      try{
        let response = await GruposService._getByNome(busca)
        if(response.status !== 400 || response.status !== 500){
          this.selectGrupo.items = response.data.grupos.data
        }
      }
      catch(e){
        this.alerta("error", true, "Erro ao listar grupos por nome!");
              return false;
      }
    },

    async getFuncionariosByNome(busca){
      try{
        let response = await FuncionariosService._getByNome(busca)
        if(response.status !== 400 || response.status !== 500){
          this.selectFuncionario.items = response.data.funcionarios.data
        }
      }
      catch(e){
        this.alerta("error", true, "Erro ao listar funcionários por nome!");
              return false;
      }
    },

    // Redirecionar para a pagina de cadastro de usuário
    async editar(id){
        this.$router.push({
          name: 'CadastroUsuario',
          params: {id: id}
        })
    },

    // Deletar usuário
    async deletar(item){
        try{
            let response = await UsuariosService._delete(item.id)
            if(response.status !== 400 || response.status !== 500){
                this.alerta("success", true, "Usuário excluído com sucesso!");
                let index = this.items.data.indexOf(item)
                this.items.data.splice(index, 1)
            }
        }catch(e){
            this.alerta("error", true, "Erro ao listar usuários!");
            return false;
        }
    },

    // Alerta
    alerta(color, estado, mensagem) {
      this.snackbar.color = color;
      this.snackbar.estado = estado;
      this.snackbar.mensagem = mensagem;
    },

    // Limpar campos
    clear(){
      this.buscaUsuario.login = null
      this.buscaUsuario.grupo_id = null
      this.buscaUsuario.funcionario_id = null
    }
  }
};
</script>
