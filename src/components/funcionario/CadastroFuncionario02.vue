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
                            <span class='title'>Pessoa</span>
                        </v-flex>

                        <v-flex xs12 sm4 md4 lg4>
                            <v-text-field
                                v-model="pessoa.nome"
                                label='Nome'
                                autofocus
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4>
                            <v-text-field
                                v-model="pessoa.rg"
                                label='RG'
                                mask='#######'
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4>
                            <v-text-field
                                v-model="pessoa.cpf"
                                label='CPF'
                                mask="###.###.###-##"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4>
                            <v-select
                                :items="selectSexo"
                                v-model="pessoa.sexo"
                                item-text="text"
                                item-value="value"
                                label="Sexo"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4>
                            <v-text-field
                                v-model="pessoa.numero_telefone"
                                label='Telefone'
                                mask="(##)#####-####"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4>
                           <v-menu ref="menu_data_nascimento"
                                    v-model="menu_data_nascimento"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field v-model="pessoa.data_nascimento"
                                                label="Data de Nascimento"
                                                persistent-hint
                                                prepend-icon="event"
                                                v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker v-model="data_nascimento" 
                                                no-title @input="menu_data_nascimento = false"
                                ></v-date-picker> 
                            </v-menu>
                        </v-flex>

                        <v-flex xs12>
                            <span class='title'>Endereco</span>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4>
                            <v-text-field
                                v-model="endereco.logradouro"
                                label='Logradouro'
                                autofocus
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4>
                            <v-text-field
                                v-model="endereco.numero"
                                label='Número ou complemento'
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4>
                            <v-text-field
                                v-model="endereco.bairro"
                                label='Bairro'
                                mask="Nnnnnnnnnnnnnnnnnnnnn"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3 lg3>
                            <v-text-field
                                v-model="endereco.cidade"
                                label='Cidade'
                                mask="Nnnnnnnnnnnnnnnnnnnnn"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3 lg3>
                            <v-autocomplete
                                :items="selectEstado.items"
                                v-model="endereco.estado"
                                item-text="text"
                                item-value="value"
                                label="Estado"
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm3 md3 lg3>
                            <v-text-field
                                v-model="endereco.pais"
                                label='País'
                                mask="Nnnnnnnnnnnnnnnnnnnnn"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3 lg3>
                            <v-text-field
                                v-model="endereco.cep"
                                label='CEP'
                                mask="#####-###"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                        <br/>
                        <v-divider></v-divider>
                        <br/>
                        </v-flex>
                        <v-flex xs12>
                        <span class='title'>Alocação e Função</span>
                        </v-flex>

                        <v-flex xs12 sm3 md3 lg3>
							<v-autocomplete
								label="Pesquise a fazenda"
								:loading="selectFazenda.loading"
								:items="selectFazenda.items"
								hide-no-data
								hide-selected
								item-text="nome"
								required
								cache-items
								item-value="id"
								:search-input.sync="selectFazenda.search"
								v-model="funcionario.fazenda_id"
								/>
						</v-flex>

                         <v-flex xs12 sm3 md3 lg3>
							<v-autocomplete
								label="Pesquise o cargo"
								:loading="selectCargo.loading"
								:items="selectCargo.items"
								hide-no-data
								hide-selected
								item-text="nome"
								required
								cache-items
								item-value="id"
								:search-input.sync="selectCargo.search"
								v-model="funcionario.cargo_id"
								/>
						</v-flex>

                        <v-flex xs12 sm4 md4 lg4>
                        <v-text-field
                        v-model="funcionario.salario"
                        mask="####"
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
    import jwtDecode from 'jwt-decode'

    export default {
        data(){
            return{
                nomeTitulo: 'Cadastrar Funcionário',
                menu_data_nascimento: null,
                data_nascimento: null,
                funcionario: {
                    id: null,
                    pessoa_id: null,
                    fazenda_id: null,
                    cargo_id: null,
                    salario: '',
                    usuario_cadastro: null
                },
                pessoa: {
                    id: null,
                    nome: '',
                    rg: '',
                    cpf: '',
                    sexo: 'm',
                    numero_telefone: '',
                    data_nascimento: '',
                    endereco_id: null,
                    usuario_cadastro: null
                },
                endereco: {
                    id: null,
                    logradouro: '',
                    numero: '',
                    bairro: '',
                    cidade: '',
                    estado: '',
                    pais: '',
                    cep: '',
                    usuario_cadastro: null
                },
                cargo: {
                    id: null,
                    nome: '',
                    descricao: '',
                    usuario_cadastro: null
                },
                fazenda: {
                    id: null,
                    nome: '',
                    usuario_cadastro: null
                },
                usuario: {
                    id: null,
                    login: '',
                    senha: '',
                    re_senha: '',
                    grupo_id: null,
                    usuario_cadastro: null
                },
                grupo: {
                    id: null,
                    nome: '',
                    descricao: ''
                },
                
                selectFazenda: {
                    items: [],
                    search: null,
                    loading: false

                },
                selectCargo: {
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
            'selectFazenda.search'(val) {
                val && this.getFazendas(val)
            },
            'selectCargo.search'(val) {
                val && this.getCargos(val)
            },
            data_nascimento (val) {
                this.pessoa.data_nascimento = this.formatDate(val)
            }
        },
        mounted(){
            this.funcionario.id = this.$route.params.id
            if(this.funcionario.id){
                this.nomeTitulo = 'Editar funcionário'
                this.getFuncionarioId(this.funcionario.id)
            }
        },
        methods: {

            // Cadastrar pessoa
            async cadastrarPessoa(id) {
                if (this.validarFormPessoa()) {
                    try{
                        this.pessoa.endereco_id = id
                        let response = await PessoasService._create(this.prepareCreateOrUpdate(this.pessoa))
                        this.funcionario.pessoa_id = response.data.message.id
                        if (response.status !== 400 || response.status !== 500){
                            this.alerta(response.data.message.type, true, response.data.message.description)
                            this.dialog.pessoa = false
                            this.cadastrarFuncionario(response.data.message.id)
                            return true
                        }
                        else{
                            return false
                        }
                    }catch (e) {
                        this.alerta('error',true, 'Erro ao cadastrar pessoa!')
                        return false
                    }
                }
            },

            prepareCreateOrUpdate(obj){
                 obj.data_nascimento = this.parseDate(obj.data_nascimento)
                 return obj
            },

            // cadastrar funcionario
            async cadastrarFuncionario(id) {
                try{
                    if(this.validarFormFuncionario()){
                        this.funcionario.pessoa_id = id;
                        let response = await FuncionariosService._create(this.funcionario)
                        if(response.status !== 400 || response.status !== 500){
                            this.alerta(response.data.message.type, true, response.data.message.description)
                            this.dialog.funcionario = false
                            this.clearformFuncionario()
                            this.clearFormPessoa()
                            this.clearFormEndereco()
                        }
                    }
                }
                catch (e){
                    this.alerta('error', true, 'Erro ao cadastrar funcionário!')
                    return false
                }
            },

            // Cadastrar todo formulário
            async cadastrar() {
                try{
                    if(this.validarFormPessoa()){

                        if(this.validarFormEndereco()){

                            if(this.validarFormFuncionario()){
                                let response = await EnderecosService._create(this.endereco)
                                if(response.status !== 400 || response.status !== 500){
                                    this.alerta(response.data.message.type, true, response.data.message.description)
                                    this.dialog.endereco = false
                                    this.cadastrarPessoa(response.data.message.id)
                                    return true
                                }
                                return false
                            }
                        }
                    }
                }
                catch (e){
                    this.alerta('error', true, 'Erro ao cadastrar endereço!')
                    return false
                }
            },

            // Editar Funcionario
            async editar() {
                try{
                    if(this.validarFormEndereco()){
                        this.editarEndereco()
                        if(this.validarFormPessoa()){
                            this.editarPessoa()
                            if(this.validarFormFuncionario()){
                                let response = await FuncionariosService._update(this.funcionario)
                                if(response.status === 400 || response.status === 500){
                                    this.alerta('error', true, 'Erro ao cadastrar funcionário!')
                                    return false
                                }
                                this.alerta(response.data.message.type, true, response.data.message.description)
                                this.dialog.funcionario = false
                                this.clearformFuncionario()
                            }
                            return false
                        }
                    }
                }
                catch (e){
                    this.alerta('error', true, 'Erro ao cadastrar funcionário!')
                    return false
                }
            },
            async editarPessoa(){
                if(this.validarFormPessoa()){
                    try{
                        let response = await PessoasService._update(this.prepareCreateOrUpdate(this.pessoa))
                        if(response.status == 200 || response.status == 201){
                            this.alerta(response.data.message.type, true, response.data.message.description)
                            this.clearformFuncionario()
                        }
                    }
                    catch(e){
                        this.alerta('error', true, 'Erro ao alterar funcionário!')
                        return false
                    }
                    
                }
            },
            async editarEndereco(){
                if(this.validarFormEndereco()){
                    try{
                        let response = await EnderecosService._update(this.endereco)
                        if(response.status == 200 || response.status == 201){
                            this.alerta(response.data.message.type, true, response.data.message.description)
                            this.clearformFuncionario()
                        }
                        
                    }
                    catch(e){
                        this.alerta('error', true, 'Erro ao alterar endereço!')
                        return false
                    }
                }
            },
            // Pesquisar funcionario pelo ID
            async getFuncionarioId(id) {
                try{
                    if(id !== null){
                        let response = await FuncionariosService._getById({id: id})
                        if(response.status === 400 || response.status === 500){
                           this.alerta('error', true, 'Erro ao listar dados de funcionário!')
                            return false
                        }
                        this.funcionario = response.data.funcionarios
                        this.pessoa = response.data.funcionarios.pessoa
                        this.selectFazenda.items.push(response.data.funcionarios.fazenda)
                        this.selectCargo.items.push(response.data.funcionarios.cargo)
                        if(this.pessoa.endereco_id !== null){
                            this.getEnderecoId(this.pessoa.endereco_id)
                        }
                        this.getFazendaId(this.funcionario.fazenda_id)
                        this.getCargoId(this.funcionario.cargo_id)
                    }
                }
                catch (e){
                    this.alerta('error', true, 'Erro ao pesquisar funcionário pelo id. Solicite suporte técnnico!')
                }
            },

            // Pesquisar Endereco por ID
            async getEnderecoId(id){
                try{
                    if(id !== null){
                        let response = await EnderecosService._getById({id: id})
                        if(response.status === 400 || response.status === 500){
                            this.alerta('error', true, 'Erro ao pesquisar endereço pelo id. Solicite suporte técnnico!')
                            return false
                            
                        }
                        this.endereco = response.data.enderecos
                    }
                }catch (e){
                    this.alerta('error', true, 'Erro ao pesquisar endereço pelo id. Solicite suporte técnnico!')
                    return false
                }

            },

            // Pesquisar Cargo por nome
            async getCargos(val) {
                try{
                    this.selectCargo.loading = true
                    if(val !== null){
                        let response = await CargosService._getByNome(val)
                        if(response.status !== 400 || response.status !== 500){
                            this.selectCargo.items = response.data.cargos.data
                            this.selectCargo.loading = false
                            return true
                        }
                        return false
                    }
                }
                catch (exception){
                    this.alerta('error', true, 'Erro ao pesquisar todos os Cargos!')
                    return false
                }
            },

            async getCargoId(id){
                try{
                    let response = await CargosService._getById({id: id})
                    this.selectCargo.items.push(response.data.cargos)
                }catch(e){
                    this.alerta('error', true, 'Erro ao pesquisar o cargo por id!')
                }
            },

            async getFazendaId(id){
                try{
                    let response = await FazendasService._getById({id: id})
                    this.selectFazenda.items.push(response.data.fazendas)
                }catch(e){
                    this.alerta('error', true, 'Erro ao pesquisar todos a fazenda por id!')
                }
            },

            // Pesquisar fazenda por nome
            async getFazendas(val) {
                try{
                    this.selectFazenda.loading = true
                    if (val !== null){
                        let response = await FazendasService._getByNome(val)
                        if(response.status !== 400 || response.status !== 500){
                            this.selectFazenda.items = response.data.fazendas.data
                        }
                        this.selectFazenda.loading = false
                    }
                }
                catch (exception){
                    this.alerta('error', true, 'Erro ao pesquisar todas fazendas!')
                }
            },
            validarFormPessoa() {
                if (this.pessoa.nome && 
                    this.pessoa.rg && 
                    this.pessoa.cpf && 
                    this.pessoa.sexo &&
                    this.pessoa.numero_telefone && 
                    this.pessoa.data_nascimento
                ) {
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
                }
            },

            validarFormEndereco() {
                if (this.endereco.logradouro && 
                    this.endereco.numero && 
                    this.endereco.bairro &&
                    this.endereco.cidade && 
                    this.endereco.estado && 
                    this.endereco.pais && 
                    this.endereco.cep) {
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
            validarFormFuncionario() {
                if(this.funcionario.fazenda_id && this.funcionario.cargo_id && this.funcionario.salario){
                    return true
                } else {
                        if(!this.funcionario.fazenda_id){
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
                this.pessoa.id = ""
                this.pessoa.nome = ""
                this.pessoa.rg = ""
                this.pessoa.cpf = ""
                this.pessoa.sexo = ""
                this.pessoa.telefone = ""
                this.pessoa.numero_telefone = ""
                this.pessoa.data_nascimento = ""
                this.pessoa.endereco_id = ""
            },
            clearFormEndereco(){
                this.endereco.id = ""
                this.endereco.logradouro = ""
                this.endereco.bairro = ""
                this.endereco.numero = ""
                this.endereco.cidade = ""
                this.endereco.estado = ""
                this.endereco.pais = ""
                this.endereco.cep = ""
            },

            clearFormUsuario(){
                this.usuario.id = ""
                this.usuario.login = ""
                this.usuario.senha = ""
                this.usuario.re_senha = ""
            },

            clearformFuncionario(){
                this.funcionario.id = ""
                this.funcionario.pessoa_id = ""
                this.funcionario.cargo_id = ""
                this.funcionario.fazenda_id = ""
                this.funcionario.usuario_id = ""
                this.funcionario.salario = ""
                this.nomeTitulo = "Cadastrar Funcionário"
                this.clearFormPessoa()
                this.clearFormEndereco()
                this.clearFormUsuario()
            },

            // Alerta
            alerta(color, estado, mensagem) {
                this.snackbar.color = color
                this.snackbar.estado = estado
                this.snackbar.mensagem = mensagem
            },
            getIdUsuarioLogado(){
                try{
                    let res = jwtDecode(localStorage.getItem('token'))
                    this.funcionario.usuario_cadastro = res.id
                    this.pessoa.usuario_cadastro = res.id
                    this.endereco.usuario_cadastro = res.id
                    this.cargo.usuario_cadastro = res.id
                    this.usuario.usuario_cadastro = res.id
                }
                catch(e){
                    this.alerta('error', true, 'Erro ao carregar id de usuario logado')
                }
            },
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [day,month, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
        }
        
    }
</script>
