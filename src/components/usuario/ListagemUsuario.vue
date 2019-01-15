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
export default {
  data() {
    return {
      items: [],
      buscaUsuario: {
        id: null,
        nome: null,
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
      pessoa: {},
      snackbar: {
        color: "success",
        estado: false,
        mensagem: ""
      }
    };
  },
  mounted() {
    this.getUsuarios();
  },
  methods: {
    async getUsuarios() {
      try {
        let response = await UsuariosService._getAll(this.buscaUsuario);
        console.log(response.data.usuarios)
        if (response.status === 400 || response.status === 500) {
          this.alerta("error", true, "Erro ao listar usuários!");
        }
        this.items = response.data.usuarios;
      } catch (e) {
        this.alerta("error", true, "Erro ao listar usuários!");
        return false;
      }
    },
    async editar(id){
        this.$router.push({
          name: 'CadastroUsuario',
          params: {id: id}
        })
    },
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
    }
  }
};
</script>
