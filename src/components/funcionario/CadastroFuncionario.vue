<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-form>
                    <v-layout>
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
                    </v-layout>
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
        data(){
            return{
                nomeTitulo: 'Cadastrar Funcionário',
                funcionario: {
                    id: null,
                    pessoa_id: null,
                    fazenda_id: null,
                    cargo_id: null,
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
        },
        methods: {
            // Pesquisar fazenda por nome
            async getFazendas(val) {
                try{
                    this.selectFazenda.loading = true
                    if (val !== null){
                        let response = await FazendasService._getByNome(val).catch(exception => {
                            if(exception !== null){
                                this.alerta('error', true, 'Erro ao pesquisar todas fazendas!')
                            }
                        })
                        if(response.status !== 400 || response.status !== 500){
                          console.log(response)
                            this.selectFazenda.items = response.data.fazendas.data
                        }
                        this.selectFazenda.loading = false
                    }
                }
                catch (exception){
                    this.alerta('error', true, 'Erro ao pesquisar todas fazendas!')
                }
            },


            // Alerta
            alerta(color, estado, mensagem) {
                this.snackbar.color = color
                this.snackbar.estado = estado
                this.snackbar.mensagem = mensagem
            }
        }
        
    }
</script>

<style>

</style>
