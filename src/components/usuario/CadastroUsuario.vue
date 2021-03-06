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
                        <v-flex xs12 sm6 v-if="!this.usuario.id">
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
								v-model="usuario.funcionario_id"
								/>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-autocomplete
								label="Pesquise o grupo"
								:loading="selectGrupo.loading"
								:items="selectGrupo.items"
								hide-no-data
								hide-selected
								item-text="nome"
								required
								cache-items
								item-value="id"
								:search-input.sync="selectGrupo.search"
								v-model="usuario.grupo_id"
								/>
                        </v-flex>

                        <v-flex xs12 sm4>
                         <v-text-field
                                v-model="usuario.login"
                                label="Login"
                                required
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4>
                        <v-text-field
                                v-model="usuario.senha"
                                label="Senha"
                                type="password"
                                required
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4>
                        <v-text-field
                                v-model="usuario.reSenha"
                                label="Confirma Senha"
                                type="password"
                                required
                        ></v-text-field>
                        </v-flex>

                    </v-layout>
                    <v-btn v-if="!usuario.id" @click="cadastrar">Enviar</v-btn>
                        <v-btn v-if="usuario.id" @click="editar">Editar</v-btn>
                        <v-btn @click="clearForm">Limpar formulário</v-btn>
                </v-form>
            </v-card-text>
            
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
    import UsuariosService from '../../services/UsuariosService'
    import FuncionariosService from '../../services/FuncionariosService'
    import GruposService from '../../services/GruposService'
    import jwtDecode from 'jwt-decode'

    export default {
        data(){
            return{
                usuario: {
                    id: null,
                    login: null,
                    senha: null,
                    reSenha: null,
                    grupo_id: null,
                    funcionario_id: null,
                    usuario_cadastro: null
                },
                selectFuncionario: {
                    loading: false,
                    search: null,
                    items: []
                },
                selectGrupo: {
                    loading: false,
                    search: null,
                    items: []
                },
                snackbar: {
                    color: 'success',
                    estado: false,
                    mensagem: ''
                },
                nomeTitulo: 'Cadastrar Usuário'
            }
        },   
        mounted(){
            this.getIdUsuarioLogado()
            if(this.$route.params.id){
                this.usuario.id = this.$route.params.id
                this.nomeTitulo = 'Editar Usuário'
                this.getUsuarioId(this.usuario.id)
            }
        },
        watch: {
            'selectFuncionario.search' (val){
                val && this.getFuncionario(val)
            },
            'selectGrupo.search' (val){
                val && this.getGrupo(val)
            }
        }, 
        methods: {
            // Pesquisar funcionario por nome
            async getFuncionario(val){
                try{
                    if(val !== null){
                        let response = await FuncionariosService._getByNome(val)
                        if(response.status !== 400 || response.status !== 500){
                            this.selectFuncionario.items = response.data.funcionarios.data
                        }
                        
                    }
                }catch(e){
                    this.notify('error', 'Erro ao pesquisar funcionários!')
                    return false
                }
            },


            async getGrupo(val){
                try{
                    if(val !== null){
                        let response = await GruposService._getByNome(val)
                        if(response.status !== 400 && response.status!== 500){
                            this.selectGrupo.items = response.data.grupos.data
                        }
                    }
                }
                catch(e){
                    this.notify('error', 'Erro ao pesquisar grupos!')
                    return false
                }
            },
            async getGrupoId(id){
                try{
                    let response = await GruposService._getById({id: id})
                    if(response.status !== 400 && response.status!== 500){
                        this.selectGrupo.items.push(response.data.grupos)
                    }
                }catch(e){
                    this.notify('error', 'Erro ao pesquisar grupo por id!')                    
                }
            },

            // Pesquisar usuario por ID
            async getUsuarioId(id){
                try{
                    if(id !== null){
                        let response = await UsuariosService._getById({id: id})
                        if(response.status == 200 || response.status == 201){
                            this.usuario = response.data.usuarios
                            this.usuario.senha = ""
                            this.usuario.reSenha = ""
                            this.getGrupoId(this.usuario.grupo_id)                        
                        }
                    }
                }catch(e){
                    this.notify('error', 'Erro ao pesquisar usuário por id!')
                    return false
                }
            },

            // Cadastrar Usuario
            async cadastrar(){
                try{
                    if(this.validarForm()){
                        let response = await UsuariosService._create(this.usuario)
                        if(response.status ==200 || response.status == 201){
                             this.notify('success', 'Usuário cadastrado com sucesso!')
                            this.clearForm()
                        }
                    }
                }
                catch(e){
                    console.log(e)
                    this.notify('error', 'Erro ao cadastrar usuário!')
                    return false
                }
            },

            // Editar Usuario
            async editar(){
                try{
                    if(this.validarForm()){
                        let response = await UsuariosService._update(this.usuario)
                        if(response.status ==200 || response.status == 201){
                            this.notify('success', 'Usuário alterado com sucesso!')
                            this.clearForm()
                        }
                    }
                }
                catch(e){
                    this.notify('error', 'Erro ao alterar usuário!')
                    return false
                }
            },

            getIdUsuarioLogado(){
                this.usuario.usuario_cadastro = localStorage.getItem("user_id")
            },

            // validar formulário
            validarForm(){
                if(this.usuario.funcionario_id == null){
                    this.notify('warning', 'Selecione o funcionário!')
                    return false                    
                }
                if(this.usuario.login === null ){
                    this.notify('warning', 'Preencha o login corretamente!')
                    return false
                }
                if( this.usuario.senha === null){
                    this.notify('warning', 'Preencha a senha corretamente!')
                    return false
                }
                if(this.usuario.grupo_id === null){
                    this.notify('warning', 'Selecione o grupo!')
                    return false
                }
                if( this.usuario.reSenha === null){
                    this.notify('warning', 'Confirme a senha!')
                    return false
                }
                if(this.usuario.senha !== this.usuario.reSenha){
                    this.notify('warning', 'Senhas divergentes!')
                    this.clearSenhas()
                    return false
                }
                if(this.usuario.senha.length < 8){
                    this.notify('warning', 'A senha deve conter o tamanho mínimo de 8 caracteres!')                    
                    return false
                }
                return true
            },

            // Limpar formulário
            clearForm(){
                this.usuario.id = "",
                this.usuario.login = "",
                this.usuario.funcionario_id = "",
                this.usuario.grupo_id = "",
                this.nomeTitulo= 'Cadastrar Usuário'
                this.clearSenhas()
            },

            clearSenhas(){
                this.usuario.senha = "",
                this.usuario.reSenha = ""
            },

            notify(color, mensagem) {
                this.snackbar.color = color
                this.snackbar.estado = true
                this.snackbar.mensagem = mensagem
            }

        }
    }
</script>
